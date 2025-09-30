// Make sure this is the first thing that loads
console.log('Loading hero data...');

const HEROES = [
    'Abrams',
    'Bebop',
    'Billy',
    'Calico',
    'Doorman',
    'Drifter',
    'Dynamo',
    'Grey Talon',
    'Haze',
    'Holiday',
    'Infernus',
    'Ivy',
    'Kelvin',
    'Lady Geist',
    'Lash',
    'McGinnis',
    'Mina',
    'Mirage',
    'Mo & Krill',
    'Paige',
    'Paradox',
    'Pocket',
    'Seven',
    'Shiv',
    'Sinclair',
    'Victor',
    'Vindicta',
    'Viscous',
    'Vyper',
    'Warden',
    'Wraith',
    'Yamato'
];

console.log('Heroes loaded:', HEROES.length, 'heroes');

// Helper function to get local hero icon path (.webp format)
function getHeroImageUrl(heroName) {
    const formattedName = heroName.toLowerCase()
        .replace(/ & /g, '-')
        .replace(/ /g, '-')
        .replace(/'/g, '');
    return `./src/assets/icons/heroes/${formattedName}.webp`;
}

// Helper function for fallback icons - returns a simple placeholder
function getHeroFallbackIcon(heroName) {
    // Return a simple colored div instead of SVG to avoid quote issues
    return 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect width="24" height="24" fill="#ff6b35"/><text x="12" y="16" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">${heroName.charAt(0)}</text></svg>`);
}
