import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/public/HomePage.jsx'
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx'
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
import ManageCasesPage from './pages/admin/ManageCasesPage.jsx'
import AddCasePage from './pages/admin/AddCasePage.jsx'
import MessagesPage from './pages/admin/MessagesPage.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'
import EditCasePage  from './pages/admin/EditCasePage.jsx'
import NotaryServicesPage from "./pages/public/NotaryServicesPage.jsx"
import ContactPage from "./pages/public/ContactPage.jsx"
import AboutPage from './pages/public/AboutPage.jsx'
import LegalServicesPage from './pages/public/LegalServicesPage.jsx'
import ArticlesPage from './pages/admin/ArticlesPage.jsx'
import NotaryServicesAdminPage from './pages/admin/NotaryServicesAdminPage.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import EditNotaryServicePage from './pages/admin/EditNotaryServicePage.jsx'


function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
      <Route path="/about" element ={<AboutPage/>} />
      <Route path="/legal-services" element = {<LegalServicesPage/>}  />
      <Route path="/notary-services" element={<NotaryServicesPage />} />
      <Route path="/contact" element={<ContactPage />} /> 
      
        
      <Route
        path="/admin/articles"
        element={
          <ProtectedRoute>
            <ArticlesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/notary-services"
        element={
          <ProtectedRoute>
            <NotaryServicesAdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/notary-services/edit/:id"
        element={
          <ProtectedRoute>
            <EditNotaryServicePage />
          </ProtectedRoute>
        }
      />


      <Route
        path="/admin/cases/edit/:id"
        element={
          <ProtectedRoute>
            <EditCasePage />
          </ProtectedRoute>
        }
      />

        
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