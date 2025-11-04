import React from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from '@formspree/react';
import { siteInfo, aiFeatures } from "../data/siteData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import FeaturesSlider from "../components/FeaturesSlider";
import FeatureIcon from "../components/FeatureIcon";

const HomePageNew = () => {
  const featuredFeatures = aiFeatures.filter((feature) => feature.featured);
  const [state, handleSubmit] = useForm("xpwojkrr");

  // Reduced motion animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="pt-12 pb-20 relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[75vh]">
            {/* Hero Content */}
            <motion.div
              className="prose-container lg:max-w-none"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-6"
                variants={fadeInUp}
              >
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                Live Demo: {siteInfo.demoClient.name}
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-6xl font-serif font-normal tracking-tight text-neutral-900 mb-6 text-balance"
                variants={fadeInUp}
              >
                Intelligent Voice AI for{" "}
                <span className="text-primary-600">Healthcare</span>
              </motion.h1>

              <motion.p
                className="text-xl text-neutral-600 leading-relaxed mb-6 text-pretty max-w-prose"
                variants={fadeInUp}
              >
                Transform your practice with AI that handles patient calls like
                your best front desk staff right from your website. 24/7
                availability, High accuracy, and human-like conversations.
              </motion.p>

              <motion.div
                className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8"
                variants={fadeInUp}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-semibold text-primary-900">
                        Experience AI Voice Conversations
                      </h3>
                      <p className="text-sm text-primary-700">
                        Talk directly with our AI assistant about healthcare
                        services offered by NeuroPsych Wellness Center
                      </p>
                    </div>
                  </div>
                  <Button
                    className="bg-primary-500 hover:bg-primary-600 text-white"
                    onClick={() => {
                      // Call the global voice assistant function
                      if (window.startVoiceAssistant) {
                        window.startVoiceAssistant();
                      }
                    }}
                  >
                    Try Now
                  </Button>
                </div>
              </motion.div>

              <motion.div 
                className="mb-8"
                variants={fadeInUp}
              >
                <p className="text-xs text-neutral-500 mb-3 text-center">Services voicebot can be integrated with</p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <img src="/gcalender.png" alt="Google Calendar" className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/outlookcalender.png" alt="Outlook Calendar" className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/applecalnder.png" alt="Apple Calendar" className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/calendlylogo.png" alt="Calendly" className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/ringcentral.png" alt="RingCentral" className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-neutral-200 opacity-70 hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                      <path d="M9 12h.01"/>
                    </svg>
                    <span className="text-xs font-medium text-neutral-700">EHR Systems</span>
                  </div>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="grid grid-cols-4 gap-6 pt-8 border-t border-neutral-200"
                variants={fadeInUp}
              >
                <motion.div 
                  className="text-center cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <motion.div 
                    className="text-3xl font-serif font-normal text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    100%
                  </motion.div>
                  <div className="text-sm text-neutral-600 group-hover:text-primary-600 transition-colors">
                    Less Missed Calls
                  </div>
                </motion.div>
                <motion.div 
                  className="text-center cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <motion.div 
                    className="text-3xl font-serif font-normal text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  >
                    24/7
                  </motion.div>
                  <div className="text-sm text-neutral-600 group-hover:text-primary-600 transition-colors">Availability</div>
                </motion.div>
                <motion.div 
                  className="text-center cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <motion.div 
                    className="flex items-center justify-center mb-1"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  >
                    <svg
                      className="w-8 h-8 text-neutral-900 group-hover:text-primary-600 transition-colors"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                  </motion.div>
                  <div className="text-sm text-neutral-600 group-hover:text-primary-600 transition-colors">Demand Scaling</div>
                </motion.div>
                <motion.div 
                  className="text-center cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <motion.div 
                    className="flex items-center justify-center mb-1"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg
                      className="w-8 h-8 text-primary-500 group-hover:text-primary-600 transition-colors"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </motion.div>
                  <div className="text-sm text-neutral-600 group-hover:text-primary-600 transition-colors">
                    From $0.5/min
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Hero Visual - Features Slider */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <FeaturesSlider />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section bg-white">
        <div className="container">
          <motion.div
            className="text-center prose-container mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-serif font-normal text-neutral-900 mb-6 text-balance">
              Everything Your Front Desk Does,
              <span className="text-primary-600"> But Better</span>
            </h2>
            <p className="text-xl text-neutral-600 text-pretty">
              Our AI handles complex healthcare conversations with the expertise
              of your best staff member
            </p>
          </motion.div>

          {/* Current Features */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
              <h3 className="text-2xl font-serif font-normal text-neutral-900">
                Available Now
              </h3>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {featuredFeatures
                .filter((feature) => feature.status === "current")
                .map((feature, index) => (
                  <motion.div key={feature.id} variants={fadeInUp}>
                    <Card
                      hover
                      className="h-full border-primary-200 bg-primary-50/50"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                            <FeatureIcon icon={feature.icon} className="w-6 h-6" />
                          </div>
                          <div className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                            LIVE
                          </div>
                        </div>
                        <CardTitle className="text-xl">
                          {feature.title}
                        </CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-primary-600 font-medium">
                          Use-Case: {feature.demoScenario}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>

          {/* Future Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
              <h3 className="text-2xl font-serif font-normal text-neutral-900">
                Additional Features We Can Add For You
              </h3>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {featuredFeatures
                .filter((feature) => feature.status === "future")
                .map((feature, index) => (
                  <motion.div key={feature.id} variants={fadeInUp}>
                    <Card
                      hover
                      className="h-full border-primary-200 bg-primary-50/30 relative overflow-hidden"
                    >
                      <div className="absolute top-4 right-4 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full"></div>
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600 opacity-75">
                          <FeatureIcon icon={feature.icon} className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="opacity-75">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-primary-600 font-medium opacity-75 mb-3">
                          Use-Case: {feature.demoScenario}
                        </div>
                        {feature.integrations && (
                          <div className="mt-4">
                            <div className="text-xs text-neutral-500 font-medium mb-2">Integrates with:</div>
                            <div className="flex flex-wrap gap-2">
                              {feature.integrations.map((integration, idx) => (
                                <div 
                                  key={idx}
                                  className="flex items-center gap-1.5 px-2 py-1 bg-white/50 rounded-md border border-primary-200/50"
                                >
                                  {integration.icon === 'google-calendar' && (
                                    <img src="/gcalender.png" alt="Google Calendar" className="h-4 object-contain" />
                                  )}
                                  {integration.icon === 'outlook' && (
                                    <img src="/outlookcalender.png" alt="Outlook Calendar" className="h-4 object-contain" />
                                  )}
                                  {integration.icon === 'apple-calendar' && (
                                    <img src="/applecalnder.png" alt="Apple Calendar" className="h-4 object-contain" />
                                  )}
                                  {integration.icon === 'calendly' && (
                                    <img src="/calendlylogo.png" alt="Calendly" className="h-4 object-contain" />
                                  )}
                                  {integration.icon === 'ringcentral' && (
                                    <img src="/ringcentral.png" alt="RingCentral" className="h-4 object-contain" />
                                  )}
                                  <span className="text-xs text-primary-700 font-medium">{integration.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-lg bg-neutral-50">
        <div className="container">
          <motion.div
            className="text-center prose-container mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-serif font-normal text-neutral-900 mb-6 text-balance">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-neutral-600 text-pretty mb-8">
              Enter your email and we'll reach out within 24 hours
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {state.succeeded ? (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-normal text-neutral-900 mb-2">Thank You!</h3>
                <p className="text-neutral-600">We'll be in touch within 24 hours to discuss how AI Frontdesk can transform your practice.</p>
              </motion.div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-4"
              >
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 text-lg rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none transition-colors bg-white"
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  disabled={state.submitting}
                  className="w-full py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {state.submitting ? "Sending..." : "Get Started"}
                </Button>
                
                <p className="text-neutral-500 text-sm text-center">
                  We'll reach out within 24 hours to discuss your needs
                </p>
              </form>
            )}
          </motion.div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-neutral-500 text-sm mb-2">Questions? Email us</p>
            <p className="text-neutral-900">
              <a
                href={`mailto:${siteInfo.email}`}
                className="text-primary-600 hover:text-primary-700 transition-colors font-medium"
              >
                {siteInfo.email}
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default HomePageNew;
