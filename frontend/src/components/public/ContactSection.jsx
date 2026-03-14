import { useState } from 'react'

function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSuccessMessage('')
    setError('')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to send message')
        return
      }

      setSuccessMessage('Message sent successfully')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className="contact-form-wrapper">
      <span className="section-tag">Send a Message</span>
      <h2>Request Legal Assistance</h2>
      <p className="contact-form-intro">
        Fill in the form below and the office will get back to you as soon as
        possible.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <textarea
          name="message"
          rows="7"
          placeholder="Tell us briefly how we can help you"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        {successMessage && (
          <p className="form-success-message">{successMessage}</p>
        )}
        {error && <p className="form-error-message">{error}</p>}

        <button type="submit">Send Message</button>
      </form>
    </div>
  )
}

export default ContactSection