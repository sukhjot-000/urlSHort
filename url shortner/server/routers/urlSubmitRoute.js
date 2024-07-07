const express = require('express');
const router = express.Router();

// Import the controller
const urlSubmitController = require('../controller/urlSubmitController');

// Define the route and attach the controller function
router.route('/submit').post(urlSubmitController.submit);

module.exports = router;

