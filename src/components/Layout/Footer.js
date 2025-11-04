import React from 'react';
import { siteInfo } from '../../data/siteData';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-bottom">
          <div className="footer-bottom-content" style={{ justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
            <p>&copy; 2025 {siteInfo.name}. All Rights Reserved.</p>
            <p className="text-xs text-neutral-500">
              All external logos and trademarks are the property of their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;