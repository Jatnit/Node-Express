const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CourseController');
const authMiddleware = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

// Public routes (không cần đăng nhập)
router.get('/', courseController.index);
router.get('/:id', courseController.show);

// Protected routes (cần đăng nhập - user hoặc admin)
router.post('/', authMiddleware, authorize(['user', 'admin']), courseController.store);
router.put('/:id', authMiddleware, authorize(['user', 'admin']), courseController.update);
router.delete('/:id', authMiddleware, authorize(['user', 'admin']), courseController.destroy);

module.exports = router;