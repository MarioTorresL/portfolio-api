const models = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) =>{
  try{
    //get params
    const {userName, encryptedPassword} = req.body

    //validate params
    if(!(userName && encryptedPassword)){
      res.status (400).send("All input is required")
    }

    const user = await models.Users.findOne({
      where:{
        userName: userName
      }
    })

    //validate user
    if(!user){
      return res.status(404).send({message: "User not found"})
    }

    //Comnpare password
    const passwordIsValid = bcrypt.compareSync( encryptedPassword, user.encryptedPassword );

    if(!passwordIsValid){
      return res.status(401).send({message:"Invalid Password"});
    }

    const token = jwt.sign(
      {
        id:user.id
      }, 
      process.env.SECRET_KEY, 
      {
        expiresIn: '5h'
      }
    );

    res.status(200).send({
      id: user.id,
      userName: user.userName,
      email: user.email,
      accessToken: token
    })
  }catch(e){
    res.status(500).send(e)
  }
}

module.exports = {login};
