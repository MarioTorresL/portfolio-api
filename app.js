const app = require('./src/index.js');
require ('dotenv').config()

if(!process.env.NODE_ENV){
  app.listen(process.env.PORT, () =>{
    console.log(`App listening at http://localhost:${process.env.PORT}`)
  })
}else{
  app.get('/api', (req, res) => res.status(200).json("El servidor Funciona!"));
}
