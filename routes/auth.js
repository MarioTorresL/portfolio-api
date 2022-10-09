const router = require('express').Router();

const { login } = require('../controllers/auth');

//=== /api/auth ===

router.post('/login', login);

module.exports = router;
