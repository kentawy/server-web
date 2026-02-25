// Завдання 1 

// const http = require('http');

// const PORT = 3000;

// const server = http.createServer((req, res) => {
// 	res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
// 	res.end('Hello, Server!');
// });

// server.listen(PORT, () => {
// 	console.log(`Сервер запущено на порту ${PORT}`);
// });

// Самостійна робота до завдання 1
// const http = require('http');

// const PORT = 4000;

// const server = http.createServer((req, res) => {
// 	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
// 	const htmlResponse = `
//         <!DOCTYPE html>
//         <html lang="uk">
//         <head>
//             <meta charset="UTF-8">
//             <title>Lab 1 - Node.js</title>
//         </head>
//         <body>
//             <h1>Вітаю! Сервер працює коректно.</h1>
//             <p>Це відповідь у форматі <span>HTML</span>.</p>
//             <p>Зараз використовується порт: <strong>${PORT}</strong></p>
//         </body>
//         </html>
//     `;
    
//     res.end(htmlResponse);
// });

// server.listen(PORT, () => {
//     console.log(`Сервер успішно запущено на порту ${PORT}`);
//     console.log(`Відкрити посилання: http://localhost:${PORT}/`);
// });


// Завдання 2
// const http = require('http');

// const PORT = 3000;

// const server = http.createServer((req, res) => {
// 	const method = req.method;
//     const url = req.url;

// 	console.log(`[LOG]: Method: ${method} | URL: ${url}`);

// 	res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
// 	res.end(`You made a ${method} request to ${url}`);
// });

// server.listen(PORT, () => {
// 	console.log(`Сервер запущено на порту ${PORT}`);
// 	console.log(`Відкрити посилання: http://localhost:${PORT}/`);
// });

// Самостійна робота до завдання 2
const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
	const timestamp = new Date().toISOString();

	console.log(`[${timestamp}] ${method} request to ${url}`);

	if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Home page');
    }
	else if (url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('About page');
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
    console.log(`Відкрити посилання: http://localhost:${PORT}/`);
    console.log(`Відкрити посилання: http://localhost:${PORT}/about`);
});