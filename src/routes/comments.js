const router = require('express').Router();

const {verifyToken} = require('../middlewares/validateJwt');

const {getComments, getUserComments, postComment, putComment, deleteComment} = require('../controllers/comment');

//=== /api/comments ===

router.get('/', getComments);
router.get('/:userId', verifyToken, getUserComments);
router.post('/', verifyToken, postComment);
router.put('/:id', verifyToken, putComment);
router.delete(':id', verifyToken, deleteComment);

module.exports = router;
