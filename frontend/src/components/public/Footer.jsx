import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="brandFooter">
          <Link to="/about" className="logoSet">
            <img src="../../../pics/logo.png" alt="Law Office Logo" />
          </Link>
          <p className="footer-media-line">
            © 2026 Bernardette Zaydan. All rights reserved.
            For media enquiries,{' '}
            <Link to="/contact" className="footer-contact-link">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer