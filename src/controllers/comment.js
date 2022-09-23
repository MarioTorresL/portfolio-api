const models = require('../database/models');

const getComments = async (req, res) =>{
  try{
    //all comments
    const comments = await models.Comments.findAll();

    return res.status(200).json({
      message: 'Get All Comments', 
      data:comments
    });
  }catch(err){
    return res.status(500).json({
      message:'Bad Request',
      error: err.message
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
      error: err.message
    });
  }
};

const postComment =  async (req,res)=>{
  try{
    //Get Params
    const { comment, UserId } = req.body;

    const user = await models.Users.findByPk(UserId)
    if(!user){
      return res.status(404).json({
        message: 'User not found'
      })
    }

    //create comment
    const createComment = await models.Comments.create({comment, UserId});
    
    return res.status(201).json({
      message: 'Comment created',
      data: createComment
    });
  }catch(e){
    return res.status(500).json({
      message:'Bad Request',
      error: err.message
    });
  }
};

const putComment =  async (req,res) =>{
  try{
  //Get params
  const {comment} = req.body;

  const commentPost = await models.Comments.findByPk(req.params.id) 
  
  //validate if comment exist
  if(!commentPost){
    return res.status(404).send('Comment not found')
  }

  //update
  const updateComment = await commentPost.update({comment});

    return res.status(200).json({
      message: 'Comment updated',
      data: updateComment
    });
}catch(e){
    return res.status(500).json({
      message:'Bad Request',
      error: err.message
    });
  }
};

const deleteComment =  async(req, res) =>{
  try{
    const comment = await models.Comments.findByPk(req.params.id);

    //Validate if comment exist
    if(!comment){
      return res.status(404).json({
        message: 'Comment not found'
      })
    }
    //Destroy comment
    await comment.destroy();

    return res.status(200).json({
      message: 'Comment deleted'
    })
  }catch(e){
    return res.status(500).json({
      message:'Bad Request',
      error: err.message
    });
  }
}

module.exports = {getComments, getUserComments, postComment, putComment, deleteComment};
