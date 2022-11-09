const jwt = require("jsonwebtoken");

const models = require('../database/models');

const verifyToken = (req, res, next)=>{
  if( !req.headers['authorization'] ){
    return res.status(401).json({
      message:'Authorization header not present',
      error: 'Authorization'
    });
  }

  const authorizationHeader = req.headers['authorization'];
  const [type, accessToken] = authorizationHeader.split(' ');

  if( type !== 'Bearer' ){
    return res.status(401).json({
      message:'Wrong Authorization header type given',
      error: 'Authorization'
    });
  }

  if( !accessToken ){
    return res.status(401).json({
      message:'Access token not present',
      error: 'Authorization'
    })
  }

  try{
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.me = decoded.id;

  }catch(e){
    return res.status(401).json({
      message: 'Invalid Token',
      error: 'Authorization'
    })
  }

  return next();
}


const isAdmin = async (req, res, next)=>{
  try{
    const uid = req.me;

    const user = await models.Users.findByPk(uid);
    if(user.RoleId !== 2){
      return res.status(403).json({
        message: 'No privileges'
      })
    }

    next();
  }catch(err){
    return res.status(500).json({
      message: 'Bad Request',
      error: err.message
    })
  }
}

module.exports = {verifyToken, isAdmin};
