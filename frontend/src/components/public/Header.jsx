import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <div className="brand">
        <Link to="/about" className="logoSet">
            <img src="../../../pics/logo.png" alt="Law Office Logo" />
          </Link>
        <h1 className="logo">Law Office</h1>
        
        </div>
        <nav className="nav-links">
          
          
          <Link to="/about">Home</Link>
          <Link to="/legal-services">Legal Services</Link>
          <Link to="/notary-services">Notary Services</Link>
          <Link to="/contact">Media & Contact</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header