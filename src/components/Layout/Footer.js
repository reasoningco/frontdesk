import React from 'react';
import { Link } from 'react-router-dom';
import { siteInfo } from '../../data/siteData';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo-section">
              <img 
                src="/reasoning-temp-logo.png" 
                alt={`${siteInfo.name} Logo`}
                className="footer-logo"
                style={{ height: '60px', width: 'auto', marginBottom: '1rem' }}
              />
              <h3>{siteInfo.name}</h3>
              <p className="tagline">{siteInfo.tagline}</p>
            </div>
            <div className="address">
              <p>{siteInfo.address.street}</p>
              <p>{siteInfo.address.city}, {siteInfo.address.state} {siteInfo.address.zip}</p>
            </div>
            <div className="contact-details">
              <p>
                <strong>Phone:</strong> 
                <a href={`tel:${siteInfo.phone.replace(/\D/g, '')}`}>{siteInfo.phone}</a>
              </p>
              <p>
                <strong>Email:</strong> 
                <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
              </p>
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-section">
            <h4>AI Frontdesk</h4>
            <ul>
              <li><Link to="/product">Product Overview</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/demo">Live Demo</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/security">Security</Link></li>
              <li><Link to="/docs">API Documentation</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="footer-section">
            <h4>Solutions</h4>
            <ul>
              <li><Link to="/solutions/mental-health">Mental Health Clinics</Link></li>
              <li><Link to="/solutions/general-practice">General Practice</Link></li>
              <li><Link to="/solutions/specialty">Specialty Clinics</Link></li>
              <li><Link to="/case-study/neuropsych">NeuroPsych Case Study</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 {siteInfo.name}. All Rights Reserved.</p>
            <div className="footer-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <span>Featuring {siteInfo.demoClient.name}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;