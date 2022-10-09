const { validationResult } = require('express-validator');

const validateParams = (req, res, next) =>{
  
  const errors = validationResult( req ); //check errors

  if(!errors.isEmpty()){

    return res.status(400).json({errors: errors.mapped()})
  }
  next();
}

module.exports = {validateParams}
