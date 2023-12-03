const express = require('express');
const router = express.Router();
const itemController = require('../controllers/controller')


router.post('/observations', itemController.addObs);
router.post('/maketable', itemController.setupTable);
router.post('/deleteZeros', itemController.deleteZeroVerificationRating);
router.get('/observations', itemController.sendAll);
router.get('/locTest', itemController.arrayTest);


module.exports = router;