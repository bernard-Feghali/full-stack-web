const express = require('express')
const router = express.Router()
const {
  createContactMessage,
  getContactMessages,
} = require('../controllers/contactController')
const verifyToken = require('../middleware/authMiddleware')

router.post('/', createContactMessage)
router.get('/', verifyToken, getContactMessages)

module.exports = router