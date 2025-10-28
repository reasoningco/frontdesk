// Site data for The Reasoning Company - AI Frontdesk Demo
export const siteInfo = {
  name: "The Reasoning Company",
  productName: "AI Frontdesk",
  tagline: "Intelligent Voice AI for Healthcare",
  phone: "1-800-AI-FRONT",
  email: "hello@thereasoningcompany.com",
  address: {
    street: "123 Innovation Drive",
    city: "San Francisco",
    state: "CA",
    zip: "94105"
  },
  demoClient: {
    name: "NeuroPsych Wellness Center",
    phone: "703-865-8686",
    address: "3930 Pender Dr, Suite 350, Fairfax, VA 22030"
  }
};

export const aiFeatures = [
  {
    id: "appointment-scheduling",
    title: "Smart Appointment Scheduling",
    description: "AI automatically schedules, reschedules, and confirms appointments with patients using natural conversation.",
    icon: "�",
    featured: true,
    demoScenario: "Patient calls to book a TMS consultation"
  },
  {
    id: "insurance-verification",
    title: "Insurance Verification",
    description: "Instantly verify patient insurance coverage and benefits while they're on the phone.",
    icon: "🏥",
    featured: true,
    demoScenario: "New patient inquiry about Spravato treatment coverage"
  },
  {
    id: "medication-refills",
    title: "Medication Refill Requests",
    description: "Handle prescription refill requests, check with providers, and coordinate with pharmacies.",
    icon: "�",
    featured: true,
    demoScenario: "Patient requesting antidepressant refill"
  },
  {
    id: "crisis-support",
    title: "Crisis Detection & Support",
    description: "Identify mental health crises and immediately connect patients with appropriate resources.",
    icon: "🆘",
    featured: true,
    demoScenario: "Patient expressing suicidal ideation"
  },
  {
    id: "multilingual-support",
    title: "Multilingual Support",
    description: "Communicate with patients in 40+ languages with perfect accuracy and cultural sensitivity.",
    icon: "🌍",
    featured: true,
    demoScenario: "Spanish-speaking patient booking therapy session"
  },
  {
    id: "follow-up-calls",
    title: "Automated Follow-ups",
    description: "Proactive outreach for missed appointments, treatment adherence, and wellness check-ins.",
    icon: "�",
    featured: true,
    demoScenario: "Post-TMS treatment follow-up call"
  }
];

export const clinicians = {
  medicationManagement: [
    {
      id: "alok-kumar",
      name: "Alok Kumar, M.D.",
      title: "Founder & Psychiatrist",
      specialties: ["General Psychiatry", "Mood Disorders", "Anxiety Disorders"],
      image: "/images/clinicians/alok-kumar.jpg",
      bio: "Dr. Alok Kumar is the founder of NeuroPsych Wellness Center with extensive experience in psychiatric care."
    },
    {
      id: "vikas-mangewala",
      name: "Vikas Mangewala, M.D.",
      title: "Psychiatrist",
      specialties: ["Adult Psychiatry", "Depression", "Bipolar Disorder"],
      image: "/images/clinicians/vikas-mangewala.jpg",
      bio: "Dr. Mangewala specializes in comprehensive psychiatric treatment for adults."
    },
    {
      id: "divya-gongireddy",
      name: "Divya Gongireddy, M.D.",
      title: "Psychiatrist",
      specialties: ["Child & Adolescent Psychiatry", "ADHD", "Autism Spectrum Disorders"],
      image: "/images/clinicians/divya-gongireddy.jpg",
      bio: "Dr. Gongireddy focuses on mental health care for children and adolescents."
    },
    {
      id: "azhar-imam",
      name: "Azhar Imam, M.D.",
      title: "Psychiatrist",
      specialties: ["General Psychiatry", "Trauma", "PTSD"],
      image: "/images/clinicians/azhar-imam.jpg",
      bio: "Dr. Imam provides comprehensive psychiatric care with focus on trauma-related disorders."
    }
  ],
  psychotherapy: [
    {
      id: "stephanie-binter",
      name: "Stephanie Binter, Psy.D., CBIS",
      title: "Psychologist",
      specialties: ["Neuropsychology", "Brain Injury", "Cognitive Assessment"],
      image: "/images/clinicians/stephanie-binter.jpg",
      bio: "Dr. Binter specializes in neuropsychological assessment and brain injury rehabilitation."
    },
    {
      id: "erin-sweeney",
      name: "Erin K. Sweeney, Psy.D.",
      title: "Psychologist",
      specialties: ["Cognitive Behavioral Therapy", "Anxiety", "Depression"],
      image: "/images/clinicians/erin-sweeney.jpg",
      bio: "Dr. Sweeney provides evidence-based psychotherapy for various mental health conditions."
    },
    {
      id: "calpurnia-okwuone",
      name: "Calpurnia Okwuone, Ph.D.",
      title: "Psychologist",
      specialties: ["Cultural Psychiatry", "Trauma Therapy", "Family Therapy"],
      image: "/images/clinicians/calpurnia-okwuone.jpg",
      bio: "Dr. Okwuone offers culturally sensitive therapy and family counseling services."
    }
  ]
};

export const patientForms = [
  {
    id: "acute-concussion-evaluation",
    title: "Acute Concussion Evaluation Scale",
    category: "Assessment",
    required: false
  },
  {
    id: "adult-adhd-self-report",
    title: "Adult ADHD Self-Report Scale Symptom Checklist (ASRS-v1.1)",
    category: "Assessment",
    required: false
  },
  {
    id: "assignment-of-benefits",
    title: "Assignment of Benefits",
    category: "Insurance",
    required: true
  },
  {
    id: "healthcare-info-exchange",
    title: "Confidential Exchange of Healthcare Information Form",
    category: "Consent",
    required: true
  },
  {
    id: "consent-diagnosis-treatment",
    title: "Consent for Diagnosis and Treatment",
    category: "Consent",
    required: true
  },
  {
    id: "controlled-medication-agreement",
    title: "Controlled Medication Prescriptions Agreement",
    category: "Medication",
    required: true
  },
  {
    id: "eating-questionnaire",
    title: "Eating Questionnaire",
    category: "Assessment",
    required: false
  },
  {
    id: "epworth-sleepiness-scale",
    title: "Epworth Sleepiness Scale",
    category: "Assessment",
    required: false
  },
  {
    id: "group-counseling-consent",
    title: "Group Counseling Informed Consent",
    category: "Consent",
    required: false
  },
  {
    id: "medical-release",
    title: "Medical Release Form",
    category: "Consent",
    required: false
  },
  {
    id: "tms-informed-consent",
    title: "Informed Consent for TMS Treatment",
    category: "TMS",
    required: false
  },
  {
    id: "medical-records-request",
    title: "Medical Records Request",
    category: "Records",
    required: false
  },
  {
    id: "privacy-practices",
    title: "Notice of Privacy Practices",
    category: "Privacy",
    required: true
  },
  {
    id: "office-policies",
    title: "Office Policies",
    category: "Policy",
    required: true
  },
  {
    id: "record-disclosures",
    title: "Patient Record of Disclosures",
    category: "Privacy",
    required: false
  },
  {
    id: "pittsburgh-sleep-quality",
    title: "Pittsburgh Sleep Quality Index (PSQI)",
    category: "Assessment",
    required: false
  },
  {
    id: "post-concussion-scale",
    title: "Post-Concussion Scale—Rivermead",
    category: "Assessment",
    required: false
  },
  {
    id: "psychiatric-referral",
    title: "Referral for Psychiatric Services",
    category: "Referral",
    required: false
  },
  {
    id: "bpd-screening",
    title: "Screening for BPD",
    category: "Assessment",
    required: false
  },
  {
    id: "symptom-checklist-counselor",
    title: "Symptom Checklist Before Seeing Counselor",
    category: "Assessment",
    required: false
  },
  {
    id: "telepsychiatry-consent",
    title: "Telepsychiatry Informed Consent",
    category: "Consent",
    required: false
  },
  {
    id: "pregnancy-medication-consent",
    title: "Informed Consent for Psychiatric Medication During Pregnancy and Breastfeeding",
    category: "Consent",
    required: false
  }
];

export const policies = [
  {
    id: "cancellation-policy",
    title: "Cancellation Policy",
    path: "/about-us/cancellation-policy"
  },
  {
    id: "medication-refill-policy",
    title: "Medication Refill Policy",
    path: "/about-us/medication-refill-policy"
  },
  {
    id: "financial-policy",
    title: "Financial Policy",
    path: "/about-us/financial-policy"
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    path: "/privacy-policy"
  }
];

export const clientTestimonials = [
  {
    id: 1,
    name: "Dr. Alok Kumar",
    title: "Founder, NeuroPsych Wellness Center",
    text: "AI Frontdesk has revolutionized our practice. We've reduced missed appointments by 40% and our staff can focus on patient care instead of phone calls.",
    rating: 5,
    metric: "40% reduction in missed appointments"
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "Practice Manager, Mindful Health Clinic",
    text: "The AI handles complex insurance questions better than our human staff. Patients love the 24/7 availability and multilingual support.",
    rating: 5,
    metric: "24/7 patient support"
  },
  {
    id: 3,
    name: "Dr. Michael Rodriguez",
    title: "Psychiatrist, Wellness Partners",
    text: "Crisis detection capabilities have been a game-changer. The AI immediately identifies patients in distress and connects them with emergency resources.",
    rating: 5,
    metric: "100% crisis calls properly escalated"
  }
];

export const useCases = [
  {
    id: "neuropsych-demo",
    title: "NeuroPsych Wellness Center",
    description: "See how AI Frontdesk handles real scenarios from our mental health clinic partner",
    scenarios: [
      "New patient TMS consultation booking",
      "Insurance verification for Spravato treatment", 
      "Crisis intervention and emergency routing",
      "Spanish-speaking patient appointment scheduling",
      "Medication refill coordination"
    ],
    featured: true
  },
  {
    id: "general-practice",
    title: "General Practice Medicine",
    description: "Annual physicals, sick visits, and routine care coordination",
    scenarios: ["Placeholder scenarios"],
    featured: false
  },
  {
    id: "specialty-clinics",
    title: "Specialty Medical Clinics",
    description: "Complex scheduling and specialized care coordination",
    scenarios: ["Placeholder scenarios"],
    featured: false
  }
];