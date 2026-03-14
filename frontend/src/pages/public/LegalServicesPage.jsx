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
    'Civil/Commercial',
    'Human Rights and International Law',
    'Regular Law',
  ]

  const filterCounts = useMemo(() => {
    return {
      All: cases.length,
      'Civil/Commercial': cases.filter(
        (item) => item.category === 'Civil/Commercial'
      ).length,
      'Human Rights and International Law': cases.filter(
        (item) => item.category === 'Human Rights and International Law'
      ).length,
      'Regular Law': cases.filter(
        (item) => item.category === 'Regular Law'
      ).length,
    }
  }, [cases])

  const filteredCases = useMemo(() => {
    if (activeFilter === 'All') return cases
    return cases.filter((item) => item.category === activeFilter)
  }, [cases, activeFilter])

  const groupedCases = useMemo(() => {
    return {
      'Civil / Commercial': filteredCases.filter(
        (item) => item.category === 'Civil/Commercial'
      ),
      'Human Rights & International Law': filteredCases.filter(
        (item) => item.category === 'Human Rights and International Law'
      ),
      'Regular Law': filteredCases.filter(
        (item) => item.category === 'Regular Law'
      ),
    }
  }, [filteredCases])

  const hasAnyCases = filteredCases.length > 0

  const getFilterLabel = (option) => {
    if (option === 'Human Rights and International Law') {
      return 'Human Rights & International Law'
    }
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
                    <h2>
                      {activeFilter === 'Civil/Commercial'
                        ? 'Civil / Commercial'
                        : activeFilter === 'Human Rights and International Law'
                        ? 'Human Rights & International Law'
                        : 'Regular Law'}
                    </h2>
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