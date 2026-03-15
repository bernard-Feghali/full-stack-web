const pool = require('../config/db')

const getArticles = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM articles ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('GET ARTICLES ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

const createArticle = async (req, res) => {
  try {
    const { title, url } = req.body

    if (!title || !url) {
      return res.status(400).json({ message: 'Title and URL are required' })
    }

    const result = await pool.query(
      'INSERT INTO articles (title, url) VALUES ($1, $2) RETURNING *',
      [title, url]
    )

    res.status(201).json({
      message: 'Article created successfully',
      article: result.rows[0],
    })
  } catch (error) {
    console.error('CREATE ARTICLE ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'DELETE FROM articles WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Article not found' })
    }

    res.json({ message: 'Article deleted successfully' })
  } catch (error) {
    console.error('DELETE ARTICLE ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
}