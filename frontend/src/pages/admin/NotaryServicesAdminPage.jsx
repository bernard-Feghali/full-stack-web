import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'

function NotaryServicesAdminPage() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [referenceLabel, setReferenceLabel] = useState('')
  const [referenceUrl, setReferenceUrl] = useState('')
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:5000/notary-services')
      const data = await response.json()

      if (!response.ok) {
        setError('Failed to load notary services')
        setLoading(false)
        return
      }

      setServices(data)
    } catch (err) {
      setError('Server error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

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

      const response = await fetch('http://localhost:5000/notary-services', {
        method: 'POST',
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
        setError(data.message || 'Failed to add service')
        return
      }

      setMessage('Notary service added successfully')
      setTitle('')
      setDescription('')
      setReferenceLabel('')
      setReferenceUrl('')
      fetchServices()
    } catch (err) {
      setError('Server error')
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this notary service?')
    if (!confirmed) return

    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`http://localhost:5000/notary-services/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to delete notary service')
        return
      }

      setMessage('Notary service deleted successfully')
      setServices((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <h1>Manage Notary Services</h1>

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

          <button type="submit">Add Notary Service</button>
        </form>

        {loading ? (
          <p style={{ marginTop: '20px' }}>Loading services...</p>
        ) : (
          <div className="admin-cases-list">
            {services.length === 0 ? (
              <p>No notary services yet.</p>
            ) : (
              services.map((item) => (
                <div key={item.id} className="admin-case-row">
                  <div>
                    <h3>{item.title}</h3>
                    {item.reference_label && item.reference_url && (
                      <p style={{ fontWeight: '600', marginBottom: '8px' }}>
                        Reference: {item.reference_label}
                      </p>
                    )}
                    <p>{item.description}</p>
                  </div>

                  <div className="admin-case-actions">
                    <button onClick={() => navigate(`/admin/notary-services/edit/${item.id}`)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default NotaryServicesAdminPage