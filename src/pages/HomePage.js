import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siteInfo, services, testimonials } from '../data/siteData';
import ContactForm from '../components/Forms/ContactForm';
import './HomePage.css';

const HomePage = () => {
  const featuredServices = services.filter(service => service.featured);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div className="hero-text" variants={fadeInUp}>
              <motion.div 
                className="hero-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span>✨ Trusted by 1000+ patients</span>
              </motion.div>
              
              <h1>Transform Your Mental Health Journey</h1>
              <p className="hero-subtitle">
                Expert psychiatric care designed for your unique needs
              </p>
              <p className="hero-description">
                Experience compassionate, evidence-based mental health treatment from our team of 
                licensed psychiatrists and therapists. We're here to support your path to wellness.
              </p>
              
              <motion.div 
                className="hero-actions"
                variants={fadeInUp}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/contact-us" className="cta-button primary">
                    Start Your Journey
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a href={`mailto:${siteInfo.email}`} className="cta-button secondary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Contact Us
                  </a>
                </motion.div>
              </motion.div>

              <motion.div 
                className="trust-indicators"
                variants={fadeInUp}
              >
                <div className="trust-item">
                  <span className="trust-number">15+</span>
                  <span className="trust-label">Years Experience</span>
                </div>
                <div className="trust-item">
                  <span className="trust-number">7+</span>
                  <span className="trust-label">Expert Clinicians</span>
                </div>
                <div className="trust-item">
                  <span className="trust-number">1000+</span>
                  <span className="trust-label">Lives Improved</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="hero-visual"
              variants={fadeInUp}
            >
              <motion.div 
                className="hero-card"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="hero-card-content">
                  <div className="hero-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <h3>Personalized Care</h3>
                  <p>Tailored treatment plans designed specifically for your mental health goals</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="featured-services">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Expert Mental Health Services</h2>
            <p>Comprehensive care tailored to your unique needs</p>
          </motion.div>
          
          <motion.div 
            className="services-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Link 
                  to={service.hasSubpage ? `/${service.id}` : `/our-services/${service.id}`}
                  className="service-card"
                >
                  <div className="service-header">
                    <div className="service-icon">{service.icon}</div>
                    <motion.div 
                      className="service-arrow"
                      whileHover={{ x: 4 }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </motion.div>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="services-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/our-services" className="cta-button outline">
                Explore All Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About NeuroPsych Wellness Center</h2>
              <p>
                NeuroPsych Wellness Center is a Fairfax City Psychiatric Clinic dedicated to 
                providing quality care for children, teens, and adults. Founded by Dr. Alok Kumar, MD, 
                our practice brings together experienced mental health professionals who specialize 
                in various aspects of psychiatric care.
              </p>
              <div className="expertise-list">
                <h3>Our providers have expertise in:</h3>
                <ul>
                  <li>Anxiety and Mood Disorders</li>
                  <li>ADD/ADHD Treatment</li>
                  <li>Postpartum Disorders</li>
                  <li>Autism Spectrum Disorders</li>
                  <li>Trauma and PTSD</li>
                  <li>TMS for Depression</li>
                  <li>Sleep Disorders</li>
                  <li>And much more</li>
                </ul>
              </div>
              <Link to="/about-us" className="cta-button outline">
                Learn More About Us
              </Link>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Years of Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">7+</div>
                <div className="stat-label">Licensed Clinicians</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">13+</div>
                <div className="stat-label">Specialized Services</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Patients Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="quick-access">
        <div className="container">
          <div className="quick-access-grid">
            <div className="quick-access-item">
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 9V5a3 3 0 0 0-6 0v4"/>
                  <rect x="2" y="9" width="20" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="15" r="1"/>
                </svg>
              </div>
              <h3>Patient Portal</h3>
              <p>Access your medical records, test results, and communicate with your provider</p>
              <a href={siteInfo.patientPortal} target="_blank" rel="noopener noreferrer" className="quick-link">
                Access Portal
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>

            <div className="quick-access-item">
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3>Online Bill Payment</h3>
              <p>Convenient and secure online payment for your medical bills</p>
              <a href={siteInfo.paymentLink} target="_blank" rel="noopener noreferrer" className="quick-link">
                Pay Now
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>

            <div className="quick-access-item">
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h3>Patient Forms</h3>
              <p>Complete required forms online before your appointment</p>
              <Link to="/patient-forms" className="quick-link">
                View Forms
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Get Started Today</h2>
              <p>
                If you or a loved one is struggling with psychiatric issues, don't hesitate to reach out. 
                Schedule an appointment today and take the first step toward better mental health.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div>
                    <strong>{siteInfo.address.street}</strong>
                    <br />
                    {siteInfo.address.city}, {siteInfo.address.state} {siteInfo.address.zip}
                  </div>
                </div>

                <div className="contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <div>
                    <strong>Hours:</strong>
                    <br />
                    {siteInfo.hours}
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-container">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our Patients Say</h2>
            <p>Real experiences from real patients</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="stars">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                  <p>"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.name}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;