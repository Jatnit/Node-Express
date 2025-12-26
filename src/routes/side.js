const express = require('express');
const router = express.Router();
const sideController = require('../app/controllers/SideController');



router.get('/search', sideController.search);
router.post('/search', sideController.search);
router.get('/home', sideController.home);
router.get('/', sideController.home);


module.exports = router;
