const express = require('express');
const router = express.Router();
const menuController = require('../controller/menuController');

router.post('/api/create-menu',menuController.addMenu);
router.post('/api/create-menu-item',menuController.addMenuItem);
router.get('/api/get-items',menuController.getMenuItems);
router.get('/api/get-menu',menuController.getMenu)

module.exports = router