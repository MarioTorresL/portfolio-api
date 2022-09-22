const models = require('../db/models');

const getComments = async (req, res) =>{
  try{
    //all comments
    const comments = await models.Comments.findAll();

    return res.status(200).json({
      message: 'Get All Comments', 
      data:comments
    });
  }catch(err){
    return res.status(400).json({
      message:'Bad Request',
      error: err
    });
  }
};

//get comments with userId
const getUserComments =  async(req, res)=>{
  try{
    const userId = req.pauthJwtarams.userId;

    const comments = await models.Comments.findAll({
      where:{
        UserId : userId
      }
    })

    if(!comments){
      return res.status(404).json({message:'User has no comments'})
    }

    return res.status(200).json({
      message:'get all user comments',
      data: comments
    })
  }catch(err){
    return res.status(500).json({
      message:'Bad Request',
      error: err
    });
  }
};

const postComment =  async (req,res)=>{
  try{
    //Get Params
    const { comment, UserId } = req.body;

    //Validate Params
    if(!(comment && UserId)){
      res.status (400).send("All input is required");
    }

    const user = await models.Users.findByPk(UserId)
    if(!user){
      return res.status(400).send('User not found')
    }

    //create comment
    const commentPost = await models.Comments.create({comment, UserId});
    
    res.json(commentPost.toJSON());
  }catch(e){
    res.status(400).send(e)
  }
};

const putComment =  async (req,res) =>{
  try{
  //Get params
  const {comment} = req.body;

  //Validate params
  if(!comment){
    return res.status(400).send('comment is required')
  }

  const commentPost = await models.Comments.findByPk(req.params.id) 
  
  //validate if comment exist
  if(!commentPost){
    return res.status(404).send('Comment not found')
  }

  //update
  const updateComment = await commentPost.update({comment});

  res.json(updateComment.toJSON());
}catch(e){

  }
};

const deleteComment =  async(req, res) =>{
  try{
  const comment = await models.Comments.findByPk(req.params.id);
  
  //Validate if comment exist
  if(!comment){
    return res.status(404).send('Comment not found')
  }
  //Destroy comment
  await comment.destroy();
  return res.status(204).json()
}catch(e){
    return res.status(400).send(e)
  }
}

module.exports = {getComments, getUserComments, postComment, putComment, deleteComment};
