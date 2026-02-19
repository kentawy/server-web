const fs = require('fs');
const path = require('path');
const { LOG_PATH } = require('../config/env');

const dir = path.dirname(LOG_PATH);

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

function log(method, url, statusCode, duration) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        method,
        url,
        status: statusCode,
        duration: `${duration}ms`
    };

    fs.appendFile(LOG_PATH, JSON.stringify(logEntry) + '\n', (err) => {
        if (err) {
            console.error('Error writing log:', err);
        }
    });
}

module.exports = { log };