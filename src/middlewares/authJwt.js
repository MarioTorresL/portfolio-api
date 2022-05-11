const jwt = require("jsonwebtoken");
const config = require("../../config.json")

verifyToken = async (req, res, next)=>{
  try{

    let token = req.headers["x-access-token"];

    if(!token){
      return res.status(403).send({message:"No token provided!"});
    }

    jwt.verify(token, config.SECRET_KEY, (err, decoded) =>{
      if(err){
        return res.status(401).send({message:"Unauthorized"})
      }
      req.userId = decoded.id;
    })

  }catch(e){
    res.status(400).error(e)
  }
}

module.exports = authJwt={verifyToken};