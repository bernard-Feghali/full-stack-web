import AdminSidebar from '../../components/admin/AdminSidebar.jsx'
import DashboardStats from '../../components/admin/DashboardStats.jsx'

function AdminDashboardPage() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <h1>Dashboard</h1>
        <p>Welcome to the lawyer admin panel.</p>
        <DashboardStats />
      </main>
    </div>
  )
}

export default AdminDashboardPage