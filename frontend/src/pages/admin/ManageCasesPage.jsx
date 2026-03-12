import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'

function ManageCasesPage() {
  const navigate = useNavigate()

  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const fetchCases = async () => {
    try {
      const response = await fetch('http://localhost:5000/cases')
      const data = await response.json()

      if (!response.ok) {
        setError('Failed to load cases')
        setLoading(false)
        return
      }

      setCases(data)
    } catch (err) {
      setError('Server error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCases()
  }, [])

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this case?')

    if (!confirmed) return

    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`http://localhost:5000/cases/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to delete case')
        return
      }

      setMessage('Case deleted successfully')
      setCases((prevCases) => prevCases.filter((item) => item.id !== id))
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <h1>Manage Cases</h1>

        {message && <p style={{ color: 'green', marginTop: '16px' }}>{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '16px' }}>{error}</p>}

        {loading ? (
          <p style={{ marginTop: '20px' }}>Loading cases...</p>
        ) : (
          <div className="admin-cases-list">
            {cases.length === 0 ? (
              <p>No cases found.</p>
            ) : (
              cases.map((item) => (
                <div key={item.id} className="admin-case-row">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div className="admin-case-actions">
                    <button onClick={() => navigate(`/admin/cases/edit/${item.id}`)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
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

export default ManageCasesPage