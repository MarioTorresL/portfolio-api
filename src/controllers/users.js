const _ = require ('lodash');
const { UserCreateError } = require('../api/errors');
const router = require('express').Router();
const models = require('../db/models');
const bcrypt = require('bcrypt');

router.get('/', async(req, res) =>{
  try{
    record = models.User.findAll({paranoid:false});
    console.log(record)
  }catch{
    res.status(400).error(e)
  }
})

router.post('/', async(req, res) =>{
  try{
    const data = _.pick(req.body,[
      'firstName', 'surname', 'email', 'encryptedPassword', 'image'
    ])

    if(_.isEmpty(data)){
      return res.error(new UserCreateError("No data given"))
    }else{
      if (!data.firstName) {
        return res.error(new UserCreateError("Name is required"));
      } else {
        data.firstName = _.trim(data.firstName);
      }
  
      if (!data.surname) {
        return res.error(new UserCreateError("surname is required"));
      } else {
        data.surname = _.trim(data.surname);
      }
      
      if (!data.email) {
        return res.error(new UserCreateError("email is required"));
      } else {
        data.email = _.trim(data.email);
      }
      if (!data.encryptedPassword) {
        return res.error(new UserCreateError("Password is required"));
      }

      const hash = bcrypt.hashSync(data.encryptedPassword, 10);

      const record = await models.User.create({
        firstName: data.firstName,
        surname: data.surname,
        email: data.email,
        role: 1,
        encryptedPassword:hash,
        image: null
      })
      res.status(200).json(record);
    }
  }catch(e){
    res.status(400).error(e)
  }
})

module.exports = router;