// ==========================
// Chrono Clicker Game Script
// ==========================

// --------------------------
// Game Variables
// --------------------------
let time = 0; // Total time advanced
let ce = 0;   // Chrono Energy
let tp = 0;   // Temporal Points

// CE and Time per Click
let cePerClick = 1;
let timePerClick = 1;

// CE and Time per Second (from devices)
let cePerSecond = 0;
let timePerSecond = 0;

// Multipliers
let cePerClickMultiplier = 1;
let cePerSecondMultiplier = 1;
let timePerClickMultiplier = 1;
let timePerSecondMultiplier = 1;

// Current Era
let era = 'Primitive Age';
let currentEraIndex = 0;

// --------------------------
// Eras Definition
// --------------------------
const eras = [
    { name: 'Primitive Age', threshold: 0, background: '#0e0e12' },
    { name: 'Stone Age', threshold: 500, background: '#3e2723' },
    { name: 'Bronze Age', threshold: 2000, background: '#4e342e' },
    { name: 'Iron Age', threshold: 5000, background: '#5d4037' },
    { name: 'Classical Age', threshold: 10000, background: '#6d4c41' },
    { name: 'Dark Age', threshold: 25000, background: '#1a237e' },
    { name: 'Medieval Age', threshold: 50000, background: '#283593' },
    { name: 'Renaissance Age', threshold: 100000, background: '#303f9f' },
    { name: 'Industrial Age', threshold: 250000, background: '#37474f' },
    { name: 'Machine Age', threshold: 500000, background: '#455a64' },
    { name: 'Atomic Age', threshold: 1000000, background: '#546e7a' },
    { name: 'Information Age', threshold: 2500000, background: '#0277bd' },
    { name: 'Space Age', threshold: 5000000, background: '#0288d1' },
    { name: 'Future Age', threshold: 10000000, background: '#039be5' },
    { name: 'Quantum Age', threshold: 25000000, background: '#03a9f4' },
    { name: 'Stellar Age', threshold: 50000000, background: '#29b6f6' },
    { name: 'Cosmic Age', threshold: 100000000, background: '#4fc3f7' },
    { name: 'Transcendent Age', threshold: 1000000000, background: '#81d4fa' }
];

// --------------------------
// Upgrades Definition
// --------------------------
const upgradesData = [
    // Basic Upgrades
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
        id: 'upgrade-sundial',
        name: 'Sundial',
        description: 'Automates time and CE advancement by 2 per second.',
        baseCost: 75,
        cost: 75,
        level: 0,
        unlocked: false,
        era: 1,
        action: () => {
            timePerSecond += 2;
            cePerSecond += 2;
        }
    },
    {
        id: 'upgrade-water-clock',
        name: 'Water Clock',
        description: 'Automates time and CE advancement by 5 per second.',
        baseCost: 150,
        cost: 150,
        level: 0,
        unlocked: false,
        era: 2,
        action: () => {
            timePerSecond += 5;
            cePerSecond += 5;
        }
    },
    // Bronze Age Upgrades
    {
        id: 'upgrade-bronze-tools',
        name: 'Bronze Tools',
        description: 'Doubles CE gain per click.',
        baseCost: 300,
        cost: 300,
        level: 0,
        unlocked: false,
        era: 2,
        action: () => {
            cePerClickMultiplier *= 2;
        }
    },
    // Iron Age Upgrades
    {
        id: 'upgrade-iron-forge',
        name: 'Iron Forge',
        description: 'Triples time advancement per click.',
        baseCost: 600,
        cost: 600,
        level: 0,
        unlocked: false,
        era: 3,
        action: () => {
            timePerClickMultiplier *= 3;
        }
    },
    // Classical Age Upgrades
    {
        id: 'upgrade-library',
        name: 'Ancient Library',
        description: 'Increases all CE gains by 50%.',
        baseCost: 1000,
        cost: 1000,
        level: 0,
        unlocked: false,
        era: 4,
        action: () => {
            cePerClickMultiplier *= 1.5;
            cePerSecondMultiplier *= 1.5;
        }
    },
    // Medieval Age Upgrades
    {
        id: 'upgrade-mechanical-clock',
        name: 'Mechanical Clock',
        description: 'Automates time and CE advancement by 20 per second.',
        baseCost: 2500,
        cost: 2500,
        level: 0,
        unlocked: false,
        era: 6,
        action: () => {
            timePerSecond += 20;
            cePerSecond += 20;
        }
    },
    // Renaissance Upgrades
    {
        id: 'upgrade-printing-press',
        name: 'Printing Press',
        description: 'Doubles all resource gains.',
        baseCost: 5000,
        cost: 5000,
        level: 0,
        unlocked: false,
        era: 7,
        action: () => {
            cePerClickMultiplier *= 2;
            cePerSecondMultiplier *= 2;
            timePerClickMultiplier *= 2;
            timePerSecondMultiplier *= 2;
        }
    },
    // Industrial Age Upgrades
    {
        id: 'upgrade-steam-engine',
        name: 'Steam Engine',
        description: 'Automates time and CE advancement by 100 per second.',
        baseCost: 10000,
        cost: 10000,
        level: 0,
        unlocked: false,
        era: 8,
        action: () => {
            timePerSecond += 100;
            cePerSecond += 100;
        }
    },
    // Machine Age Upgrades
    {
        id: 'upgrade-electric-generator',
        name: 'Electric Generator',
        description: 'Automates time and CE advancement by 250 per second.',
        baseCost: 20000,
        cost: 20000,
        level: 0,
        unlocked: false,
        era: 9,
        action: () => {
            timePerSecond += 250;
            cePerSecond += 250;
        }
    },
    // Atomic Age Upgrades
    {
        id: 'upgrade-atomic-clock',
        name: 'Atomic Clock',
        description: 'Increases all time advancement by 400%.',
        baseCost: 50000,
        cost: 50000,
        level: 0,
        unlocked: false,
        era: 10,
        action: () => {
            timePerClickMultiplier *= 4;
            timePerSecondMultiplier *= 4;
        }
    },
    // Information Age Upgrades
    {
        id: 'upgrade-quantum-computer',
        name: 'Quantum Computer',
        description: 'Multiplies all gains by 5.',
        baseCost: 100000,
        cost: 100000,
        level: 0,
        unlocked: false,
        era: 11,
        action: () => {
            cePerClickMultiplier *= 5;
            cePerSecondMultiplier *= 5;
            timePerClickMultiplier *= 5;
            timePerSecondMultiplier *= 5;
        }
    },
    // Space Age Upgrades
    {
        id: 'upgrade-time-dilation',
        name: 'Time Dilation Engine',
        description: 'Automatically advances time by 1000 per second.',
        baseCost: 250000,
        cost: 250000,
        level: 0,
        unlocked: false,
        era: 12,
        action: () => {
            timePerSecond += 1000;
        }
    },
    // Future Age Upgrades
    {
        id: 'upgrade-chronosphere',
        name: 'Chronosphere',
        description: 'Multiplies all resource gains by 10.',
        baseCost: 500000,
        cost: 500000,
        level: 0,
        unlocked: false,
        era: 13,
        action: () => {
            cePerClickMultiplier *= 10;
            cePerSecondMultiplier *= 10;
            timePerClickMultiplier *= 10;
            timePerSecondMultiplier *= 10;
        }
    },
    // Quantum Age Upgrades
    {
        id: 'upgrade-quantum-entanglement',
        name: 'Quantum Entanglement',
        description: 'Automates time and CE advancement by 5000 per second.',
        baseCost: 1000000,
        cost: 1000000,
        level: 0,
        unlocked: false,
        era: 14,
        action: () => {
            timePerSecond += 5000;
            cePerSecond += 5000;
        }
    },
    // Stellar Age Upgrades
    {
        id: 'upgrade-stellar-engine',
        name: 'Stellar Engine',
        description: 'Automates time and CE advancement by 10000 per second.',
        baseCost: 2000000,
        cost: 2000000,
        level: 0,
        unlocked: false,
        era: 15,
        action: () => {
            timePerSecond += 10000;
            cePerSecond += 10000;
        }
    },
    // Cosmic Age Upgrades
    {
        id: 'upgrade-cosmic-harvester',
        name: 'Cosmic Harvester',
        description: 'Automates time and CE advancement by 25000 per second.',
        baseCost: 5000000,
        cost: 5000000,
        level: 0,
        unlocked: false,
        era: 16,
        action: () => {
            timePerSecond += 25000;
            cePerSecond += 25000;
        }
    },
    // Transcendent Age Upgrades
    {
        id: 'upgrade-transcendence',
        name: 'Transcendence',
        description: 'Automates time and CE advancement by 50000 per second.',
        baseCost: 10000000,
        cost: 10000000,
        level: 0,
        unlocked: false,
        era: 17,
        action: () => {
            timePerSecond += 50000;
            cePerSecond += 50000;
        }
    }
];

// --------------------------
// Temporal Upgrades (Prestige Shop)
// --------------------------
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
    {
        id: 'tp-starting-bonus',
        name: 'Temporal Head Start',
        description: 'Start with additional CE and time per click after each reset.',
        baseCost: 15,
        cost: 15,
        level: 0,
        applyEffect: function() {
            cePerClick += 1 + (this.level * 2);
            timePerClick += 1 + (this.level * 2);
        }
    },
    {
        id: 'tp-automation',
        name: 'Temporal Automation',
        description: 'Start with automatic CE and time generation after each reset.',
        baseCost: 20,
        cost: 20,
        level: 0,
        applyEffect: function() {
            cePerSecond += this.level * 5;
            timePerSecond += this.level * 5;
        }
    },
    {
        id: 'tp-efficiency',
        name: 'Temporal Efficiency',
        description: 'Reduce all upgrade costs by 10% (stacks multiplicatively).',
        baseCost: 25,
        cost: 25,
        level: 0,
        applyEffect: function() {
            const costReduction = Math.pow(0.9, this.level);
            upgradesData.forEach(upgrade => {
                upgrade.cost = Math.ceil(upgrade.baseCost * costReduction);
            });
        }
    }
];

// --------------------------
// Achievements Definition
// --------------------------
const achievements = [
    {
        id: 'first-steps',
        name: 'First Steps',
        description: 'Reach the Stone Age',
        earned: false,
        check: () => time >= eras[1].threshold
    },
    {
        id: 'stone-master',
        name: 'Stone Master',
        description: 'Reach the Bronze Age',
        earned: false,
        check: () => time >= eras[2].threshold
    },
    {
        id: 'time-master',
        name: 'Time Master',
        description: 'Perform your first Time Loop',
        earned: false,
        check: () => tp > 0
    },
    {
        id: 'bronze-expert',
        name: 'Bronze Expert',
        description: 'Reach the Iron Age',
        earned: false,
        check: () => time >= eras[3].threshold
    },
    {
        id: 'industrial-revolution',
        name: 'Industrial Revolution',
        description: 'Reach the Industrial Age',
        earned: false,
        check: () => time >= eras[8].threshold
    },
    {
        id: 'future-sight',
        name: 'Future Sight',
        description: 'Reach the Future Age',
        earned: false,
        check: () => time >= eras[13].threshold
    },
    {
        id: 'quantum-leap',
        name: 'Quantum Leap',
        description: 'Reach the Quantum Age',
        earned: false,
        check: () => time >= eras[14].threshold
    },
    {
        id: 'transcendent',
        name: 'Transcendent',
        description: 'Reach the Transcendent Age',
        earned: false,
        check: () => time >= eras[17].threshold
    }
];

// --------------------------
// Achievement System
// --------------------------

// Function to check and award achievements
function checkAchievements() {
    achievements.forEach(achievement => {
        if (!achievement.earned && achievement.check()) {
            achievement.earned = true;
            showToast(`Achievement Unlocked: ${achievement.name}!`);
            // You can add bonus rewards here if desired
        }
    });
}

// --------------------------
// Update Display Function
// --------------------------
function updateDisplay() {
    document.getElementById('time').textContent = formatNumber(time);
    document.getElementById('ce').textContent = formatNumber(ce);
    document.getElementById('tp').textContent = formatNumber(tp);
    updateEra();
    updateUpgradeButtons();
    updateProgressBar();
    updateAchievements();
}

// --------------------------
// Format Number Function
// --------------------------
function formatNumber(num) {
    return num.toLocaleString();
}

// --------------------------
// Advance Time on Button Click
// --------------------------
document.getElementById('advance-time-btn').addEventListener('click', () => {
    time += timePerClick * timePerClickMultiplier;
    ce += cePerClick * cePerClickMultiplier;
    createParticleEffect();
    updateDisplay();
});

// --------------------------
// Particle Effect Function
// --------------------------
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

// --------------------------
// Generate Upgrades Function
// --------------------------
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
            // Upgrade Icon (CSS Styled or Emoji)
            const icon = document.createElement('div');
            icon.classList.add('upgrade-icon');
            icon.textContent = getUpgradeIcon(upgrade.id);
            upgradeItem.appendChild(icon);

            // Upgrade Name
            const title = document.createElement('h3');
            title.textContent = upgrade.name;
            upgradeItem.appendChild(title);

            // Upgrade Description
            const desc = document.createElement('p');
            desc.textContent = upgrade.description;
            upgradeItem.appendChild(desc);

            // Upgrade Level
            const level = document.createElement('p');
            level.id = `${upgrade.id}-level`;
            level.textContent = `Level: ${upgrade.level}`;
            upgradeItem.appendChild(level);

            // Upgrade Cost
            const cost = document.createElement('p');
            cost.id = `${upgrade.id}-cost`;
            cost.textContent = `Cost: ${formatNumber(upgrade.cost)} CE`;
            upgradeItem.appendChild(cost);

            // Purchase Button
            const button = document.createElement('button');
            button.textContent = 'Purchase';
            button.addEventListener('click', () => purchaseUpgrade(upgrade.id));
            upgradeItem.appendChild(button);
        }

        upgradesContainer.appendChild(upgradeItem);
    });
}

// --------------------------
// Get Upgrade Icon Function
// --------------------------
function getUpgradeIcon(id) {
    switch (id) {
        case 'upgrade-time-jump':
            return '⏩';
        case 'upgrade-sundial':
            return '☀️';
        case 'upgrade-water-clock':
            return '💧';
        case 'upgrade-bronze-tools':
            return '🔨';
        case 'upgrade-iron-forge':
            return '🔥';
        case 'upgrade-library':
            return '📚';
        case 'upgrade-mechanical-clock':
            return '⚙️';
        case 'upgrade-printing-press':
            return '🖨️';
        case 'upgrade-steam-engine':
            return '🚂';
        case 'upgrade-electric-generator':
            return '⚡';
        case 'upgrade-atomic-clock':
            return '🕰️';
        case 'upgrade-quantum-computer':
            return '🖥️';
        case 'upgrade-time-dilation':
            return '🌀';
        case 'upgrade-chronosphere':
            return '🕳️';
        case 'upgrade-quantum-entanglement':
            return '🔗';
        case 'upgrade-stellar-engine':
            return '🌟';
        case 'upgrade-cosmic-harvester':
            return '🌌';
        case 'upgrade-transcendence':
            return '✨';
        default:
            return '⚙️';
    }
}

// --------------------------
// Purchase Upgrade Function
// --------------------------
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
    } else {
        showToast('Not enough Chrono Energy (CE) to purchase this upgrade.');
    }
}

// --------------------------
// Update Upgrade Buttons Function
// --------------------------
function updateUpgradeButtons() {
    upgradesData.forEach(upgrade => {
        // Unlock upgrades based on current era
        if (upgrade.era <= currentEraIndex && !upgrade.unlocked) {
            upgrade.unlocked = true;
            showToast(`New upgrade unlocked: ${upgrade.name}`);
            generateUpgrades();
        }

        // Enable or disable purchase buttons based on CE
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

// --------------------------
// Automate Time and CE Advancement
// --------------------------
setInterval(() => {
    if (timePerSecond > 0 || cePerSecond > 0) {
        time += timePerSecond * timePerSecondMultiplier;
        ce += cePerSecond * cePerSecondMultiplier;
        updateDisplay();
    }
}, 1000);

// --------------------------
// Update Era Function
// --------------------------
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

// --------------------------
// Change Era Background Function
// --------------------------
function changeEraBackground(color) {
    const bg = document.getElementById('era-background');
    bg.style.background = color;
}

// --------------------------
// Update Progress Bar Function
// --------------------------
function updateProgressBar() {
    const nextEraThreshold = currentEraIndex < eras.length - 1 ? eras[currentEraIndex + 1].threshold : eras[currentEraIndex].threshold;
    const progress = nextEraThreshold > eras[currentEraIndex].threshold
        ? ((time - eras[currentEraIndex].threshold) / (nextEraThreshold - eras[currentEraIndex].threshold)) * 100
        : 100;
    const timeBar = document.getElementById('time-bar');
    timeBar.style.width = `${progress}%`;
}

// --------------------------
// Show Toast Notification Function
// --------------------------
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

// --------------------------
// Perform Time Loop (Prestige) Function
// --------------------------
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
            if (upgrade.id !== 'upgrade-time-jump') { // Keep 'Time Jump' unlocked
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

// --------------------------
// Generate Temporal Shop Function
// --------------------------
function generateTemporalShop() {
    const shopContainer = document.getElementById('temporal-shop');
    shopContainer.innerHTML = ''; // Clear existing items
    temporalUpgrades.forEach(upgrade => {
        const item = document.createElement('div');
        item.classList.add('temporal-item');
        item.id = upgrade.id;

        // Temporal Upgrade Name
        const title = document.createElement('h3');
        title.textContent = upgrade.name;
        item.appendChild(title);

        // Temporal Upgrade Description
        const desc = document.createElement('p');
        desc.textContent = upgrade.description;
        item.appendChild(desc);

        // Temporal Upgrade Level
        const level = document.createElement('p');
        level.textContent = `Level: ${upgrade.level}`;
        item.appendChild(level);

        // Temporal Upgrade Cost
        const cost = document.createElement('p');
        cost.textContent = `Cost: ${upgrade.cost} TP`;
        item.appendChild(cost);

        // Purchase Button
        const button = document.createElement('button');
        button.textContent = 'Purchase';
        button.disabled = tp < upgrade.cost;
        button.addEventListener('click', () => purchaseTemporalUpgrade(upgrade.id));
        item.appendChild(button);

        shopContainer.appendChild(item);
    });
}

// --------------------------
// Purchase Temporal Upgrade Function
// --------------------------
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
        showToast('Not enough Temporal Points (TP) to purchase this upgrade.');
    }
}

// --------------------------
// Update Achievements Display Function
// --------------------------
function updateAchievements() {
    const achievementsContainer = document.getElementById('achievements');
    achievementsContainer.innerHTML = ''; // Clear existing achievements
    achievements.forEach(achievement => {
        const achievementItem = document.createElement('div');
        achievementItem.classList.add('achievement-item');
        if (achievement.earned) {
            achievementItem.classList.add('earned');
        } else {
            achievementItem.classList.add('locked');
        }

        const title = document.createElement('h4');
        title.textContent = achievement.name;
        achievementItem.appendChild(title);

        const desc = document.createElement('p');
        desc.textContent = achievement.description;
        achievementItem.appendChild(desc);

        achievementsContainer.appendChild(achievementItem);
    });
}

// --------------------------
// Save and Load Game State Functions
// --------------------------
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
        achievements
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

        achievements.forEach((achievement, index) => {
            achievement.earned = gameState.achievements[index].earned;
        });
    }
}

// --------------------------
// Auto-save Interval
// --------------------------
setInterval(saveGame, 10000); // Save every 10 seconds

// --------------------------
// Initial Setup on Window Load
// --------------------------
window.onload = () => {
    loadGame();
    generateUpgrades();
    generateTemporalShop();
    updateDisplay();
};

// --------------------------
// Achievement Checking Integration
// --------------------------

// Wrap the original updateDisplay to include achievement checking
const originalUpdateDisplay = updateDisplay;
updateDisplay = function() {
    originalUpdateDisplay();
    checkAchievements();
};
