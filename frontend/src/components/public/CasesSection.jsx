import { useEffect, useState } from 'react'
import CaseCard from './CaseCard.jsx'

function CasesSection() {
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  if (loading) {
    return (
      <section id="cases" className="cases-section">
        <div className="container">
          <h2>Featured Cases</h2>
          <p>Loading cases...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="cases" className="cases-section">
        <div className="container">
          <h2>Featured Cases</h2>
          <p>{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="cases" className="cases-section">
      <div className="container">
        <h2>Featured Cases</h2>
        <div className="cases-grid">
          {cases.map((item) => (
            <CaseCard key={item.id} caseItem={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CasesSection