const dashboardRoutes = require('./routes/dashboardRoutes')
const articleRoutes = require('./routes/articleRoutes')
const notaryServiceRoutes = require('./routes/notaryServiceRoutes')

const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const pool = require('./config/db')
const adminRoutes = require('./routes/adminRoutes')
const caseRoutes = require('./routes/caseRoutes')
const contactRoutes = require('./routes/contactRoutes')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/dashboard', dashboardRoutes)
app.use('/articles', articleRoutes)
app.use('/notary-services', notaryServiceRoutes)


app.get('/', (req, res) => {
  res.send('Backend is running')
})

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({
      message: 'Database connected successfully',
      time: result.rows[0].now,
    })
  } catch (error) {
    console.error('DB ERROR:', error.message)
    res.status(500).json({
      error: 'Database connection failed',
      details: error.message,
    })
  }
})

app.use('/admin', adminRoutes)
app.use('/cases', caseRoutes)
app.use('/contact', contactRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})