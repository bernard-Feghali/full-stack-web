const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')
const pool = require('../config/db')

router.get('/stats', verifyToken, async (req, res) => {
  try {

    const casesResult = await pool.query('SELECT COUNT(*) FROM cases')
    const messagesResult = await pool.query('SELECT COUNT(*) FROM contacts')

    const latestCase = await pool.query(
      'SELECT title FROM cases ORDER BY created_at DESC LIMIT 1'
    )

    const latestMessage = await pool.query(
      'SELECT name FROM contacts ORDER BY created_at DESC LIMIT 1'
    )

    res.json({
      totalCases: casesResult.rows[0].count,
      totalMessages: messagesResult.rows[0].count,
      latestCase: latestCase.rows[0]?.title || null,
      latestMessage: latestMessage.rows[0]?.name || null
    })

  } catch (error) {
    console.error('DASHBOARD ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router