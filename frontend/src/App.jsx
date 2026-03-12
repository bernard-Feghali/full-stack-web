import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/public/HomePage.jsx'
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx'
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
import ManageCasesPage from './pages/admin/ManageCasesPage.jsx'
import AddCasePage from './pages/admin/AddCasePage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/cases" element={<ManageCasesPage />} />
        <Route path="/admin/cases/new" element={<AddCasePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App