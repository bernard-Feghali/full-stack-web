const express = require('express')
const router = express.Router()
const {
  getCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
} = require('../controllers/caseController')
const upload = require('../middleware/uploadMiddlerware')
const verifyToken = require('../middleware/authMiddleware')

router.get('/', getCases)
router.get('/:id', getCaseById)
router.post('/', verifyToken, upload.single('image'), createCase)
router.put('/:id', verifyToken, upload.single('image'), updateCase)
router.delete('/:id', verifyToken, deleteCase)

module.exports = router