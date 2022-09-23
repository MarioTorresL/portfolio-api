const jwt = require("jsonwebtoken");

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
    req.userId = decoded.id;

  }catch(e){
    return res.status(401).json({
      message: 'Invalid Token',
      error: 'Authorization'
    })
  }

  return next();
}

module.exports = {verifyToken};
