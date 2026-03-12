import { useEffect, useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'

function AdminDashboardPage() {

  const [stats, setStats] = useState(null)

  useEffect(() => {

    const fetchStats = async () => {

      const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:5000/dashboard/stats', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      if(response.ok){
        setStats(data)
      }

    }

    fetchStats()

  }, [])

  if(!stats){
    return <p>Loading dashboard...</p>
  }

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <main className="admin-main">

        <h1>Dashboard</h1>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h3>Total Cases</h3>
            <p>{stats.totalCases}</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Messages</h3>
            <p>{stats.totalMessages}</p>
          </div>

          <div className="dashboard-card">
            <h3>Latest Case</h3>
            <p>{stats.latestCase || "None yet"}</p>
          </div>

          <div className="dashboard-card">
            <h3>Latest Message</h3>
            <p>{stats.latestMessage || "None yet"}</p>
          </div>

        </div>

      </main>

    </div>

  )
}

export default AdminDashboardPage