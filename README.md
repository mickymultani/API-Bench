# API Performance Benchmarking Project

## CAUTION:  Keep an eye on your temp files. API testing on localhost with Jmeter will fillup your temp storage pretty quickly. You will not be able to delete this on windows machine just using the explorer -- use TreeView and then delete the temp files to free up space.

## Overview

This project focuses on benchmarking the performance of REST and gRPC APIs locally. It systematically tests, compares, and analyzes the performance characteristics using ApacheBench, ghz, and Apache JMeter, providing insights into response times, throughput, and error rates.

## Objectives

- **Compare the performance metrics** of RESTful services and gRPC services under similar conditions.
- **Understand the application** of different benchmarking tools and their implications on performance metrics.
- **Provide a replicable benchmarking setup** that can be reused or extended for similar performance testing needs.

## Components

### REST API Implementation

- A Node.js server providing RESTful endpoints for CRUD operations on books.

### gRPC API Implementation

- A Node.js gRPC server offering equivalent functionalities to the REST API, using Protocol Buffers.

### Tools Used

- **ApacheBench (ab):** For initial benchmarking of the REST API.
- **ghz:** For initial benchmarking of the gRPC API.
- **Apache JMeter:** For detailed and comparative benchmarking of both APIs.

## Local Testing Process

### REST API

#### Setup and Initialization:

- Created a Node.js server with express framework handling basic CRUD operations for books.
- Data is stored and retrieved in-memory for the sake of simplicity and to focus on the API performance.

#### Performance Testing with ApacheBench:

- Used ApacheBench to send a large number of requests to the REST server and recorded metrics like average response time, throughput, and error rate.
- Initial tests were conducted with a small dataset to ensure functionality before scaling up the load.

#### Transition to Apache JMeter:

- Moved to Apache JMeter for more extensive testing capabilities, including concurrent user handling and detailed reporting.
- Configured JMeter to test the same endpoints, ensuring consistency in comparison.

### gRPC API

#### Setup and Initialization:

- Implemented a gRPC server in Node.js using the same logical structure as the REST server for comparative purposes.
- The .proto files define the structure and service contracts for the gRPC implementation.

#### Performance Testing with ghz:

- Used ghz tool to benchmark the gRPC server, focusing on similar metrics to the REST API for a fair comparison.
- Initial tests focused on functionality with incremental load increases to monitor performance changes.

#### Transition to Apache JMeter:

- Configured Apache JMeter with the gRPC Request sampler for a comprehensive set of tests.
- Ensured that the test setup mirrored the REST API tests as closely as possible for accurate comparisons.

## Comparative Analysis

- The testing revealed that while both APIs perform well under low concurrency, gRPC generally offers lower latency and higher throughput as the load increases.
- The REST API showed higher error rates under extreme load, possibly due to the more verbose nature of HTTP and JSON.
- It's noted that the gRPC's performance advantage becomes more pronounced in network-constrained environments due to its efficient binary serialization.

## Replicating the Process

### Environment Setup:

- Ensure Node.js is installed.
- Install necessary NPM packages for both REST and gRPC servers.
- Install ApacheBench, ghz, and Apache JMeter on your system.

### Running the Servers:

- For REST: Navigate to the REST directory and run `node restServer.js`.
- For gRPC: Navigate to the gRPC directory and run `node grpcServer.js`.

### Executing Tests:

- For ApacheBench: Use `ab -n 1000 -c 10 http://localhost:3000/books` to send requests to the REST server.
- For ghz: Use `ghz --call=book.BookService/ListBooks --total=1000 --concurrency=10 localhost:50051` for the gRPC server.
- For JMeter: Configure test plans for both REST and gRPC APIs, ensuring similar conditions and load parameters.

### Analyzing Results:

- Review the output from each tool for metrics like response time, throughput, and error rates.
- Use JMeter's reporting capabilities for a more in-depth analysis and comparison.

## Conclusions

- The project successfully demonstrated the use of various tools to benchmark REST and gRPC APIs, showing the strengths and weaknesses of each approach.
- gRPC's performance, especially in high-load scenarios, suggests it's a robust choice for efficient, high-performance microservices communication.
- The flexibility and ease of use of REST make it continue to be a viable and popular choice for many API implementations, especially when developer familiarity and tooling are considered.

## Future Work

- Expand tests to include more complex scenarios and different data types.
- Explore performance in distributed and cloud environments.
- Investigate the impact of security measures like SSL/TLS on performance.

## How to Contribute

For contributions or suggestions, please open an issue or pull request in the GitHub repository.
