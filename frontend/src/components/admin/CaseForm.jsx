import { useState } from 'react'

function CaseForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Regular Law')
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage('')
    setError('')

    try {
      const token = localStorage.getItem('token')

      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('category', category)

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
      setCategory('Regular Law')
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
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="Civil/Commercial">Civil/Commercial</option>
        <option value="Human Rights and International Law">
          Human Rights and International Law
        </option>
        <option value="Regular Law">Regular Law</option>
      </select>

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