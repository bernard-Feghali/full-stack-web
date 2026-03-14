import Header from '../../components/public/Header.jsx'
import Footer from '../../components/public/Footer.jsx'

function NotaryServicesPage() {
  const services = [
    {
      id: 1,
      title: 'Document Certification',
      description:
        'Certification and notarization of official and legal documents with care, accuracy, and confidentiality.',
    },
    {
      id: 2,
      title: 'Signature Authentication',
      description:
        'Verification and authentication of signatures for agreements, declarations, and official records.',
    },
    {
      id: 3,
      title: 'Affidavits and Declarations',
      description:
        'Preparation and notarization of sworn statements, affidavits, and declarations for legal use.',
    },
    {
      id: 4,
      title: 'Power of Attorney Documents',
      description:
        'Support with powers of attorney and notarization of authorization documents where required.',
    },
    {
      id: 5,
      title: 'Certified Copies',
      description:
        'Issuing and certifying document copies in accordance with applicable legal procedures.',
    },
    {
      id: 6,
      title: 'Witnessing Legal Documents',
      description:
        'Professional witnessing of documents with attention to formal requirements and legal reliability.',
    },
  ]

  return (
    <>
      <Header />

      <main className="service-page-section">
        <div className="container">
          <div className="service-page-header">
            <span className="section-tag">Notary Services</span>
            <h1>Reliable Notary Services</h1>
            <p>
              Trusted notarial support for individuals, families, and businesses
              requiring accurate document handling and certification.
            </p>
          </div>

          <div className="service-page-grid">
            {services.map((service) => (
              <article key={service.id} className="service-page-card">
                <div className="service-card-top-line"></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default NotaryServicesPage