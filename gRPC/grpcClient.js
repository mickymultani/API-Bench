// grpcClient.js

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

// Load the protobuf
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("protofiles/book_service.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
).book;

// Create a client instance
const client = new proto.BookService('localhost:50051', grpc.credentials.createInsecure());

// Command line interface setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to close readline interface
function closeInput() {
  rl.close();
}

// List all books
function listBooks() {
  client.ListBooks({}, function(error, books) {
    if (!error) {
      console.log('List of Books:', books);
    } else {
      console.error('Error:', error);
    }
    closeInput();
  });
}

// Add a book
function addBook() {
  rl.question('Enter book title: ', function(title) {
    rl.question('Enter book author: ', function(author) {
      rl.question('Enter book publication year: ', function(year) {
        let book = {
          title: title,
          author: author,
          year: parseInt(year)
        };
        client.CreateBook(book, function(error, book) {
          if (!error) {
            console.log('Book created:', book);
          } else {
            console.error('Error:', error);
          }
          closeInput();
        });
      });
    });
  });
}

// Get a specific book by ID
function getBook() {
  rl.question('Enter book ID: ', function(id) {
    client.GetBook({id: id}, function(error, book) {
      if (!error) {
        console.log('Book Details:', book);
      } else {
        console.error('Error:', error);
      }
      closeInput();
    });
  });
}

// Update a book
function updateBook() {
  rl.question('Enter book ID: ', function(id) {
    rl.question('Enter new title: ', function(title) {
      rl.question('Enter new author: ', function(author) {
        rl.question('Enter new publication year: ', function(year) {
          let book = {
            id: id,
            title: title,
            author: author,
            year: parseInt(year)
          };
          client.UpdateBook(book, function(error, book) {
            if (!error) {
              console.log('Book updated:', book);
            } else {
              console.error('Error:', error);
            }
            closeInput();
          });
        });
      });
    });
  });
}

// Delete a book
function deleteBook() {
  rl.question('Enter book ID to delete: ', function(id) {
    client.DeleteBook({id: id}, function(error, _) {
      if (!error) {
        console.log('Book deleted successfully');
      } else {
        console.error('Error:', error);
      }
      closeInput();
    });
  });
}

// Choose operation
rl.question('Choose an action: list, add, get, update, delete: ', function(choice) {
  switch (choice) {
    case "list":
      listBooks();
      break;
    case "add":
      addBook();
      break;
    case "get":
      getBook();
      break;
    case "update":
      updateBook();
      break;
    case "delete":
      deleteBook();
      break;
    default:
      console.log('Invalid choice.');
      closeInput();
  }
});
