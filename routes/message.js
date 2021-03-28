const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message');

// Router qui renvoi vers les méthodes du controller
router.get('/', messageController.getAll);
router.get('/message/:id', messageController.getOne);
router.post('/', messageController.createMessage);

module.exports = router;