const axios = require('axios');
const fs = require('fs');

// Load book data from bookData.json
const booksData = JSON.parse(fs.readFileSync('bookData.json', 'utf8'));

// Define the API endpoint to create books
const API_ENDPOINT = 'http://localhost:3000/books';

// Function to post a single book to the API
async function postBook(book) {
    try {
        await axios.post(API_ENDPOINT, book);
    } catch (error) {
        console.error("Error posting book to API:", error.message);
    }
}

// Function to post all books to the API
async function populateBooks() {
    for (const book of booksData) {
        await postBook(book);
    }
    console.log("All books have been posted to the API");
}

populateBooks();
