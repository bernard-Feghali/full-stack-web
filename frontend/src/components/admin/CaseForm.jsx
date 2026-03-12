function CaseForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Case submitted. Backend connection will be added later.')
  }

  return (
    <form className="case-form" onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Case Title" required />

      <textarea
        name="description"
        rows="6"
        placeholder="Case Description"
        required
      ></textarea>

      <input type="file" name="image" accept="image/*" />

      <button type="submit">Save Case</button>
    </form>
  )
}

export default CaseForm