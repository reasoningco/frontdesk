import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './CallWidget.css';

// Import components
import Header from './components/Layout/HeaderNew';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePageShadcn';
import AboutUs from './pages/AboutUs';
import OurClinicians from './pages/OurClinicians';
import OurServices from './pages/OurServices';
import ServiceDetail from './pages/ServiceDetail';
import TMSPage from './pages/TMSPage';
import SpravatoPage from './pages/SpravatoPage';
import ContactUs from './pages/ContactUs';
import PatientForms from './pages/PatientForms';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PolicyPage from './pages/PolicyPage';
import VoiceAssistant from './components/VoiceAssistant/VoiceAssistant';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/about-us/:policyType" element={<PolicyPage />} />
            <Route path="/our-providers" element={<OurClinicians />} />
            <Route path="/our-providers/:clinicianId" element={<OurClinicians />} />
            <Route path="/our-services" element={<OurServices />} />
            <Route path="/our-services/:serviceId" element={<ServiceDetail />} />
            <Route path="/tms" element={<TMSPage />} />
            <Route path="/spravato-treatment-center" element={<SpravatoPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/patient-forms" element={<PatientForms />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:postSlug" element={<BlogPost />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>

        <Footer />
        <VoiceAssistant />
      </div>
    </Router>
  );
}

export default App;
