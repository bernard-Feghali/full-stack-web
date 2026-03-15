import { useState } from 'react'

function CaseForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('General Cases')
  const [referenceLabel, setReferenceLabel] = useState('')
  const [referenceUrl, setReferenceUrl] = useState('')
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage('')
    setError('')

    const trimmedLabel = referenceLabel.trim()
    const wordCount = trimmedLabel ? trimmedLabel.split(/\s+/).filter(Boolean).length : 0

    if (category === 'General Cases' && trimmedLabel && wordCount > 2) {
      setError('Reference label must be one or two words maximum')
      return
    }

    try {
      const token = localStorage.getItem('token')

      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('category', category)

      if (category === 'General Cases') {
        formData.append('reference_label', referenceLabel)
        formData.append('reference_url', referenceUrl)
      }

      if (image) {
        formData.append('image', image)
      }

      const response = await fetch('http://localhost:5000/cases', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to create case')
        return
      }

      setMessage('Case added successfully')
      setTitle('')
      setDescription('')
      setCategory('General Cases')
      setReferenceLabel('')
      setReferenceUrl('')
      setImage(null)
      e.target.reset()
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <form className="case-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Case Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value)
          if (e.target.value !== 'General Cases') {
            setReferenceLabel('')
            setReferenceUrl('')
          }
        }}
        required
      >
        <option value="General Cases">General Cases</option>
        <option value="Civil/Commercial">Civil/Commercial</option>
        <option value="Regulatory Law">Regulatory Law</option>
        <option value="Human Rights">Human Rights</option>
      </select>

      {category === 'General Cases' && (
        <>
          <input
            type="text"
            placeholder="Reference label (1–2 words)"
            value={referenceLabel}
            onChange={(e) => setReferenceLabel(e.target.value)}
            maxLength="50"
          />

          <input
            type="url"
            placeholder="Reference URL"
            value={referenceUrl}
            onChange={(e) => setReferenceUrl(e.target.value)}
          />
        </>
      )}

      <textarea
        name="description"
        rows="6"
        placeholder="Case Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Save Case</button>
    </form>
  )
}

export default CaseForm