import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './globals.css';
import './CallWidget.css';

// Import components
import Header from './components/Layout/HeaderNew';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePageNew';
import VoiceAssistant from './components/VoiceAssistant/VoiceAssistant';
import VoicebotNotice from './components/VoicebotNotice';
import { SkipToContent } from './lib/accessibility';

function App() {
  
  return (
    <Router>
      <div className="App">
        <SkipToContent />
        <Header />
        
        <main id="main-content" className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
        <VoiceAssistant />
        <VoicebotNotice />
      </div>
    </Router>
  );
}

export default App;
