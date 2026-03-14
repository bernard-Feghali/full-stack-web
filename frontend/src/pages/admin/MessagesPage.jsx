import { useEffect, useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'

function MessagesPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token')

        const response = await fetch('http://localhost:5000/contact', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.message || 'Failed to load messages')
          setLoading(false)
          return
        }

        setMessages(data)
      } catch (err) {
        setError('Server error')
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  const handleDeleteMessage = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this message?'
    )

    if (!confirmed) return

    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`http://localhost:5000/contact/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to delete message')
        return
      }

      setSuccessMessage('Message deleted successfully')
      setMessages((prev) => prev.filter((msg) => msg.id !== id))
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <h1>Client Messages</h1>

        {successMessage && (
          <p style={{ color: 'green', marginTop: '20px' }}>{successMessage}</p>
        )}
        {loading ? (
          <p style={{ marginTop: '20px' }}>Loading messages...</p>
        ) : error ? (
          <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>
        ) : messages.length === 0 ? (
          <p style={{ marginTop: '20px' }}>No messages yet.</p>
        ) : (
          <div className="admin-cases-list">
            {messages.map((item) => (
              <div key={item.id} className="admin-case-row">
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    <strong>Email:</strong> {item.email}
                  </p>
                  <p>{item.message}</p>
                </div>

                <div className="admin-case-actions">
                  <button onClick={() => handleDeleteMessage(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default MessagesPage