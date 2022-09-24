const express = require('express');
const cors = require('cors');

//create Express
const app = express();

//cors
app.use(cors());
//parse request of content-type - applicatioon/json
app.use(express.json());

//=======routes========
app.use('/auth', require('./routes/auth'));
app.use('/comments', require('./routes/comments'));
app.use('/users',require('./routes/users'));
app.use('/roles', require('./routes/roles'));

app.get('/', (req, res) => res.status(200).json("El servidor Funciona!"));
module.exports = app;
