/**
 * MEDVIDHI Dark Product Showcase Content & Interactive Data
 * 
 * Strict Brand & Compliance Rules:
 * - Brand: MEDVIDHI.
 * - Colors: Pure White (#FFFFFF), Pure Black (#000000), Neutral Grayscale.
 * - Multilingual Support: English, मराठी (conversational & natural), हिन्दी.
 * - Conceptual Journey: Input → Structured Context → Health Memory → Care Navigation → Doctor Brief → Professional Interaction.
 * - Illustrative Data Only: Explicitly stated that AI, voice capture, and clinical records are simulated demonstrations.
 */

export type LanguageCode = 'en' | 'mr' | 'hi';

export interface JourneyStep {
  id: string;
  number: string;
  label: string;
  tagline: string;
}

export const CONCEPTUAL_JOURNEY: JourneyStep[] = [
  { id: 'input', number: '01', label: 'Input', tagline: 'Spoken, typed, or spatial' },
  { id: 'structure', number: '02', label: 'Structured Context', tagline: 'Nuance translated to clinical coordinates' },
  { id: 'memory', number: '03', label: 'Health Memory', tagline: 'Connected across time & sources' },
  { id: 'navigation', number: '04', label: 'Care Navigation', tagline: 'Matching presentation to specialists' },
  { id: 'brief', number: '05', label: 'Doctor Brief', tagline: '30-second pre-consultation synthesis' },
  { id: 'interaction', number: '06', label: 'Professional Care', tagline: 'Informed, unhurried clinical consult' },
];

/* -------------------------------------------------------------------------- */
/* 1. Body Map Configuration                                                  */
/* -------------------------------------------------------------------------- */
export const BODY_MAP_CONTENT = {
  anchor: 'feature-body-map',
  badge: 'Spatial Health Input',
  headline: 'Point to where it hurts. Let context follow.',
  subhead:
    'Patients often struggle to name anatomical regions. MEDVIDHI connects spatial body coordinates directly to patient-reported symptoms, linking pain localization with clinical follow-up questions.',
  integrationNotice: {
    status: 'Reserved Integration Slot',
    pill: 'Alpha Component Boundary Protected',
    description:
      'The interactive 3D anatomical model will be integrated directly from the verified MEDVAI Alpha repository. This slot is pre-configured with the exact DOM anchor and spatial context pipeline.',
  },
  sampleRegions: [
    { id: 'elbow', name: 'Right Elbow (Lateral)', status: 'Active Sample', coordinates: 'Upper Limb • Lateral Epicondyle' },
    { id: 'lumbar', name: 'Lumbar Spine (L4-L5)', status: 'Connected', coordinates: 'Axial Skeleton • Low Back' },
    { id: 'cervical', name: 'Cervical Neck', status: 'Reference', coordinates: 'Cervical Spine • Paraspinal' },
    { id: 'knee', name: 'Left Patella', status: 'Reference', coordinates: 'Lower Limb • Anterior Knee' },
  ],
};

/* -------------------------------------------------------------------------- */
/* 2. Voice Demonstration Content                                             */
/* -------------------------------------------------------------------------- */
export interface VoiceDemoLanguageData {
  langCode: LanguageCode;
  langLabel: string;
  nativeLabel: string;
  rawInput: string;
  phoneticHint?: string;
  extractedContext: {
    target: string;
    duration: string;
    aggravating: string;
    character: string;
  };
  followUpQuestion: string;
  suggestedReply: string;
  structuredMemoryCard: {
    title: string;
    category: string;
    summaryLines: string[];
  };
}

export const VOICE_DEMO_CONTENT: Record<LanguageCode, VoiceDemoLanguageData> = {
  mr: {
    langCode: 'mr',
    langLabel: 'Marathi',
    nativeLabel: 'मराठी',
    rawInput: '“माझ्या उजव्या कोपराला पाच दिवसांपासून दुखतंय. वस्तू उचलताना जास्त होतं.”',
    phoneticHint: 'Maajhya ujvya kopraalaa paach divsaanpaasun dukhatay. Vastu uchaltaana jaast hotay.',
    extractedContext: {
      target: 'उजवा कोपरा (Right lateral elbow)',
      duration: '५ दिवस (5 days duration)',
      aggravating: 'वस्तू उचलताना त्रास वाढतो (Worse while lifting objects)',
      character: 'यांत्रिक स्वरूपाचे दुखणे (Mechanical load-dependent ache)',
    },
    followUpQuestion: '“वस्तू पकडताना दुखणं हाताच्या बोटांकडे किंवा मनगटाकडे खाली पसरतं का?”',
    suggestedReply: 'नाही, फक्त कोपराच्या बाहेरील हाडाजवळच दुखतंय.',
    structuredMemoryCard: {
      title: 'उजव्या कोपऱ्यातील दुखणे (Right Elbow Pain)',
      category: 'Orthopedic / Musculoskeletal Context',
      summaryLines: [
        'Anatomical Location: Right lateral elbow region',
        'Duration: 5 days (Subacute onset)',
        'Aggravating Factor: Load lifting & repetitive gripping',
        'Radiation: Localized, zero distal radiculopathy',
      ],
    },
  },
  hi: {
    langCode: 'hi',
    langLabel: 'Hindi',
    nativeLabel: 'हिन्दी',
    rawInput: '“मेरे दाहिने कोहनी में पिछले पाँच दिनों से दर्द है। कोई सामान उठाते समय दर्द बहुत बढ़ जाता है।”',
    phoneticHint: 'Mere dahine kohni mein pichle paanch dino se dard hai. Koi saaman uthate samay dard badh jata hai.',
    extractedContext: {
      target: 'दाहिनी कोहनी (Right elbow region)',
      duration: '५ दिन (5 days duration)',
      aggravating: 'वजन / सामान उठाते समय (Worse while lifting load)',
      character: 'तीव्र स्थानीय दर्द (Focal mechanical pain)',
    },
    followUpQuestion: '“क्या मुट्ठी बांधने या भारी बैग उठाने पर यह दर्द कलाई की ओर नीचे जाता है?”',
    suggestedReply: 'नहीं, दर्द केवल कोहनी के बाहरी उभार के पास ही सीमित रहता है।',
    structuredMemoryCard: {
      title: 'दाहिनी कोहनी में खिंचाव (Right Elbow Strain)',
      category: 'Orthopedic / Musculoskeletal Context',
      summaryLines: [
        'Anatomical Location: Right lateral elbow',
        'Duration: 5 days (Active complaint)',
        'Aggravating Factor: Grip exertion and vertical lifting',
        'Radiation: No forearm radiation reported',
      ],
    },
  },
  en: {
    langCode: 'en',
    langLabel: 'English',
    nativeLabel: 'English',
    rawInput: '“I’ve had a persistent pain in my right elbow for five days now. It gets significantly sharper whenever I lift objects.”',
    extractedContext: {
      target: 'Right lateral elbow (Extensor tendon origin)',
      duration: '5 days duration',
      aggravating: 'Worse while lifting and grasping objects',
      character: 'Sharp mechanical load-dependent pain',
    },
    followUpQuestion: '“Does this discomfort radiate downward into your forearm or wrist when you squeeze or twist a jar?”',
    suggestedReply: 'No radiation down the arm; it stays sharply focused right on the outside bone.',
    structuredMemoryCard: {
      title: 'Right Lateral Elbow Pain Context',
      category: 'Orthopedic / Musculoskeletal Context',
      summaryLines: [
        'Anatomical Location: Right lateral epicondyle region',
        'Duration: 5 days (Acute-subacute)',
        'Aggravating Factors: Lifting, forearm extension against resistance',
        'Radiation: Absent; localized focal tenderness',
      ],
    },
  },
};

/* -------------------------------------------------------------------------- */
/* 3. Chat Demonstration Content                                              */
/* -------------------------------------------------------------------------- */
export interface ChatMessage {
  id: string;
  sender: 'patient' | 'assistant';
  text: string;
  timestamp: string;
  extractedContext?: {
    label: string;
    value: string;
  }[];
}

export interface ChatSuggestedAnswer {
  id: string;
  chipLabel: string;
  fullText: string;
  resultingEntity: {
    label: string;
    value: string;
  };
}

export const CHAT_DEMO_STEPS = {
  headline: 'Start with the story. Not a form.',
  subhead:
    'Patients describe concerns naturally. MEDVIDHI provides empathetic clinical comprehension, asks targeted clarifying follow-ups, and translates conversational nuance into structured Health Memory.',
  initialMessages: [
    {
      id: 'm1',
      sender: 'patient' as const,
      text: 'I’ve been having episodes of dizziness and lightheadedness over the last two weeks, mostly whenever I stand up quickly from my office chair.',
      timestamp: '10:41 AM',
      extractedContext: [
        { label: 'Symptom', value: 'Lightheadedness / Postural Dizziness' },
        { label: 'Onset', value: '14 days duration' },
        { label: 'Trigger', value: 'Rapid sit-to-stand transition (Orthostatic)' },
      ],
    },
    {
      id: 'm2',
      sender: 'assistant' as const,
      text: 'I understand that sudden lightheadedness can be unsettling, especially during work. Feeling dizzy specifically when rising from sitting often points to a postural blood pressure adjustment. To help structure this clearly for your doctor: does this sensation ever come with blurred vision, a racing heartbeat, or feeling like you might actually pass out?',
      timestamp: '10:41 AM',
    },
  ],
  suggestedAnswers: [
    {
      id: 'ans-1',
      chipLabel: 'Mild blurriness, no fainting (30s recovery)',
      fullText: 'No fainting at all, but my vision blurs slightly for about 15 to 30 seconds before clearing completely.',
      resultingEntity: {
        label: 'Associated Sign',
        value: 'Transient visual blurring (<30s), Zero syncope',
      },
    },
    {
      id: 'ans-2',
      chipLabel: 'Heart races briefly upon standing',
      fullText: 'Yes, I feel my heart flutter or race for a minute right after standing up, but it calms down if I stay still.',
      resultingEntity: {
        label: 'Associated Sign',
        value: 'Postural tachycardia sensation (settles with rest)',
      },
    },
    {
      id: 'ans-3',
      chipLabel: 'Worse when dehydrated or tired',
      fullText: 'It happens noticeably more on long work days when I haven’t had enough water or skipped lunch.',
      resultingEntity: {
        label: 'Co-factor',
        value: 'Aggravated by hydration deficit & prolonged desk work',
      },
    },
  ],
  followUpResponse: {
    id: 'm4',
    sender: 'assistant' as const,
    text: 'That is very helpful context. I have noted that there is no loss of consciousness, that symptoms are strictly postural, and that recovery occurs within seconds. This has been structured into your Orthostatic Health Profile ready for review.',
    timestamp: '10:42 AM',
  },
  structuredOutput: {
    entryTitle: 'Postural Lightheadedness Profile',
    domain: 'Cardiovascular / Autonomic Health Context',
    items: [
      { key: 'Primary Presentation', value: 'Orthostatic dizziness upon sit-to-stand' },
      { key: 'Duration & Frequency', value: '14 days, multiple episodes daily' },
      { key: 'Associated Symptoms', value: 'Brief visual blurring, rapid recovery (<30s)' },
      { key: 'Red-Flag Screening', value: 'No syncope, no chest tightness, no dyspnea' },
      { key: 'Status', value: 'Proposed for Health Memory validation' },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 4. Health Memory Visualisation Content                                     */
/* -------------------------------------------------------------------------- */
export interface HealthMemorySource {
  id: string;
  name: string;
  shortLabel: string;
  category: string;
  iconName: string;
  description: string;
  incomingData: string;
}

export const HEALTH_MEMORY_SOURCES: HealthMemorySource[] = [
  {
    id: 'src-chat',
    name: 'Chat',
    shortLabel: 'Chat Dialogue',
    category: 'Conversational Input',
    iconName: 'MessageSquare',
    description: 'Conversations with clarifying clinical follow-ups',
    incomingData: 'Extracted mechanical onset & trigger dialogue',
  },
  {
    id: 'src-voice',
    name: 'Voice',
    shortLabel: 'Spoken Voice',
    category: 'Audio Input',
    iconName: 'Mic',
    description: 'Colloquial spoken symptom descriptions & audio notes',
    incomingData: 'Spoken note: grip pain worsens during work',
  },
  {
    id: 'src-body-map',
    name: 'Body Map',
    shortLabel: 'Body Map Sensation',
    category: 'Spatial Input',
    iconName: 'Crosshair',
    description: 'Focal coordinate mapping of anatomical tenderness',
    incomingData: 'Right lateral epicondyle pinpoint (4/10 ache)',
  },
  {
    id: 'src-reports',
    name: 'Reports and documents',
    shortLabel: 'Reports & Labs',
    category: 'Diagnostic Records',
    iconName: 'FileText',
    description: 'Lab blood panels, imaging excerpts & clinical summaries',
    incomingData: 'Right elbow X-ray: zero bone fracture',
  },
  {
    id: 'src-medicines',
    name: 'Medicines and prescriptions',
    shortLabel: 'Medicines & Rx',
    category: 'Pharmacology & Self-Care',
    iconName: 'Pill',
    description: 'Active medications, OTC trials & prescribed regimens',
    incomingData: 'Diclofenac 1% gel trial (bid application)',
  },
  {
    id: 'src-consultations',
    name: 'Previous doctor consultations',
    shortLabel: 'Doctor Consultations',
    category: 'Clinical Assessments',
    iconName: 'Stethoscope',
    description: 'Physician physical exams, diagnoses & specialist notes',
    incomingData: 'Lateral epicondylitis confirmed (Cozen +)',
  },
  {
    id: 'src-history',
    name: 'Symptoms and health history',
    shortLabel: 'Earlier Health History',
    category: 'Longitudinal Baselines',
    iconName: 'History',
    description: 'Prior injuries, chronic factors & baseline physical activity',
    incomingData: 'Contralateral wrist strain logged in 2024',
  },
  {
    id: 'src-post-consult',
    name: 'Treatment changes',
    shortLabel: 'Treatment Changes',
    category: 'Recovery & Outcomes',
    iconName: 'Activity',
    description: 'Symptom trajectory reported after consultation visits',
    incomingData: 'Load pain reduced 50% under physical therapy',
  },
];

export interface TimelineEvent {
  id: string;
  stepNumber: number;
  stageName: string;
  title: string;
  dateStr: string;
  badge: string;
  summary: string;
  connectedSourceIds: string[];
  connectedEventIds: string[];
  relationshipLabel: string;
  detailedContext: {
    whatHappened: string;
    clinicalSignificance: string;
    connectedSources: string[];
    linkedAction: string;
  };
}

export const HEALTH_MEMORY_TIMELINE: TimelineEvent[] = [
  {
    id: 'ev-1',
    stepNumber: 1,
    stageName: 'Problem begins',
    title: 'Acute lateral elbow strain after lifting',
    dateStr: '12 Oct • Day 1',
    badge: 'Symptom Onset',
    summary: 'Patient noted acute discomfort after heavy gym lifting and prolonged mouse use.',
    connectedSourceIds: ['src-body-map', 'src-voice'],
    connectedEventIds: [],
    relationshipLabel: 'Initial baseline event',
    detailedContext: {
      whatHappened:
        'Sharp focal ache emerged over the lateral right elbow after repeated eccentric wrist extension and prolonged computer use.',
      clinicalSignificance:
        'Establishes an acute mechanical trigger without direct traumatic impact or neurovascular radiculopathy.',
      connectedSources: ['Body Map', 'Voice'],
      linkedAction: 'Logged as initial symptom anchor in Health Memory graph.',
    },
  },
  {
    id: 'ev-2',
    stepNumber: 2,
    stageName: 'Medicine taken',
    title: 'Topical NSAID gel trial (Diclofenac 1%)',
    dateStr: '14 Oct • Day 3',
    badge: 'Self-Care Regimen',
    summary: 'Applied topical Diclofenac gel twice daily; moderate resting relief reported.',
    connectedSourceIds: ['src-medicines', 'src-chat'],
    connectedEventIds: ['ev-1'],
    relationshipLabel: 'Direct response to Event 1 (Acute Strain)',
    detailedContext: {
      whatHappened:
        'Patient applied OTC topical anti-inflammatory gel twice daily with temporary soothing at rest, but persistent load pain.',
      clinicalSignificance:
        'Partial response to topical NSAIDs indicates superficial tendinous involvement rather than joint arthropathy.',
      connectedSources: ['Medicines & Prescriptions', 'Chat'],
      linkedAction: 'Recorded medication dosage and response trajectory to inform clinician.',
    },
  },
  {
    id: 'ev-3',
    stepNumber: 3,
    stageName: 'Doctor visit',
    title: 'Primary care clinical assessment & diagnosis',
    dateStr: '16 Oct • Day 5',
    badge: 'Consultation',
    summary: 'Physician confirmed lateral epicondyle point tenderness on physical palpation.',
    connectedSourceIds: ['src-consultations', 'src-reports'],
    connectedEventIds: ['ev-1', 'ev-2'],
    relationshipLabel: 'Evaluates Events 1 & 2 (Pain baseline & NSAID response)',
    detailedContext: {
      whatHappened:
        'Doctor reviewed structured 30-Second Doctor Brief; performed physical palpation confirming lateral epicondylitis (tennis elbow).',
      clinicalSignificance:
        'Physical exam verified Cozen and Mills tests positive, ruling out cervical spine referral without unnecessary imaging latency.',
      connectedSources: ['Previous Consultations', 'Reports & Documents'],
      linkedAction: 'Physician clinical diagnosis and ICD-10 tag attached directly to longitudinal record.',
    },
  },
  {
    id: 'ev-4',
    stepNumber: 4,
    stageName: 'Treatment changes',
    title: 'Targeted physical therapy & counterforce strap',
    dateStr: '18 Oct • Day 7',
    badge: 'Care Protocol',
    summary: 'Transitioned from passive rest to active eccentric wrist extensor loading exercises.',
    connectedSourceIds: ['src-medicines', 'src-consultations'],
    connectedEventIds: ['ev-3'],
    relationshipLabel: 'Prescribed during Event 3 (Doctor Consultation)',
    detailedContext: {
      whatHappened:
        'Prescribed structured eccentric rehabilitation protocol, counterforce forearm brace, and ergonomic mouse setup.',
      clinicalSignificance:
        'Controlled mechanical loading initiates collagen remodeling and prevents chronic tendinopathy degeneration.',
      connectedSources: ['Medicines & Prescriptions', 'Previous Consultations'],
      linkedAction: 'Active rehabilitation protocol and ergonomic adjustments indexed in Health Memory.',
    },
  },
  {
    id: 'ev-5',
    stepNumber: 5,
    stageName: 'Symptoms change',
    title: 'Pain under load reduced by 50%',
    dateStr: '22 Oct • Day 11',
    badge: 'Outcome Trend',
    summary: 'Zero pain at rest; lifting threshold improved significantly with counterforce strap.',
    connectedSourceIds: ['src-post-consult', 'src-voice'],
    connectedEventIds: ['ev-4'],
    relationshipLabel: 'Measures response to Event 4 (New Therapy)',
    detailedContext: {
      whatHappened:
        'Patient completed spoken check-in reporting improved grip strength, painless sleep, and better keyboard endurance.',
      clinicalSignificance:
        'Confirms favorable clinical trajectory under conservative management, reducing likelihood of invasive interventions.',
      connectedSources: ['Post-Consult Changes', 'Voice'],
      linkedAction: 'Recovery trajectory charted into longitudinal continuity dashboard.',
    },
  },
  {
    id: 'ev-6',
    stepNumber: 6,
    stageName: 'New information added',
    title: 'Annual lipid & metabolic lab panel linked',
    dateStr: '28 Oct • Day 17',
    badge: 'Multi-Source Synthesis',
    summary: 'Routine preventive bloodwork attached to complete cardiovascular background.',
    connectedSourceIds: ['src-reports', 'src-history'],
    connectedEventIds: ['ev-3', 'ev-5'],
    relationshipLabel: 'Synthesizes holistic profile alongside Events 1–5',
    detailedContext: {
      whatHappened:
        'Annual lipid blood panel uploaded and synthesized alongside active musculoskeletal recovery progress.',
      clinicalSignificance:
        'Ensures holistic perspective: healthy metabolic parameters contextualize musculoskeletal tissue healing.',
      connectedSources: ['Reports & Documents', 'Symptoms & History'],
      linkedAction: 'Integrated into unified pre-consultation synthesis for upcoming follow-up appointments.',
    },
  },
];

/* -------------------------------------------------------------------------- */
/* 5. 30-Second Doctor Brief Content                                          */
/* -------------------------------------------------------------------------- */
export interface DoctorBriefSourceFragment {
  id: string;
  sourceType: string;
  iconName: string;
  title: string;
  rawText: string;
  timestamp: string;
}

export const DOCTOR_BRIEF_SOURCES: DoctorBriefSourceFragment[] = [
  {
    id: 'frag-body',
    sourceType: 'Body Map Entry',
    iconName: 'Crosshair',
    title: 'Spatial Coordinates Pin',
    rawText: 'Pinpoint coordinate: Right lateral epicondyle. Zero forearm radiation, zero cervical spine radiculopathy.',
    timestamp: '16 Oct · 03:30 PM',
  },
  {
    id: 'frag-voice',
    sourceType: 'Voice Conversation',
    iconName: 'Mic',
    title: 'Spoken Symptom Narrative',
    rawText: '“Pain on the outside of right elbow for 5 days. Can’t lift grocery bags without dropping them from pain.”',
    timestamp: '16 Oct · 12:45 PM',
  },
  {
    id: 'frag-chat',
    sourceType: 'Clinical Chat Dialogue',
    iconName: 'MessageSquare',
    title: 'Clinical Chat Dialogue',
    rawText: '“Started 5 days ago after gym and heavy laptop typing. Sharp ache when gripping or lifting, no numbness.”',
    timestamp: '16 Oct · 09:12 AM',
  },
  {
    id: 'frag-lab',
    sourceType: 'Uploaded Report',
    iconName: 'FileText',
    title: 'Elbow Radiograph (X-Ray)',
    rawText: 'AP & Lateral views: Intact joint spaces. No fracture, dislocation, osteophytes, or soft-tissue calcification.',
    timestamp: '15 Oct · 04:00 PM',
  },
];

export interface DoctorBriefSection {
  id: string;
  number: string;
  title: string;
  patientViewText: string;
  medicalViewText: string;
  sourceFragmentId: string;
  statusBadge?: string;
}

export const DOCTOR_BRIEF_SECTIONS: DoctorBriefSection[] = [
  {
    id: 'sec-concern',
    number: '01',
    title: 'Current Concern',
    patientViewText:
      'Pain on the outside of the right elbow lasting 5 days, which gets sharper whenever picking up grocery bags or holding heavy items.',
    medicalViewText:
      '5-day subacute right lateral elbow focal pain. Strong clinical correlation with common extensor tendon strain (lateral epicondylalgia), load-dependent.',
    sourceFragmentId: 'frag-voice',
  },
  {
    id: 'sec-timeline',
    number: '02',
    title: 'Symptom Timeline',
    patientViewText:
      'Started suddenly after a gym session 5 days ago; stayed steady for 3 days; slightly easier today when keeping the arm still.',
    medicalViewText:
      'Acute mechanical onset following repetitive eccentric wrist load. Resting pain visual analogue score (VAS) 1/10; load-bearing VAS 6/10.',
    sourceFragmentId: 'frag-chat',
  },
  {
    id: 'sec-history',
    number: '03',
    title: 'Relevant History',
    patientViewText:
      'No previous arm injuries or fractures. Works full-time at a computer desk with prolonged trackpad and mouse use.',
    medicalViewText:
      'No history of prior upper-limb tendinopathy or inflammatory arthritis. Occupational ergonomic strain (repetitive wrist dorsiflexion).',
    sourceFragmentId: 'frag-chat',
  },
  {
    id: 'sec-meds',
    number: '04',
    title: 'Medicines and Self-Care',
    patientViewText:
      'Using a pain-relief gel (Diclofenac) twice a day. Putting ice on the elbow in the evenings provides mild soothing.',
    medicalViewText:
      'Topical NSAID gel (Diclofenac 1.16%) applied bid with moderate symptomatic benefit. Cryotherapy self-administered post-activity.',
    sourceFragmentId: 'frag-voice',
  },
  {
    id: 'sec-prev-care',
    number: '05',
    title: 'Previous Care',
    patientViewText:
      'No injections or prior physical therapy done for this arm. Routine immunizations and baseline vitals are all up to date.',
    medicalViewText:
      'No prior corticosteroid infiltrations, orthobiologics, or formal physical therapy courses for right upper extremity.',
    sourceFragmentId: 'frag-chat',
  },
  {
    id: 'sec-reports',
    number: '06',
    title: 'Relevant Reports',
    patientViewText:
      'Baseline X-ray was taken yesterday and showed normal bones with no cracks, spurs, or calcium deposits.',
    medicalViewText:
      'Plain radiograph right elbow (AP/Lat): Normal bony alignment, no osteophytes, no enthesopathy calcification.',
    sourceFragmentId: 'frag-lab',
  },
  {
    id: 'sec-changes',
    number: '07',
    title: 'Important Changes',
    patientViewText:
      'Discomfort is now concentrated at one specific bony bump on the outer elbow, rather than spreading down the whole arm.',
    medicalViewText:
      'Pain has localized strictly to the lateral epicondylar ridge. Zero swelling, erythema, or distal neurologic involvement.',
    sourceFragmentId: 'frag-body',
  },
  {
    id: 'sec-missing',
    number: '08',
    title: 'Missing or Unclear Context',
    patientViewText:
      'Grip strength has not been measured yet. Night-time pain is absent when resting in bed.',
    medicalViewText:
      'Baseline dynamometer grip strength unmeasured; night pain absent; cervical radiculopathy screen recommended during exam.',
    sourceFragmentId: 'frag-body',
    statusBadge: 'Needs Clinical Exam',
  },
];

/* -------------------------------------------------------------------------- */
/* 6. Medical & Report Explainer Content                                      */
/* -------------------------------------------------------------------------- */
export interface ReportSampleData {
  id: string;
  title: string;
  category: string;
  rawExcerpt: string;
  sourceContext: string;
  languages: Record<
    LanguageCode,
    {
      patientExplanation: string;
      whatRemainsUncertain: string;
      whatToDiscussWithDoctor: string;
    }
  >;
}

export const REPORT_EXPLAINER_SAMPLES: ReportSampleData[] = [
  {
    id: 'lipid-panel',
    title: 'Blood Test Report (Biochemical Panel)',
    category: 'Diagnostic Blood Test',
    rawExcerpt:
      'SERUM BIOCHEMICAL PANEL: Measured Parameter: 184 mg/dL [Reference Range: <130 mg/dL]. Status: Elevated.',
    sourceContext: 'Automated Biochemical Analyzer • Fasting Sample (12 Hours)',
    languages: {
      en: {
        patientExplanation:
          'This test measures the amount of a substance in your blood. A result outside the usual range does not confirm a disease by itself. Ask your doctor what it means alongside your symptoms and other results.',
        whatRemainsUncertain:
          'A single test result is not an automatic diagnosis of disease. The reading can naturally vary with daily diet, hydration, sleep, stress, and previous physical exertion.',
        whatToDiscussWithDoctor:
          'Ask your doctor whether lifestyle adjustments, repeat testing in 6–8 weeks, or further assessment are recommended before considering any treatment.',
      },
      mr: {
        patientExplanation:
          'ही तपासणी रक्तातल्या एका घटकाचं प्रमाण दाखवते. नेहमीच्या मर्यादेबाहेरचा आकडा म्हणजे लगेच आजार आहे असं नाही. तुमची लक्षणं आणि बाकी रिपोर्ट पाहून डॉक्टरांना त्याचा अर्थ विचारू शकता.',
        whatRemainsUncertain:
          'फक्त एका रिपोर्टवरून कोणताही थेट आजार किंवा धोका ठरत नाही. तुम्ही चाचणीपूर्वी किती वेळ उपाशी होतात, तुमचा रोजचा आहार आणि हालचाल कशी आहे, यावरही हे आकडे बदलू शकतात.',
        whatToDiscussWithDoctor:
          'घाबरून जाण्याचे कारण नाही. डॉक्टरांशी चर्चा करा: आहारात बदल करून जीवनशैली सुधारणे पुरेसे ठरेल का, की काही आठवड्यांनी पुन्हा तपासणी करावी लागेल?',
      },
      hi: {
        patientExplanation:
          'यह जाँच खून में एक चीज़ की मात्रा दिखाती है। सामान्य सीमा से बाहर का नतीजा अपने आप किसी बीमारी की पुष्टि नहीं करता। अपनी तकलीफ़ और बाकी रिपोर्ट के साथ डॉक्टर से इसका मतलब पूछें।',
        whatRemainsUncertain:
          'केवल एक रिपोर्ट से किसी बीमारी का पक्का निष्कर्ष नहीं निकलता। रक्त जांच से पहले का खान-पान, तनाव और आराम का समय इन अंकों को प्रभावित कर सकता है।',
        whatToDiscussWithDoctor:
          'डॉक्टर से चर्चा करें: क्या आहार और जीवनशैली में सुधार से इसे नियंत्रित किया जा सकता है, या कुछ हफ़्तों बाद दोबारा जांच करानी चाहिए?',
      },
    },
  },
  {
    id: 'mri-spine',
    title: 'Lumbar Spine MRI Excerpt',
    category: 'Diagnostic Radiology',
    rawExcerpt:
      'LUMBAR SPINE MRI: Sagittal T2-weighted sequence demonstrates mild disc desiccation at L4-L5 with broad-based posterior protrusion. Minimal thecal sac indentation without critical neural exit foraminal stenosis.',
    sourceContext: 'High-Field 1.5T Magnetic Resonance Imaging • Axial & Sagittal Planes',
    languages: {
      en: {
        patientExplanation:
          'The soft cushion (disc) between your fourth and fifth lower back bones shows mild wear and is bulging outward slightly. It gently touches the outer protective sac around the spinal fluid, but has not severely pinched any main exiting nerves.',
        whatRemainsUncertain:
          'MRI scans often show bulges in people who have zero pain. The scan only shows anatomy; it cannot tell on its own whether this specific bulge is the true cause of your symptoms without a physical examination.',
        whatToDiscussWithDoctor:
          'Ask your physician how closely this scan matches where you actually feel pain, and whether core-strengthening physical therapy is the best first step.',
      },
      mr: {
        patientExplanation:
          'तुमच्या पाठीच्या मणक्याच्या चौथ्या आणि पाचव्या मणक्यामधील मऊ गादी (डिस्क) किंचित सुकली असून थोडी बाहेर सरकलेली दिसते. मात्र, यामुळे कोणत्याही मुख्य नसेवर गंभीर दाब पडलेला नाही.',
        whatRemainsUncertain:
          'अनेक लोकांच्या एमआरआय रिपोर्टमध्ये असा बदल दिसतो तरीही त्यांना कोणतीही वेदना नसते. हा रिपोर्ट फक्त मणक्याची रचना दाखवतो, प्रत्यक्ष तपासणीशिवाय वेदनेचे मुख्य कारण समजत नाही.',
        whatToDiscussWithDoctor:
          'डॉक्टरांशी चर्चा करा: या रिपोर्टचा प्रत्यक्ष त्रासाशी कितपत संबंध आहे आणि फिजिओथेरपी किंवा व्यायामाने हे बरे करता येईल का?',
      },
      hi: {
        patientExplanation:
          'पीठ के निचले हिस्से (एल4-एल5) की हड्डियों के बीच की डिस्क थोड़ी घिस गई है और हल्की बाहर की तरफ उभरी हुई है। लेकिन इसने नसों को गंभीर रूप से नहीं दबाया है।',
        whatRemainsUncertain:
          'कई बार एमआरआय में उभार दिखने पर भी मरीज को कोई दर्द नहीं होता। केवल स्कैन से यह तय नहीं होता कि आपके दर्द का असली कारण यही है या नहीं।',
        whatToDiscussWithDoctor:
          'डॉक्टर से पूछें: क्या इस उभार के लिए फिजियोथेरेपी और पीठ को मजबूत करने वाले व्यायाम सबसे उचित रहेंगे?',
      },
    },
  },
  {
    id: 'spirometry',
    title: 'Pulmonary Function (Spirometry)',
    category: 'Respiratory Diagnostics',
    rawExcerpt:
      'PULMONARY FUNCTION TEST: Post-bronchodilator FEV1/FVC ratio is 0.72 (Predicted: >0.70). Forced Vital Capacity (FVC) is 92% of predicted. FEV1 shows 8% (+160 mL) reversibility post-salbutamol inhalation. Impression: Borderline airflow dynamics.',
    sourceContext: 'Spirometric Flow-Volume Loop • Pre & Post Bronchodilator Evaluation',
    languages: {
      en: {
        patientExplanation:
          'This test measures how quickly and completely you can blow air out of your lungs. Your ratio (0.72) is just above the standard threshold, and opening your airways with an inhaler produced a small 8% improvement.',
        whatRemainsUncertain:
          'Because the measurement is near the borderline, a single spirometry test does not distinguish between mild seasonal asthma, airway irritation from cold air/allergies, or baseline variation.',
        whatToDiscussWithDoctor:
          'Ask whether your coughing, wheezing, or shortness of breath happen around specific triggers (like dust, pet hair, or cold weather), and whether trial medication is warranted.',
      },
      mr: {
        patientExplanation:
          'ही तपासणी फुप्फुसांमधून हवा किती वेगाने आणि पूर्ण क्षमतेने बाहेर पडते हे मोजते. तुमची हवा सोडण्याची क्षमता सामान्य मर्यादेच्या अगदी जवळ असून, औषधानंतर श्वासनलिकांमध्ये किंचित सुधारणा झाली आहे.',
        whatRemainsUncertain:
          'हा रिपोर्ट अगदी सीमारेषेवर असल्याने हा त्रास ऋतुबदल, ऍलर्जी, धूळ किंवा दमा यामुळे झाला आहे का, हे इतर लक्षणांशिवाय स्पष्ट होत नाही.',
        whatToDiscussWithDoctor:
          'डॉक्टरांना विचारा: धूळ किंवा थंडीमुळे खोकला किंवा धाप लागते का, आणि यासाठी इनहेलरची खरोखर गरज आहे की नाही?',
      },
      hi: {
        patientExplanation:
          'यह फेफड़ों की सांस छोड़ने की गति और क्षमता की जांच है। आपका परिणाम सामान्य सीमा के बिल्कुल नजदीक है और दवा सूंघने के बाद 8% का मामूली सुधार देखा गया।',
        whatRemainsUncertain:
          'नतीजा बिल्कुल बॉर्डरलाइन होने के कारण, केवल इस टेस्ट से यह स्पष्ट नहीं होता कि यह मौसमी एलर्जी है, धूल का असर है या शुरुआती दमा।',
        whatToDiscussWithDoctor:
          'डॉक्टर से चर्चा करें: क्या बदलते मौसम या प्रदूषण के दौरान सांस फूलने की समस्या होती है, और आगे क्या सावधानी रखनी चाहिए?',
      },
    },
  },
];

/* -------------------------------------------------------------------------- */
/* 7. Right Doctor Section Content                                            */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* 7. Right Doctor Section Content                                            */
/* -------------------------------------------------------------------------- */
export interface CareNavigationStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  detail: string;
  status: string;
}

export const RIGHT_DOCTOR_CONTENT = {
  anchor: 'feature-right-doctor',
  badge: 'Care Navigation Architecture',
  headline: 'The right care starts with the right context.',
  subHeadlineSerif: 'Reach the clinical expertise your health concern deserves.',
  lead:
    'Patients often do not know which medical expertise is genuinely relevant to their concern, leading to fragmented visits and delayed answers. At the same time, doctors need clear, connected context about symptoms, previous medicines, past treatments, reports, and prior consultations to understand the true clinical picture.',
  careSequence: [
    {
      id: 'step-context',
      number: '01',
      title: "Patient's Health Context",
      subtitle: 'Spoken, Spatial & Records',
      detail:
        'Symptoms described in natural language, precise anatomical coordinates from Body Map, active medications, and diagnostic reports organized in Health Memory.',
      status: 'Context Assembled',
    },
    {
      id: 'step-synthesis',
      number: '02',
      title: 'MEDVIDHI',
      subtitle: 'Context Synthesis',
      detail:
        'Correlates multi-modal signals over time, analyzing symptom trajectories, triggers, and previous care to identify relevant clinical characteristics.',
      status: 'Signals Synthesized',
    },
    {
      id: 'step-carepath',
      number: '03',
      title: 'Relevant Care Path',
      subtitle: 'Targeted Clinical Domain',
      detail:
        'Identifies the specific clinical domain suited for the patient’s presentation (e.g. conservative musculoskeletal care vs. acute intervention).',
      status: 'Domain Aligned',
    },
    {
      id: 'step-professional',
      number: '04',
      title: 'Appropriate Healthcare Professional',
      subtitle: 'Relevant Clinical Expertise',
      detail:
        'Supports navigating toward healthcare professionals whose clinical domain matches the presentation, avoiding the guesswork of generic doctor directories.',
      status: 'Expertise Aligned',
    },
    {
      id: 'step-brief',
      number: '05',
      title: 'Doctor Brief',
      subtitle: 'Pre-Consultation Synthesis',
      detail:
        'Carries forward structured, verified context into the consultation under explicit patient consent, allowing the appointment to focus on clinical care.',
      status: 'Ready to Share',
    },
  ] as CareNavigationStep[],
  trustPrinciples: [
    {
      title: 'Physician Clinical Primacy',
      description:
        'Qualified healthcare professionals remain solely responsible for physical examination, clinical assessment, formal diagnosis, and all treatment decisions. MEDVIDHI provides context synthesis, not autonomous clinical judgment.',
    },
    {
      title: 'No Fabricated Directories or Guaranteed Outcomes',
      description:
        'We do not present invented doctor profiles, arbitrary ratings, or claims of guaranteed treatment success or diagnosis. Matching algorithms remain abstract and proprietary.',
    },
    {
      title: 'Verification as an Onboarding Standard',
      description:
        'Rigorous credential and medical registration verification is a fundamental requirement of our planned clinician onboarding process, not a claim that an active live network is operational today.',
    },
    {
      title: 'Granular Patient-Governed Consent',
      description:
        'Patients hold exclusive authority over their health context. Every shared brief is bound by time-limited access tokens and explicit field-level permissions.',
    },
  ],
  comparison: {
    fragmentedCare: {
      title: 'Current Fragmented System',
      points: [
        'Patients guess which medical department to book, often visiting mismatched specialties first',
        'Consultation time spent repeating history from memory and filling repetitive forms',
        'Crucial past medicine trials, adverse reactions, and subtle symptom changes omitted',
        'Reports and imaging remain trapped on physical paper or isolated clinic portals',
      ],
    },
    medvidhiCare: {
      title: 'Connected MEDVIDHI Care Navigation',
      points: [
        'Care path alignment based on verified presentation characteristics, anatomy, and timeline',
        'Pre-delivered Doctor Brief carries organized context forward into the consultation',
        'Direct linkage between Health Memory, diagnostic reports, and physical symptoms',
        'Physician enters consultation informed, focusing appointment time on clinical care and treatment planning',
      ],
    },
  },
};
