
const app = require ('./src/index.js');

const {PORT} = require('./config.json');

const port = process.env.DB_PORT || PORT

app.listen(port, () =>{
  console.log(`App listening at http://localhost:${port}`)
})