const express = require('express');

const app = express()
const server = require('http').Server(app);
const cors = require('cors')
var corsOptions = {
  origin: "http://localhost:4200"
};

const verifyToken = require("./middlewares/authJwt")

//cors
app.use(cors(corsOptions));
//parse request of content-type - applicatioon/json
app.use(express.json());
//parse request of content-type - application/x-ww-from-urlencoded
app.use(express.urlencoded({extended:true}))

app.use('/auth', require('./controllers/auth'));
app.use('/comments',require('./controllers/comment'));
app.get('/', [verifyToken],(req, res) => res.status(200).json("El servidor Funciona!"));
module.exports= server;