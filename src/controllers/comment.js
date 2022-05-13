const router = require('express').Router();
const mnodels = require('../db/models');

router.get('/', async (req, res) =>{
  try{
    //all comments
    const comments = await mnodels.Commets.findAll();

    res.status(200).send(comments)
  }catch(e){
    res.status(400).send(e);
  }
});

router.post('/', async (req,res)=>{
  try{
    //Get Params
    const { comment, UserId } = req.body;

    //Validate Params
    if(!(comment && UserId)){
      res.status (400).send("All input is required");
    }

    const user = await mnodels.Users.findByPk(UserId)
    if(!user){
      return res.status(400).send('User not found')
    }

    //create comment
    const commentPost = await mnodels.Comments.create({comment, UserId});
    
    res.json(commentPost.toJSON());
  }catch(e){
    res.status(400).send(e)
  }
});

module.exports = router;