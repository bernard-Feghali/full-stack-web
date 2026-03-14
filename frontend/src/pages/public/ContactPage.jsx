import Header from '../../components/public/Header.jsx'
import Footer from '../../components/public/Footer.jsx'
import ContactSection from '../../components/public/ContactSection.jsx'

function ContactPage() {
  return (
    <>
      <Header />

      <main>
        <section className="contact-hero-banner">
          <div className="container contact-hero-content">
            <span className="section-tag light-tag">Contact</span>
            <h1>Get in Touch for Legal and Notary Services</h1>
            <p>
              Reach out for consultations, legal inquiries, notary services, or
              professional assistance regarding your legal matters.
            </p>
          </div>
        </section>

        <section className="contact-page-section">
          <div className="container">
            <div className="contact-page-grid">
              <div className="contact-details-column">
                <div className="contact-info-card premium-card">
                  <h2>Contact Information</h2>
                  <p className="contact-card-intro">
                    We are available to assist individuals, families, and
                    businesses with reliable legal and notarial support.
                  </p>

                  <div className="contact-detail-box">
                    <span className="contact-label">Phone</span>
                    <p>+961 XX XXX XXX</p>
                  </div>

                  <div className="contact-detail-box">
                    <span className="contact-label">Email</span>
                    <p>contact@lawoffice.com</p>
                  </div>

                  <div className="contact-detail-box">
                    <span className="contact-label">Office Address</span>
                    <p>Beirut, Lebanon</p>
                  </div>

                  <div className="contact-detail-box">
                    <span className="contact-label">Working Hours</span>
                    <p>Monday - Friday, 9:00 AM - 5:00 PM</p>
                  </div>
                </div>

                <div className="media-card premium-card">
                  <h2>Media & Social Platforms</h2>
                  <p className="contact-card-intro">
                    Follow or contact the office through the platforms below.
                  </p>

                  <div className="media-links">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      className="media-link"
                    >
                      <span>Facebook</span>
                      <small>Official updates and public presence</small>
                    </a>

                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="media-link"
                    >
                      <span>Instagram</span>
                      <small>Office presence and public media</small>
                    </a>

                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="media-link"
                    >
                      <span>LinkedIn</span>
                      <small>Professional and business network</small>
                    </a>

                    <a
                      href="https://wa.me/96100000000"
                      target="_blank"
                      rel="noreferrer"
                      className="media-link"
                    >
                      <span>WhatsApp</span>
                      <small>Direct and fast communication</small>
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-form-card premium-card">
                <ContactSection />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default ContactPage