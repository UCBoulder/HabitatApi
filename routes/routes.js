const express = require('express');
const router = express.Router();
const itemController = require('../controllers/controller')


router.post('/', itemController.create);
router.get('/', itemController.sendAll);
router.get('/locTest', itemController.arrayTest);

module.exports = router;