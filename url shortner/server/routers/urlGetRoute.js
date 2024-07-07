const express = require('express');
const router = express.Router();

// Import the controller
const urlGetController = require('../controller/urlGetController');

// Define the route and attach the controller function
router.route('/:shortUrl').get(urlGetController.getUrl);

module.exports = router;

