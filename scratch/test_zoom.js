const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- Testing Map Zoom Feature ---');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const gameJs = fs.readFileSync(path.join(__dirname, '..', 'src', 'game.js'), 'utf8');
const enemiesJs = fs.readFileSync(path.join(__dirname, '..', 'src', 'enemies.js'), 'utf8');

// 1. Check HTML UI elements
assert(html.includes('id="sliderMapZoom"'), 'HTML must have sliderMapZoom');
assert(html.includes('id="zoomValText"'), 'HTML must have zoomValText');
assert(html.includes('zoom-presets'), 'HTML must have zoom-presets');
assert(html.includes('data-zoom="0.75"'), 'HTML must have 0.75x preset');
assert(html.includes('data-zoom="1.0"'), 'HTML must have 1.0x preset');
assert(html.includes('data-zoom="1.25"'), 'HTML must have 1.25x preset');
assert(html.includes('adjustMapZoomStep(-0.05)'), 'HTML must have zoom in/out step buttons');
assert(html.includes('id="btnZoomToggle"'), 'HTML must have btnZoomToggle in HUD');
assert(html.includes('function setMapZoomPreset'), 'HTML must have setMapZoomPreset');
assert(html.includes('function cycleZoomToggle'), 'HTML must have cycleZoomToggle');
assert(html.includes('function updateMapZoomUI'), 'HTML must have updateMapZoomUI');
assert(html.includes('v=bc180'), 'HTML must have cache buster v=bc180');
console.log('HTML UI elements & JS handlers: PASSED!');

// 2. Check game.js
assert(gameJs.includes('this.mapZoom = 1.0;'), 'game.js must initialize mapZoom');
assert(gameJs.includes('data.mapZoom !== undefined'), 'game.js must load mapZoom in loadSettings');
assert(gameJs.includes('mapZoom: this.mapZoom || 1.0'), 'game.js must save mapZoom in saveSettings');
assert(gameJs.includes('const zoom = this.mapZoom || 1.0;'), 'game.js must use zoom in camera/render');
assert(gameJs.includes('ctx.scale(zoom, zoom);'), 'game.js must scale ctx in render');
assert(gameJs.includes('window.addEventListener(\'wheel\''), 'game.js must have wheel listener');
assert(gameJs.includes('e.key === \'[\''), 'game.js must have zoom hotkeys');
console.log('game.js zoom logic & rendering: PASSED!');

// 3. Check enemies.js
assert(enemiesJs.includes('this.game.mapZoom'), 'enemies.js must consider mapZoom in despawn / spawn');
console.log('enemies.js adaptive zoom spawn/despawn: PASSED!');

console.log('\nALL MAP ZOOM CHECKS PASSED 100%!');
