const http = require('http');

const urls = [
  'http://localhost:3000/style.css?v=bc194',
  'http://localhost:3000/src/audio.js?v=bc194',
  'http://localhost:3000/src/sprites.js?v=bc194',
  'http://localhost:3000/src/spells.js?v=bc194',
  'http://localhost:3000/src/enemies.js?v=bc194',
  'http://localhost:3000/src/artifacts.js?v=bc194',
  'http://localhost:3000/src/auth.js?v=bc194',
  'http://localhost:3000/src/game.js?v=bc194'
];

urls.forEach(u => {
  http.get(u, res => {
    console.log(u, '->', res.statusCode);
  }).on('error', err => {
    console.error(u, '-> ERROR', err.message);
  });
});
