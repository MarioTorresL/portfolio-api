const router = require('express').Router();
const { check } = require('express-validator');

const { validateParams } = require('../middlewares/validateParams');
const { verifyToken } = require('../middlewares/validateJwt')

const {getUsers, postUser, putUser, deleteUser } = require('../controllers/users');
//=== /api/comments ===

router.get('/', verifyToken, getUsers);

router.post('/', 
  [
    check('firstName', 'first name is required').not().isEmpty(),
    check('lastName', 'last name is required').not().isEmpty(),
    check('userName', 'username is required').not().isEmpty(),
    check('encryptedPassword', 'password is required minum 6 characters').not().isEmpty().isLength({min: 6}),
    check('email', 'email is required').not().isEmpty().isEmail().normalizeEmail(),
  ],
  validateParams,
  postUser);

router.put('/:id', putUser);

router.delete('/:id', deleteUser);

module.exports = router;
