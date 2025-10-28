import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteInfo } from '../../data/siteData';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      {/* Top Bar with Contact Info */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="contact-info">
              <span className="phone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call Today: {siteInfo.phone}
              </span>
              <span className="hours">{siteInfo.hours}</span>
            </div>
            <div className="quick-links">
              <Link to={siteInfo.patientPortal} className="portal-link" target="_blank" rel="noopener noreferrer">
                Patient Portal
              </Link>
              <Link to={siteInfo.paymentLink} className="payment-link" target="_blank" rel="noopener noreferrer">
                Pay Bill
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <Link to="/" className="nav-brand">
              {siteInfo.name}
            </Link>

            {/* Desktop Navigation */}
            <div className="nav-links desktop-nav">
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                Home
              </Link>
              
              <div className="nav-dropdown">
                <Link to="/about-us" className={`nav-link ${isActive('/about-us') ? 'active' : ''}`}>
                  About Us
                  <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </Link>
                <div className="dropdown-menu">
                  <Link to="/about-us">About Our Practice</Link>
                  <Link to="/about-us/cancellation-policy">Cancellation Policy</Link>
                  <Link to="/about-us/medication-refill-policy">Medication Refill Policy</Link>
                  <Link to="/about-us/financial-policy">Financial Policy</Link>
                  <Link to="/patient-forms">Patient Forms</Link>
                </div>
              </div>

              <Link to="/our-providers" className={`nav-link ${isActive('/our-providers') ? 'active' : ''}`}>
                Our Clinicians
              </Link>

              <div className="nav-dropdown">
                <Link to="/our-services" className={`nav-link ${isActive('/our-services') ? 'active' : ''}`}>
                  Our Services
                  <svg className="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </Link>
                <div className="dropdown-menu">
                  <Link to="/our-services/medication-management">Medication Management</Link>
                  <Link to="/our-services/counseling-psychotherapy">Counseling & Psychotherapy</Link>
                  <Link to="/our-services/telepsychiatry">Telepsychiatry</Link>
                  <Link to="/our-services/psychological-testing">Psychological Testing</Link>
                  <Link to="/our-services/perinatal-psychiatry">Perinatal Psychiatry</Link>
                  <Link to="/our-services/student-services">Student Services</Link>
                </div>
              </div>

              <Link to="/tms" className={`nav-link ${isActive('/tms') ? 'active' : ''}`}>
                TMS
              </Link>

              <Link to="/spravato-treatment-center" className={`nav-link ${isActive('/spravato') ? 'active' : ''}`}>
                Spravato
              </Link>

              <Link to="/contact-us" className={`nav-link ${isActive('/contact-us') ? 'active' : ''}`}>
                Contact Us
              </Link>

              <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>
                Blog
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12"/>
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18"/>
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="mobile-nav">
              <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/about-us" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              <Link to="/our-providers" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Our Clinicians
              </Link>
              <Link to="/our-services" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Our Services
              </Link>
              <Link to="/tms" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                TMS
              </Link>
              <Link to="/spravato-treatment-center" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Spravato
              </Link>
              <Link to="/contact-us" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
              <Link to="/blog" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link to="/patient-forms" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Patient Forms
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;