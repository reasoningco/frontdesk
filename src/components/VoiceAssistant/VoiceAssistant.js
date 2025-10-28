import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useConversation } from '@elevenlabs/react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../CallWidget.css';
import './VoiceAssistant.css';

const VoiceAssistant = () => {
  const [conversationLog, setConversationLog] = useState([]);
  const [showRating, setShowRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [agentNavigating, setAgentNavigating] = useState(false);
  const transcriptRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const agentId = process.env.REACT_APP_AGENT_ID;
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [conversationLog]);
  
  // Memoized client tools for voice assistant navigation
  const clientTools = useMemo(() => {
    return {
      navigate_to_page: async (parameters) => {
        const page = parameters?.page || parameters;
        
        if (!page) {
          return 'Error: No page specified';
        }
        
        const pageMap = {
          'home': '/',
          'about': '/about-us',
          'about us': '/about-us',
          'clinicians': '/our-providers',
          'providers': '/our-providers',
          'doctors': '/our-providers',
          'services': '/our-services',
          'treatment': '/our-services',
          'tms': '/tms',
          'spravato': '/spravato-treatment-center',
          'contact': '/contact-us',
          'contact us': '/contact-us',
          'forms': '/patient-forms',
          'patient forms': '/patient-forms',
          'blog': '/blog',
          'location': '/contact-us',
          'address': '/contact-us'
        };
        
        const normalizedPage = String(page).toLowerCase().trim();
        
        setAgentNavigating(true);
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        let targetPath = pageMap[normalizedPage];
        
        // Handle partial matches
        if (!targetPath) {
          for (const [key, path] of Object.entries(pageMap)) {
            if (normalizedPage.includes(key) || key.includes(normalizedPage)) {
              targetPath = path;
              break;
            }
          }
        }
        
        if (targetPath) {
          navigate(targetPath);
          setAgentNavigating(false);
          return `Successfully navigated to ${normalizedPage} page`;
        } else {
          setAgentNavigating(false);
          return `Invalid page "${normalizedPage}". Available pages are: home, about us, clinicians, services, TMS, Spravato, contact us, patient forms, blog`;
        }
      },
      get_current_page: async () => {
        const pathMap = {
          '/': 'home',
          '/about-us': 'about us',
          '/our-providers': 'clinicians',
          '/our-services': 'services',
          '/tms': 'TMS',
          '/spravato-treatment-center': 'Spravato treatment center',
          '/contact-us': 'contact us',
          '/patient-forms': 'patient forms',
          '/blog': 'blog'
        };
        
        const currentPage = pathMap[location.pathname] || location.pathname;
        return `Currently on ${currentPage} page`;
      },
      get_practice_info: async () => {
        return `NeuroPsych Wellness Center is located at 3930 Pender Drive, Suite 350, Fairfax, VA 22030. Phone: 703-865-8686. We offer comprehensive psychiatric services including medication management, psychotherapy, TMS treatment, Spravato treatment, and more. We serve Fairfax, Tysons, Springfield, Chantilly, Manassas, Alexandria, and Washington DC areas.`;
      }
    };
  }, [navigate, location.pathname]);
  
  // Conversation handlers
  const handleConnect = useCallback(() => {
    console.log('✅ Connected to voice assistant');
    setWidgetOpen(true);
  }, []);
  
  const handleDisconnect = useCallback(() => {
    console.log('❌ Disconnected from voice assistant');
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
    console.error('⚠️ Voice Assistant Error:', error);
  }, []);
  
  const conversation = useConversation({
    onConnect: handleConnect,
    onDisconnect: handleDisconnect,
    onMessage: handleMessage,
    onError: handleError,
    clientTools
  });

  const handleStartConversation = useCallback(async () => {
    if (!agentId) {
      console.error('Agent ID not configured');
      alert('Voice assistant not configured. Please check your environment variables.');
      return;
    }
    
    setWidgetOpen(true);
    setConversationLog([]);
    setShowRating(false);
    setSelectedRating(0);
    
    try {
      await conversation.startSession({ agentId });
    } catch (error) {
      console.error('Failed to start voice conversation:', error);
      alert('Failed to start voice conversation. Please try again.');
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
    console.log('User rated voice conversation:', rating);
    setTimeout(() => {
      setWidgetOpen(false);
      setShowRating(false);
      setSelectedRating(0);
      setHoveredRating(0);
      setConversationLog([]);
    }, 1500);
  }, []);

  const handleCloseWidget = useCallback(() => {
    setWidgetOpen(false);
    setShowRating(false);
    setSelectedRating(0);
    setHoveredRating(0);
    setConversationLog([]);
  }, []);

  return (
    <>
      {/* Agent Navigation Indicator */}
      {agentNavigating && (
        <div className="agent-navigation-indicator">
          <svg className="navigation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span>Voice assistant navigating...</span>
        </div>
      )}

      {/* Voice Assistant Button */}
      {!widgetOpen && (
        <button className="voice-assistant-btn" onClick={handleStartConversation}>
          <svg className="voice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
          <span>Voice Assistant</span>
        </button>
      )}

      {/* Voice Assistant Widget */}
      {widgetOpen && (
        <div className={`voice-widget ${showRating ? 'show-rating-blur' : ''}`}>
          {/* Left Panel - Call Info */}
          <div className="call-info-panel">
            <div className="call-profile">
              <div className="call-avatar-large">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </div>
              <div className="caller-details">
                <div className="caller-name">NeuroPsych Assistant</div>
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
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onTouchStart={() => setHoveredRating(star)}
                          onClick={() => handleRatingSubmit(star)}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className={star <= hoveredRating ? 'star-filled' : 'star-empty'}>
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
    </>
  );
};

export default VoiceAssistant;