import React from 'react';
import ContactForm from '../components/Forms/ContactForm';

const ContactUs = () => {
  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1>Contact Us</h1>
          <p>Get in touch with our practice today.</p>
        </div>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <ContactForm title="Contact Us" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;