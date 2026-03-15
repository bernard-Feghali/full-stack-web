import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'

function EditNotaryServicePage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [referenceLabel, setReferenceLabel] = useState('')
  const [referenceUrl, setReferenceUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`http://localhost:5000/notary-services/${id}`)
        const data = await response.json()

        if (!response.ok) {
          setError(data.message || 'Failed to load notary service')
          setLoading(false)
          return
        }

        setTitle(data.title)
        setDescription(data.description)
        setReferenceLabel(data.reference_label || '')
        setReferenceUrl(data.reference_url || '')
      } catch (err) {
        setError('Server error')
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    const trimmedLabel = referenceLabel.trim()
    const wordCount = trimmedLabel
      ? trimmedLabel.split(/\s+/).filter(Boolean).length
      : 0

    if (trimmedLabel && wordCount > 2) {
      setError('Reference label must be one or two words maximum')
      return
    }

    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`http://localhost:5000/notary-services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          reference_label: referenceLabel,
          reference_url: referenceUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to update notary service')
        return
      }

      setMessage('Notary service updated successfully')

      setTimeout(() => {
        navigate('/admin/notary-services')
      }, 1000)
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <h1>Edit Notary Service</h1>

        {loading ? (
          <p style={{ marginTop: '20px' }}>Loading service...</p>
        ) : (
          <form className="case-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Service Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

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

            <textarea
              rows="5"
              placeholder="Service Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit">Update Notary Service</button>
          </form>
        )}
      </main>
    </div>
  )
}

export default EditNotaryServicePage