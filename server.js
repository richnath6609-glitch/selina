import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8081;

http.createServer((req, res) => {
    let urlPath = req.url === '/' ? '/index.html' : req.url;
    let relativePath = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;
    let filePath = path.join(__dirname, relativePath);
    console.log(`Request: ${req.url} -> ${filePath}`);

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    if (extname === '.js') contentType = 'text/javascript';
    if (extname === '.css') contentType = 'text/css';
    if (extname === '.jpg' || extname === '.jpeg') contentType = 'image/jpeg';
    if (extname === '.png') contentType = 'image/png';


    fs.readFile(filePath, (error, content) => {
        if (!error) {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        } else {
            res.writeHead(404);
            res.end('Not found');
        }
    });
}).listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));

