import React, { useState, useEffect } from 'react';

const VoicebotNotice = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the notice
    const dismissed = localStorage.getItem('voicebotNoticeDismissed');
    if (!dismissed) {
      // Show notice after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('voicebotNoticeDismissed', 'true');
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div 
      className="fixed bottom-6 left-6 max-w-sm bg-white rounded-lg shadow-xl border border-neutral-200 z-50 animate-slideIn"
      style={{
        animation: 'slideIn 0.4s ease-out'
      }}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-neutral-900 mb-1">
              Voice AI in Development
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed mb-2">
              Our voicebot is currently in development. We use interaction data to improve our services. 
              The bot will only answer questions related to services provided by NeuroPsych Wellness Center.
            </p>
            <button
              onClick={handleDismiss}
              className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Dismiss
            </button>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Close notice"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default VoicebotNotice;
