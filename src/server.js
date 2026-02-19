const http = require('http');
const fs = require('fs');
const path = require('path');
const { PORT, PUBLIC_DIR } = require('./config/env');
const logger = require('./utils/logger');
const { getContentType } = require('./utils/contentType');

const server = http.createServer((req, res) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.log(req.method, req.url, res.statusCode, duration);
    });

    let filePath;
    if (req.url === '/') {
        filePath = path.join(PUBLIC_DIR, 'index.html');
    } else if (req.url === '/about') {
        filePath = path.join(PUBLIC_DIR, 'about.html');
    } else {
        filePath = path.join(PUBLIC_DIR, req.url);
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
            return;
        }

        res.writeHead(200, { 'Content-Type': getContentType(filePath) });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`Сервер працює: http://localhost:${PORT}`);
});