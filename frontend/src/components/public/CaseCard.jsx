function CaseCard({ caseItem }) {
  const imageSrc = caseItem.image_url
    ? `${import.meta.env.VITE_API_URL}${caseItem.image_url}`
    : 'https://via.placeholder.com/400x250?text=No+Image'

  return (
    <article className="featured-case-card">
      <div className="featured-case-image-wrapper">
        <img src={imageSrc} alt={caseItem.title} className="featured-case-image" />
      </div>

      <div className="featured-case-content">
        <span className="featured-case-category">{caseItem.category}</span>
        <h3>{caseItem.title}</h3>
        <p>{caseItem.description}</p>
      </div>
    </article>
  )
}

export default CaseCard