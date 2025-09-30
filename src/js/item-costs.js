'use strict';

// Soul costs for counter items used in the application
const ITEM_COSTS = {
    // Tier 1 - $800
    'Rebuttal': 800,
    'Rusted Barrel': 800,

    // Tier 2 - $1600
    'Enduring Speed': 1600,
    'Healbane': 1600,
    'Reactive Barrier': 1600,
    'Restorative Locket': 1600,
    'Spirit Shielding': 1600,
    'Slowing Hex': 1600,
    'Suppressor': 1600,

    // Tier 3 - $3200
    'Counterspell': 3200,
    'Debuff Remover': 3200,
    'Decay': 3200,
    'Disarming Hex': 3200,
    'Hunter\'s Aura': 3200,
    'Knockdown': 3200,
    'Rescue Beam': 3200,
    'Silence Wave': 3200,
    'Toxic Bullets': 3200,
    'Warp Stone': 3200,

    // Tier 4 - $6400
    'Armor Piercing Rounds': 6400,
    'Capacitor': 6400,
    'Crippling Headshot': 6400,
    'Divine Barrier': 6400,
    'Inhibitor': 6400,
    'Juggernaut': 6400,
    'Plated Armor': 6400,
    'Spellbreaker': 6400,
    'Spirit Burn': 6400
};

// Make available globally
if (typeof window !== 'undefined') {
    window.ITEM_COSTS = ITEM_COSTS;
}

console.log('Item costs loaded:', Object.keys(ITEM_COSTS).length, 'items');
