const _ = require ('lodash');
const { UserCreateError, NotFound } = require('../api/errors');
const router = require('express').Router();
const models = require('../db/models');
const bcrypt = require('bcrypt');

router.get('/', async(req, res) =>{
  try{
    records = await models.User.findAll();
    res.status(200).send(records)
  }catch(e){
    res.status(400).error(e)
  }
})

router.get('/:id', async(req, res) =>{
  try{
    record = await models.User.findOne({
      where:{
        id:req.params.id
      }
    })

    if(record){
      res.status(200).send(record.toJSON());
    }else{
      res.status(404).error(new NotFound('User not found'))
    }
  }catch(e){
    res.status(400).error(e);
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
      res.status(201).json(record);
    }
  }catch(e){
    res.status(400).error(e)
  }
})

router.put('/:id', async(req, res) => {
  try{
      const data = _.pick(req.body, ['firstName', 'surname', 'email'])
      if(Object.entries(data).length==0){
        res.status(400).error(new UserCreateError('No data given'))
      }else{
        const user = await models.User.findByPk(req.params.id)
        if(!user){
          res.status(404).error(new NotFound('User not found'))
        }else{
          const updatepositions = await user.update(data)
          res.json(updatepositions);
        }
      }

  }catch(e){
    res.status(400).error(e)
  }
})


router.delete('/:id', async(req,res) =>{
  try{
    const userId = req.params.id
    const user = await models.User.findOne({
      where:{
        id:userId
      }
    })
    if(user){
      await user.destroy();
      return res.status(204).json()
    }else{
      return res.status(404).error(new NotFound('user not found'))
    }
  }catch(e){

  }
})

module.exports = router;