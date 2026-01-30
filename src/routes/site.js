const express = require('express');
const router = express.Router();
const siteController = require('../controllers/SiteController');

router.get('/search', siteController.search);
router.post('/search', siteController.search);
router.get('/home', siteController.home);
router.get('/', siteController.home);

module.exports = router;
