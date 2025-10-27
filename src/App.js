import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useConversation } from '@elevenlabs/react';
import './App.css';
import './CallWidget.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [agentNavigating, setAgentNavigating] = useState(false);
  const [conversationLog, setConversationLog] = useState([]);
  const [showRating, setShowRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [widgetOpen, setWidgetOpen] = useState(false);
  const transcriptRef = useRef(null);
  
  const agentId = process.env.REACT_APP_AGENT_ID;
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [conversationLog]);
  
  // Memoized client tools to prevent recreation on every render
  const clientTools = useMemo(() => ({
    navigate_to_page: async (parameters) => {
      const page = parameters?.page || parameters;
      
      if (!page) {
        return 'Error: No page specified';
      }
      
      const validPages = ['home', 'services', 'location', 'contact'];
      const normalizedPage = String(page).toLowerCase().trim();
      
      setAgentNavigating(true);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (validPages.includes(normalizedPage)) {
        setActiveSection(normalizedPage);
        setAgentNavigating(false);
        return `Successfully navigated to ${normalizedPage} page`;
      } else if (normalizedPage.includes('service')) {
        setActiveSection('services');
        setAgentNavigating(false);
        return 'Successfully navigated to services page';
      } else if (normalizedPage.includes('location') || normalizedPage.includes('address')) {
        setActiveSection('location');
        setAgentNavigating(false);
        return 'Successfully navigated to location page';
      } else if (normalizedPage.includes('contact')) {
        setActiveSection('contact');
        setAgentNavigating(false);
        return 'Successfully navigated to contact page';
      } else {
        setAgentNavigating(false);
        return `Invalid page "${normalizedPage}". Available pages are: home, services, location, contact`;
      }
    },
    get_current_page: async () => {
      return `Currently on ${activeSection} page`;
    }
  }), [activeSection]);
  
  // Memoized callbacks for conversation handlers
  const handleConnect = useCallback(() => {
    console.log('✅ Connected to agent');
    setWidgetOpen(true);
  }, []);
  
  const handleDisconnect = useCallback(() => {
    console.log('❌ Disconnected from agent');
    setAgentNavigating(false);
    setShowRating(true);
  }, []);
  
  const handleMessage = useCallback((message) => {
    if (message.source === 'user' && message.message) {
      setConversationLog(prev => [...prev, { 
        type: 'user', 
        text: message.message
      }]);
    } else if (message.source === 'ai' && message.message) {
      setConversationLog(prev => [...prev, { 
        type: 'assistant', 
        text: message.message
      }]);
    }
  }, []);
  
  const handleError = useCallback((error) => {
    console.error('⚠️ Error:', error);
  }, []);
  
  const conversation = useConversation({
    onConnect: handleConnect,
    onDisconnect: handleDisconnect,
    onMessage: handleMessage,
    onError: handleError,
    clientTools
  });

  const handleGetSupport = useCallback(async () => {
    if (!agentId) {
      console.error('Agent ID not configured');
      alert('Agent ID not configured. Please check your environment variables.');
      return;
    }
    
    setWidgetOpen(true);
    setConversationLog([]);
    setShowRating(false);
    setSelectedRating(0);
    
    try {
      await conversation.startSession({ agentId });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      alert('Failed to start conversation. Please try again.');
    }
  }, [agentId, conversation]);
  
  const handleEndCall = useCallback(async () => {
    try {
      await conversation.endSession();
      setAgentNavigating(false);
    } catch (error) {
      console.log('Session already ended or error ending:', error);
      setAgentNavigating(false);
      setShowRating(true);
    }
  }, [conversation]);

  const handleRatingSubmit = useCallback((rating) => {
    setSelectedRating(rating);
    console.log('User rated conversation:', rating);
    setTimeout(() => {
      setShowRating(false);
      setSelectedRating(0);
      setConversationLog([]);
    }, 1500);
  }, []);

  const handleCloseWidget = useCallback(() => {
    setWidgetOpen(false);
    setShowRating(false);
    setSelectedRating(0);
    setConversationLog([]);
  }, []);

  const renderContent = useCallback(() => {
    switch(activeSection) {
      case 'home':
        return (
          <div className="content-section">
            <h1>NeuroPsych Wellness Center</h1>
            <p className="subtitle">Expert Psychiatric Treatment</p>
            <p className="description">
              Leading psychiatric center providing mental health care and expert psychiatric treatment in the Fairfax area.
            </p>
          </div>
        );
      case 'services':
        return (
          <div className="content-section">
            <h1>Our Services</h1>
            <p className="subtitle">Comprehensive Mental Health Care</p>
            <div className="services-grid">
              <div className="service-item">Medication Management</div>
              <div className="service-item">Psychotherapy</div>
              <div className="service-item">Telepsychiatry</div>
              <div className="service-item">TMS Treatment</div>
              <div className="service-item">Perinatal Psychiatric Services</div>
              <div className="service-item">Student Mental Health Services</div>
            </div>
          </div>
        );
      case 'location':
        return (
          <div className="content-section">
            <h1>Location</h1>
            <p className="subtitle">We're here to help</p>
            <p className="description">
              3930 Pender Drive, Suite 350<br/>
              Fairfax, VA 22030
            </p>
            <p className="description small">
              Serving: Fairfax, Tysons, Springfield, Chantilly, Manassas, Alexandria, Washington DC
            </p>
          </div>
        );
      case 'contact':
        return (
          <div className="content-section">
            <h1>Contact Us</h1>
            <p className="subtitle">Get in touch today</p>
            <p className="description">
              Phone: 703-865-8686<br/>
              Fax: 703-865-6506
            </p>
            <p className="description small">
              In-network with most insurance providers
            </p>
          </div>
        );
      default:
        return null;
    }
  }, [activeSection]);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">NeuroPsych Wellness</div>
        <div className="nav-links">
          <button 
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => setActiveSection('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
            onClick={() => setActiveSection('services')}
          >
            Services
          </button>
          <button 
            className={`nav-link ${activeSection === 'location' ? 'active' : ''}`}
            onClick={() => setActiveSection('location')}
          >
            Location
          </button>
          <button 
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveSection('contact')}
          >
            Contact
          </button>
        </div>
      </nav>

      {agentNavigating && (
        <div className="agent-navigation-indicator">
          <svg className="navigation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span>Agent navigating...</span>
        </div>
      )}

      <main className="main-content">
        {renderContent()}
      </main>

      {!widgetOpen && (
        <button className="support-btn" onClick={handleGetSupport}>
          <svg className="support-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <span>Get Support</span>
        </button>
      )}

      {widgetOpen && (
        <div className="call-widget">
          {/* Left Panel - Call Info */}
          <div className="call-info-panel">
            <div className="call-profile">
              <div className="call-avatar-large">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div className="caller-details">
                <div className="caller-name">NeuroPsych Support</div>
                <div className="call-status">
                  <span className={`status-dot ${
                    conversation.status === 'connecting' ? 'connecting' : 
                    conversation.status === 'connected' ? '' : 
                    'disconnected'
                  }`}></span>
                  {conversation.status === 'connecting' ? 'Connecting...' : 
                   conversation.status === 'connected' ? (conversation.isSpeaking ? 'Speaking' : 'Listening') : 
                   'Call Ended'}
                </div>
                
                {/* Sound Wave Visualization */}
                <div className={`sound-wave ${conversation.status === 'connected' && conversation.isSpeaking ? '' : 'inactive'}`}>
                  <div className="sound-wave-bar"></div>
                  <div className="sound-wave-bar"></div>
                  <div className="sound-wave-bar"></div>
                  <div className="sound-wave-bar"></div>
                  <div className="sound-wave-bar"></div>
                  <div className="sound-wave-bar"></div>
                  <div className="sound-wave-bar"></div>
                </div>
              </div>
            </div>

            <div className="call-actions">
              {conversation.status === 'connected' || conversation.status === 'connecting' ? (
                <button className="end-call-button" onClick={handleEndCall}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.68-1.36-2.66-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
                  </svg>
                  End Call
                </button>
              ) : null}
              <button className="close-widget-btn-alt" onClick={handleCloseWidget}>
                Close
              </button>
            </div>
          </div>

          {/* Right Panel - Transcript */}
          <div className="transcript-panel">
            <div className="call-transcript" ref={transcriptRef}>
              {conversationLog.map((log, index) => (
                <div key={index} className={`chat-bubble ${log.type}`}>
                  <div className="bubble-content">{log.text}</div>
                </div>
              ))}
              {conversationLog.length === 0 && (
                <div className="empty-state">
                  <svg className="mic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" y1="19" x2="12" y2="23"/>
                    <line x1="8" y1="23" x2="16" y2="23"/>
                  </svg>
                  <p>Start speaking...</p>
                </div>
              )}
            </div>

            {showRating && (
              <div className="rating-overlay">
                {selectedRating === 0 ? (
                  <>
                    <h3>Rate your experience</h3>
                    <p>How was your conversation?</p>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="star-btn"
                          onClick={() => handleRatingSubmit(star)}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="thank-you">
                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <h3>Thank you!</h3>
                    <p>Your feedback helps us improve</p>
                  </div>
                )}
              </div>
            )}
            
            <div className="powered-by-transcript">Powered by Vocal AI</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
