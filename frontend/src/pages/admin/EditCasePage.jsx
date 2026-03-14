import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'

function EditCasePage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [currentImage, setCurrentImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/cases/${id}`)
        const data = await response.json()

        if (!response.ok) {
          setError(data.message || 'Failed to load case')
          setLoading(false)
          return
        }

        setTitle(data.title)
        setDescription(data.description)
        setCurrentImage(data.image_url || '')
      } catch (err) {
        setError('Server error')
      } finally {
        setLoading(false)
      }
    }

    fetchCase()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage('')
    setError('')

    try {
      const token = localStorage.getItem('token')

      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)

      if (image) {
        formData.append('image', image)
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/cases/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to update case')
        return
      }

      setMessage('Case updated successfully')

      setTimeout(() => {
        navigate('/admin/cases')
      }, 1000)
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <h1>Edit Case</h1>

        {loading ? (
          <p style={{ marginTop: '20px' }}>Loading case...</p>
        ) : (
          <form className="case-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Case Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              rows="6"
              placeholder="Case Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {currentImage && !image && (
              <div>
                <p style={{ marginBottom: '10px' }}>Current image:</p>
                <img
                  src={`${import.meta.env.VITE_API_URL}${currentImage}`}
                  alt="Current case"
                  style={{ width: '220px', borderRadius: '8px' }}
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit">Update Case</button>
          </form>
        )}
      </main>
    </div>
  )
}

export default EditCasePage