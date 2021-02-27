const _ = require('lodash');
const router = require('express').Router();
const config = require('../../config');
const models = require('../db/models');
const {InvalidRequest, InvalidUsernameOrPassword} = require('../api/errors');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const utils = require('../utils');

router.post('/', async(req, res) =>{
  try{
    const authorizationHeader = req.headers['authorization'];

    if(!authorizationHeader){
      return res.status(401).error(new InvalidRequest('No authorization header provided'))
    }

    // TODO: Validate more stuff!!!
    const [type, accessToken] = authorizationHeader.split(' ');
    data = Buffer.from(accessToken, 'base64').toString();
    const [email, pass] = data.split(':');
    if(!email || !pass){
      return res.status(401).error(new InvalidUsernameOrPassword('Correo o contraseña faltante'))
    }
    
    const record = await models.User.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('email')),
        email.toString().trim().toLowerCase()
      )
    });
    console.log('Valida si existe el usuario', JSON.stringify(record, null, 2))

    if(!record){
      res.status(401).error(new InvalidUsernameOrPassword('Correo o contraseña incorrectos'))
    }else{
      // Load hash from your password DB.
      const hash = bcrypt.compareSync(pass, record.encryptedPassword,);
      // const hash = await bcrypt.compare(pass, record.encryptedPassword, function (err, result){
      //   return result
      // });
      console.log('hash', hash)
      if( hash == true){
        const session = await models.SessionsLogs.create({
          UserId: record.id,
          operation: "Login"
        })
        console.log('session', session)
        return res.status(201).json({
          accessToken: utils.generateJWT(record, session)
        });
      }else{
        res.status(401).error(new InvalidUsernameOrPassword('Correo o contraseña incorrectos'))
      }
    }

  }catch(e){
    if (e.name === 'SequelizeUniqueConstraintError') {
      res.error(new CommentsCreateError(e.message))
    } else {
      res.status(401).error(e);
    } 
  }
})

module.exports = router;