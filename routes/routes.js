const express = require('express');
const router = express.Router();
const itemController = require('../controllers/controller')


router.post('/maketable', itemController.setupTable)
router.post('/observations', itemController.addObs);
router.get('/observations', itemController.sendAll);
router.get('/locTest', itemController.arrayTest);


module.exports = router;