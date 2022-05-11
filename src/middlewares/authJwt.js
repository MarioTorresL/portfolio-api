const jwt = require("jsonwebtoken");
const config = require("../../config.json")

const verifyToken = (req, res, next)=>{
  console.log('hello?')
  if( !req.headers['authorization'] ){
    return res.status(401).send('Authorization header not present');
  }

  const authorizationHeader = req.headers['authorization'];
  const [type, accessToken] = authorizationHeader.split(' ');

  if( type !== 'Bearer' ){
    return res.status(401).send('Wrong Authorization header type given');
  }

  if( !accessToken ){
    return res.status(401).send('Access token not present')
  }

  try{
    const decoded = jwt.verify(accessToken, config.SECRET_KEY);
    req.userId = decoded.id;
  }catch(e){
    return res.status(401).send('InvalidToken')
  }
  return next();
}

module.exports = verifyToken;