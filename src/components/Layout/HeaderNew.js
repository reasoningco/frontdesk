import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { siteInfo } from '../../data/siteData';
import { cn } from '../../lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  // Advanced scroll behavior: hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY ? "down" : "up";
    const isScrollingDown = direction === "down";
    
    setIsScrolled(latest > 50);
    
    if (latest > 100 && isScrollingDown) {
      setIsHidden(true);
    } else if (!isScrollingDown) {
      setIsHidden(false);
    }
    
    setLastScrollY(latest);
  });



  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-neutral-900 text-white py-2 text-sm">
        <div className="container">
          <div className="flex justify-center items-center gap-4">
            <span className="text-neutral-300">Live AI Demo - Try our voice assistant</span>
            <button 
              className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 flex items-center gap-1"
              onClick={() => {
                // Call the global voice assistant function
                if (window.startVoiceAssistant) {
                  window.startVoiceAssistant();
                }
              }}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
              Try Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 ease-out",
          isScrolled 
            ? "bg-white/95 backdrop-blur-xl border-b border-neutral-200/50 shadow-sm" 
            : "bg-white/80 backdrop-blur-sm border-b border-transparent"
        )}
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0.8 }
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ 
          duration: 0.35, 
          ease: "easeInOut" 
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between py-4">
            {/* Brand */}
            <motion.div
              className="flex-1 flex justify-center lg:flex-initial lg:justify-start"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link 
                to="/" 
                className="flex items-center gap-3 group"
              >
                <img 
                  src="/reasoning-logo.png" 
                  alt="The Reasoning Company Logo" 
                  className="h-10 w-auto transition-transform duration-200 group-hover:scale-105"
                />
                <span 
                  className="text-2xl font-bold transition-colors tracking-tight"
                  style={{ fontFamily: 'Gotham, sans-serif', color: '#00167a' }}
                >
                  {siteInfo.name}
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="font-medium transition-colors duration-200 text-balance px-4 py-2 rounded-lg text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 cursor-pointer"
              >
                Contact Us
              </button>
            </nav>

            {/* Mobile Navigation - Show Contact Us on mobile too */}
            <div className="lg:hidden">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="font-medium transition-colors duration-200 text-balance px-4 py-2 rounded-lg text-sm text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>


      </motion.header>
    </>
  );
};

export default Header;