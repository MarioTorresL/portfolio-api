const router = require('express').Router();
const {check} = require('express-validator');

const {verifyToken} = require('../middlewares/validateJwt');
const {validateParams} = require('../middlewares/validateParams');

const {getComments, getUserComments, postComment, putComment, deleteComment} = require('../controllers/comment');

//=== /api/comments ===

router.get('/', getComments);

router.get('/:userId', getUserComments);

router.post('/', 
  [
    check('comment', 'comment is required').not().isEmpty(),
    validateParams
  ],
  verifyToken, 
  postComment);

router.put('/:id',
  [
    check('comment', 'comment is required').not().isEmpty(),
    validateParams
  ],
  verifyToken, putComment);

router.delete('/:id', verifyToken, deleteComment);

module.exports = router;
