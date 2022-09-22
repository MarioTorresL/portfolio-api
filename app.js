const app = require('./src/index.js');
require ('dotenv').config()

app.listen(process.env.PORT, () =>{
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})
