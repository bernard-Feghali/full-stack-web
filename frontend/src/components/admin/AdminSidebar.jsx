import { Link, useNavigate } from 'react-router-dom'

function AdminSidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  return (
    <aside className="admin-sidebar">
      <h2>Admin Panel</h2>

      <nav className="admin-sidebar-nav">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/cases">Manage Cases</Link>
        <Link to="/admin/cases/new">Add New Case</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </aside>
  )
}

export default AdminSidebar