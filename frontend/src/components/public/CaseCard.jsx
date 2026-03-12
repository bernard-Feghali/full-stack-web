function CaseCard({ caseItem }) {
  return (
    <article className="case-card">
      <img src={caseItem.image} alt={caseItem.title} className="case-image" />
      <div className="case-content">
        <h3>{caseItem.title}</h3>
        <p>{caseItem.description}</p>
      </div>
    </article>
  )
}

export default CaseCard