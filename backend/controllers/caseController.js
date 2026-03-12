const pool = require('../config/db')

const getCases = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM cases ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('GET CASES ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

const createCase = async (req, res) => {
  try {
    const { title, description } = req.body
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required' })
    }

    const result = await pool.query(
      'INSERT INTO cases (title, description, image_url) VALUES ($1, $2, $3) RETURNING *',
      [title, description, imageUrl]
    )

    res.status(201).json({
      message: 'Case created successfully',
      case: result.rows[0],
    })
  } catch (error) {
    console.error('CREATE CASE ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteCase = async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'DELETE FROM cases WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Case not found' })
    }

    res.json({ message: 'Case deleted successfully' })
  } catch (error) {
    console.error('DELETE CASE ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getCases,
  createCase,
  deleteCase,
}