const express = require('express'); 
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	next();
});

let items = [
	{ id: 1, name: "Товар 1", price: 100 },
	{ id: 2, name: "Товар 2", price: 200 }
];

app.get('/items', (req, res) => {
	res.status(200).json(items); 
});

app.get('/items/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const item = items.find(i => i.id === id);

	if (!item) {
		return res.status(404).json({ error: "Item not found" });
	}
	res.json(item);
});

app.post('/items', (req, res) => {
	const { id, name, price } = req.body;

	if (typeof id !== 'number' || !name || typeof price !== 'number') {
		return res.status(400).json({ error: "Invalid item format. 'id' and 'price' must be numbers." });
	}

	if (items.some(i => i.id === id)) {
		return res.status(409).json({ error: "Item with this id already exists" });
	}

	const newItem = { id, name, price };
	items.push(newItem);
	res.status(201).json(newItem); 
});

app.put('/items/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const { name, price } = req.body;
	const idx = items.findIndex(i => i.id === id);

	if (idx === -1) {
		return res.status(404).json({ error: "Item not found" });
	}

	items[idx] = { id, name, price };
	res.json(items[idx]);
});

app.delete('/items/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const idx = items.findIndex(i => i.id === id);

	if (idx === -1) {
		return res.status(404).json({ error: "Item not found" });
	}

	items.splice(idx, 1);
	res.status(204).send(); 
});

app.listen(PORT, () => {
	console.log(`Сервер успішно запущено на порту ${PORT}...`);
});