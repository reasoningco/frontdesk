import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useConversation } from '@elevenlabs/react';
import { useForm, ValidationError } from '@formspree/react';
import '../../CallWidget.css';
import './VoiceAssistant.css';

const VoiceAssistant = () => {
  const [conversationLog, setConversationLog] = useState([]);
  const [showRating, setShowRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [agentNavigating, setAgentNavigating] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const transcriptRef = useRef(null);
  
  // Formspree form for feedback collection
  const [feedbackState, handleFeedbackSubmit] = useForm("mzzkayvz");
  

  
  const agentId = process.env.REACT_APP_AGENT_ID;
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [conversationLog]);
  
  // Memoized client tools for voice assistant - simplified for single page app
  const clientTools = useMemo(() => {
    return {
      navigate_to_page: async (parameters) => {
        const page = parameters?.page || parameters;
        
        if (!page) {
          return 'Error: No page specified';
        }
        
        const normalizedPage = String(page).toLowerCase().trim();
        
        // Since we only have a single page app now, just scroll to contact section for any navigation request
        if (normalizedPage.includes('contact') || normalizedPage.includes('appointment') || normalizedPage.includes('schedule')) {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            return `Scrolled to contact section where you can get in touch with NeuroPsych Wellness Center`;
          }
        }
        
        // For any other navigation request, explain that everything is on this page
        return `I'm designed to help you with information about NeuroPsych Wellness Center right here on this page. You can try our AI voice assistant to learn about our services, or I can scroll down to the contact section if you'd like to get in touch.`;
      },
      get_current_page: async () => {
        return `Currently on the NeuroPsych Wellness Center homepage with AI Voice Assistant demo`;
      },
      get_practice_info: async () => {
        return `NeuroPsych Wellness Center is located at 3930 Pender Drive, Suite 350, Fairfax, VA 22030. We offer comprehensive psychiatric services including medication management, psychotherapy, TMS treatment, Spravato treatment, and more. We serve Fairfax, Tysons, Springfield, Chantilly, Manassas, Alexandria, and Washington DC areas. You can contact us at the phone number shown on this page or use the contact form below.`;
      }
    };
  }, []);
  
  // Conversation handlers
  const handleConnect = useCallback(() => {
    console.log('✅ Connected to voice assistant');
    setWidgetOpen(true);
  }, []);
  
  const handleDisconnect = useCallback((reason) => {
    console.log('❌ Disconnected from voice assistant');
    console.log('Disconnect reason:', reason);
    console.log('Conversation log at disconnect:', conversationLog);
    setAgentNavigating(false);
    setShowRating(true);
  }, [conversationLog]);
  
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
    alert(`Voice Assistant Error: ${error?.message || JSON.stringify(error)}`);
  }, []);
  
  const conversation = useConversation({
    onConnect: handleConnect,
    onDisconnect: handleDisconnect,
    onMessage: handleMessage,
    onError: handleError,
    onModeChange: (mode) => {
      console.log('Mode changed to:', mode);
    },
    onStatusChange: (status) => {
      console.log('Status changed to:', status);
    },
    clientTools
  });

  const handleStartConversation = useCallback(async () => {
    if (!agentId) {
      console.error('Agent ID not configured');
      alert('Voice assistant not configured. Please check your environment variables.');
      return;
    }
    
    // Request microphone permission first
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the test stream
    } catch (error) {
      console.error('Microphone permission denied:', error);
      alert('Microphone access is required for the voice assistant. Please allow microphone access and try again.');
      return;
    }
    
    setWidgetOpen(true);
    setConversationLog([]);
    setShowRating(false);
    setShowFeedbackForm(false);
    setSelectedRating(0);
    
    try {
      console.log('Starting conversation with agent:', agentId);
      await conversation.startSession({ 
        agentId
      });
      console.log('Conversation started successfully');
    } catch (error) {
      console.error('Failed to start voice conversation:', error);
      alert(`Failed to start voice conversation: ${error?.message || 'Unknown error'}. Please try again.`);
      setWidgetOpen(false);
    }
  }, [agentId, conversation]);

  // Create a global reference to the start conversation function
  useEffect(() => {
    window.startVoiceAssistant = handleStartConversation;
    return () => {
      delete window.startVoiceAssistant;
    };
  }, [handleStartConversation]);
  
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
    // Show feedback form after rating
    setTimeout(() => {
      setShowRating(false);
      setShowFeedbackForm(true);
    }, 1500);
  }, []);

  const handleCloseWidget = useCallback(() => {
    setWidgetOpen(false);
    setShowRating(false);
    setShowFeedbackForm(false);
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
        <div className="voice-assistant-container">
          <button className="voice-assistant-btn" onClick={handleStartConversation}>
            <div className="voice-assistant-pulse"></div>
            <svg className="voice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>Voice Assistant</span>
          </button>
          
          {/* Helpful tooltip */}
          <div className="voice-assistant-tooltip">
            <div className="tooltip-arrow"></div>
            <div className="tooltip-content">
              <p><strong>Try talking to me!</strong></p>
              <p>Ask about services, book appointments, or get help</p>
            </div>
          </div>
        </div>
      )}

      {/* Voice Assistant Widget */}
      {widgetOpen && (
        <div className={`call-widget ${showRating ? 'show-rating-blur' : ''}`}>
          {/* Desktop Header Bar */}
          <div className="call-header-bar">
            <div className="header-left">
              <span className="header-title-bar">NeuroPsych Assistant</span>
              {conversation.status === 'connected' && (
                <>
                  <div className={`sound-wave-mini ${conversation.isSpeaking ? '' : 'inactive'}`}>
                    <div className="sound-wave-bar"></div>
                    <div className="sound-wave-bar"></div>
                    <div className="sound-wave-bar"></div>
                    <div className="sound-wave-bar"></div>
                    <div className="sound-wave-bar"></div>
                  </div>
                  <span className="call-status-text">
                    {conversation.isSpeaking ? 'Speaking' : 'Listening'}
                  </span>
                </>
              )}
              {conversation.status === 'connecting' && (
                <span className="call-status-text">Connecting...</span>
              )}
              {conversation.status !== 'connected' && conversation.status !== 'connecting' && (
                <span className="call-ended-text">Call Ended</span>
              )}
            </div>
            <div className="header-right">
              {(conversation.status === 'connected' || conversation.status === 'connecting') && (
                <button className="end-call-button circle-btn-header" onClick={handleEndCall}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.68-1.36-2.66-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
                  </svg>
                  End Call
                </button>
              )}
              {(conversation.status !== 'connected' && conversation.status !== 'connecting') && (
                <button className="rect-btn-header" onClick={handleCloseWidget}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  Close
                </button>
              )}
            </div>
          </div>

          {/* Widget Content */}
          <div className="call-widget-content">
          {/* Left Panel - Call Info */}
          <div className="call-info-panel">
          </div>

          {/* Right Panel - Transcript */}
          <div className="transcript-panel">
            {/* Mobile Call Header */}
            <div className="mobile-call-header">
              <div className="mobile-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </div>
              <div className="mobile-caller-name">NeuroPsych Assistant</div>
              <div className="mobile-call-status">
                {conversation.status === 'connecting' ? 'Connecting...' : 
                 conversation.status === 'connected' ? (conversation.isSpeaking ? 'Speaking' : 'Listening') : 
                 'Call Ended'}
              </div>
              <div className={`mobile-sound-wave ${conversation.status === 'connected' && conversation.isSpeaking ? '' : 'inactive'}`}>
                <div className="sound-wave-bar"></div>
                <div className="sound-wave-bar"></div>
                <div className="sound-wave-bar"></div>
                <div className="sound-wave-bar"></div>
                <div className="sound-wave-bar"></div>
                <div className="sound-wave-bar"></div>
                <div className="sound-wave-bar"></div>
              </div>
            </div>

            {/* Desktop Transcript */}
            <div className="call-transcript"  ref={transcriptRef}>
              {/* Mobile transcript messages */}
              <div className="mobile-transcript-container">
                {conversationLog.map((log, index) => (
                  <div key={index} className={`chat-bubble ${log.type}`}>
                    <div className="bubble-content">{log.text}</div>
                  </div>
                ))}
              </div>

              {/* Desktop transcript messages */}
              <div className="desktop-only">
                {conversationLog.map((log, index) => (
                  <div key={index} className={`chat-bubble ${log.type}`}>
                    <div className="bubble-content">{log.text}</div>
                  </div>
                ))}
              </div>

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

            {/* Mobile Call Actions */}
            <div className="mobile-call-actions">
              <div className="mobile-action-row">
                {(conversation.status === 'connected' || conversation.status === 'connecting') && (
                  <button className="mobile-action-btn end-call" onClick={handleEndCall}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.68-1.36-2.66-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
                    </svg>
                  </button>
                )}
                <button className="mobile-action-btn close" onClick={handleCloseWidget}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
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

            {showFeedbackForm && (
              <div className="rating-overlay">
                {feedbackState.succeeded ? (
                  <div className="thank-you">
                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <h3>Thanks for your feedback!</h3>
                    <p>Your input helps us improve the AI assistant</p>
                    <button 
                      className="close-feedback-btn"
                      onClick={handleCloseWidget}
                      style={{
                        marginTop: '15px',
                        padding: '8px 16px',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="feedback-form">
                    <h3>Quick Feedback</h3>
                    <p>Help us improve your AI experience</p>
                    <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '300px' }}>
                      <input
                        type="hidden"
                        name="rating"
                        value={selectedRating}
                      />
                      <textarea
                        id="feedback"
                        name="message"
                        placeholder="What went well? What could be better? (optional)"
                        rows="3"
                        style={{
                          padding: '10px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '14px',
                          resize: 'vertical',
                          minHeight: '80px'
                        }}
                      />
                      <ValidationError 
                        prefix="Message" 
                        field="message"
                        errors={feedbackState.errors}
                        style={{ color: '#dc3545', fontSize: '12px' }}
                      />
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          type="submit" 
                          disabled={feedbackState.submitting}
                          style={{
                            flex: 1,
                            padding: '10px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: feedbackState.submitting ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            opacity: feedbackState.submitting ? 0.7 : 1
                          }}
                        >
                          {feedbackState.submitting ? 'Sending...' : 'Send Feedback'}
                        </button>
                        <button 
                          type="button"
                          onClick={handleCloseWidget}
                          style={{
                            padding: '10px 16px',
                            background: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          Skip
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
            
            <div className="powered-by-transcript">Powered by The Reasoning Company</div>
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;