// grpcServer.js

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');

// Load book data
const booksData = JSON.parse(fs.readFileSync('./bookData.json'));
const books = {}; // Create an object to hold book data in memory

// Populate initial data
booksData.forEach(book => {
    books[book.id] = book;
});

// Load the protobuf
const packageDefinition = protoLoader.loadSync(
    'protofiles/book_service.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const bookProto = grpc.loadPackageDefinition(packageDefinition).book;

// Implement the gRPC service
const server = new grpc.Server();

server.addService(bookProto.BookService.service, {
    CreateBook: (call, callback) => {
        let book = call.request;
        book.id = Date.now().toString(); // simplistic unique ID
        books[book.id] = book;
        callback(null, book);
    },
    GetBook: (call, callback) => {
        const bookId = call.request.id;
        if (books[bookId]) {
            callback(null, books[bookId]);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            });
        }
    },
    ListBooks: (call, callback) => {
        callback(null, { books: Object.values(books) });
    },
    UpdateBook: (call, callback) => {
        let book = call.request;
        if (books[book.id]) {
            books[book.id] = book;
            callback(null, book);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            });
        }
    },
    DeleteBook: (call, callback) => {
        const bookId = call.request.id;
        if (books[bookId]) {
            delete books[bookId];
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not Found"
            });
        }
    },
});

// Specify the IP and port to start the server on
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(`Server running at http://0.0.0.0:${port}`);
    server.start();
});
