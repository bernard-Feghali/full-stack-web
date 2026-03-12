const express = require('express')
const router = express.Router()
const {
  getCases,
  createCase,
  deleteCase,
} = require('../controllers/caseController')
const upload = require('../middleware/uploadMiddlerware')

router.get('/', getCases)
router.post('/', upload.single('image'), createCase)
router.delete('/:id', deleteCase)

module.exports = router