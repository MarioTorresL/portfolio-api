const { validationResult } = require('express-validator');

const validateParams = (req, res, next) =>{
  
  const errors = validationResult( req ); //check errors

  if(!errors.isEmpty()){
  let msg = errors.errors[0].msg;
    return res.status(400).json({errors:msg})
  }
  next();
}

module.exports = {validateParams}
