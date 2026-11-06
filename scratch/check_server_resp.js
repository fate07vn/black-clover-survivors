const http = require('http');

http.get('http://localhost:3000', (res) => {
  console.log('Status code:', res.statusCode);
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('Response length:', data.length);
    console.log('Includes menuOverlay:', data.includes('id="menuOverlay"'));
  });
}).on('error', (err) => {
  console.error('Fetch error:', err.message);
});
