import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { aiFeatures } from '../data/siteData';
import FeatureIcon from './FeatureIcon';

// Get only the "Available Now" features from siteData
const currentFeatures = aiFeatures.filter(feature => feature.status === 'current' && feature.featured);

// Convert siteData features to the format expected by the carousel
const featuresData = currentFeatures.map((feature, index) => {
  // Custom examples for multilingual support
  if (feature.id === 'multilingual-support') {
    return {
      id: feature.id,
      type: 'feature',
      title: feature.title,
      description: feature.description,
      icon: feature.icon,
      examples: [
        `"What are your clinic hours?" (English)`,
        `"क्लिनिक का पता क्या है?" (Hindi)`,
        `"¿Cuáles son los horarios?" (Spanish)`
      ]
    };
  }
  
  // Default examples for other features
  return {
    id: feature.id,
    type: 'feature',
    title: feature.title,
    description: feature.description,
    icon: feature.icon,
    examples: [
      `Use case: ${feature.demoScenario}`,
      `"How does ${feature.title.toLowerCase()} work?"`,
      `"Tell me about ${feature.title.toLowerCase()}"`
    ]
  };
});

const FeaturesSlider = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollPositionRef = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.5; // pixels per frame
    const cardHeight = 180; // approximate card height with gap
    const totalHeight = featuresData.length * cardHeight;
    
    const scroll = () => {
      if (!isPaused) {
        scrollPositionRef.current += scrollSpeed;
        
        // Reset scroll when we've scrolled past the first set of cards
        if (scrollPositionRef.current >= totalHeight) {
          scrollPositionRef.current = 0;
        }
        
        if (scrollContainer) {
          scrollContainer.style.transform = `translateY(-${scrollPositionRef.current}px)`;
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(scroll);
    };
    
    animationFrameRef.current = requestAnimationFrame(scroll);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused]);

  // Duplicate the cards for seamless infinite scroll
  const duplicatedFeatures = [...featuresData, ...featuresData];

  return (
    <div 
      className="relative h-[500px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div ref={scrollRef} className="space-y-4">
          {duplicatedFeatures.map((card, index) => (
            <Card 
              key={`${card.id}-${index}`}
              className="shadow-md hover:shadow-lg transition-shadow bg-white border-0"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                    <FeatureIcon icon={card.icon} className="w-4 h-4" />
                  </div>
                  <div className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                    LIVE
                  </div>
                </div>
                <CardTitle className="text-lg text-primary-600">{card.title}</CardTitle>
                <CardDescription className="text-sm text-neutral-600 mb-2">
                  {card.description}
                </CardDescription>
                <CardDescription className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                  Example Questions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {card.examples.map((example, idx) => (
                    <div 
                      key={idx}
                      className="text-sm text-neutral-600 bg-neutral-50 rounded-lg px-3 py-2 border-0"
                    >
                      {example}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-neutral-50 to-transparent pointer-events-none z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-neutral-50 to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default FeaturesSlider;
