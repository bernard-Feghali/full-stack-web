const express = require('express')
const router = express.Router()
const {
  getNotaryServices,
  getNotaryServiceById,
  createNotaryService,
  updateNotaryService,
  deleteNotaryService,
} = require('../controllers/notaryServiceController')
const verifyToken = require('../middleware/authMiddleware')

router.get('/', getNotaryServices)
router.get('/:id', getNotaryServiceById)
router.post('/', verifyToken, createNotaryService)
router.put('/:id', verifyToken, updateNotaryService)
router.delete('/:id', verifyToken, deleteNotaryService)

module.exports = router