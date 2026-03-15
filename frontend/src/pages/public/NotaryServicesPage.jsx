import { useEffect, useState } from 'react'
import Header from '../../components/public/Header.jsx'
import Footer from '../../components/public/Footer.jsx'

function NotaryServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/notary-services')
        const data = await response.json()

        if (!response.ok) {
          setError('Failed to load notary services')
          setLoading(false)
          return
        }

        setServices(data)
      } catch (err) {
        setError('Server error')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <>
      <Header />

      <main className="service-page-section">
        <div className="container">
          <div className="service-page-header">
            <span className="section-tag">Notary Services</span>
            <h1>Reliable Notary Services</h1>
            <p>
              Trusted notarial support for individuals, families, and businesses
              requiring accurate document handling and certification.
            </p>
          </div>

          {loading ? (
            <div className="legal-page-status-box">
              <p>Loading services...</p>
            </div>
          ) : error ? (
            <div className="legal-page-status-box">
              <p>{error}</p>
            </div>
          ) : services.length === 0 ? (
            <div className="empty-category-card">
              <p>No notary services have been added yet.</p>
            </div>
          ) : (
            <div className="service-page-grid">
              {services.map((service) => (
                <article key={service.id} className="service-page-card">
                  <div className="service-card-top-line"></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  {service.reference_url && service.reference_label && (
                    <div className="case-reference">
                      <a
                        href={service.reference_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {service.reference_label}
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default NotaryServicesPage