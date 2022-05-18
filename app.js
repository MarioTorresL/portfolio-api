
const app = require ('./src/index.js');

const {PORT} = require('./config.json');

app.listen(PORT, process.env.PORT, () =>{
  console.log(`App listening at http://localhost:${PORT}`, process.env.PORT)
})