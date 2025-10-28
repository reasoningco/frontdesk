import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { siteInfo } from '../../data/siteData';
import { cn } from '../../lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Demo', href: '#scenarios' },
    { label: 'Contact', href: '#contact' },
  ];



  return (
    <>
      {/* Top Bar */}
      <motion.div 
        className="bg-primary/5 border-b border-primary/10 overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex items-center justify-center py-2 text-sm"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div 
              className="flex items-center space-x-2 text-primary"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.svg 
                className="h-3 w-3" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </motion.svg>
              <motion.span 
                className="font-medium"
                animate={{ 
                  opacity: [1, 0.7, 1] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                Live Demo Site - NeuroPsych Wellness Center
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-500 ease-out",
          isScrolled 
            ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg" 
            : "bg-background/80 backdrop-blur-lg border-b border-transparent"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          scale: isScrolled ? 0.98 : 1,
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.6 
        }}
        style={{
          transform: `translateY(${Math.max(0, scrollY * 0.1)}px)`,
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex items-center justify-between"
            animate={{ 
              height: isScrolled ? "60px" : "64px",
              paddingTop: isScrolled ? "8px" : "0px",
              paddingBottom: isScrolled ? "8px" : "0px"
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link to="/" className="flex items-center space-x-3">
                <motion.img 
                  src="/reasoning-temp-logo.png" 
                  alt={`${siteInfo.name} Logo`}
                  className="object-contain"
                  animate={{ 
                    height: isScrolled ? "32px" : "40px",
                    opacity: isScrolled ? 0.9 : 1
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span 
                  className="font-bold text-foreground hidden sm:block"
                  animate={{ 
                    fontSize: isScrolled ? "18px" : "20px",
                    opacity: isScrolled ? 0.85 : 1
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {siteInfo.name}
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav 
              className="hidden lg:flex items-center space-x-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {navigationItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {item.href.startsWith('#') ? (
                    <button
                      onClick={() => {
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                        "text-muted-foreground hover:text-foreground hover:bg-accent/80"
                      )}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                        isActive(item.href)
                          ? "text-primary bg-primary/10 shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/80"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.nav>

            {/* CTA Buttons */}
            <motion.div 
              className="hidden lg:flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const voiceAssistantBtn = document.querySelector('.voice-assistant-btn');
                    if (voiceAssistantBtn) {
                      voiceAssistantBtn.click();
                    }
                  }}
                >
                  Try Chat Now
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button 
                  size="sm" 
                  className="group"
                  onClick={() => {
                    const element = document.querySelector('#contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Get Started
                  <motion.svg 
                    className="ml-2 h-3 w-3" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    animate={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <polyline points="9 18 15 12 9 6"/>
                  </motion.svg>
                </Button>
              </motion.div>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                <motion.div
                  animate={{ rotate: isMobileOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isMobileOpen ? (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 12h18M3 6h18M3 18h18"/>
                    </svg>
                  )}
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ 
                duration: 0.4, 
                ease: "easeInOut",
                staggerChildren: 0.1
              }}
              className="lg:hidden border-t bg-background/98 backdrop-blur-xl shadow-xl"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.href.startsWith('#') ? (
                      <button
                        onClick={() => {
                          const element = document.querySelector(item.href);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                          setIsMobileOpen(false);
                        }}
                        className={cn(
                          "block py-3 px-2 text-sm font-medium transition-all duration-300 rounded-lg w-full text-left",
                          "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        )}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        className={cn(
                          "block py-3 px-2 text-sm font-medium transition-all duration-300 rounded-lg",
                          isActive(item.href)
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        )}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                
                <motion.div 
                  className="pt-4 space-y-3 border-t"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        const voiceAssistantBtn = document.querySelector('.voice-assistant-btn');
                        if (voiceAssistantBtn) {
                          voiceAssistantBtn.click();
                        }
                        setIsMobileOpen(false);
                      }}
                    >
                      Try Chat Now
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        const element = document.querySelector('#contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                        setIsMobileOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;