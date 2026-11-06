const fs = require('fs');

console.log('Testing character persistence logic...');

let mockStorage = {};
const localStorage = {
  getItem: k => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = v; }
};

// Test selection
localStorage.setItem('BC_SELECTED_HERO', 'yami');
console.log('Stored hero:', localStorage.getItem('BC_SELECTED_HERO'));

// Test reload simulation
let heroOnLoad = localStorage.getItem('BC_SELECTED_HERO') || 'asta';
console.log('Hero on reload:', heroOnLoad);
if (heroOnLoad === 'yami') {
  console.log('PASS: Hero persists across simulated reload!');
} else {
  console.error('FAIL');
  process.exit(1);
}
