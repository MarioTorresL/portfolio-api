const _ = require ('lodash');
const router = require('express').Router();
const models = require('../db/models');
const {NotFound, CommentsCreateError} = require('../api/errors');

router.get('/', async(req, res)=>{
  try{
    const records = await models.Comment.findAll();
      res.status(200).json(records)
  }catch(e){
    res.status(400).error(e)
  }
})

router.get('/:id', async(req, res) =>{
  try{

    const record = await models.Comment.findOne({
      where:{
        id:req.params.id
      }
    })

    if(record){
      res.status(200).json(record)
    }else{
      res.status(404).error(new NotFound('Comment not found'))
    }

  }catch(e){
    res.status(400).error(e)
  }
})

router.post('/', async(req, res) =>{
  try{

    const data = _.pick(req.body,['title', 'comment', 'UserId'])

    const user = await models.User.findOne({
      where:{
        id:data.UserId
      }
    })

    if(data){

      if(!data.title){
        return res.status(400).error(new CommentsCreateError('title is required'))
      }
      if(!data.comment){
        return res.status(400).error(new CommentsCreateError('comment is required'))
      }
      if(!data.UserId){
        return res.status(400).error(new CommentsCreateError('UserId is required'))
      }
      if(!user){
        return res.status(400).error(new CommentsCreateError('invalid user'))
      }

      const comments = await models.Comment.create(data);

      const getComment = await models.Comment.findOne({
        where:{id:comments.id}
      });
      res.status(200).json(getComment.toJSON());

    }else{
      res.status(400).error(new CommentsCreateError('no data given'))
    }

  }catch(e){

    if (e.name === 'SequelizeUniqueConstraintError') {
      res.error(new CommentsCreateError(e.message))
    } else {
      res.status(401).error(e);
    } 

  }
})

router.put('/:id', async(req, res) =>{
  try{

    const commentId = req.params.id
    const data = _.pick(req.body,['title', 'comment'])

    if (!data){
      res.status(400).error(new CommentsCreateError('No data given'))
    }
    if(!data.title || !data.comment){
      res.status(400).error(new CommentsCreateError('Title or Commentis required'))
    }
    
    const comment = await models.Comment.findOne({
      where:{
        id:commentId
      }
    })

    if(!comment){
      res.status(400).error(new NotFound('Comment Not Found'))
    }
    const updateComment = await models.Comment.update(data,{
      where:{
        id:commentId
      }
    })
    const commentUpdate = await models.Comment.findOne({
      where:{
        id:commentId
      }
    })
    res.status(200).json(commentUpdate)
  }catch(e){
    if (e.name === 'SequelizeUniqueConstraintError') {
      res.error(new CommentsCreateError(e.message))
    } else {
      res.status(400).error(e);
    } 
  }
})

router.delete('/:id', async(req, res) =>{
  try{
    const commentId = req.params.id
    const comment = await models.Comment.findOne({
      where:{
        id:commentId
      }
    })
    console.log('comentario encontrado', comment)
    if(comment){
      await comment.destroy();
      return res.status(204).json('deleted')
    }else{
      return res.status(404).error(new CommentsCreateError('Not found'));
    }
  }catch(e){
    res.status(400).json({
      error: {
        type: 'Bad Request',
        message: 'Error'
      }
    })
  }
})

module.exports = router;
