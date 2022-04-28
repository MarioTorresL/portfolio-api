const express = require('express');

const app = express()
const server = require('http').Server(app);
const cors = require('cors')
var corsOptions = {
  origin: "http://localhost:4200"
};

//body-parser
app.use(express.json());
//cors
app.use(cors(corsOptions));

module.exports= server;