import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/public/HomePage.jsx'
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx'
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
import ManageCasesPage from './pages/admin/ManageCasesPage.jsx'
import AddCasePage from './pages/admin/AddCasePage.jsx'
import MessagesPage from './pages/admin/MessagesPage.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'
import EditCasePage  from './pages/admin/EditCasePage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
      <Route
        path="/admin/cases/edit/:id"
        element={
          <ProtectedRoute>
            <EditCasePage />
          </ProtectedRoute>
        }
      />

        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/cases"
          element={
            <ProtectedRoute>
              <ManageCasesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/cases/new"
          element={
            <ProtectedRoute>
              <AddCasePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App