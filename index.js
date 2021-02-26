
const _ = require('lodash')
const config = require('./config.js')
const app = require('./src/index.js')

app.listen(config.PORT, config.HOST, () => {
  config.log.info('Listening on http://%s:%s', config.HOST, config.PORT)
  config.log.info('Configuration set to %s', JSON.stringify(_.omit(config, ['log'])) )
});
