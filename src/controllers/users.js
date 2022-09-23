const models = require('../db/models');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const getUsers = async(req, res) =>{
  try{
    const users = await models.Users.findAll();

    return res.status(200).json({
      message:'get all users',
      data: users
    })
  }catch(err){
    return res.status(500).json({
      message:'Bad Request',
      error: err
    })
  }
}

const postUser = async (req, res) =>{
  try{
    //get params
    const {firstName, lastName, userName, encryptedPassword, email} = req.body;

    const verifyEmail = await models.Users.findOne({
      where:{
        email: email
      }
    })
    if(verifyEmail){
      return res.status(400).json({
        message:'Email is registered'
      })
    }

    const verifyUserName = await models.Users.findOne({
      where:{
        userName: userName
      }
    })

    if(verifyUserName){
      return res.status(400).json({
        message:'nick is registered'
      })
    }

    const user = await models.Users.create({
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      encryptedPassword: bcrypt.hashSync(encryptedPassword, 8),
      email:email.toLowerCase()
    })

    const token = jwt.sign(
      {
        id:user.id
      },
      process.env.SECRET_KEY,
      {
        expiresIn:'5h'
      }
    )

    return res.status(200).json({
      message:"User Created",
      token:token
    })

  }catch(err){
    console.log(err)
    return res.status(500).json({
      message:'Bad Request',
      error:err
    })
  }
}

const putUser = async (req, res)=>{
  try{
    const id = req.params.id;
    const {firstName, lastName, userName} = req.body;
    
    const user = await models.Users.findByPk(id);
    
    if(!user){
      return res.status(404).json({
        message:'User not found'
      })
    }
    
    if(userName){
      const verifyUserName = await models.Users.findOne({
        where:{userName}
      })

      if(verifyUserName){
        return res.status(400).json({
          message:'User Name already exist'
        })
      }
    }


    await user.update({firstName, lastName, userName});

    return res.status(200).json({
      message:'User Updated',
      data: {firstName, lastName, userName}
    })

  }catch(err){
    return res.status(500).json({
      message:'Bad Request',
      error: err
    })
  }
}

const deleteUser = async (req, res)=>{
  try{
    const id = req.params.id;

    const user = await models.Users.findByPk(id);

    if(!user){
      return res.status(404).json({
        message:'User not found'
      })
    }

    await user.destroy();

    return res.status(208).json({
      message:'User removed'
    })
  }catch(err){
    return res.status(500).json({
      message:'Bad Request',
      error: err
    })
  }
}

module.exports = {getUsers, postUser, putUser, deleteUser};
