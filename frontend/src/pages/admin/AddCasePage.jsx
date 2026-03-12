import AdminSidebar from '../../components/admin/AdminSidebar.jsx'
import CaseForm from '../../components/admin/CaseForm.jsx'

function AddCasePage() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <h1>Add New Case</h1>
        <CaseForm />
      </main>
    </div>
  )
}

export default AddCasePage