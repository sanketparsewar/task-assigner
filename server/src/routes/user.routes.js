const express = require('express');
const router = express.Router();
const { adminRegister,workerRegister, adminLogin,workerLogin, getAllAdmins, getUserById, updateUser, deleteUser, getAllWorkers } = require('../controllers/user.controller');

const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.post('/adminregister', adminRegister);
router.post('/adminlogin', adminLogin);
router.post('/workerregister', workerRegister);
router.post('/workerlogin', workerLogin);

router.get('/', authenticateToken, authorizeRoles('admin'), getAllAdmins);
router.get('/worker', getAllWorkers);
router.get('/:id', authenticateToken, authorizeRoles('admin', 'worker'), getUserById);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'worker'), updateUser);
router.delete('/:id', deleteUser);
module.exports = router;
