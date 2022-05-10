const models = require("../db/models")

checkDiplicateUserOrEmail = async (req, res, next) =>{
  try{
    //Username
    userName = await models.User.findOne({
      where:{
        username: req.body.username
      }
    });

    if(userName){
      res.status(400).send({message:'Username is already in use!'})
    }

    //Email
    email = await models.User.findOne({
      where:{
        emial: req.body.email
      }
    })

    if(email){
res.status(400).send({message:'Email is already in use!'})
    }

  }catch(e){
    res.status(400).error(e)
  }
}

module.exports = verufySingUp;