const express = require('express');
const cors = require('cors');
require ('dotenv').config()
const port = process.env.PORT || 3000;

//create Express
const app = express();

//cors
app.use(cors('*'));
//parse request of content-type - applicatioon/json
app.use(express.json());

//=======routes========
app.use('/api/auth', require('./routes/auth'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/users',require('./routes/users'));
app.use('/api/roles', require('./routes/roles'));

app.get('/', (req, res) => res.status(200).json("El servidor Funciona!"));

app.listen(port , () =>{
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})
module.exports = app;
