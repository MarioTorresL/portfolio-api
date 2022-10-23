const models = require('../database/models');

const getComments = async (req, res) =>{
  try{
    //all comments
    const comments = await models.Comments.findAll({
      include:[{
        model:models.Users,
        attributes: ['email', 'userName']
      }],
      order: [
            ['createdAt', 'DESC'],
        ]
    });

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
    const userId = req.params.userId;

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
    const { comment } = req.body;
    const userId = req.me

    const user = await models.Users.findByPk(userId)
    if(!user){
      return res.status(404).json({
        message: 'User not found'
      })
    }

    //create comment
    const createComment = await models.Comments.create({comment, UserId:userId});

    return res.status(201).json({
      message: 'Comment created',
      data: createComment
    });
  }catch(err){
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
    const userId = req.me

    const commentPost = await models.Comments.findByPk(req.params.id) 

    //validate if comment exist
    if(!commentPost){
      return res.status(404).json({
        message: 'Comment not found'
      })
    }

    if(commentPost.UserId !== userId){
      return res.status(400).json({
        message: 'Unauthorized',
        error: 'Users not match'
      })
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
