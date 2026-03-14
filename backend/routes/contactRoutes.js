const express = require('express')
const router = express.Router()
const {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
} = require('../controllers/contactController')
const verifyToken = require('../middleware/authMiddleware')

router.post('/', createContactMessage)
router.get('/', verifyToken, getContactMessages)
router.delete('/:id', verifyToken, deleteContactMessage)

module.exports = router