//index.js
const http = require('http');
const express = require('express');
const dotenv = require('dotenv').config();
const {connectDB} = require('./config/db');
const {errorHandler} = require('./middleware/errorMiddleware');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, Elena!\n');
});

const port = process.env.PORT || 3000;
connectDB();
const app = express();
app.use(express.json);
app.use(express.urlencoded({extended: false}))

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
