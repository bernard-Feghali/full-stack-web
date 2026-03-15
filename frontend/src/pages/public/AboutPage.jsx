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
            <h1>We are supported by a network of legal experts across Australia and overseas.</h1>
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
                <span className="section-tag">Who We Are & Why We Do What We Do</span>
                <h2>Reliable Legal Support For Individuals</h2>

                <p>
                  Zaydan Lawyers is a boutique law firm carrying forward the Zaydan family's generations long tradition of serving justice,
                  a tradition rooted in West Asia and brought to Australia after the family was displaced by the region's resisted western colonisation.

                  Today, two generations of Zaydan lawyers practice in Australia and New Zealand, led by Bernadette Zaydan.
                  

                  Justice isn't just what we do. It's who we are.
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
                  We fight for justice outcomes, when laws are weaponised to strip people of their
                  human rights, or to shut down their right to do business, we step in
                  </p>
                </div>

                <div className="about-feature-box">
                  <h4>Clear Communication</h4>
                  <p>
                    Whether you're standing up to state overreach,
                  defending your livelihood, or seeking justice across borders,
                   we bring our experience to you.
                  </p>
                </div>
              </div>
            </div>

            <div className="about-info-grid">
              <div className="about-info-card">
                <h3>Areas of Work</h3>
                <ul>
                  <li>Human Rights</li>
                  <li>International Law</li>
                  <li>Civil and Commercial disputes</li>
                  <li>Notary Services</li>
                  <li>Public and Regulatory Law</li>
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