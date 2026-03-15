function CaseCard({ caseItem }) {
  const imageSrc = caseItem.image_url
    ? `http://localhost:5000${caseItem.image_url}`
    : 'https://via.placeholder.com/400x250?text=No+Image'

  return (
    <article className="featured-case-card">
      <div className="featured-case-image-wrapper">
        <img
          src={imageSrc}
          alt={caseItem.title}
          className="featured-case-image"
        />
      </div>

      <div className="featured-case-content">
        <span className="featured-case-category">{caseItem.category}</span>
        <h3>{caseItem.title}</h3>
        <p>{caseItem.description}</p>

        {caseItem.reference_url && caseItem.reference_label && (
          <div className="case-reference">
            <a href={caseItem.reference_url} target="_blank" rel="noreferrer">
              {caseItem.reference_label}
            </a>
          </div>
        )}
      </div>
    </article>
  )
}

export default CaseCard