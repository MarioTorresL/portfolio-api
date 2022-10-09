const router = require('express').Router();

const { verifyToken, isAdmin } = require('../middlewares/validateJwt')

const { getRoles, postRoles, deleteRoles } = require('../controllers/roles');
// === /api/roles ===
//
router.get('/', verifyToken, isAdmin, getRoles);

router.post('/', verifyToken, isAdmin, postRoles);

router.delete('/:id', verifyToken, isAdmin, deleteRoles);

module.exports = router;
