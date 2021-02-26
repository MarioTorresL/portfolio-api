const _ = require ('lodash');
const router = require('express').Router();
const models = require('../db/models');
const {NotFound, CommentsCreateError} = require('../api/errors');

router.get('/', async(req, res)=>{
  try{
    const records = await models.Comment.findAll(
      {
        paranoid:false
      });
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
      },
      paranoid: false
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

    const data = _.pick(req.body,[
      "title",
      "comment",
      "UserId"
    ])

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

      const comments = await models.Comment.create(data);
      const getComment = await models.Comment.findONe({
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

    if(data){

      const comment = await models.Comment.findOne({
        where:{id:id}
      })
      if(comment){

        const updateComment = await models.Comment.update(data,{
          where:{
            id:comment.id
          },
          paranoid:false
        })
        if(updateComment){
          const commentUpdate = await models.Comment.findOne({
            where:{
              id:comment.id
            },
            paranoid:false
          })
          res.status(200).json(commentUpdate)
        }else{
          res.status(404).error(new NotFound('Not found'))
        }
      }

    }else{
      res.status(400).error(new CommentsCreateError('No data given'))
    }
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
    const comment = await models.Comment.findOne({
      where:{
        id:req.params.id
      }
    })
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
