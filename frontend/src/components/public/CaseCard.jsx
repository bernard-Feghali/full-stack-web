function CaseCard({ caseItem }) {
  const imageSrc = caseItem.image_url
    ? `http://localhost:5000${caseItem.image_url}`
    : 'https://via.placeholder.com/400x250?text=No+Image'

  return (
    <article className="case-card">
      <img src={imageSrc} alt={caseItem.title} className="case-image" />
      <div className="case-content">
        <h3>{caseItem.title}</h3>
        <p>{caseItem.description}</p>
      </div>
    </article>
  )
}

export default CaseCard