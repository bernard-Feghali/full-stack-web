import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        return
      }

      localStorage.setItem('token', data.token)

      navigate('/admin/dashboard')
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage