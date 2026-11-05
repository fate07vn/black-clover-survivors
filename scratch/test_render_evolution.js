const fs = require('fs');

// Mock browser environment
global.window = global;
global.document = {
  getElementById: (id) => {
    return {
      id,
      textContent: '',
      innerHTML: '',
      className: '',
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false
      },
      appendChild: () => {}
    };
  },
  createElement: () => ({
    className: '',
    innerHTML: '',
    style: {},
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    appendChild: () => {}
  }),
  querySelectorAll: () => []
};

// Load spells
eval(fs.readFileSync('src/spells.js', 'utf8'));

// Extract renderEvolutionRecipes from index.html
const html = fs.readFileSync('index.html', 'utf8');
const fnCode = html.match(/function renderEvolutionRecipes[\s\S]*?function startGameNow/)[0].replace('function startGameNow', '');

global.ensureGameInstance = () => ({
  player: {
    startingWeaponId: 'anti_magic_slash',
    level: 12,
    weapons: {
      anti_magic_slash: { level: 5 }
    },
    passives: {
      reinforcement: 1
    }
  }
});

try {
  eval(fnCode);
  console.log('Testing renderEvolutionRecipes("all"):');
  renderEvolutionRecipes('all');
  console.log('Testing renderEvolutionRecipes("equipped"):');
  renderEvolutionRecipes('equipped');
  console.log('Testing renderEvolutionRecipes("ready"):');
  renderEvolutionRecipes('ready');
  console.log('No throw in renderEvolutionRecipes!');
} catch (err) {
  console.error('ERROR in renderEvolutionRecipes:', err);
}
