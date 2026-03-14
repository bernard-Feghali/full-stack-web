const pool = require('../config/db')

const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: 'Name, email, and message are required' })
    }

    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    )

    res.status(201).json({
      message: 'Message sent successfully',
      contact: result.rows[0],
    })
  } catch (error) {
    console.error('CREATE CONTACT ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

const getContactMessages = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('GET CONTACTS ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'DELETE FROM contacts WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Message not found' })
    }

    res.json({ message: 'Message deleted successfully' })
  } catch (error) {
    console.error('DELETE CONTACT ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
}