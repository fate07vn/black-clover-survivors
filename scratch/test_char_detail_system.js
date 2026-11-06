const fs = require('fs');

// We simulate a basic DOM environment to test the new functions
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
const window = dom.window;
const document = window.document;

console.log('Testing DOM elements:');
console.log('menuOverlay exists:', !!document.getElementById('menuOverlay'));
console.log('lobbyHeroBar exists:', !!document.querySelector('.lobby-hero-bar'));
console.log('lobbyMapBar exists:', !!document.querySelector('.lobby-map-bar'));
console.log('lobbyHeroName exists:', !!document.getElementById('lobbyHeroName'));
console.log('lobbyMapTitle exists:', !!document.getElementById('lobbyMapTitle'));
console.log('charSelectModal exists:', !!document.getElementById('charSelectModal'));
console.log('charDetailModal exists:', !!document.getElementById('charDetailModal'));
console.log('cdHeroName exists:', !!document.getElementById('cdHeroName'));
console.log('cdWeaponName exists:', !!document.getElementById('cdWeaponName'));
console.log('cdEvoName exists:', !!document.getElementById('cdEvoName'));
console.log('cdSuperEvoName exists:', !!document.getElementById('cdSuperEvoName'));
console.log('cdStatsSummary exists:', !!document.getElementById('cdStatsSummary'));
console.log('cdSpecialTrait exists:', !!document.getElementById('cdSpecialTrait'));
console.log('cdActionBtn exists:', !!document.getElementById('cdActionBtn'));
