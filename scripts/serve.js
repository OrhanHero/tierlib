import { createReadStream } from 'node:fs';
import { createServer } from 'node:http';

const publicFiles = new Map([
  ['/', ['index.html', 'text/html']],
  ['/index.html', ['index.html', 'text/html']],
  ['/styles.css', ['styles.css', 'text/css']],
  ['/app.js', ['app.js', 'text/javascript']],
  ['/data.js', ['data.js', 'text/javascript']],
]);
const port = Number(process.env.TIERLIB_PORT || 4173);

const server = createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }
  const pathname = new URL(request.url, 'http://127.0.0.1').pathname;
  const file = publicFiles.get(pathname);
  if (!file) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Datei nicht gefunden.');
    return;
  }
  const [name, type] = file;
  response.writeHead(200, {
    'Content-Type': type + '; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  if (request.method === 'HEAD') {
    response.end();
    return;
  }
  createReadStream(new URL('../' + name, import.meta.url)).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log('Tierlib läuft unter http://127.0.0.1:' + server.address().port);
});
