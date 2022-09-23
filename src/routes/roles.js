const router = require('express').Router();

const { getRoles, postRoles, deleteRoles } = require('../controllers/roles');
// === /api/roles ===
//
router.get('/', getRoles);

router.post('/', postRoles);

router.delete('/:id', deleteRoles);

module.exports = router;
