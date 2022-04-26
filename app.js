
const app = require ('./src/index.js');

const {port} = require('./config.json');

app.listen(port, () =>{
  console.log(`App listening at http://localhost:${port}`)
})