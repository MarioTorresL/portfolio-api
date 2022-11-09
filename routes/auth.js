const router = require('express').Router();
const {check} = require('express-validator')

const {validateParams} = require('../middlewares/validateParams');
const { verifyToken } = require('../middlewares/validateJwt');

const { login, renew } = require('../controllers/auth');

//=== /api/auth ===

router.post('/login',
  [
    check('email', 'email is required').not().isEmpty().isEmail(),
    check('encryptedPassword', 'password is required').not().isEmpty(),
    validateParams
  ], login);

router.get('/renew', verifyToken, renew);

module.exports = router;
