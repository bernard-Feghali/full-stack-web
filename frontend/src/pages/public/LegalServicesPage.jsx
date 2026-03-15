import { useEffect, useMemo, useState } from 'react'
import Header from '../../components/public/Header.jsx'
import Footer from '../../components/public/Footer.jsx'
import CaseCard from '../../components/public/CaseCard.jsx'

function LegalServicesPage() {
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [animateContent, setAnimateContent] = useState(true)

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch('http://localhost:5000/cases')
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

  useEffect(() => {
    setAnimateContent(false)

    const timeout = setTimeout(() => {
      setAnimateContent(true)
    }, 60)

    return () => clearTimeout(timeout)
  }, [activeFilter])

  const filterOptions = [
    'All',
    'General Cases',
    'Civil/Commercial',
    'Regulatory Law',
    'Human Rights',
  ]

  const filterCounts = useMemo(() => {
    return {
      All: cases.length,
      'General Cases': cases.filter(
        (item) => item.category === 'General Cases'
      ).length,
      'Civil/Commercial': cases.filter(
        (item) => item.category === 'Civil/Commercial'
      ).length,
      'Regulatory Law': cases.filter(
        (item) => item.category === 'Regulatory Law'
      ).length,
      'Human Rights': cases.filter(
        (item) => item.category === 'Human Rights'
      ).length,
    }
  }, [cases])

  const filteredCases = useMemo(() => {
    if (activeFilter === 'All') return cases
    return cases.filter((item) => item.category === activeFilter)
  }, [cases, activeFilter])

  const groupedCases = useMemo(() => {
    return {
      'General Cases': filteredCases.filter(
        (item) => item.category === 'General Cases'
      ),
      'Civil / Commercial': filteredCases.filter(
        (item) => item.category === 'Civil/Commercial'
      ),
      'Regulatory Law': filteredCases.filter(
        (item) => item.category === 'Regulatory Law'
      ),
      'Human Rights and International Law': filteredCases.filter(
        (item) => item.category === 'Human Rights'
      ),
    }
  }, [filteredCases])

  const hasAnyCases = filteredCases.length > 0

  const getFilterLabel = (option) => {
    if (option === 'Civil/Commercial') return 'Civil / Commercial'
    if (option == 'Human Rights') return 'Human Rights and International Law'
    return option
  }

  const renderAnimatedGrid = (items) => (
    <div className="legal-cases-grid">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`stagger-card ${animateContent ? 'show-stagger-card' : ''}`}
          style={{ transitionDelay: `${index * 80}ms` }}
        >
          <CaseCard caseItem={item} />
        </div>
      ))}
    </div>
  )

  return (
    <>
      <Header />

      <main className="legal-services-page">
        <div className="container">
          <div className="legal-page-intro">
            <span className="section-tag">Legal Services</span>
            <h1>Featured Cases</h1>
            <p>
              Explore selected legal matters and representative work handled by
              the office across different areas of legal practice.
            </p>
          </div>

          <div className="legal-filter-bar">
            {filterOptions.map((option) => (
              <button
                key={option}
                className={`legal-filter-pill ${
                  activeFilter === option ? 'active-filter-pill' : ''
                }`}
                onClick={() => setActiveFilter(option)}
              >
                <span>{getFilterLabel(option)}</span>
                <span className="filter-count-badge">
                  {filterCounts[option]}
                </span>
              </button>
            ))}
          </div>

          {loading ? (
            <div className="legal-page-status-box">
              <p>Loading cases...</p>
            </div>
          ) : error ? (
            <div className="legal-page-status-box">
              <p>{error}</p>
            </div>
          ) : !hasAnyCases ? (
            <div
              className={`legal-animated-content ${
                animateContent ? 'show-legal-content' : ''
              }`}
            >
              <div className="empty-category-card">
                <p>No cases found for this category.</p>
              </div>
            </div>
          ) : activeFilter === 'All' ? (
            <div
              className={`legal-category-stack legal-animated-content ${
                animateContent ? 'show-legal-content' : ''
              }`}
            >
              {Object.entries(groupedCases).map(([title, sectionCases]) => (
                <section key={title} className="legal-category-block">
                  <div className="legal-category-header">
                    <div className="legal-category-line"></div>
                    <div>
                      <h2>{title}</h2>
                      <p>
                        {sectionCases.length === 0
                          ? 'No featured cases in this category yet.'
                          : `${sectionCases.length} featured case${
                              sectionCases.length > 1 ? 's' : ''
                            } in this category.`}
                      </p>
                    </div>
                  </div>

                  {sectionCases.length === 0 ? (
                    <div className="empty-category-card">
                      <p>No cases have been added here yet.</p>
                    </div>
                  ) : (
                    renderAnimatedGrid(sectionCases)
                  )}
                </section>
              ))}
            </div>
          ) : (
            <div
              className={`legal-animated-content ${
                animateContent ? 'show-legal-content' : ''
              }`}
            >
              <section className="legal-category-block">
                <div className="legal-category-header">
                  <div className="legal-category-line"></div>
                  <div>
                    <h2>{getFilterLabel(activeFilter)}</h2>
                    <p>
                      {filteredCases.length} featured case
                      {filteredCases.length > 1 ? 's' : ''} in this category.
                    </p>
                  </div>
                </div>

                {renderAnimatedGrid(filteredCases)}
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default LegalServicesPage