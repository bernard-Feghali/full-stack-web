import { useEffect, useState } from 'react'
import Header from '../../components/public/Header.jsx'
import Footer from '../../components/public/Footer.jsx'
import CaseCard from '../../components/public/CaseCard.jsx'

function LegalServicesPage() {
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/cases`)
        const data = await response.json()

        if (!response.ok) {
          setError('Failed to load cases')
          setLoading(false)
          return
        }

        setCases(data)
      } catch (err) {
        setError('Server error')
      } finally {
        setLoading(false)
      }
    }

    fetchCases()
  }, [])

  const civilCommercial = cases.filter(
    (item) => item.category === 'Civil/Commercial'
  )
  const humanRights = cases.filter(
    (item) => item.category === 'Human Rights and International Law'
  )
  const regularLaw = cases.filter(
    (item) => item.category === 'Regular Law'
  )

  const renderSection = (title, sectionCases) => (
    <section className="legal-category-section">
      <h2>{title}</h2>
      {sectionCases.length === 0 ? (
        <p>No cases yet in this category.</p>
      ) : (
        <div className="cases-grid">
          {sectionCases.map((item) => (
            <CaseCard key={item.id} caseItem={item} />
          ))}
        </div>
      )}
    </section>
  )

  return (
    <>
      <Header />

      <main className="service-page-section">
        <div className="container">
          <div className="service-page-header">
            <span className="section-tag">Legal Services</span>
            <h1>Featured Cases</h1>
            <p>
              A selection of legal matters and representative work handled by
              the office across multiple areas of legal practice.
            </p>
          </div>

          {loading ? (
            <p>Loading cases...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              {renderSection('Civil / Commercial', civilCommercial)}
              {renderSection(
                'Human Rights and International Law',
                humanRights
              )}
              {renderSection('Regular Law', regularLaw)}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default LegalServicesPage