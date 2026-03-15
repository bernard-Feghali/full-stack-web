import { useEffect, useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'

function ArticlesPage() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:5000/articles')
      const data = await response.json()

      if (!response.ok) {
        setError('Failed to load articles')
        setLoading(false)
        return
      }

      setArticles(data)
    } catch (err) {
      setError('Server error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:5000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, url }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to add article')
        return
      }

      setMessage('Article added successfully')
      setTitle('')
      setUrl('')
      fetchArticles()
    } catch (err) {
      setError('Server error')
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this article?')
    if (!confirmed) return

    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`http://localhost:5000/articles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to delete article')
        return
      }

      setMessage('Article deleted successfully')
      setArticles((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <h1>Manage Articles</h1>

        <form className="case-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Article Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="url"
            placeholder="Article URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />

          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit">Add Article</button>
        </form>

        {loading ? (
          <p style={{ marginTop: '20px' }}>Loading articles...</p>
        ) : (
          <div className="admin-cases-list">
            {articles.length === 0 ? (
              <p>No articles yet.</p>
            ) : (
              articles.map((item) => (
                <div key={item.id} className="admin-case-row">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.url}</p>
                  </div>

                  <div className="admin-case-actions">
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

export default ArticlesPage