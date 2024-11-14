// Game variables
let time = 0; // Total time advanced
let ce = 0;   // Chrono Energy
let tp = 0;   // Temporal Points
let cePerClick = 1; // CE gained per click
let timePerClick = 1; // Time advanced per click
let cePerSecond = 0;  // CE gained per second from devices
let timePerSecond = 0; // Time advanced per second from devices

// Multipliers
let cePerClickMultiplier = 1;
let cePerSecondMultiplier = 1;
let timePerClickMultiplier = 1;
let timePerSecondMultiplier = 1;


let era = 'Primitive Age';
let eras = [
    { name: 'Primitive Age', threshold: 0, background: '#0e0e12' },
    { name: 'Ancient Age', threshold: 1000, background: '#4e342e' },
    { name: 'Medieval Age', threshold: 10000, background: '#283593' },
    { name: 'Industrial Age', threshold: 100000, background: '#37474f' },
    { name: 'Modern Age', threshold: 1000000, background: '#546e7a' },
    { name: 'Future Age', threshold: 10000000, background: '#1e88e5' },
];
let currentEraIndex = 0;

// Upgrades
const upgradesData = [
    {
        id: 'upgrade-time-jump',
        name: 'Time Jump',
        description: 'Increases time and CE per click by 1.',
        baseCost: 50,
        cost: 50,
        level: 0,
        unlocked: true,
        era: 0,
        action: () => {
            timePerClick += 1;
            cePerClick += 1;
        }
    },
    {
        id: 'upgrade-clock',
        name: 'Clock',
        description: 'Automates time and CE advancement by 5 per second.',
        baseCost: 100,
        cost: 100,
        level: 0,
        unlocked: false,
        era: 1,
        action: () => {
            timePerSecond += 5;
            cePerSecond += 5;
        }
    },
    // Additional upgrades...
];

// Temporal Upgrades (Prestige Shop)
const temporalUpgrades = [
    {
        id: 'tp-multiplier-ce',
        name: 'CE Gain Multiplier',
        description: 'Multiply CE gains by 2.',
        baseCost: 5,
        cost: 5,
        level: 0,
        applyEffect: function() {
            cePerClickMultiplier = Math.pow(2, this.level);
            cePerSecondMultiplier = Math.pow(2, this.level);
        }
    },
    {
        id: 'tp-multiplier-time',
        name: 'Time Advancement Multiplier',
        description: 'Multiply time advancement by 2.',
        baseCost: 10,
        cost: 10,
        level: 0,
        applyEffect: function() {
            timePerClickMultiplier = Math.pow(2, this.level);
            timePerSecondMultiplier = Math.pow(2, this.level);
        }
    },
];

// Update displays
function updateDisplay() {
    document.getElementById('time').textContent = formatNumber(time);
    document.getElementById('ce').textContent = formatNumber(ce);
    document.getElementById('tp').textContent = formatNumber(tp);
    updateEra();
    updateUpgradeButtons();
    updateProgressBar();
}

// Format numbers with commas
function formatNumber(num) {
    return num.toLocaleString();
}

// Advance time on button click
document.getElementById('advance-time-btn').addEventListener('click', () => {
    time += timePerClick * timePerClickMultiplier;
    ce += cePerClick * cePerClickMultiplier;
    createParticleEffect();
    updateDisplay();
});

// Create particle effect
function createParticleEffect() {
    const btn = document.getElementById('advance-time-btn');
    const particle = document.createElement('span');
    particle.classList.add('particle');
    particle.style.left = `${Math.random() * 100}%`;
    btn.appendChild(particle);
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Generate upgrade items
function generateUpgrades() {
    const upgradesContainer = document.getElementById('upgrades');
    upgradesContainer.innerHTML = ''; // Clear existing upgrades
    upgradesData.forEach(upgrade => {
        const upgradeItem = document.createElement('div');
        upgradeItem.classList.add('upgrade-item');
        upgradeItem.id = upgrade.id;

        if (!upgrade.unlocked) {
            upgradeItem.classList.add('locked');
            upgradeItem.innerHTML = '<h3>???</h3>';
        } else {
            // Upgrade Icon (CSS Styled)
            const icon = document.createElement('div');
            icon.classList.add('upgrade-icon');
            icon.textContent = getUpgradeIcon(upgrade.id);
            upgradeItem.appendChild(icon);

            const title = document.createElement('h3');
            title.textContent = upgrade.name;
            upgradeItem.appendChild(title);

            const desc = document.createElement('p');
            desc.textContent = upgrade.description;
            upgradeItem.appendChild(desc);

            const level = document.createElement('p');
            level.id = `${upgrade.id}-level`;
            level.textContent = `Level: ${upgrade.level}`;
            upgradeItem.appendChild(level);

            const cost = document.createElement('p');
            cost.id = `${upgrade.id}-cost`;
            cost.textContent = `Cost: ${formatNumber(upgrade.cost)} CE`;
            upgradeItem.appendChild(cost);

            const button = document.createElement('button');
            button.textContent = 'Purchase';
            button.addEventListener('click', () => purchaseUpgrade(upgrade.id));
            upgradeItem.appendChild(button);
        }

        upgradesContainer.appendChild(upgradeItem);
    });
}

// Get Upgrade Icon (Using Emoji or Text Symbol)
function getUpgradeIcon(id) {
    switch (id) {
        case 'upgrade-time-jump':
            return '⏩';
        case 'upgrade-clock':
            return '⏰';
        // Add more cases as needed
        default:
            return '⚙️';
    }
}

// Purchase upgrade
function purchaseUpgrade(id) {
    const upgrade = upgradesData.find(u => u.id === id);
    if (ce >= upgrade.cost) {
        ce -= upgrade.cost;
        upgrade.level += 1;
        upgrade.action();

        // Increase the cost exponentially for each purchase
        upgrade.cost = Math.ceil(upgrade.baseCost * Math.pow(1.15, upgrade.level));

        // Update upgrade item display
        document.getElementById(`${upgrade.id}-level`).textContent = `Level: ${upgrade.level}`;
        document.getElementById(`${upgrade.id}-cost`).textContent = `Cost: ${formatNumber(upgrade.cost)} CE`;

        updateDisplay();
    }
}

// Update upgrade buttons based on CE and unlock status
function updateUpgradeButtons() {
    upgradesData.forEach(upgrade => {
        if (upgrade.era <= currentEraIndex && !upgrade.unlocked) {
            upgrade.unlocked = true;
            showToast(`New upgrade unlocked: ${upgrade.name}`);
            generateUpgrades();
        }

        if (upgrade.unlocked) {
            const upgradeItem = document.getElementById(upgrade.id);
            const button = upgradeItem.querySelector('button');
            if (ce >= upgrade.cost) {
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        }
    });
}

// Automate time and CE advancement
setInterval(() => {
    if (timePerSecond > 0 || cePerSecond > 0) {
        time += timePerSecond * timePerSecondMultiplier;
        ce += cePerSecond * cePerSecondMultiplier;
        updateDisplay();
    }
}, 1000);

// Update era based on time
function updateEra() {
    const eraDisplay = document.getElementById('era');
    let newEra = era;
    for (let i = eras.length - 1; i >= 0; i--) {
        if (time >= eras[i].threshold) {
            newEra = eras[i].name;
            if (currentEraIndex !== i) {
                changeEraBackground(eras[i].background);
                currentEraIndex = i;
                showToast(`Entered the ${newEra}!`);
                generateUpgrades(); // Regenerate upgrades to show newly unlocked ones
            }
            break;
        }
    }
    era = newEra;
    eraDisplay.textContent = era;
}

// Change background color
function changeEraBackground(color) {
    const bg = document.getElementById('era-background');
    bg.style.background = color;
}

// Update progress bar
function updateProgressBar() {
    const nextEraThreshold = currentEraIndex < eras.length - 1 ? eras[currentEraIndex + 1].threshold : eras[currentEraIndex].threshold;
    const progress = ((time - eras[currentEraIndex].threshold) / (nextEraThreshold - eras[currentEraIndex].threshold)) * 100;
    const timeBar = document.getElementById('time-bar');
    timeBar.style.width = `${progress}%`;
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
    }, 2000);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Perform Time Loop (Prestige)
document.getElementById('time-loop-btn').addEventListener('click', () => {
    performTimeLoop();
});

function performTimeLoop() {
    if (time >= 10000) { // Minimum time advanced to perform a Time Loop
        const earnedTP = Math.floor(time / 10000); // Calculate TP earned
        tp += earnedTP;
        showToast(`Performed Time Loop! Earned ${earnedTP} TP.`);

        // Reset game state
        time = 0;
        ce = 0;
        cePerClick = 1;
        timePerClick = 1;
        cePerSecond = 0;
        timePerSecond = 0;
        cePerClickMultiplier = 1;
        cePerSecondMultiplier = 1;
        timePerClickMultiplier = 1;
        timePerSecondMultiplier = 1;
        currentEraIndex = 0;

        // Reset upgrades
        upgradesData.forEach(upgrade => {
            upgrade.level = 0;
            upgrade.cost = upgrade.baseCost;
            if (upgrade.id !== 'upgrade-time-jump') {
                upgrade.unlocked = false;
            }
        });

        // Apply any purchased temporal upgrades
        temporalUpgrades.forEach(upgrade => {
            upgrade.applyEffect();
        });

        // Regenerate upgrades and shop, update display
        generateUpgrades();
        generateTemporalShop();
        updateDisplay();
    } else {
        showToast('You need at least 10,000 time advanced to perform a Time Loop.');
    }
}

// Generate Temporal Shop
function generateTemporalShop() {
    const shopContainer = document.getElementById('temporal-shop');
    shopContainer.innerHTML = ''; // Clear existing items
    temporalUpgrades.forEach(upgrade => {
        const item = document.createElement('div');
        item.classList.add('temporal-item');
        item.id = upgrade.id;

        const title = document.createElement('h3');
        title.textContent = upgrade.name;
        item.appendChild(title);

        const desc = document.createElement('p');
        desc.textContent = upgrade.description;
        item.appendChild(desc);

        const level = document.createElement('p');
        level.textContent = `Level: ${upgrade.level}`;
        item.appendChild(level);

        const cost = document.createElement('p');
        cost.textContent = `Cost: ${upgrade.cost} TP`;
        item.appendChild(cost);

        const button = document.createElement('button');
        button.textContent = 'Purchase';
        button.disabled = tp < upgrade.cost;
        button.addEventListener('click', () => purchaseTemporalUpgrade(upgrade.id));
        item.appendChild(button);

        shopContainer.appendChild(item);
    });
}

// Purchase Temporal Upgrade
function purchaseTemporalUpgrade(id) {
    const upgrade = temporalUpgrades.find(u => u.id === id);
    if (tp >= upgrade.cost) {
        tp -= upgrade.cost;
        upgrade.level += 1;

        // Recalculate cost (exponential increase)
        upgrade.cost = Math.ceil(upgrade.baseCost * Math.pow(1.5, upgrade.level));

        // Apply the effect based on the new level
        upgrade.applyEffect();

        // Update shop and display
        generateTemporalShop();
        updateDisplay();
        showToast(`Purchased ${upgrade.name} Level ${upgrade.level}!`);
    } else {
        showToast('Not enough Temporal Points.');
    }
}

// Save and load game state
function saveGame() {
    const gameState = {
        time,
        ce,
        tp,
        cePerClick,
        timePerClick,
        cePerSecond,
        timePerSecond,
        cePerClickMultiplier,
        cePerSecondMultiplier,
        timePerClickMultiplier,
        timePerSecondMultiplier,
        currentEraIndex,
        upgradesData,
        temporalUpgrades,
    };
    localStorage.setItem('chronoClickerSave', JSON.stringify(gameState));
}

function loadGame() {
    const savedGame = localStorage.getItem('chronoClickerSave');
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        time = gameState.time;
        ce = gameState.ce;
        tp = gameState.tp || 0;
        cePerClick = gameState.cePerClick;
        timePerClick = gameState.timePerClick;
        cePerSecond = gameState.cePerSecond;
        timePerSecond = gameState.timePerSecond;
        cePerClickMultiplier = gameState.cePerClickMultiplier || 1;
        cePerSecondMultiplier = gameState.cePerSecondMultiplier || 1;
        timePerClickMultiplier = gameState.timePerClickMultiplier || 1;
        timePerSecondMultiplier = gameState.timePerSecondMultiplier || 1;
        currentEraIndex = gameState.currentEraIndex;

        upgradesData.forEach((upgrade, index) => {
            Object.assign(upgrade, gameState.upgradesData[index]);
        });

        temporalUpgrades.forEach((upgrade, index) => {
            Object.assign(upgrade, gameState.temporalUpgrades[index]);
            // Apply the effect based on the current level
            upgrade.applyEffect();
        });
    }
}

// Auto-save every 10 seconds
setInterval(saveGame, 10000);

// Load game on start
window.onload = () => {
    loadGame();
    generateUpgrades();
    generateTemporalShop();
    updateDisplay();
};
