const app = require('./src/index.js');
require ('dotenv').config()

const port = process.env.PORT || 3000;

app.listen(port , () =>{
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})
