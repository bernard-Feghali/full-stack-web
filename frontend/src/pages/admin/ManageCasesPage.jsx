import AdminSidebar from '../../components/admin/AdminSidebar.jsx'
import cases from '../../data/cases.js'

function ManageCasesPage() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <h1>Manage Cases</h1>

        <div className="admin-cases-list">
          {cases.map((item) => (
            <div key={item.id} className="admin-case-row">
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

              <div className="admin-case-actions">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ManageCasesPage