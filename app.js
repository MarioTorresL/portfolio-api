
const app = require ('./src/index.js');

const {PORT} = require('./config.json');

app.listen(PORT, () =>{
  console.log(`App listening at http://localhost:${PORT}`)
})