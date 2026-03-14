import Header from '../../components/public/Header.jsx'
import Footer from '../../components/public/Footer.jsx'

function AboutPage() {
  return (
    <>
      <Header />

      <main>
        <section className="about-hero-banner">
          <div className="container about-hero-content">
            <span className="section-tag light-tag">About</span>
            <h1>Professional Legal Guidance With Integrity and Commitment</h1>
            <p>
              A law office dedicated to providing trusted legal representation,
              notary services, and professional client support with clarity,
              confidentiality, and precision.
            </p>
          </div>
        </section>

        <section className="about-page-section">
          <div className="container">
            <div className="about-layout">
              <div className="about-main-card">
                <span className="section-tag">Who We Are</span>
                <h2>Reliable Legal Support For Individuals and Businesses</h2>

                <p>
                  This law office provides professional legal representation and
                  notarial services with a strong focus on accuracy,
                  confidentiality, and ethical legal practice.
                </p>

                <p>
                  With experience in legal documentation, consultation, and case
                  handling, the office supports clients through important legal
                  matters with care, professionalism, and attention to detail.
                </p>

                <p>
                  Every client is treated with respect and receives clear,
                  practical guidance throughout every step of the legal process.
                </p>
              </div>

              <div className="about-side-card">
                <h3>Core Values</h3>

                <div className="about-feature-box">
                  <h4>Professional Integrity</h4>
                  <p>
                    Every legal matter is handled with responsibility,
                    confidentiality, and ethical commitment.
                  </p>
                </div>

                <div className="about-feature-box">
                  <h4>Client-Centered Service</h4>
                  <p>
                    The office focuses on understanding each client’s needs and
                    offering practical legal support.
                  </p>
                </div>

                <div className="about-feature-box">
                  <h4>Clear Communication</h4>
                  <p>
                    Clients receive transparent explanations and dependable
                    guidance throughout the process.
                  </p>
                </div>
              </div>
            </div>

            <div className="about-info-grid">
              <div className="about-info-card">
                <h3>Areas of Work</h3>
                <ul>
                  <li>Legal consultations</li>
                  <li>Case representation</li>
                  <li>Notary services</li>
                  <li>Legal document preparation</li>
                  <li>Contract review and certification</li>
                </ul>
              </div>

              <div className="about-info-card">
                <h3>Office Approach</h3>
                <p>
                  The office combines professionalism, legal precision, and
                  client care to deliver dependable legal and notarial services
                  for a wide range of needs.
                </p>
              </div>

              <div className="about-info-card">
                <h3>Commitment</h3>
                <p>
                  Every case and document is handled with seriousness,
                  confidentiality, and a commitment to protecting the client’s
                  interests.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default AboutPage