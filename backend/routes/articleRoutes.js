const express = require('express')
const router = express.Router()
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articleController')
const verifyToken = require('../middleware/authMiddleware')

router.get('/', getArticles)
router.post('/', verifyToken, createArticle)
router.delete('/:id', verifyToken, deleteArticle)

module.exports = router