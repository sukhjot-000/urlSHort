const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.route('/createUser').post(userController.createUser);
router.route('/getUser').post(userController.getUser);
router.route('/getUrls').post(userController.getUrls);
module.exports = router;

