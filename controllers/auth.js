const models = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) =>{
  try{
    //get params
    const {email, encryptedPassword} = req.body

    //validate params
    if(!email || !encryptedPassword){
      return res.status (400).json({
        message: 'Login Error',
        error: 'All input is required'
      })
    }

    const user = await models.Users.findOne({
      where:{
        email:email
      }
    })

    //validate user
    if(!user){
      console.log('no encuentra el usuario', user, 'email', email)
      return res.status(400).json({
        message: 'Login error',
        error: 'User or password invalid'
      })
    }

    //Comnpare password
    const passwordIsValid = bcrypt.compareSync( encryptedPassword, user.encryptedPassword );

    if(!passwordIsValid){
      return res.status(400).json({
        message: 'Login error',
        error: 'User or passwordd invalid'
      });
    }
    
    //generate token
    const token = jwt.sign(
      {
        id:user.id
      }, 
      process.env.SECRET_KEY, 
      {
        expiresIn: '5h'
      }
    );

    return res.status(200).json({
      message: 'Authenticated',
      accessToken: token
    })

  }catch(err){
    return res.status(500).json({
      message:'Bad  Request',
      error: err.message
    })
  }
}

const renew = async(req, res)=>{
  try{
    const uid= req.me;

    const user = await models.Users.findByPk(uid);

    const token = jwt.sign(
      {
        id:user.id
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '5h'
      }
    ) 

    return res.status(200).json({
      token:token,
      user: user
    })
  }catch(err){
    return res.status(500).json({
      message: 'Bad Request',
      error: err.message
    })
  }
}

module.exports = {login, renew};
