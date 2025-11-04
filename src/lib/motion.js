import React from 'react';
import { motion } from 'framer-motion';

// Motion utilities that respect user preferences
export const getMotionSettings = () => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return {
    prefersReducedMotion,
    // Reduced motion variants
    fadeIn: prefersReducedMotion 
      ? { initial: {}, animate: {}, transition: { duration: 0 } }
      : { 
          initial: { opacity: 0 }, 
          animate: { opacity: 1 }, 
          transition: { duration: 0.4, ease: "easeOut" } 
        },
    
    fadeInUp: prefersReducedMotion
      ? { initial: {}, animate: {}, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, ease: "easeOut" }
        },
    
    stagger: prefersReducedMotion
      ? { animate: { transition: { staggerChildren: 0 } } }
      : { animate: { transition: { staggerChildren: 0.1 } } },
    
    hover: prefersReducedMotion
      ? {}
      : { 
          whileHover: { scale: 1.02 },
          transition: { type: "spring", stiffness: 400, damping: 25 }
        },
    
    tap: prefersReducedMotion
      ? {}
      : { whileTap: { scale: 0.98 } }
  };
};

// Hook for motion settings
export const useMotionSettings = () => {
  const [settings, setSettings] = React.useState(getMotionSettings());
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      setSettings(getMotionSettings());
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return settings;
};

// Safe motion component that respects preferences
export const SafeMotion = ({ children, variants, ...props }) => {
  const { prefersReducedMotion } = getMotionSettings();
  
  if (prefersReducedMotion) {
    return children;
  }
  
  return (
    <motion.div variants={variants} {...props}>
      {children}
    </motion.div>
  );
};