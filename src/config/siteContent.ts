/**
 * Centralised Website Copy and Content
 * 
 * Strict Product Boundary Checklist:
 * - Brand: MEDVIDHI only (Never MEDVAI).
 * - Human-first framing before technology.
 * - Narrative problem discovery rather than ordinary SaaS cards.
 * - Zero unsupported claims, zero medical video-game imagery.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface ProblemStage {
  step: string;
  stageTitle: string;
  coreDifficulty: string;
  detail: string;
  patientImpact: string;
  fragmentTags: string[];
  shortPhrase?: string;
}

export interface HowItWorksStep {
  stepNumber: string;
  phase: string;
  headline: string;
  description: string;
  illustrativePill: string;
  visualDetail: string;
  flowSummary?: string;
  iconName?: string;
}

export interface PillarItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'pulse' | 'shield' | 'sparkle' | 'stethoscope';
  badge: string;
}

export interface FoundationMetric {
  label: string;
  value: string;
  detail: string;
}

export const SITE_CONTENT = {
  navigation: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Join', href: '#join' },
  ] as NavItem[],

  hero: {
    eyebrow: 'HEALTH MEMORY · RIGHT DOCTOR',
    headlinePrefix: 'Your health story, connected.',
    headlineEditorial: 'Your next step, clearer.',
    headlineSuffix: '',
    supportingCopy:
      'Not sure what to do next or which kind of doctor to consult? MEDVIDHI is being built to bring symptoms, reports, medicines and previous care into one organised health story, helping people explore relevant medical expertise and prepare for a clearer consultation.',
    primaryCta: 'Explore How It Works',
    primaryCtaHref: '#how-it-works',
    secondaryCta: 'Join the Waitlist',
    secondaryCtaHref: '#join',
    previewBadge: 'Connected Context Intelligence',
    previewStatus: 'Reconstructing fragmented health signals into coherent patient history',
  },

  problems: {
    eyebrow: 'THE MOMENT BEFORE CARE',
    headlinePrefix: 'Knowing something feels wrong is one thing.',
    headlineEditorial: 'Knowing what to do next is harder',
    headlineMid: '',
    headlineEmphasis: '',
    headlineSuffix: '.',
    intro:
      'When health concerns arise, people rarely face a clean chronological record. Instead, they navigate disconnected fragments while trying to make sense of their next step.',
    stages: [
      {
        step: '01',
        stageTitle: 'Something changes',
        coreDifficulty: 'A person notices a symptom or unfamiliar change and is unsure what to do next.',
        shortPhrase: 'A person notices a symptom or unfamiliar change and is unsure what to do next.',
        detail:
          'A new symptom, ache, or unfamiliar bodily sensation appears. Deciding whether it warrants urgent attention, self-monitoring, or medical consultation is immediately difficult without context.',
        patientImpact: 'Initial uncertainty before care even begins.',
        fragmentTags: ['New Symptom', 'Uncertain Urgency', 'Self-Monitoring'],
      },
      {
        step: '02',
        stageTitle: 'You search for answers',
        coreDifficulty: "Online information may not reflect the person's individual history or the full context.",
        shortPhrase: "Online information may not reflect the person's individual history or the full context.",
        detail:
          'Searching symptoms online returns generic possibilities, conflicting opinions, and alarming worst-case scenarios that ignore your medication history, previous tests, or timeline.',
        patientImpact: 'Search fatigue and anxiety without personalized clarity.',
        fragmentTags: ['Conflicting Searches', 'Missing Context', 'Information Overload'],
      },
      {
        step: '03',
        stageTitle: 'You try to explain it',
        coreDifficulty: 'Timing, progression, triggers and previous steps may be difficult to recall during a consultation.',
        shortPhrase: 'Timing, progression, triggers and previous steps may be difficult to recall during a consultation.',
        detail:
          'In a hurried clinic appointment, patients are asked to recount weeks of subtle fluctuations from memory, often omitting prior drug reactions or trigger patterns.',
        patientImpact: 'Crucial health nuances get lost during the encounter.',
        fragmentTags: ['Memory Strain', 'Omitted Timelines', 'Time Pressure'],
      },
      {
        step: '04',
        stageTitle: 'You are still looking for clarity',
        coreDifficulty: 'Further evaluation may be needed while the person works out which kind of medical expertise is relevant.',
        shortPhrase: 'Further evaluation may be needed while the person works out which kind of medical expertise is relevant.',
        detail:
          'After initial consultations or inconclusive advice, patients struggle to determine whether a specialist, conservative therapy, or secondary evaluation is appropriate.',
        patientImpact: 'Repeated consultations and ongoing navigation friction.',
        fragmentTags: ['Unclear Next Step', 'Specialist Confusion', 'Ongoing Navigation'],
      },
    ] as ProblemStage[],
  },

  howItWorks: {
    eyebrow: 'FROM CONTEXT TO CLARITY',
    headlinePrefix: 'From context to clarity:',
    headlineEditorial: 'a connected journey',
    headlineSuffix: '.',
    intro:
      'A patient-centered progression engineered to transform dispersed symptoms, historical documents, and consultations into a clear, continuous health story.',
    closingLine:
      'Your experience. A clearer health story. A more informed conversation with your doctor.',
    safetyDisclaimer:
      'Illustrative preview of the intended platform experience. Qualified healthcare professionals remain solely responsible for clinical assessment, diagnosis, and treatment decisions.',
    steps: [
      {
        stepNumber: '01',
        phase: 'Tell Your Story',
        headline: 'Tell Your Story',
        description:
          'Describe what you have noticed through chat or voice. Mark a body area, share relevant changes and add available reports or details of previous care.',
        illustrativePill: 'Chat • Voice • Body Map • Reports',
        visualDetail: 'Multi-modal entry allows unstructured descriptions without medical jargon.',
        flowSummary: 'Describe what you have noticed in your own words',
        iconName: 'MessageSquare',
      },
      {
        stepNumber: '02',
        phase: 'Connect the Details',
        headline: 'Connect the Details',
        description:
          'Follow-up questions help organise reported symptoms, timelines, changes, medicines and previous consultations into a clearer picture of what has happened so far.',
        illustrativePill: 'Contextual Follow-Up',
        visualDetail: 'Organises symptoms, timelines, medicines and care into one evolving picture.',
        flowSummary: 'Organises context into a clearer picture of what happened',
        iconName: 'Layers',
      },
      {
        stepNumber: '03',
        phase: 'Explore Relevant Care',
        headline: 'Explore Relevant Care',
        description:
          'Use the context shared to explore what type of healthcare professional or specialist may be relevant. This supports navigation; it does not provide a diagnosis or guarantee a doctor match.',
        illustrativePill: 'Care Navigation',
        visualDetail: 'Helps navigate toward appropriate medical expertise without definitive claims.',
        flowSummary: 'Explore what type of healthcare professional may be relevant',
        iconName: 'Compass',
      },
      {
        stepNumber: '04',
        phase: 'Prepare for the Consultation',
        headline: 'Prepare for the Consultation',
        description:
          "A concise Doctor Brief is designed to bring together the patient's reported experience, timeline and available information for a clinician to review.",
        illustrativePill: 'Doctor Brief Preparation',
        visualDetail: 'Assembles reported history, timelines, and open questions into a structured briefing.',
        flowSummary: 'Prepares a concise summary for doctor review',
        iconName: 'FileText',
      },
    ] as HowItWorksStep[],
  },

  contextGap: {
    eyebrow: 'THE STRATEGIC HEALTHCARE-AI GAP',
    headlinePrefix: 'AI is advancing.',
    headlineEditorial: 'Health context',
    headlineSuffix: 'still needs a better connection.',
    lead:
      'MEDVIDHI’s intended focus is not simply generating another answer to a single medical question. It is about helping relevant health information remain connected across symptoms, documents, medicines, consultations, and time, while supporting the journey toward appropriate care.',
    isolatedView: {
      tag: 'Current State: Isolated Q&A',
      title: 'Ephemeral, Single-Question Bots',
      summary: 'Conversations operate in an isolated vacuum with zero memory or medical continuity.',
      points: [
        'Answers isolated prompts without knowing prior drug reactions or lab trends.',
        'Session ends, and all clinical context is cleared or lost before the next doctor visit.',
        'Leaves the patient with an unverified answer rather than prepared consultation context.',
      ],
    },
    connectedView: {
      tag: 'MEDVIDHI Focus: Connected Context',
      title: 'Longitudinal Context & Clinical Collaboration',
      summary: 'Continuously connecting symptoms, diagnostic files, and care pathways over time.',
      points: [
        'Maintains longitudinal continuity across symptoms, lab documents, and past treatments.',
        'Generates structured Doctor Briefs to empower clinical appointments without wasted time.',
        'Guides patients toward relevant clinical specialties without attempting autonomous diagnosis.',
      ],
    },
    safetyBanner:
      'Clinical Assessment Notice: Qualified healthcare professionals remain solely responsible for patient examination, diagnosis, and treatment decisions. MEDVIDHI is designed as a context connectivity and preparation system, not an autonomous clinician.',
  },

  pillars: {
    sectionTag: 'Core Principles',
    heading: 'Engineered for Reliability and Clinical Integrity',
    description:
      'Healthcare technology demands verifiable rigor, strict privacy boundaries, and resilient system design from day one.',
    items: [
      {
        id: 'clinical-integrity',
        title: 'Clinical-Grade Rigor',
        subtitle: 'Uncompromising precision',
        description:
          'Constructed with strict architectural boundaries, deterministic data flows, and adherence to evidence-based healthcare requirements.',
        iconName: 'stethoscope',
        badge: 'Deterministic',
      },
      {
        id: 'patient-privacy',
        title: 'Privacy by Architecture',
        subtitle: 'Zero credential leakage',
        description:
          'Client-side security primitives and deliberate data isolation ensuring no private health data or unauthorized secrets enter public surfaces.',
        iconName: 'shield',
        badge: 'Secure',
      },
      {
        id: 'performance-scale',
        title: 'High-Throughput Performance',
        subtitle: 'Sub-second interaction',
        description:
          'Engineered on modern React and Vite, optimizing bundle weight, asset caching, and eliminating non-essential runtime bloat.',
        iconName: 'pulse',
        badge: 'Optimized',
      },
      {
        id: 'modular-growth',
        title: 'Pluggable Extensibility',
        subtitle: 'Adapter-driven design',
        description:
          'Decoupled domain adapters allow seamless integration of validation, future submission backends, and healthcare service modules.',
        iconName: 'sparkle',
        badge: 'Modular',
      },
    ] as PillarItem[],
  },

  architecture: {
    sectionTag: 'System Blueprint',
    heading: 'Clean Foundation Architecture',
    description:
      'Every layer of the new MEDVIDHI codebase is structured for long-term maintainability, strict typing, and testability.',
    metrics: [
      {
        label: 'Client Footprint',
        value: '< 50 KB',
        detail: 'Lean production bundle without unneeded dependencies',
      },
      {
        label: 'Type Coverage',
        value: '100%',
        detail: 'End-to-end TypeScript strict mode configuration',
      },
      {
        label: 'Design Palette',
        value: '2 Colors',
        detail: 'Strict pure white and pure black design system',
      },
      {
        label: 'Asset Integrity',
        value: 'Authentic',
        detail: 'Supplied MEDVIDHI vector/raster assets with zero redrawing',
      },
    ] as FoundationMetric[],
  },

  // Central Editable Brand Tagline
  brandTagline: 'Your Health. Understood. Your Care. Connected.',

  // Privacy & Clinical Trust Architecture
  privacyTrust: {
    badge: 'Data Sovereignty & Clinical Trust',
    heading: 'Your health data. Your control.',
    principles: [
      {
        title: 'Clear Information Understanding',
        description:
          'Patients should clearly understand what information is being organized, what signals are collected, and how their health history is structured.',
      },
      {
        title: 'Explicit Patient Consent',
        description:
          'Sharing is strictly patient-directed. You decide which health events, reports, and medications are included before any consultation handover.',
      },
      {
        title: 'Preparation & Navigation Support',
        description:
          'MEDVIDHI is engineered to help organize health context, support pre-consultation preparation, and assist in navigating toward relevant healthcare expertise.',
      },
      {
        title: 'Physician Clinical Primacy',
        description:
          'Qualified healthcare professionals remain exclusively responsible for formal physical examination, clinical assessment, diagnosis, and all treatment decisions.',
      },
    ],
    medicalDisclaimer:
      'MEDVIDHI is an intelligent health context platform being developed for educational and care preparation support. It does not replace a qualified medical professional, clinic, or emergency medical service, and should not be presented as an autonomous diagnostician or prescriber. Always seek the advice of your physician or other qualified healthcare provider regarding any medical condition or treatment.',
  },

  // Final Conversion CTA
  finalCta: {
    badge: 'EARLY ACCESS',
    headline: 'Your health story is bigger than a single visit.',
    supportingCopy:
      'MEDVIDHI is being built to make your health easier to understand, easier to carry and easier to take into the right care.',
    primaryButton: 'Join the Waitlist',
  },

  waitlist: {
    badge: 'EARLY ACCESS',
    statusTag: 'EARLY ACCESS INTEREST',
    title: 'Join the MEDVIDHI Waitlist',
    description:
      'Get updates as MEDVIDHI develops its early-access experience for more context-connected healthcare.',
    emailPlaceholder: '',
    buttonLabel: 'Join the Waitlist',
    privacyDisclaimer:
      'Product updates and early-access announcements. No unnecessary noise.',
    successMessage:
      'Thanks for your interest in MEDVIDHI. We’ll share relevant early-access and product updates as they become available.',
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} MEDVIDHI. All rights reserved.`,
    description:
      'MEDVIDHI connects your health history with a clearer path to relevant care, helping you carry the context that matters into your next healthcare conversation.',
    contactEmail: 'hellomedvidhi@gmail.com',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Early Access', href: '#join' },
    ],
  },
} as const;
