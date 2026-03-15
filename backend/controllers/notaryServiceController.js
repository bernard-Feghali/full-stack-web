const pool = require('../config/db')

const validateReference = (referenceLabel, referenceUrl) => {
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
      'Reference label and reference URL must be provided together'
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

const getNotaryServices = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM notary_services ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('GET NOTARY SERVICES ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

const getNotaryServiceById = async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'SELECT * FROM notary_services WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Notary service not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('GET NOTARY SERVICE BY ID ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

const createNotaryService = async (req, res) => {
  try {
    const { title, description, reference_url, reference_label } = req.body

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required' })
    }

    let validatedReference
    try {
      validatedReference = validateReference(reference_label, reference_url)
    } catch (validationError) {
      return res.status(400).json({ message: validationError.message })
    }

    const result = await pool.query(
      `INSERT INTO notary_services (title, description, reference_url, reference_label)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        title,
        description,
        validatedReference.referenceUrl,
        validatedReference.referenceLabel,
      ]
    )

    res.status(201).json({
      message: 'Notary service created successfully',
      service: result.rows[0],
    })
  } catch (error) {
    console.error('CREATE NOTARY SERVICE ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

const updateNotaryService = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, reference_url, reference_label } = req.body

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required' })
    }

    const existingService = await pool.query(
      'SELECT * FROM notary_services WHERE id = $1',
      [id]
    )

    if (existingService.rows.length === 0) {
      return res.status(404).json({ message: 'Notary service not found' })
    }

    let validatedReference
    try {
      validatedReference = validateReference(reference_label, reference_url)
    } catch (validationError) {
      return res.status(400).json({ message: validationError.message })
    }

    const result = await pool.query(
      `UPDATE notary_services
       SET title = $1,
           description = $2,
           reference_url = $3,
           reference_label = $4
       WHERE id = $5
       RETURNING *`,
      [
        title,
        description,
        validatedReference.referenceUrl,
        validatedReference.referenceLabel,
        id,
      ]
    )

    res.json({
      message: 'Notary service updated successfully',
      service: result.rows[0],
    })
  } catch (error) {
    console.error('UPDATE NOTARY SERVICE ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteNotaryService = async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'DELETE FROM notary_services WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Notary service not found' })
    }

    res.json({ message: 'Notary service deleted successfully' })
  } catch (error) {
    console.error('DELETE NOTARY SERVICE ERROR:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  getNotaryServices,
  getNotaryServiceById,
  createNotaryService,
  updateNotaryService,
  deleteNotaryService,
}