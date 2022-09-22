const express = require('express');
const cors = require('cors');

//create Express
const app = express();

//cors
app.use(cors());
//parse request of content-type - applicatioon/json
app.use(express.json());

//=======routes========
app.use('/api/auth', require('./routes/auth'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/users',require('./routes/users'));

app.get('/api', (req, res) => res.status(200).json("El servidor Funciona!"));
module.exports = app;
