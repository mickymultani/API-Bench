// populateData.js (modified)

const axios = require('axios');
const fs = require('fs');

const API_ENDPOINT = 'http://localhost:3000/books';
const OUTPUT_FILE = './bookData.json'; // Path to output file

async function createBook(book) {
    try {
        const response = await axios.post(API_ENDPOINT, book);
        console.log(`Book created: ID=${response.data.id}`);
        return response.data; // return the book data including the ID
    } catch (error) {
        console.error("Failed to create book", error);
    }
}

async function generateBookData(totalBooks) {
    let books = [];
    for (let i = 0; i < totalBooks; i++) {
        const book = {
            title: `Book ${i}`,
            author: `Author ${i}`,
            year: 2000 + (i % 24), // Books from 2000-2023
        };
        const createdBook = await createBook(book);
        if(createdBook) books.push(createdBook);
    }
    // Save the books array to a file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(books, null, 2));
    console.log(`Data saved to ${OUTPUT_FILE}`);
}

generateBookData(10000); // Adjust as needed
