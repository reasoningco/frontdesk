import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Star, MessageCircle, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { siteInfo, aiFeatures, clientTestimonials } from '../data/siteData';
import ContactForm from '../components/Forms/ContactForm';
import VoiceAssistant from '../components/VoiceAssistant/VoiceAssistant';

const HomePage = () => {
  const featuredFeatures = aiFeatures.filter(feature => feature.featured);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Interactive Demo Instructions */}
      <section id="scenarios" className="py-20 bg-gradient-to-b from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                🎯 This is a Live Interactive Demo
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                This entire website is powered by AI Frontdesk, configured specifically for 
                NeuroPsych Wellness Center. The chat widget below can handle real patient scenarios!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Try These Messages:
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "I need to schedule a TMS consultation",
                    "Does my insurance cover Spravato treatment?",
                    "I'm having a mental health crisis",
                    "Necesito programar una cita (Spanish)",
                    "I need a medication refill",
                    "I missed my appointment, can I reschedule?"
                  ].map((message, index) => (
                    <div key={index} className="p-3 bg-primary/10 rounded-lg text-sm cursor-pointer hover:bg-primary/20 transition-colors"
                         onClick={() => {
                           // Copy to clipboard and open VoiceAssistant
                           navigator.clipboard?.writeText(message);
                           setTimeout(() => {
                             const voiceAssistantBtn = document.querySelector('.voice-assistant-btn');
                             if (voiceAssistantBtn) {
                               voiceAssistantBtn.click();
                             }
                           }, 100);
                         }}>
                      "{message}"
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card className="p-6 bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    What You'll Experience:
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Intelligent appointment scheduling with real availability</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Insurance verification for TMS and Spravato treatments</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Crisis detection with immediate emergency resources</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Multilingual support (try Spanish!)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Natural conversation about mental health services</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-background/60 backdrop-blur-sm rounded-xl p-6 border-2 border-dashed border-primary/30">
              <p className="text-lg font-semibold text-foreground mb-2">
                👇 Scroll down to find the chat widget and start your conversation!
              </p>
              <p className="text-muted-foreground">
                Built by <strong>The Reasoning Company</strong> • Configured for <strong>NeuroPsych Wellness Center</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Advancements - AI Capabilities */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              🚀 Future Advancements
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore the advanced AI capabilities we're building into our healthcare communication platform.
              Each feature represents cutting-edge technology designed to transform patient care.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full group hover:shadow-xl transition-all cursor-pointer border-2 hover:border-primary/50"
                     onClick={() => {
                       // Copy sample scenario text to clipboard
                       const sampleText = `I need help with ${feature.demoScenario.toLowerCase()}`;
                       navigator.clipboard?.writeText(sampleText);
                       // Open the VoiceAssistant widget by clicking its button
                       setTimeout(() => {
                         const voiceAssistantBtn = document.querySelector('.voice-assistant-btn');
                         if (voiceAssistantBtn) {
                           voiceAssistantBtn.click();
                         }
                       }, 200);
                     }}>
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors">
                        {feature.icon}
                      </div>
                      <motion.div 
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed mb-3">
                      {feature.description}
                    </CardDescription>
                    <div className="bg-primary/5 rounded-lg p-3 mb-3 border border-primary/20">
                      <p className="text-sm font-medium text-primary mb-1">Try saying:</p>
                      <p className="text-sm text-muted-foreground italic">
                        "I need help with {feature.demoScenario.toLowerCase()}"
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Click to test now
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border-2 border-dashed border-primary/30">
              <h3 className="text-lg font-semibold mb-3 flex items-center justify-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                How to Use This Demo
              </h3>
              <div className="text-muted-foreground space-y-2 text-sm">
                <p>1. Click any scenario card above to copy sample text</p>
                <p>2. Scroll down to find the chat widget</p>
                <p>3. Paste or type your message to start chatting with the AI</p>
                <p>4. Try different scenarios to see our AI's versatility!</p>
              </div>
            </div>
            
            <Button 
              variant="default" 
              size="lg"
              onClick={() => {
                // Open the VoiceAssistant widget by clicking its button
                const voiceAssistantBtn = document.querySelector('.voice-assistant-btn');
                if (voiceAssistantBtn) {
                  voiceAssistantBtn.click();
                }
              }}
            >
              Start Chat Now
              <MessageCircle className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Ready to Transform Your Practice?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Join healthcare providers like NeuroPsych Wellness Center who have revolutionized 
                  their patient communication with AI Frontdesk. Book a personalized demo today.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Call: {siteInfo.phone}</div>
                    <div className="text-muted-foreground">Sales & Demo Requests</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MessageCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Email: {siteInfo.email}</div>
                    <div className="text-muted-foreground">Technical Support</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Globe className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground">Location:</div>
                    <div className="text-muted-foreground">
                      {siteInfo.address.city}, {siteInfo.address.state}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl">Request Demo</CardTitle>
                <CardDescription>
                  See AI Frontdesk in action with your specific use cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              What Healthcare Providers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real results from real practices
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex space-x-1">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {testimonial.metric}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Voice Assistant */}
      <VoiceAssistant />
    </div>
  );
};

export default HomePage;