const pool = require('../config/db')

const validCategories = [
  'General Cases',
  'Civil/Commercial',
  'Regulatory Law',
  'Human Rights',
]

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

const validateReference = (category, referenceLabel, referenceUrl) => {
  if (category !== 'General Cases') {
    return {
      referenceLabel: null,
      referenceUrl: null,
    }
  }

  const cleanLabel = referenceLabel?.trim() || ''
  const cleanUrl = referenceUrl?.trim() || ''

  if (!cleanLabel && !cleanUrl) {
    return {
      referenceLabel: null,
      referenceUrl: null,
    }
  }

  if ((cleanLabel && !cleanUrl) || (!cleanLabel && cleanUrl)) {
    throw new Error(
      'For General Cases, both reference label and reference URL must be provided together'
    )
  }

  const wordCount = cleanLabel.split(/\s+/).filter(Boolean).length
  if (wordCount > 2) {
    throw new Error('Reference label must be one or two words maximum')
  }

  return {
    referenceLabel: cleanLabel,
    referenceUrl: cleanUrl,
  }
}

const createCase = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      reference_url,
      reference_label,
    } = req.body

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null

    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ message: 'Title, description, and category are required' })
    }

    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid case category' })
    }

    let validatedReference
    try {
      validatedReference = validateReference(
        category,
        reference_label,
        reference_url
      )
    } catch (validationError) {
      return res.status(400).json({ message: validationError.message })
    }

    const result = await pool.query(
      `INSERT INTO cases
        (title, description, image_url, category, reference_url, reference_label)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        title,
        description,
        imageUrl,
        category,
        validatedReference.referenceUrl,
        validatedReference.referenceLabel,
      ]
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
    const {
      title,
      description,
      category,
      reference_url,
      reference_label,
    } = req.body

    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ message: 'Title, description, and category are required' })
    }

    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid case category' })
    }

    const existingCase = await pool.query('SELECT * FROM cases WHERE id = $1', [
      id,
    ])

    if (existingCase.rows.length === 0) {
      return res.status(404).json({ message: 'Case not found' })
    }

    const oldCase = existingCase.rows[0]
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : oldCase.image_url

    let validatedReference
    try {
      validatedReference = validateReference(
        category,
        reference_label,
        reference_url
      )
    } catch (validationError) {
      return res.status(400).json({ message: validationError.message })
    }

    const result = await pool.query(
      `UPDATE cases
       SET title = $1,
           description = $2,
           image_url = $3,
           category = $4,
           reference_url = $5,
           reference_label = $6
       WHERE id = $7
       RETURNING *`,
      [
        title,
        description,
        imageUrl,
        category,
        validatedReference.referenceUrl,
        validatedReference.referenceLabel,
        id,
      ]
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