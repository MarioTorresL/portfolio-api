const router = require('express').Router();

const {getUsers, postUser, putUser, deleteUser } = require('../controllers/users');
//=== /api/comments ===

router.get('/', getUsers);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

module.exports = router;
