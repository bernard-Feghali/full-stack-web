function DashboardStats() {
  const stats = [
    { id: 1, label: 'Total Cases', value: 12 },
    { id: 2, label: 'New Messages', value: 4 },
    { id: 3, label: 'Published Items', value: 12 },
  ]

  return (
    <div className="dashboard-stats">
      {stats.map((stat) => (
        <div key={stat.id} className="dashboard-stat-card">
          <h3>{stat.value}</h3>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats