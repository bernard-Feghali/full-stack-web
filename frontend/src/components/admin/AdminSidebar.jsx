import { Link, useNavigate } from 'react-router-dom'

function AdminSidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {

  const confirmed = window.confirm("Are you sure you want to logout?")

  if(!confirmed) return

  localStorage.removeItem("token")
  navigate("/admin/login")

}

  return (
    <aside className="admin-sidebar">
      <h2>Admin Panel</h2>

      <nav className="admin-sidebar-nav">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/cases">Manage Cases</Link>
        <Link to="/admin/cases/new">Add New Case</Link>
        <Link to="/admin/messages">Messages</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </aside>
  )
}

export default AdminSidebar