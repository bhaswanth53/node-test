const express = require("express")

const router = express.Router()

// Controller
const ApiController = require("../controllers/api")

// Routes
router.get('/', ApiController.home)
router.post('/add', ApiController.add)
router.post('/update', ApiController.updateClient)
router.post('/get', ApiController.get)

module.exports = router