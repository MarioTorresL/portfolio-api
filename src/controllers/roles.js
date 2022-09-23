const models = require('../database/models');

const getRoles = async (req, res) =>{
  try{
  
    const roles = await models.Roles.findAll();

    return res.status(200).json({
      message: 'Get all roles',
      data: roles
    })
  }catch(err){
    return res.status(500).json({
      message: 'Bad request',
      error: err.message
    })
  }
};

const postRoles = async (req, res) =>{
  try{
    
    const name = req.body;
    
    const role = await models.Roles.findOne({where:{name:name}})

    if(role){
      return res.status(400).json({
        message: 'Role already exist'
      })
    }

    const createRole = await models.Roles.create({name});

    return res.status(201).json({
      message: 'Role Created',
      data: createRole
    })
  }catch(err){
    return res.status(500).json({
      message: 'Bad Request',
      error: err.message
    })
  }
}

const deleteRoles = async (req, res)=>{
  try{
    const role = await models.Roles.findByPk(req.params.id)

    if(!role){
      return res.status(404).json({
        message: 'Role not found'
      })
    }

    await role.destroy();

    return res.status(200).json({
      message: 'Role deleted'
    })
  }catch(err){
    return res.status(500).json({
      message:'Bad Request',
      error: err.message
    });
  }
}

module.exports = {getRoles, postRoles, deleteRoles}
