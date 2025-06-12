const express = require('express')
const router = express.Router()
const { getDashboard } = require('../controllers/dashboard.controller')


router.get('/', getDashboard)

module.exports = router;  //export the router