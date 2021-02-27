const jwt    = require('jsonwebtoken');
const config = require('../config')

module.exports.generateJWT = (user,SessionsLogs) => {
  let data = {
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    },
    session:{
      id:SessionsLogs.id
    }
  };
  console.log('data, config', data, config.JWT_SECRET)
  return jwt.sign(data, config.JWT_SECRET);
}