export type Language = 'en' | 'mr' | 'hi';

export interface StageTranslation {
  id: string;
  name: string;
  tagline: string;
}

export interface SectionContent {
  eyebrow: string;
  headingPrefix: string;
  headingAccent: string;
  description: string;
  stages: StageTranslation[];

  // Screen 1: Meet Vidhi
  screen1: {
    badge: string;
    greeting: string;
    lead: string;
    memoryCardTitle: string;
    memoryCardBody: string;
    promptQuestion: string;
    startCta: string;
    starters: string[];
    placeholder: string;
    privacy: string;
  };

  // Screen 2: Share a Concern
  screen2: {
    headerTitle: string;
    inputTag: string;
    patientMessage: string;
    patientMeta: string;
    vidhiFollowup1: string;
    vidhiFollowup2: string;
    voiceDuration: string;
    transcriptLabel: string;
    transcriptText: string;
    confirmBtn: string;
    confirmedBtn: string;
    composerPlaceholder: string;
  };

  // Screen 3: Add Health Records
  screen3: {
    headerTitle: string;
    sourceTag: string;
    uploadPercent: string;
    extractedBadge: string;
    statusNeedsReview: string;
    statusConfirmed: string;
    confirmReviewBtn: string;
    mriTitle: string;
    mriMeta: string;
    mriExtracted: string;
    rxTitle: string;
    rxMeta: string;
    rxExtracted: string;
    medTitle: string;
    medMeta: string;
    medStatus: string;
    addDocBtn: string;
  };

  // Screen 4: Health Memory
  screen4: {
    headerTitle: string;
    episodeTag: string;
    kicker: string;
    event1Date: string;
    event1Title: string;
    event1Body: string;
    event1Badge: string;
    event2Date: string;
    event2Title: string;
    event2Body: string;
    event2Badge: string;
    event3Date: string;
    event3Title: string;
    event3Body: string;
    event3Badge: string;
    event4Date: string;
    event4Title: string;
    event4Body: string;
    event4Badge: string;
  };

  // Screen 5: Doctor Brief
  screen5: {
    headerTitle: string;
    statusTag: string;
    wf1: string;
    wf2: string;
    wf3: string;
    concernLabel: string;
    concernVal: string;
    trajectoryLabel: string;
    trajectoryVal: string;
    medsLabel: string;
    medsVal: string;
    recordsLabel: string;
    recordsVal: string;
    approveBtn: string;
    approvedBtn: string;
    disclaimer: string;
  };

  // Screen 6: Right Doctor
  screen6: {
    headerTitle: string;
    routesTag: string;
    tabRouteA: string;
    tabRouteB: string;
    filterKicker: string;
    filterText: string;
    doc1Title: string;
    doc1Desc: string;
    doc1Why: string;
    doc2Title: string;
    doc2Desc: string;
    doc2Why: string;
    consultantNoticeTitle: string;
    consultantNoticeText: string;
    consultantScope1: string;
    consultantScope2: string;
    verifiedPill: string;
  };

  // Screen 7: Patient-Controlled Handover (Share with Control)
  screen7: {
    headerTitle: string;
    scopeTag: string;
    docSelectLabel: string;
    selectedDocName: string;
    selectedDocClinic: string;
    scopeLabel: string;
    scopeChip1: string;
    scopeChip2: string;
    scopeChip3: string;
    scopeChipRestricted: string;
    passActiveTitle: string;
    passActiveDesc: string;
    continuityTagline: string;
  };

  // Companion Workspaces (when inspected or rendered)
  consultantWorkspace: {
    url: string;
    role: string;
    caseTag: string;
    caseHeading: string;
    scopeBoundary: string;
    patientAlias: string;
    requestTime: string;
    requestNote: string;
    acceptBtn: string;
    declineBtn: string;
    funnelTitle: string;
    funnelStepPrefix: string;
    funnelReady: string;
    filterSteps: { title: string; desc: string }[];
    shortlistKicker: string;
    shortlistCount: string;
    doc1Name: string;
    doc1Cred: string;
    doc1Clinic: string;
    doc1Why: string;
    doc2Name: string;
    doc2Cred: string;
    doc2Clinic: string;
    doc2Why: string;
    verifiedStamp: string;
    verifiedDate: string;
    statusReviewed: string;
    statusReviewing: string;
    consultantSignoff: string;
  };

  doctorWorkspace: {
    url: string;
    role: string;
    doctorName: string;
    doctorReg: string;
    authScopeTag: string;
    briefCardTitle: string;
    briefSyncMeta: string;
    chiefConcernLabel: string;
    chiefConcernVal: string;
    trajectoryLabel: string;
    trajectoryVal: string;
    medsLabel: string;
    medsVal: string;
    recordsLabel: string;
    recordsVal: string;
    postConsultTitle: string;
    authorTag: string;
    clinicalNoteText: string;
    recordedTime: string;
    syncedBadge: string;
    finalContinuityTagline: string;
  };
}

// Fixed English website-level copy (never translated regardless of language selector)
const SHARED_WEBSITE_COPY = {
  eyebrow: 'MEET VIDHI',
  headingPrefix: 'Your health story, ',
  headingAccent: 'connected.',
  description:
    'See how your health context comes together, from the first conversation to a clearer doctor handover.',
  stages: [
    {
      id: 'meet-vidhi',
      name: 'Meet Vidhi',
      tagline: 'Conversational first-line intake & memory introduction',
    },
    {
      id: 'share-concern',
      name: 'Share a concern',
      tagline: 'Multi-modal voice description & clinical clarification',
    },
    {
      id: 'add-records',
      name: 'Add health records',
      tagline: 'Document digitization, lab OCR & patient verification',
    },
    {
      id: 'health-memory',
      name: 'Health Memory',
      tagline: 'Unified chronological symptoms, timeline & provenance tracking',
    },
    {
      id: 'doctor-brief',
      name: 'Doctor Brief',
      tagline: 'Patient-reviewed 30-second pre-consultation clinical synthesis',
    },
    {
      id: 'right-doctor',
      name: 'Right Doctor',
      tagline: 'Context-guided matching: Direct & Care Consultant navigation',
    },
    {
      id: 'patient-handover',
      name: 'Share with Control',
      tagline: 'Scope-limited physician portal authorization & ongoing context sync',
    },
  ],
};

export const TRANSLATIONS: Record<Language, SectionContent> = {
  // ==========================================================================
  // ENGLISH (DEFAULT)
  // ==========================================================================
  en: {
    ...SHARED_WEBSITE_COPY,

    screen1: {
      badge: 'AI HEALTH ASSISTANT',
      greeting: "Hi, I'm Vidhi.",
      lead: "Tell me what's been changing with your health.",
      memoryCardTitle: 'Your continuous health memory.',
      memoryCardBody:
        'Whether you notice a subtle ache, upload a prescription, or prepare to meet a specialist, I help preserve your complete health story.',
      promptQuestion: 'Ready to describe how you feel?',
      startCta: 'Start with Voice or Chat →',
      starters: ['Knee discomfort', 'Upload report', 'Prepare doctor visit'],
      placeholder: 'Describe how you feel or ask Vidhi...',
      privacy: 'Private & secure · In your full control',
    },

    screen2: {
      headerTitle: 'Share a Concern',
      inputTag: 'VOICE + CHAT',
      patientMessage: 'My left knee has been aching for about 3 weeks. Worse when walking down stairs.',
      patientMeta: 'Voice intake · Today, 09:24 AM',
      vidhiFollowup1: 'I hear you. Does the knee lock, catch, or swell after physical activity?',
      vidhiFollowup2: 'Do you feel any morning stiffness lasting more than 20 minutes?',
      voiceDuration: '0:18',
      transcriptLabel: 'Captured Voice Input',
      transcriptText: '"...sharp pain when descending stairs, no swelling noticed so far..."',
      confirmBtn: 'Confirm Symptom Details',
      confirmedBtn: 'Context Captured ✓',
      composerPlaceholder: 'Describe your symptoms or ask Vidhi...',
    },

    screen3: {
      headerTitle: 'Add Health Records',
      sourceTag: 'OCR INGESTION',
      uploadPercent: 'Processed',
      extractedBadge: 'Extracted Clinical Context',
      statusNeedsReview: 'Review Required',
      statusConfirmed: 'Verified',
      confirmReviewBtn: 'Verify Extracted Information',
      mriTitle: 'Left Knee X-Ray Report',
      mriMeta: 'PDF · Uploaded 3 days ago · Apex Diagnostics',
      mriExtracted: 'Joint space intact; minimal patellofemoral narrowing noted. No acute fracture.',
      rxTitle: 'Physician Prescription Slip',
      rxMeta: 'Image (JPEG) · Dr. K. Sharma · General Practice',
      rxExtracted: 'Ibuprofen 400mg PO PRN for pain; advised quadriceps strengthening.',
      medTitle: 'Ibuprofen 400 mg',
      medMeta: 'Anti-inflammatory · Taken PRN 10 days ago',
      medStatus: 'Self-Care Log',
      addDocBtn: '+ Upload Another Document or Prescription',
    },

    screen4: {
      headerTitle: 'Your Health Memory',
      episodeTag: 'KNEE DISCOMFORT',
      kicker: 'Continuous timeline of symptoms, records & care events',
      event1Date: 'Present Day',
      event1Title: 'Persistent Left Knee Pain',
      event1Body: 'Dull discomfort with mechanical loading; sharp pain noticed when descending stairs.',
      event1Badge: 'CURRENT STATUS',
      event2Date: '3 days ago',
      event2Title: 'X-Ray Report & Prescription Added',
      event2Body: 'Uploaded imaging report and clinical note confirming joint space preservation.',
      event2Badge: 'RECORDS INGESTED',
      event3Date: '10 days ago',
      event3Title: 'OTC Anti-Inflammatory Started',
      event3Body: 'Took Ibuprofen 400mg PRN with partial, temporary benefit noted.',
      event3Badge: 'SELF-CARE LOG',
      event4Date: '3 weeks ago',
      event4Title: 'First Symptom Noticed',
      event4Body: 'Initial ache noticed following an extended downhill hike.',
      event4Badge: 'INITIAL ONSET',
    },

    screen5: {
      headerTitle: 'Doctor Brief',
      statusTag: 'READY TO SHARE',
      wf1: 'Review',
      wf2: 'Edit',
      wf3: 'Approve',
      concernLabel: 'Chief Concern',
      concernVal: 'Left knee pain (3+ weeks), worsening on descending stairs.',
      trajectoryLabel: 'Trajectory & Triggers',
      trajectoryVal: 'Mechanical load aggravation; no visible swelling, no locking.',
      medsLabel: 'Prior Care & Relief',
      medsVal: 'Ibuprofen 400mg taken PRN with fleeting, temporary relief.',
      recordsLabel: 'Available Records',
      recordsVal: 'Recent knee X-ray (joint space preserved) & active prescription.',
      approveBtn: 'Approve Brief for Doctor Consultation',
      approvedBtn: 'Approved for Consultation ✓',
      disclaimer: 'Summary for consultation preparation only · Not a diagnosis',
    },

    screen6: {
      headerTitle: 'Right Doctor Navigation',
      routesTag: '2 PATHWAYS',
      tabRouteA: 'Direct Matching',
      tabRouteB: 'Care Consultant Assisted',
      filterKicker: 'Presentation-Based Routing',
      filterText: 'Matched to specialists experienced in subacute knee load pain and sports orthopaedics.',
      doc1Title: 'Dr. Sanjay Mehta, MS (Ortho)',
      doc1Desc: 'Apex Orthopaedic Center · 15+ yrs experience',
      doc1Why: 'Specializes in subacute knee load pain & non-surgical management.',
      doc2Title: 'Dr. Anita Joshi, MD',
      doc2Desc: 'Sports & Musculoskeletal Care · 12 yrs experience',
      doc2Why: 'Expertise in gait analysis, patellofemoral pain & functional rehab.',
      consultantNoticeTitle: 'Human Care Consultant Assigned',
      consultantNoticeText:
        'A qualified healthcare coordinator reviews clinical criteria to help navigate appointment options.',
      consultantScope1: 'Reviews matched specialty criteria with patient',
      consultantScope2: 'Assists with scheduling & Doctor Brief preparation',
      verifiedPill: 'Verified Specialist',
    },

    screen7: {
      headerTitle: 'Share with Control',
      scopeTag: 'TOKEN AUTHORIZED',
      docSelectLabel: 'Authorized Healthcare Professional',
      selectedDocName: 'Dr. Sanjay Mehta, MS (Ortho)',
      selectedDocClinic: 'Apex Orthopaedic Center · Reg #MED-74921',
      scopeLabel: 'Patient-Approved Information Scope',
      scopeChip1: '30-Sec Doctor Brief',
      scopeChip2: 'Recent Knee X-Ray',
      scopeChip3: '7-Day Access Pass',
      scopeChipRestricted: 'Other Records Locked',
      passActiveTitle: 'Secure Digital Pass Active',
      passActiveDesc:
        'Dr. Mehta can view the approved Doctor Brief and reports. Access expires automatically in 7 days.',
      continuityTagline: 'Post-consultation notes sync back into your continuous Health Memory.',
    },

    consultantWorkspace: {
      url: 'care-consultant.medvidhi.com/portal/case/cc-7294',
      role: 'CARE CONSULTANT WORKSPACE',
      caseTag: 'CASE CC-7294',
      caseHeading: 'Case Triage & Matching Verification',
      scopeBoundary: 'Human navigation layer · Scope-limited context review',
      patientAlias: 'Patient Case #P-4829',
      requestTime: 'Requested 12 mins ago',
      requestNote:
        'Patient reports persistent 3-week left knee load pain after downhill hike. Requests specialty guidance.',
      acceptBtn: 'Review & Verify Case',
      declineBtn: 'Reassign Case',
      funnelTitle: '7-Step Matching Funnel Verification',
      funnelStepPrefix: 'Step',
      funnelReady: 'Ready',
      filterSteps: [
        { title: 'Clinical Discipline', desc: 'Orthopaedic / Musculoskeletal Medicine' },
        { title: 'Sub-Specialty Focus', desc: 'Patellofemoral & mechanical joint loading' },
        { title: 'Presentation Severity', desc: 'Subacute mechanical, non-emergency' },
        { title: 'Geographic Vicinity', desc: 'Within 8 km of patient location' },
        { title: 'Credential Verification', desc: 'State Medical Council verified registration' },
        { title: 'Appointment Availability', desc: 'Consultation slot within 48-72 hours' },
        { title: 'Patient Preference', desc: 'Experienced in conservative non-surgical care' },
      ],
      shortlistKicker: 'Verified Recommendations',
      shortlistCount: '2 Specialists Selected',
      doc1Name: 'Dr. Sanjay Mehta, MS (Ortho)',
      doc1Cred: '15+ yrs exp · Reg #MED-74921',
      doc1Clinic: 'Apex Orthopaedic Center',
      doc1Why: 'Primary fit: extensive focus on subacute patellofemoral rehabilitation.',
      doc2Name: 'Dr. Anita Joshi, MD',
      doc2Cred: '12 yrs exp · Reg #MED-58102',
      doc2Clinic: 'Sports & Musculoskeletal Care',
      doc2Why: 'Secondary fit: functional biomechanics & conservative therapy.',
      verifiedStamp: 'CONSULTANT VERIFIED',
      verifiedDate: 'Today, 09:41 AM',
      statusReviewed: 'Verified by Care Consultant',
      statusReviewing: 'In Verification',
      consultantSignoff:
        'Verified recommendations shared with patient for direct appointment scheduling.',
    },

    doctorWorkspace: {
      url: 'doctor.medvidhi.com/portal/authorized-access/p-4829',
      role: 'DOCTOR WORKSPACE PORTAL',
      doctorName: 'Dr. Sanjay Mehta, MS (Ortho)',
      doctorReg: 'Apex Orthopaedic Center · Reg #MED-74921',
      authScopeTag: 'Patient-Authorized Access · 7 Days Remaining',
      briefCardTitle: 'PATIENT-AUTHORIZED 30-SECOND DOCTOR BRIEF',
      briefSyncMeta: 'Delivered via Patient Pass',
      chiefConcernLabel: 'Chief Concern',
      chiefConcernVal: 'Left knee pain (3+ weeks), worsening on descending stairs.',
      trajectoryLabel: 'Trajectory & Triggers',
      trajectoryVal: 'Mechanical load discomfort; no swelling, no joint locking.',
      medsLabel: 'Prior Care & Relief',
      medsVal: 'Ibuprofen 400mg taken PRN with partial, fleeting relief.',
      recordsLabel: 'Available Reports',
      recordsVal: 'Recent knee X-ray (normal joint space) & primary care prescription.',
      postConsultTitle: 'POST-CONSULTATION ATTRIBUTED UPDATE',
      authorTag: 'By Dr. Sanjay Mehta',
      clinicalNoteText:
        'Clinical examination confirms mild patellofemoral load pain without ligamentous laxity. Recommended 4 weeks focused vastus medialis strengthening and physical therapy before re-evaluation.',
      recordedTime: 'Today, 11:30 AM',
      syncedBadge: 'SYNCED TO PATIENT HEALTH MEMORY',
      finalContinuityTagline:
        'Attributed doctor notes continuously update the patient’s Health Memory for future care continuity.',
    },
  },

  // ==========================================================================
  // MARATHI (Everyday Conversational & Natural Indian App Style)
  // ==========================================================================
  mr: {
    ...SHARED_WEBSITE_COPY,

    screen1: {
      badge: 'AI हेल्थ असिस्टंट',
      greeting: 'नमस्कार, मी विधी.',
      lead: 'तुमच्या आरोग्यात काय बदल जाणवतोय ते सांगा.',
      memoryCardTitle: 'तुमची सतत राहणारी Health Memory.',
      memoryCardBody:
        'लहानसा त्रास असो, Prescription अपलोड करायचं असो, किंवा Doctor कडे जायची तयारी — तुमची पूर्ण माहिती इथे सुरक्षित राहते.',
      promptQuestion: 'कसं वाटतंय ते सांगायला सुरुवात करायची का?',
      startCta: 'बोलून किंवा Chat करून सुरुवात करा →',
      starters: ['गुडघ्यात त्रास', 'Reports जोडा', 'Doctor भेटीची तयारी'],
      placeholder: 'तुमचा त्रास सांगा किंवा विधीला विचारा...',
      privacy: 'पूर्णपणे खाजगी आणि सुरक्षित · तुमच्या संपूर्ण नियंत्रणात',
    },

    screen2: {
      headerTitle: 'त्रासाबद्दल सांगा',
      inputTag: 'आवाज + CHAT',
      patientMessage: 'डाव्या गुडघ्यात गेल्या ३ आठवड्यांपासून त्रास होतोय. पायऱ्या उतरताना जास्त दुखतं.',
      patientMeta: 'आवाजाद्वारे नोंद · आज, सकाळी ०९:२४',
      vidhiFollowup1: 'समजलं. पायऱ्या चढताना किंवा चालताना गुडघ्यात सूज किंवा जडपणा जाणवतो का?',
      vidhiFollowup2: 'सकाळी उठल्यावर थोडा वेळ जडपणा वाटतो का?',
      voiceDuration: '०:१८',
      transcriptLabel: 'नोंदवलेला आवाज',
      transcriptText: '"...पायऱ्या उतरताना जास्त त्रास होतो, अजून तरी सूज नाही..."',
      confirmBtn: 'माहिती तपासा आणि नोंदवा',
      confirmedBtn: 'माहिती नोंदवली ✓',
      composerPlaceholder: 'तुमचा त्रास सांगा किंवा विधीला विचारा...',
    },

    screen3: {
      headerTitle: 'तुमचे Reports जोडा',
      sourceTag: 'REPORTS तपासणी',
      uploadPercent: 'तपासणी पूर्ण',
      extractedBadge: 'मिळालेली माहिती',
      statusNeedsReview: 'तपासणी आवश्यक',
      statusConfirmed: 'Verified',
      confirmReviewBtn: 'मिळालेली माहिती बरोबर आहे',
      mriTitle: 'डाव्या गुडघ्याचा X-Ray Report',
      mriMeta: 'PDF · ३ दिवसांपूर्वी जोडला · Apex Diagnostics',
      mriExtracted: 'Joint space सामान्य आहे; हाडांना कोणतीही दुखापत किंवा फ्रॅक्चर नाही.',
      rxTitle: 'Doctor चे Prescription',
      rxMeta: 'फोटो (JPEG) · Dr. के. शर्मा · General Practice',
      rxExtracted: 'Ibuprofen 400 mg (गरज पडेल तेव्हा); हलके व्यायाम करण्याचा सल्ला.',
      medTitle: 'Ibuprofen 400 mg',
      medMeta: 'वेदना कमी करण्याचे औषध · १० दिवसांपूर्वी घेतले',
      medStatus: 'आधी घेतलेले औषध',
      addDocBtn: '+ आणखी Reports किंवा Prescription जोडा',
    },

    screen4: {
      headerTitle: 'तुमची Health Memory',
      episodeTag: 'गुडघ्यातील त्रास',
      kicker: 'त्रास, Reports आणि उपचारांची सलग नोंद (Timeline)',
      event1Date: 'आज',
      event1Title: 'डाव्या गुडघ्यात त्रास',
      event1Body: 'पायऱ्या चढताना जास्त त्रास होतो. सकाळी उठल्यावर थोडा जडपणा जाणवतो.',
      event1Badge: 'सध्याची स्थिती',
      event2Date: '३ दिवसांपूर्वी',
      event2Title: 'Reports आणि Prescription जोडले',
      event2Body: 'X-Ray रिपोर्ट तपासला, Joint space सुरक्षित आहे आणि हाडांना इजा नाही.',
      event2Badge: 'REPORTS जोडले',
      event3Date: '१० दिवसांपूर्वी',
      event3Title: 'आधी घेतलेलं औषध',
      event3Body: 'Ibuprofen 400 mg घेतलं होतं. थोडा वेळ आराम मिळाला.',
      event3Badge: 'घरी केलेले उपाय',
      event4Date: '३ आठवड्यांपूर्वी',
      event4Title: 'पहिल्यांदा त्रास जाणवला',
      event4Body: 'ट्रेकवरून उतरल्यानंतर डाव्या गुडघ्यात दुखायला सुरुवात झाली.',
      event4Badge: 'सुरुवात',
    },

    screen5: {
      headerTitle: 'Doctor Brief',
      statusTag: 'तपासणीसाठी तयार',
      wf1: 'तपासा',
      wf2: 'बदल करा',
      wf3: 'मंजूर करा',
      concernLabel: 'मुख्य त्रास',
      concernVal: 'डाव्या गुडघ्यात गेल्या ३ आठवड्यांपासून त्रास होतोय.',
      trajectoryLabel: 'काय बदललं?',
      trajectoryVal: 'पायऱ्या चढताना जास्त त्रास होतो. सकाळी उठल्यावर थोडा जडपणा जाणवतो.',
      medsLabel: 'आधी घेतलेलं औषध',
      medsVal: 'Ibuprofen 400 mg घेतलं होतं. थोडा वेळ आराम मिळाला.',
      recordsLabel: 'तुमचे Reports',
      recordsVal: 'X-Ray रिपोर्ट जोडला आहे (Joint space सामान्य) आणि Prescription उपलब्ध आहे.',
      approveBtn: 'Doctor सोबत Share करण्यासाठी मंजूर करा',
      approvedBtn: 'Share करण्यासाठी मंजूर केले ✓',
      disclaimer: 'हा फक्त माहितीचा सारांश आहे, कोणताही थेट वैद्यकीय सल्ला नाही.',
    },

    screen6: {
      headerTitle: 'Right Doctor शोध',
      routesTag: '२ सोपे मार्ग',
      tabRouteA: 'थेट पर्याय',
      tabRouteB: 'Care Consultant मदत',
      filterKicker: 'त्रासानुसार तज्ज्ञ डॉक्टर',
      filterText: 'तुमच्या त्रासासाठी योग्य अनुभव असलेल्या Doctor चे पर्याय पाहा.',
      doc1Title: 'Dr. संजय मेहता, MS (Ortho)',
      doc1Desc: 'Apex Orthopaedic Center · १५+ वर्षांचा अनुभव',
      doc1Why: 'गुडघ्याच्या आणि सांध्यांच्या त्रासावर औषधोपचाराचा मोठा अनुभव.',
      doc2Title: 'Dr. अनिता जोशी, MD',
      doc2Desc: 'Sports & Musculoskeletal Care · १२ वर्षांचा अनुभव',
      doc2Why: 'चालताना किंवा व्यायामात होणाऱ्या त्रासावर उपायांसाठी विशेष तज्ज्ञ.',
      consultantNoticeTitle: 'Care Consultant मदत उपलब्ध',
      consultantNoticeText:
        'आमचे Care Consultant तुमच्या सोयीनुसार योग्य Doctor शोधण्यात आणि वेळ ठरवण्यात मदत करतील.',
      consultantScope1: 'योग्य तज्ज्ञ निवडण्यात मदत',
      consultantScope2: 'Doctor Brief तयार करून भेट ठरवणे',
      verifiedPill: 'Verified Doctor',
    },

    screen7: {
      headerTitle: 'Share with Control',
      scopeTag: 'सुरक्षित प्रवेश',
      docSelectLabel: 'निवडलेले Doctor',
      selectedDocName: 'Dr. संजय मेहता, MS (Ortho)',
      selectedDocClinic: 'Apex Orthopaedic Center · Reg #MED-74921',
      scopeLabel: 'तुम्ही दिलेली माहितीची परवानगी',
      scopeChip1: 'फक्त ३०-सेकंदांचा Doctor Brief',
      scopeChip2: 'शेवटचा X-Ray रिपोर्ट',
      scopeChip3: '७ दिवसांसाठी प्रवेश',
      scopeChipRestricted: 'इतर खाजगी माहिती सुरक्षित',
      passActiveTitle: 'सुरक्षित डिजिटल पास सक्रिय',
      passActiveDesc:
        'Dr. मेहता फक्त मंजूर केलेला Doctor Brief पाहू शकतील. ७ दिवसांनंतर हा प्रवेश आपोआप बंद होईल.',
      continuityTagline: 'भेटीनंतर Doctor ची नोंद तुमच्या Health Memory मध्ये आपोआप जोडली जाईल.',
    },

    consultantWorkspace: {
      url: 'care-consultant.medvidhi.com/portal/case/cc-7294',
      role: 'CARE CONSULTANT WORKSPACE',
      caseTag: 'केस CC-7294',
      caseHeading: 'रुग्ण सहाय्य आणि योग्य डॉक्टर पडताळणी',
      scopeBoundary: 'मानवी मार्गदर्शन स्तर · मर्यादित माहितीचा आढावा',
      patientAlias: 'रुग्ण केस #P-4829',
      requestTime: '१२ मिनिटांपूर्वी विनंती आली',
      requestNote:
        'ट्रेकनंतर रुग्णाच्या डाव्या गुडघ्यात ३ आठवड्यांपासून त्रास होतोय. योग्य तज्ज्ञांचा सल्ला हवा आहे.',
      acceptBtn: 'केस तपासा आणि मार्गदर्शन करा',
      declineBtn: 'दुसऱ्या सल्लागाराकडे पाठवा',
      funnelTitle: '७ टप्प्यांची पडताळणी पद्धत',
      funnelStepPrefix: 'टप्पा',
      funnelReady: 'तयार',
      filterSteps: [
        { title: 'वैद्यकीय विभाग', desc: 'हाडांचे आणि सांध्यांचे तज्ज्ञ (Orthopaedics)' },
        { title: 'विशेष अनुभव', desc: 'गुडघ्याचा ताण आणि हालचालीतील त्रास' },
        { title: 'त्रासाचे स्वरूप', desc: '३ आठवड्यांचा त्रास, तातडीची आपत्कालीन स्थिती नाही' },
        { title: 'जवळचे ठिकाण', desc: 'रुग्णाच्या घरापासून ८ किमीच्या आत' },
        { title: 'नोंदणी तपासणी', desc: 'मेडिकल कौन्सिलची अधिकृत नोंदणी पडताळली' },
        { title: 'उपलब्ध वेळ', desc: 'पुढील २४ ते ४८ तासांत भेट उपलब्ध' },
        { title: 'रुग्णाची पसंती', desc: 'शस्त्रक्रियेशिवाय व्यायामाने उपचार करणारे तज्ज्ञ' },
      ],
      shortlistKicker: 'तपासलेले पर्याय',
      shortlistCount: '२ योग्य तज्ज्ञ निवडले',
      doc1Name: 'Dr. संजय मेहता, MS (Ortho)',
      doc1Cred: '१५+ वर्षे अनुभव · Reg #MED-74921',
      doc1Clinic: 'Apex Orthopaedic Center',
      doc1Why: 'पहिला पर्याय: गुडघ्याच्या दुखण्यावर व्यायाम आणि औषधांनी उपचारात तज्ज्ञ.',
      doc2Name: 'Dr. अनिता जोशी, MD',
      doc2Cred: '१२ वर्षे अनुभव · Reg #MED-58102',
      doc2Clinic: 'Sports & Musculoskeletal Care',
      doc2Why: 'दुसरा पर्याय: सांध्यांच्या हालचाली आणि पुनर्वसनात विशेष अनुभव.',
      verifiedStamp: 'सल्लागाराने पडताळले',
      verifiedDate: 'आज, सकाळी ०९:४१',
      statusReviewed: 'Care Consultant कडून तपासणी पूर्ण',
      statusReviewing: 'तपासणी सुरू आहे',
      consultantSignoff:
        'तपासलेले डॉक्टर पर्याय रुग्णाला थेट वेळ ठरवण्यासाठी पाठवले आहेत.',
    },

    doctorWorkspace: {
      url: 'doctor.medvidhi.com/portal/authorized-access/p-4829',
      role: 'DOCTOR WORKSPACE PORTAL',
      doctorName: 'Dr. संजय मेहता, MS (Ortho)',
      doctorReg: 'Apex Orthopaedic Center · Reg #MED-74921',
      authScopeTag: 'रुग्णाने मंजूर केलेला प्रवेश • ७ दिवस शिल्लक',
      briefCardTitle: 'PATIENT-AUTHORIZED 30-SECOND DOCTOR BRIEF',
      briefSyncMeta: 'Patient Pass द्वारे प्राप्त',
      chiefConcernLabel: 'मुख्य त्रास',
      chiefConcernVal: 'डाव्या गुडघ्यात गेल्या ३ आठवड्यांपासून त्रास होतोय.',
      trajectoryLabel: 'काय बदललं?',
      trajectoryVal: 'पायऱ्या चढताना जास्त त्रास होतो. सकाळी उठल्यावर थोडा जडपणा जाणवतो.',
      medsLabel: 'आधी घेतलेलं औषध',
      medsVal: 'Ibuprofen 400 mg घेतलं होतं. थोडा वेळ आराम मिळाला.',
      recordsLabel: 'तुमचे Reports',
      recordsVal: 'X-Ray रिपोर्ट जोडला आहे (Joint space सामान्य) आणि Prescription उपलब्ध आहे.',
      postConsultTitle: 'तपासणीनंतरची अधिकृत नोंद',
      authorTag: 'Dr. संजय मेहता यांच्याकडून',
      clinicalNoteText:
        'तपासणीत गुडघ्यावर सामान्य ताण असल्याचे दिसले, लिगामेंट सुरक्षित आहेत. ४ आठवडे गुडघ्याला बळ देणारे व्यायाम आणि फिजिओथेरपीचा सल्ला दिला.',
      recordedTime: 'आज, सकाळी ११:३०',
      syncedBadge: 'HEALTH MEMORY मध्ये जोडले गेले',
      finalContinuityTagline:
        'Doctor ची ही नोंद रुग्णाच्या Health Memory मध्ये सुरक्षित राहते, ज्यामुळे पुढील तपासणी सोपी होते.',
    },
  },

  // ==========================================================================
  // HINDI (Natural Conversational Hindi & Familiar Everyday App Terms)
  // ==========================================================================
  hi: {
    ...SHARED_WEBSITE_COPY,

    screen1: {
      badge: 'AI हेल्थ असिस्टेंट',
      greeting: 'नमस्ते, मैं विधी हूँ।',
      lead: 'अपनी सेहत में आ रहे बदलाव के बारे में बताइए।',
      memoryCardTitle: 'आपकी लगातार Health Memory.',
      memoryCardBody:
        'चाहे हल्का दर्द हो, Prescription अपलोड करना हो या Doctor से मिलने की तैयारी — आपकी पूरी सेहत की जानकारी यहाँ सुरक्षित रहती है।',
      promptQuestion: 'कैसा महसूस हो रहा है, बताना शुरू करें?',
      startCta: 'बोलकर या Chat करके शुरू करें →',
      starters: ['घुटने में तकलीफ़', 'Reports जोड़ें', 'Doctor परामर्श की तैयारी'],
      placeholder: 'अपनी तकलीफ़ बताएं या विधी से पूछें...',
      privacy: 'पूरी तरह निजी और सुरक्षित · आपके पूरे नियंत्रण में',
    },

    screen2: {
      headerTitle: 'परेशानी साझा करें',
      inputTag: 'आवाज़ + CHAT',
      patientMessage: 'बाएँ घुटने में पिछले 3 हफ्तों से तकलीफ़ हो रही है। सीढ़ियाँ उतरते समय ज़्यादा दर्द होता है।',
      patientMeta: 'आवाज़ से दर्ज · आज, सुबह 09:24',
      vidhiFollowup1: 'समझ गई। क्या सीढ़ियाँ चढ़ते समय घुटने में सूजन या भारीपन महसूस होता है?',
      vidhiFollowup2: 'क्या सुबह उठने पर थोड़ी अकड़न रहती है?',
      voiceDuration: '0:18',
      transcriptLabel: 'दर्ज की गई आवाज़',
      transcriptText: '"...सीढ़ियाँ उतरते समय ज़्यादा दर्द होता है, अभी सूजन नहीं दिख रही..."',
      confirmBtn: 'लक्षणों की जानकारी सुरक्षित करें',
      confirmedBtn: 'जानकारी दर्ज हो गई ✓',
      composerPlaceholder: 'अपनी तकलीफ़ बताएं या विधी से पूछें...',
    },

    screen3: {
      headerTitle: 'अपने Reports जोड़ें',
      sourceTag: 'REPORTS विश्लेषण',
      uploadPercent: 'प्रक्रिया पूरी',
      extractedBadge: 'मिली हुई जानकारी',
      statusNeedsReview: 'जाँच आवश्यक',
      statusConfirmed: 'Verified',
      confirmReviewBtn: 'निकाली गई जानकारी सही है',
      mriTitle: 'बाएँ घुटने का X-Ray Report',
      mriMeta: 'PDF · 3 दिन पहले जोड़ा गया · Apex Diagnostics',
      mriExtracted: 'Joint space सामान्य है; हड्डियों में कोई चोट या फ्रैक्चर नहीं है।',
      rxTitle: 'Doctor का Prescription',
      rxMeta: 'फोटो (JPEG) · Dr. के. शर्मा · General Practice',
      rxExtracted: 'Ibuprofen 400 mg (ज़रूरत पड़ने पर); घुटने की कसरत की सलाह।',
      medTitle: 'Ibuprofen 400 mg',
      medMeta: 'दर्द निवारक दवा · 10 दिन पहले ली थी',
      medStatus: 'पहले ली गई दवा',
      addDocBtn: '+ अन्य Reports या Prescription जोड़ें',
    },

    screen4: {
      headerTitle: 'आपकी Health Memory',
      episodeTag: 'घुटने की तकलीफ़',
      kicker: 'लक्षणों, Reports और उपचार का लगातार क्रम (Timeline)',
      event1Date: 'आज',
      event1Title: 'बाएँ घुटने में तकलीफ़',
      event1Body: 'सीढ़ियाँ चढ़ते समय ज़्यादा तकलीफ़ होती है। सुबह उठने पर थोड़ी अकड़न रहती है।',
      event1Badge: 'मौजूदा स्थिति',
      event2Date: '3 दिन पहले',
      event2Title: 'Reports और Prescription जोड़े',
      event2Body: 'X-Ray रिपोर्ट जाँची गई, Joint space सुरक्षित है और हड्डियों में कोई चोट नहीं।',
      event2Badge: 'REPORTS जोड़े',
      event3Date: '10 दिन पहले',
      event3Title: 'पहले कौन-सी दवा ली थी?',
      event3Body: 'Ibuprofen 400 mg ली थी। थोड़ी देर आराम मिला।',
      event3Badge: 'घरेलू देखभाल',
      event4Date: '3 हफ्ते पहले',
      event4Title: 'पहली बार दर्द महसूस हुआ',
      event4Body: 'पहाड़ी से उतरते समय बाएँ घुटने में दर्द शुरू हुआ था।',
      event4Badge: 'शुरुआत',
    },

    screen5: {
      headerTitle: 'Doctor Brief',
      statusTag: 'परामर्श के लिए तैयार',
      wf1: 'देखें',
      wf2: 'बदलें',
      wf3: 'मंज़ूरी दें',
      concernLabel: 'मुख्य परेशानी',
      concernVal: 'बाएँ घुटने में पिछले 3 हफ्तों से तकलीफ़ हो रही है।',
      trajectoryLabel: 'क्या बदला?',
      trajectoryVal: 'सीढ़ियाँ चढ़ते समय ज़्यादा तकलीफ़ होती है। सुबह उठने पर थोड़ी अकड़न रहती है।',
      medsLabel: 'पहले कौन-सी दवा ली थी?',
      medsVal: 'Ibuprofen 400 mg ली थी। थोड़ी देर आराम मिला।',
      recordsLabel: 'उपलब्ध Reports',
      recordsVal: 'X-Ray रिपोर्ट जुड़ी है (Joint space सामान्य) और Prescription उपलब्ध है।',
      approveBtn: 'Doctor से Share करने की मंज़ूरी दें',
      approvedBtn: 'Share करने की मंज़ूरी दी गई ✓',
      disclaimer: 'यह केवल परामर्श की तैयारी के लिए सारांश है, चिकित्सीय सलाह नहीं।',
    },

    screen6: {
      headerTitle: 'Right Doctor खोज',
      routesTag: '2 आसान रास्ते',
      tabRouteA: 'सीधे विकल्प',
      tabRouteB: 'Care Consultant सहायता',
      filterKicker: 'लक्षणों के आधार पर विशेषज्ञ',
      filterText: 'अपनी परेशानी के लिए सही अनुभव वाले Doctor के विकल्प देखें।',
      doc1Title: 'Dr. संजय मेहता, MS (Ortho)',
      doc1Desc: 'Apex Orthopaedic Center · 15+ वर्षों का अनुभव',
      doc1Why: 'घुटने और जोड़ों के दर्द के बिना सर्जरी इलाज में गहरा अनुभव।',
      doc2Title: 'Dr. अनिता जोशी, MD',
      doc2Desc: 'Sports & Musculoskeletal Care · 12 वर्षों का अनुभव',
      doc2Why: 'चलने-फिरने में होने वाली तकलीफ़ और फिजियोथेरेपी की विशेषज्ञ।',
      consultantNoticeTitle: 'Care Consultant सहायता उपलब्ध',
      consultantNoticeText:
        'हमारे Care Consultant आपकी सुविधा अनुसार सही Doctor चुनने और अपॉइंटमेंट में मदद करेंगे।',
      consultantScope1: 'सही विशेषज्ञ चुनने में मदद',
      consultantScope2: 'Doctor Brief तैयार करके समय तय करना',
      verifiedPill: 'Verified Doctor',
    },

    screen7: {
      headerTitle: 'Share with Control',
      scopeTag: 'सुरक्षित एक्सेस',
      docSelectLabel: 'चुने हुए Doctor',
      selectedDocName: 'Dr. संजय मेहता, MS (Ortho)',
      selectedDocClinic: 'Apex Orthopaedic Center · Reg #MED-74921',
      scopeLabel: 'जानकारी साझा करने की अनुमति',
      scopeChip1: 'केवल 30-सेकंड का Doctor Brief',
      scopeChip2: 'हालिया X-Ray रिपोर्ट',
      scopeChip3: '7 दिनों के लिए एक्सेस',
      scopeChipRestricted: 'अन्य निजी जानकारी सुरक्षित',
      passActiveTitle: 'सुरक्षित डिजिटल पास सक्रिय',
      passActiveDesc:
        'Dr. मेहता केवल मंज़ूर किया गया Doctor Brief देख सकेंगे। 7 दिनों के बाद यह एक्सेस अपने आप समाप्त हो जाएगा।',
      continuityTagline: 'परामर्श के बाद Doctor की सलाह आपकी Health Memory में अपने आप जुड़ जाएगी।',
    },

    consultantWorkspace: {
      url: 'care-consultant.medvidhi.com/portal/case/cc-7294',
      role: 'CARE CONSULTANT WORKSPACE',
      caseTag: 'केस CC-7294',
      caseHeading: 'केस समीक्षा और सही डॉक्टर सत्यापन',
      scopeBoundary: 'मानवीय मार्गदर्शन स्तर · सीमित जानकारी की समीक्षा',
      patientAlias: 'मरीज केस #P-4829',
      requestTime: '12 मिनट पहले अनुरोध प्राप्त',
      requestNote:
        'ट्रेक के बाद मरीज के बाएँ घुटने में 3 हफ्तों से दर्द है। उचित विशेषज्ञ की सलाह चाहते हैं।',
      acceptBtn: 'केस देखें और मार्गदर्शन करें',
      declineBtn: 'अन्य सलाहकार को सौंपें',
      funnelTitle: '7 चरणों की सत्यापन प्रक्रिया',
      funnelStepPrefix: 'चरण',
      funnelReady: 'तैयार',
      filterSteps: [
        { title: 'चिकित्सीय विभाग', desc: 'हड्डी और जोड़ विशेषज्ञ (Orthopaedics)' },
        { title: 'विशेषज्ञता', desc: 'घुटने पर दबाव और चलने-फिरने में दर्द' },
        { title: 'परेशानी की गंभीरता', desc: '3 हफ्तों का दर्द, कोई आपातकालीन स्थिति नहीं' },
        { title: 'निकटता', desc: 'मरीज के स्थान से 8 किमी के दायरे में' },
        { title: 'पंजीकरण सत्यापन', desc: 'मेडिकल काउंसिल से प्रमाणित पंजीकरण' },
        { title: 'उपलब्ध समय', desc: 'अगले 24 से 48 घंटों में अपॉइंटमेंट उपलब्ध' },
        { title: 'मरीज की प्राथमिकता', desc: 'बिना ऑपरेशन फिजियोथेरेपी से इलाज करने वाले विशेषज्ञ' },
      ],
      shortlistKicker: 'प्रमाणित विकल्प',
      shortlistCount: '2 विशेषज्ञ चुने गए',
      doc1Name: 'Dr. संजय मेहता, MS (Ortho)',
      doc1Cred: '15+ वर्ष अनुभव · Reg #MED-74921',
      doc1Clinic: 'Apex Orthopaedic Center',
      doc1Why: 'पहला विकल्प: घुटने के दर्द पर कसरत और दवाओं से इलाज में विशेषज्ञ।',
      doc2Name: 'Dr. अनिता जोशी, MD',
      doc2Cred: '12 वर्ष अनुभव · Reg #MED-58102',
      doc2Clinic: 'Sports & Musculoskeletal Care',
      doc2Why: 'दूसरा विकल्प: जोड़ों की कार्यप्रणाली और फिजियोथेरेपी में विशेष अनुभव।',
      verifiedStamp: 'सलाहकार द्वारा प्रमाणित',
      verifiedDate: 'आज, सुबह 09:41',
      statusReviewed: 'Care Consultant द्वारा सत्यापन पूर्ण',
      statusReviewing: 'सत्यापन जारी है',
      consultantSignoff:
        'सत्यापित डॉक्टर विकल्प मरीज को सीधे समय तय करने के लिए भेजे गए हैं।',
    },

    doctorWorkspace: {
      url: 'doctor.medvidhi.com/portal/authorized-access/p-4829',
      role: 'DOCTOR WORKSPACE PORTAL',
      doctorName: 'Dr. संजय मेहता, MS (Ortho)',
      doctorReg: 'Apex Orthopaedic Center · Reg #MED-74921',
      authScopeTag: 'मरीज द्वारा स्वीकृत एक्सेस • 7 दिन शेष',
      briefCardTitle: 'PATIENT-AUTHORIZED 30-SECOND DOCTOR BRIEF',
      briefSyncMeta: 'Patient Pass द्वारा प्राप्त',
      chiefConcernLabel: 'मुख्य परेशानी',
      chiefConcernVal: 'बाएँ घुटने में पिछले 3 हफ्तों से तकलीफ़ हो रही है।',
      trajectoryLabel: 'क्या बदला?',
      trajectoryVal: 'सीढ़ियाँ चढ़ते समय ज़्यादा तकलीफ़ होती है। सुबह उठने पर थोड़ी अकड़न रहती है।',
      medsLabel: 'पहले कौन-सी दवा ली थी?',
      medsVal: 'Ibuprofen 400 mg ली थी। थोड़ी देर आराम मिला।',
      recordsLabel: 'उपलब्ध Reports',
      recordsVal: 'X-Ray रिपोर्ट जुड़ी है (Joint space सामान्य) और Prescription उपलब्ध है।',
      postConsultTitle: 'परामर्श के बाद की अधिकृत सलाह',
      authorTag: 'Dr. संजय मेहता द्वारा',
      clinicalNoteText:
        'जाँच में घुटने पर सामान्य खिंचाव देखा गया, लिगामेंट्स पूरी तरह सुरक्षित हैं। 4 हफ्तों के लिए घुटने की मांसपेशी मजबूत करने वाली फिजियोथेरेपी की सलाह दी गई।',
      recordedTime: 'आज, सुबह 11:30',
      syncedBadge: 'HEALTH MEMORY में सुरक्षित',
      finalContinuityTagline:
        'Doctor की यह सलाह मरीज की Health Memory में सुरक्षित रहती है, जिससे आगे की देखभाल आसान हो जाती है।',
    },
  },
};
