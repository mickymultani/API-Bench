// restServer.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory storage
const books = {};  // Using an object as a simple in-memory store

// Server Configuration
const PORT = 3000;

// Create a Book
app.post('/books', (req, res) => {
    const id = Date.now().toString();
    const { title, author, year } = req.body;
    books[id] = { id, title, author, year };
    res.status(201).send(books[id]);
});

// Get a Book by ID
app.get('/books/:id', (req, res) => {
    const book = books[req.params.id];
    if (book) {
        res.send(book);
    } else {
        res.status(404).send({ message: "Book not found" });
    }
});

// List all Books
app.get('/books', (req, res) => {
    res.send(Object.values(books));
});

// Update a Book by ID
app.put('/books/:id', (req, res) => {
    const { title, author, year } = req.body;
    if (books[req.params.id]) {
        books[req.params.id] = { ...books[req.params.id], title, author, year };
        res.send(books[req.params.id]);
    } else {
        res.status(404).send({ message: "Book not found" });
    }
});

// Delete a Book by ID
app.delete('/books/:id', (req, res) => {
    if (books[req.params.id]) {
        delete books[req.params.id];
        res.send({ message: "Book deleted successfully" });
    } else {
        res.status(404).send({ message: "Book not found" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`REST API for Books is running on port ${PORT}`);
});
