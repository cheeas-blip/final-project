const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Environment variable
const appName = process.env.APP_NAME || "My Dashboard App";

// Middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve frontend files
app.use(express.static(__dirname));

// Fake database
let items = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" }
];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.json(newItem);
});

app.listen(PORT, () => {
  console.log(`${appName} running on port ${PORT}`);
});