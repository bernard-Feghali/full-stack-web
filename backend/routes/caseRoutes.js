const express = require('express')
const router = express.Router()
const {
  getCases,
  createCase,
  deleteCase,
} = require('../controllers/caseController')
const upload = require('../middleware/uploadMiddlerware')
const verifyToken = require('../middleware/authMiddleware')

router.get('/', getCases)
router.post('/', verifyToken, upload.single('image'), createCase)
router.delete('/:id', verifyToken, deleteCase)

module.exports = router