const express = require('express');
const router = express.Router();
const menuController = require('../controller/menuController');

router.post('/api/create-menu', async (req, res) => {
    if (req.method === 'POST') {
      try {
        await menuController.addMenu(req, res);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
  
  router.post('/api/create-menu-item', async (req, res) => {
    if (req.method === 'POST') {
      try {
        await menuController.addMenuItem(req, res);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
  
  router.get('/api/get-items', async (req, res) => {
    if (req.method === 'GET') {
      try {
        await menuController.getMenuItems(req, res);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
  
  router.get('/api/get-menu', async (req, res) => {
    if (req.method === 'GET') {
      try {
        await menuController.getMenu(req, res);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });


module.exports = router