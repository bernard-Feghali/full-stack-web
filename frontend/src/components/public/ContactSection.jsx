function ContactSection() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Form submitted. Backend connection will be added later.')
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2>Contact</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default ContactSection