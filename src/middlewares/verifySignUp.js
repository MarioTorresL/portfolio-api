const models = require("../db/models")

checkDiplicateUserOrEmail = async (req, res, next) =>{
    //Username
    const userName = await models.User.findOne({
      where:{
        userName: req.body.userName
      }
    });
    console.log('username', userName)
    if(userName){
      res.status(400).send({message:'Username is already in use!'})
      return;
    }

    //Email
    const email = await models.User.findOne({
      where:{
        email: req.body.email
      }
    })

    if(email){
      res.status(400).send({message:'Email is already in use!'})
      return
    }
    console.log('pasa todo')
    next();
}

module.exports = verufySingUp= {checkDiplicateUserOrEmail} ;