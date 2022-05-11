const router = require('express').Router();
const models = require("../db/models");
const config = require("../../config.json")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {verufySingUp} = require("../middlewares")

router.post('/singup' ,[ verufySingUp.checkDiplicateUserOrEmail],async(req, res)=>{
  try{
    // if(!res.header["Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept"]){
    //   return res.status(401).send('Authorization header not present');
    // }
    //get params
    console.log('ENTRAAAAAAA')
    const {firstName, lastName, userName, encryptedPassword, email} = req.body;
    
    //validate params
    if(!(firstName && lastName && userName && encryptedPassword && email)){
      res.status (400).send("All input is required")
    }
    
    //Save user to db
    const user = await models.User.create({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      encryptedPassword: bcrypt.hashSync(encryptedPassword, 8),
      email: email,

    })

    res.status(200).json(user)
  }catch(e){
    res.status(500).send(e)
  }
})

router.post('/singin', async (req, res) =>{
  try{
    if(!res.header["Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept"]){
      return res.status(401).send('Authorization header not present');
    }
    //get params
    const {userName, encryptedPassword} = req.body

    //validate params
    if(!(userName && encryptedPassword)){
      res.status (400).send("All input is required")
    }

    const user = await models.User.findOne({
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

    const token = jwt.sign({id:user.id}, config.SECRET_KEY, {expiresIn: 86400}); //24 hours token valid

    res.status(200).send({
      id: user.id,
      userName: user.userName,
      email: user.email,
      accessToken: token
    })
  }catch(e){
    res.status(500).send(e)
  }
})

module.exports = router;