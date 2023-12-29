#!/bin/bash
ab -n 1000 -c 10 http://localhost:3000/books > ab_output.txt
