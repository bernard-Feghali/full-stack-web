import cases from '../../data/cases.js'
import CaseCard from './CaseCard.jsx'

function CasesSection() {
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