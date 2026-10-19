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
    eyebrow: '',
    headlinePrefix: 'Your health, understood.',
    headlineEditorial: 'The right care, within reach.',
    headlineSuffix: '',
    supportingCopy:
      'MEDVIDHI is being built to connect your health history with a clearer path to relevant care, helping you carry the context that matters into your next healthcare conversation.',
    primaryCta: 'Explore How It Works',
    primaryCtaHref: '#how-it-works',
    secondaryCta: 'Join the Waitlist',
    secondaryCtaHref: '#join',
    previewBadge: 'Connected Context Intelligence',
    previewStatus: 'Reconstructing fragmented health signals into coherent patient history',
  },

  problems: {
    eyebrow: 'THE REALITY OF NAVIGATING CARE TODAY',
    headlinePrefix: 'Healthcare should feel',
    headlineEditorial: 'understandable',
    headlineMid: ', not',
    headlineEmphasis: 'overwhelming',
    headlineSuffix: '.',
    intro:
      'When health concerns arise, people rarely face a clean chronological record. Instead, they navigate disconnected fragments while trying to make sense of their next step.',
    stages: [
      {
        step: '01',
        stageTitle: 'Scattered Records',
        coreDifficulty: 'Symptoms, reports, medicines and previous consultations are scattered.',
        shortPhrase: 'Symptoms, reports, medicines and previous consultations are scattered across separate places.',
        detail:
          'Diagnostic reports, prescriptions, symptom timelines, and past clinical consultations live in separate files, messaging apps, and clinics with zero cohesion.',
        patientImpact: 'Health context is fractured before care even begins.',
        fragmentTags: ['Lab Reports (PDF)', 'Paper Prescriptions', 'Symptom Notes', 'Separate Portals'],
      },
      {
        step: '02',
        stageTitle: 'Uncertain Relevance',
        coreDifficulty: 'Patients may not know what information matters or which expertise is relevant.',
        shortPhrase: 'Patients may not know what information matters or which expertise is relevant.',
        detail:
          'Without coherent guidance, patients struggle to decipher which details are clinically significant or which medical specialty is truly appropriate for their concern.',
        patientImpact: 'Search fatigue and guesswork delay reaching the right care pathway.',
        fragmentTags: ['Unclear Specialty', 'Conflicting Search Results', 'Uncertain Priorities'],
      },
      {
        step: '03',
        stageTitle: 'Repetitive Storytelling',
        coreDifficulty: 'Repeated consultations can require patients to retell the same history.',
        shortPhrase: 'Repeated consultations can require patients to retell the same history.',
        detail:
          'At each new appointment, patients must recount their entire history from memory—often omitting subtle triggers, prior medication trials, or important timelines.',
        patientImpact: 'Repetitive visits, duplicated expenses, and emotional strain.',
        fragmentTags: ['Memory Strain', 'Omitted Timelines', 'Restarting from Scratch'],
      },
      {
        step: '04',
        stageTitle: 'Reconstructing Context',
        coreDifficulty: 'Doctors may need to reconstruct the context before understanding the current concern.',
        shortPhrase: 'Doctors may need to reconstruct the context before understanding the current concern.',
        detail:
          'Physicians are forced to spend valuable consultation minutes piecing together past timelines, medication reactions, and prior care before they can even assess the current presentation.',
        patientImpact: 'Less time is left for focused clinical listening and examination.',
        fragmentTags: ['Lost Clinic Minutes', 'Unverified Drug History', 'Fragmented Records'],
      },
      {
        step: '05',
        stageTitle: 'Compounding Delays',
        coreDifficulty: 'Some conditions may worsen when appropriate assessment is delayed.',
        shortPhrase: 'Some conditions may worsen when appropriate assessment is delayed.',
        detail:
          'When health context remains fragmented, reaching the right care pathway takes longer—allowing manageable concerns to progress before receiving timely clinical assessment.',
        patientImpact: 'Preventable clinical escalation and prolonged uncertainty.',
        fragmentTags: ['Delayed Assessment', 'Unaddressed Progression', 'Care Pathway Delay'],
      },
    ] as ProblemStage[],
  },

  howItWorks: {
    eyebrow: 'THE INTENDED PRODUCT JOURNEY',
    headlinePrefix: 'From scattered health information to',
    headlineEditorial: 'connected care',
    headlineSuffix: '.',
    intro:
      'A patient-centered progression engineered to transform dispersed symptoms, historical documents, and consultations into a clear, continuous health story.',
    safetyDisclaimer:
      'Illustrative preview of the intended platform experience. Qualified healthcare professionals remain solely responsible for clinical assessment, diagnosis, and treatment decisions.',
    steps: [
      {
        stepNumber: '01',
        phase: 'Input',
        headline: 'Input',
        description:
          'Patients describe what they are experiencing through Chat, Voice, Body Map or relevant health information they provide.',
        illustrativePill: 'Chat • Voice • Body Map • Reports',
        visualDetail: 'Multi-modal entry allows unstructured descriptions without medical jargon.',
        flowSummary: 'Patient describes what they are experiencing',
        iconName: 'MessageSquare',
      },
      {
        stepNumber: '02',
        phase: 'Understand',
        headline: 'Understand',
        description:
          'Follow-up questions help clarify when the concern began, what it feels like and how it has changed.',
        illustrativePill: 'Contextual Clarification',
        visualDetail: 'Clarifies onset, triggers, sensations and change over time.',
        flowSummary: 'Relevant context is clarified',
        iconName: 'Search',
      },
      {
        stepNumber: '03',
        phase: 'Structure',
        headline: 'Structure',
        description:
          'Relevant details are organised into understandable health context instead of remaining scattered across different sources.',
        illustrativePill: 'Organised Synthesis',
        visualDetail: 'Unstructured fragments become coherent, structured health context.',
        flowSummary: 'Organised into understandable health context',
        iconName: 'Layers',
      },
      {
        stepNumber: '04',
        phase: 'Remember',
        headline: 'Remember',
        description:
          'Important health details stay connected over time, including symptoms, medicines, reports and previous consultations.',
        illustrativePill: 'Continuous Memory',
        visualDetail: 'Preserves critical past reactions, timelines and historical care.',
        flowSummary: 'Important health details stay connected over time',
        iconName: 'History',
      },
      {
        stepNumber: '05',
        phase: 'Navigate',
        headline: 'Navigate',
        description:
          'MEDVIDHI is intended to help patients move toward a care pathway relevant to their concern.',
        illustrativePill: 'Care Pathway Guidance',
        visualDetail: 'Guides toward relevant care pathways without premature diagnosis.',
        flowSummary: 'Move toward a relevant care pathway',
        iconName: 'Compass',
      },
      {
        stepNumber: '06',
        phase: 'Prepare',
        headline: 'Prepare',
        description:
          'A structured Doctor Brief helps carry relevant history into the healthcare conversation.',
        illustrativePill: '30-Second Doctor Brief',
        visualDetail: 'Carries structured context into the healthcare consultation.',
        flowSummary: 'Carry structured history into consultation',
        iconName: 'FileText',
      },
      {
        stepNumber: '07',
        phase: 'Update',
        headline: 'Update',
        description:
          'New information from later interactions can contribute to the continuing health story.',
        illustrativePill: 'Continuing Health Story',
        visualDetail: 'Subsequent interactions and clinical notes update the ongoing journey.',
        flowSummary: 'Contribute to the continuing health story',
        iconName: 'RotateCw',
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
