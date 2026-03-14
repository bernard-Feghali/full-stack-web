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

const getCaseById = async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query('SELECT * FROM cases WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Case not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('GET CASE BY ID ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

const createCase = async (req, res) => {
  try {
    const { title, description, category } = req.body
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null

    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ message: 'Title, description, and category are required' })
    }

    const result = await pool.query(
      'INSERT INTO cases (title, description, image_url, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, imageUrl, category]
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

const updateCase = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, category } = req.body

    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ message: 'Title, description, and category are required' })
    }

    const existingCase = await pool.query('SELECT * FROM cases WHERE id = $1', [id])

    if (existingCase.rows.length === 0) {
      return res.status(404).json({ message: 'Case not found' })
    }

    const oldCase = existingCase.rows[0]
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : oldCase.image_url

    const result = await pool.query(
      'UPDATE cases SET title = $1, description = $2, image_url = $3, category = $4 WHERE id = $5 RETURNING *',
      [title, description, imageUrl, category, id]
    )

    res.json({
      message: 'Case updated successfully',
      case: result.rows[0],
    })
  } catch (error) {
    console.error('UPDATE CASE ERROR:', error.message)
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
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
}