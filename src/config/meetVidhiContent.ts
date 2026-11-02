export type Language = 'en' | 'mr' | 'hi';

export interface StageContent {
  stageNumber: string;
  stageTag: string;
  title: string;
  shortDesc: string;
  screenTitle: string;
  screenSubtitle: string;
}

export interface MeetVidhiContent {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  description: string;
  languageSelectLabel: string;
  stages: Record<string, StageContent>;
  phoneScreens: {
    // Phone 1: Welcome & Introduction
    screen1: {
      greeting: string;
      subgreeting: string;
      vidhiBadge: string;
      introTitle: string;
      introBody: string;
      selectLanguagePrompt: string;
      startPrompt: string;
      ctaButton: string;
      privacyNote: string;
    };
    // Phone 2: Tell Vidhi what changed (Chat + Voice)
    screen2: {
      chatHeader: string;
      patientMessage: string;
      patientTimestamp: string;
      vidhiResponse: string;
      followupPrompt: string;
      followupQuestion: string;
      voiceNoteTag: string;
      voiceDuration: string;
      voiceSnippet: string;
      listeningStatus: string;
      inputPlaceholder: string;
    };
    // Phone 3: Build your Health Memory (Timeline + Knee Body Map)
    screen3: {
      memoryHeader: string;
      memoryBadge: string;
      timelineTitle: string;
      concernTag: string;
      concernValue: string;
      durationTag: string;
      durationValue: string;
      patternTag: string;
      patternValue: string;
      bodyMapTitle: string;
      bodyMapPin: string;
      bodyMapSub: string;
      medicinesTag: string;
      medicinesValue: string;
    };
    // Phone 4: Understand your health information (Medical explainer)
    screen4: {
      explainerHeader: string;
      explainerBadge: string;
      termFound: string;
      termName: string;
      termPhonetic: string;
      simpleExplanationTitle: string;
      simpleExplanation: string;
      patientImpactTitle: string;
      patientImpact: string;
      doctorQuestionHintTitle: string;
      doctorQuestionHint: string;
    };
    // Phone 5: Explore relevant medical expertise (Specialist exploration)
    screen5: {
      careHeader: string;
      careBadge: string;
      explorationNotice: string;
      recommendedAreaTitle: string;
      specialtyName: string;
      specialtyScope: string;
      rationaleTitle: string;
      rationaleText: string;
      assessmentTitle: string;
      assessmentPoints: string[];
      disclaimer: string;
    };
    // Phone 6: Prepare your 30-second Doctor Brief
    screen6: {
      briefHeader: string;
      briefBadge: string;
      briefSubtitle: string;
      patientSummaryTitle: string;
      patientSummary: string;
      timelineSummaryTitle: string;
      timelineSummary: string;
      keyObservationsTitle: string;
      keyObservations: string[];
      doctorOrientationNote: string;
      shareAction: string;
      saveAction: string;
    };
  };
}

export const MEET_VIDHI_DATA: Record<Language, MeetVidhiContent> = {
  en: {
    eyebrow: 'MEET VIDHI · YOUR AI HEALTH ASSISTANT',
    heading: 'Your health story,',
    headingAccent: 'in your language.',
    description:
      'From everyday health changes to a clearer doctor conversation, Vidhi helps bring your health context together.',
    languageSelectLabel: 'Select interaction language:',
    stages: {
      stage1: {
        stageNumber: '01',
        stageTag: 'WELCOME',
        title: 'Meet Vidhi',
        shortDesc: 'A gentle, conversational companion that understands what you are feeling in everyday words.',
        screenTitle: 'Welcome to Vidhi',
        screenSubtitle: 'Personal Health Assistant',
      },
      stage2: {
        stageNumber: '02',
        stageTag: 'INTAKE',
        title: 'Tell Vidhi what changed',
        shortDesc: 'Share your symptoms via chat or natural voice notes with intelligent clinical follow-ups.',
        screenTitle: 'Firsthand Narrative',
        screenSubtitle: 'Conversational Voice & Chat',
      },
      stage3: {
        stageNumber: '03',
        stageTag: 'MEMORY',
        title: 'Build your Health Memory',
        shortDesc: 'Transform scattered moments into an evolving timeline with an interactive Body Map.',
        screenTitle: 'Health Memory',
        screenSubtitle: 'Timeline & Body Location',
      },
      stage4: {
        stageNumber: '04',
        stageTag: 'EXPLAINER',
        title: 'Understand your health information',
        shortDesc: 'Demystify medical jargon and lab terminology into clear, accessible explanations.',
        screenTitle: 'Clinical Clarity',
        screenSubtitle: 'Everyday Medical Explanations',
      },
      stage5: {
        stageNumber: '05',
        stageTag: 'NAVIGATION',
        title: 'Explore relevant medical expertise',
        shortDesc: 'Navigate toward the most relevant clinical specialties based on your organized context.',
        screenTitle: 'Care Pathway',
        screenSubtitle: 'Explore Relevant Specialties',
      },
      stage6: {
        stageNumber: '06',
        stageTag: 'BRIEF',
        title: 'Prepare your 30-second Doctor Brief',
        shortDesc: 'Synthesize your entire episode into a concise, doctor-ready brief you control.',
        screenTitle: 'Doctor Brief',
        screenSubtitle: 'Pre-Consultation Synthesis',
      },
    },
    phoneScreens: {
      screen1: {
        greeting: "Hi, I'm Vidhi.",
        subgreeting: "Tell me what's been changing with your health.",
        vidhiBadge: 'AI HEALTH ASSISTANT',
        introTitle: 'Your continuous health memory.',
        introBody: 'Whether you notice a subtle ache, upload a prescription, or prepare to meet a specialist, I help preserve your complete health story.',
        selectLanguagePrompt: 'Choose your language to begin:',
        startPrompt: 'Ready to describe how you feel?',
        ctaButton: 'Start with Voice or Chat',
        privacyNote: 'Private & secure · In your full control',
      },
      screen2: {
        chatHeader: 'Symptom Conversation',
        patientMessage: 'My knee has been hurting on and off for about two weeks. Stairs seem to make it worse.',
        patientTimestamp: 'Today, 10:24 AM',
        vidhiResponse: 'I hear you. Knee discomfort that flares up on stairs often points to joint load. Does it feel sharp or like a deep ache?',
        followupPrompt: 'Clarifying Detail',
        followupQuestion: 'Have you noticed any swelling or morning stiffness?',
        voiceNoteTag: 'Voice Note · 0:18',
        voiceDuration: '0:18',
        voiceSnippet: '“Rest helps for a while, but it keeps returning.”',
        listeningStatus: 'Tap microphone to speak naturally',
        inputPlaceholder: 'Type a message or hold to speak...',
      },
      screen3: {
        memoryHeader: 'Active Episode',
        memoryBadge: 'EPISODE #KN-2026',
        timelineTitle: 'Symptom Timeline',
        concernTag: 'Primary Concern',
        concernValue: 'Recurring knee discomfort',
        durationTag: 'Reported Duration',
        durationValue: '~14 days (Intermittent pattern)',
        patternTag: 'Aggravating Factor',
        patternValue: 'Climbing or descending stairs',
        bodyMapTitle: 'Body Location Pin',
        bodyMapPin: 'Right Knee (Anterior / Patellar)',
        bodyMapSub: 'Load-bearing articular surface',
        medicinesTag: 'Previous Relief Tried',
        medicinesValue: 'Occasional rest, OTC balm',
      },
      screen4: {
        explainerHeader: 'Medical Explainer',
        explainerBadge: 'CLINICAL TERM CLARITY',
        termFound: 'Reported Pattern',
        termName: '“Intermittent”',
        termPhonetic: '/ˌɪntərˈmɪtnt/',
        simpleExplanationTitle: 'What it means in everyday words',
        simpleExplanation: 'The pain comes and goes rather than staying constantly. You have comfortable intervals between flare-ups.',
        patientImpactTitle: 'Why this matters for your doctor',
        patientImpact: 'Helps the clinician differentiate mechanical joint stress from continuous inflammatory conditions.',
        doctorQuestionHintTitle: 'Suggested question to ask your doctor',
        doctorQuestionHint: '“Does this intermittent pattern suggest cartilage wear or tendon strain?”',
      },
      screen5: {
        careHeader: 'Care Navigation',
        careBadge: 'EXPLORATORY DOMAIN',
        explorationNotice: 'Based on your knee timeline and mechanical symptoms',
        recommendedAreaTitle: 'Specialist Domain to Explore',
        specialtyName: 'Orthopaedic / Musculoskeletal Care',
        specialtyScope: 'Joint mechanics, cartilage, ligament health, physical mobility',
        rationaleTitle: 'Why this domain?',
        rationaleText: 'Your reported discomfort is subacute (2 weeks), localized to the patellar joint, and triggers specifically with mechanical load (stairs).',
        assessmentTitle: 'Typical Consultation Focus',
        assessmentPoints: [
          'Physical examination of joint stability & range',
          'Palpation of patellar tendon and meniscus lines',
          'Review of movement mechanics & potential imaging',
        ],
        disclaimer: 'Guidance only. Does not replace professional clinical assessment.',
      },
      screen6: {
        briefHeader: '30-Second Doctor Brief',
        briefBadge: 'READY FOR CONSULTATION',
        briefSubtitle: 'Pre-consultation clinical synthesis',
        patientSummaryTitle: 'Patient Account in 30 Seconds',
        patientSummary: '52-year-old adult reporting right knee discomfort for ~2 weeks. Symptoms are intermittent and aggravated by stairs; temporary relief with rest.',
        timelineSummaryTitle: 'Reported Timeline & Location',
        timelineSummary: 'Onset: ~14 days ago · Right Knee (Anterior) · No reported trauma',
        keyObservationsTitle: 'Points Prepared for Doctor',
        keyObservations: [
          'Mechanical aggravation during stair descent',
          'Absence of acute morning joint lock reported',
          'Clarification needed on joint effusion/swelling',
        ],
        doctorOrientationNote: 'Designed to give clinicians rapid context in the first 30 seconds of your visit.',
        shareAction: 'Share Brief with Doctor',
        saveAction: 'Save to My Records',
      },
    },
  },
  mr: {
    eyebrow: 'विधीला भेटा · तुमचा AI आरोग्य साहाय्यक',
    heading: 'तुमची आरोग्याची गोष्ट,',
    headingAccent: 'तुमच्याच मातृभाषेत.',
    description:
      'रोजच्या लहान-मोठ्या बदलांपासून ते डॉक्टरांशी स्पष्ट संवादापर्यंत, विधी तुमच्या आरोग्याचा संदर्भ एकत्र आणते.',
    languageSelectLabel: 'संवादाची भाषा निवडा:',
    stages: {
      stage1: {
        stageNumber: '०१',
        stageTag: 'स्वागत',
        title: 'विधीला भेटा',
        shortDesc: 'तुमच्या रोजच्या सोप्या शब्दांत तब्येत समजून घेणारा एक विश्वासू आरोग्य सोबती.',
        screenTitle: 'विधीमध्ये स्वागत आहे',
        screenSubtitle: 'वैयक्तिक आरोग्य साहाय्यक',
      },
      stage2: {
        stageNumber: '०२',
        stageTag: 'माहिती',
        title: 'नेमका काय बदल झाला ते सांगा',
        shortDesc: 'चॅट किंवा आवाजाद्वारे लक्षणे सांगा आणि योग्य वैद्यकीय प्रतिप्रश्न मिळवा.',
        screenTitle: 'तुमचा प्रत्यक्ष अनुभव',
        screenSubtitle: 'बोलून किंवा चॅटने माहिती द्या',
      },
      stage3: {
        stageNumber: '०३',
        stageTag: 'आरोग्य स्मृती',
        title: 'आरोग्य स्मृती तयार करा',
        shortDesc: 'विखुरलेली माहिती एका कालमर्यादेत आणि शरीराच्या नकाशावर (Body Map) व्यवस्थित साठवा.',
        screenTitle: 'आरोग्य स्मृती (Health Memory)',
        screenSubtitle: 'लक्षणे व वेदनेचे अचूक स्थान',
      },
      stage4: {
        stageNumber: '०४',
        stageTag: 'सोपे अर्थ',
        title: 'वैद्यकीय माहिती सोप्या भाषेत समजून घ्या',
        shortDesc: 'कठीण वैद्यकीय शब्द आणि रिपोर्ट्सचा अर्थ आपल्या घरगुती भाषेत स्पष्ट करा.',
        screenTitle: 'वैद्यकीय शब्दांचे सोपे अर्थ',
        screenSubtitle: 'घरगुती भाषेत स्पष्टीकरण',
      },
      stage5: {
        stageNumber: '०५',
        stageTag: 'तज्ज्ञ शोध',
        title: 'योग्य वैद्यकीय तज्ज्ञांची माहिती घ्या',
        shortDesc: 'तुमच्या लक्षणांनुसार कोणत्या विभागाच्या डॉक्टरांचा सल्ला घेणे योग्य ठरेल ते समजून घ्या.',
        screenTitle: 'उपचारांची योग्य दिशा',
        screenSubtitle: 'संबंधित तज्ज्ञ विभाग',
      },
      stage6: {
        stageNumber: '०६',
        stageTag: 'डॉक्टर ब्रीफ',
        title: '३० सेकंदांचा डॉक्टर ब्रीफ तयार करा',
        shortDesc: 'कन्सल्टेशनसाठी महत्त्वाच्या लक्षणांचा एक सुटसुटीत गोषवारा तुमच्या पूर्ण नियंत्रणात तयार करा.',
        screenTitle: '३० सेकंदांचा डॉक्टर ब्रीफ',
        screenSubtitle: 'डॉक्टरांशी चर्चेसाठी संक्षिप्त सारांश',
      },
    },
    phoneScreens: {
      screen1: {
        greeting: 'हाय, मी विधी.',
        subgreeting: 'तुमच्या तब्येतीत काय बदल जाणवतायत? मोकळेपणाने सांगा.',
        vidhiBadge: 'AI आरोग्य साहाय्यक',
        introTitle: 'तुमची निरंतर आरोग्य स्मृती.',
        introBody: 'कधी एखादी कळ असो, औषधांची चिठ्ठी असो किंवा तज्ज्ञ डॉक्टरांना भेटायची तयारी — विधी तुमची संपूर्ण आरोग्यकथा व्यवस्थित मांडून ठेवते.',
        selectLanguagePrompt: 'सुरू करण्यासाठी तुमची भाषा निवडा:',
        startPrompt: 'तब्येतीबद्दल बोलायला तयार आहात का?',
        ctaButton: 'बोलून किंवा चॅटने सुरू करा',
        privacyNote: 'गोपनीय आणि सुरक्षित · तुमच्या पूर्ण नियंत्रणात',
      },
      screen2: {
        chatHeader: 'लक्षणांची बातचीत',
        patientMessage: 'माझ्या उजव्या गुडघ्यात दोन आठवड्यांपासून अधूनमधून दुखतंय. जिने चढताना-उतरताना खूप त्रास होतो.',
        patientTimestamp: 'आज, सकाळी १०:२४',
        vidhiResponse: 'समजलं. जिने चढताना होणारा गुडघेदुखीचा त्रास हा सांध्यावरील ताणामुळे असू शकतो. वेदना टोचल्यासारखी होते की ठणक जाणवतो?',
        followupPrompt: 'महत्त्वाचा तपशील',
        followupQuestion: 'गुडघ्यावर काही सूज किंवा सकाळी उठल्यावर जडपणा जाणवतो का?',
        voiceNoteTag: 'व्हॉइस नोट · ०:१८',
        voiceDuration: '०:१८',
        voiceSnippet: '“विश्रांती घेतली की थोडं बरं वाटतं, पण पुन्हा दुखणं सुरू होतं.”',
        listeningStatus: 'मातृभाषेत बोलण्यासाठी माइकवर टॅप करा',
        inputPlaceholder: 'इथे लिहा किंवा बोलण्यासाठी दाबून धरा...',
      },
      screen3: {
        memoryHeader: 'सध्याचा त्रास',
        memoryBadge: 'नोंद क्रमांक #KN-2026',
        timelineTitle: 'लक्षणांचा प्रवास',
        concernTag: 'मुख्य त्रास',
        concernValue: 'उजव्या गुडघ्यात वारंवार होणारी वेदना',
        durationTag: 'कालावधी',
        durationValue: 'सुमारे १४ दिवस (अधूनमधून होणारा त्रास)',
        patternTag: 'कधी वाढते?',
        patternValue: 'जिने चढताना किंवा जास्त चालताना',
        bodyMapTitle: 'शरीरावरील अचूक स्थान',
        bodyMapPin: 'उजवा गुडघा (पुढील भाग / वाटी)',
        bodyMapSub: 'वजन पेलणारा मुख्य सांधा',
        medicinesTag: 'केलेले प्राथमिक उपाय',
        medicinesValue: 'विश्रांती, साधे मलम लावणे',
      },
      screen4: {
        explainerHeader: 'वैद्यकीय शब्दाचा अर्थ',
        explainerBadge: 'सोप्या भाषेत अर्थ',
        termFound: 'लक्षणाचा प्रकार',
        termName: '“Intermittent” (अधूनमधून)',
        termPhonetic: '/इंटरमिटंट/',
        simpleExplanationTitle: 'घरगुती भाषेत याचा काय अर्थ होतो?',
        simpleExplanation: 'वेदना सतत न राहता काही वेळ येते आणि मग थांबते. दोन त्रासांच्या मध्ये काही काळ शांतता असते.',
        patientImpactTitle: 'डॉक्टरांसाठी हे का महत्त्वाचे आहे?',
        patientImpact: 'यावरून डॉक्टरांना हा त्रास सांध्यावरच्या ताणाचा आहे की आतल्या सूजेचा, हे ठरवायला मदत होते.',
        doctorQuestionHintTitle: 'डॉक्टरांना काय विचारू शकता?',
        doctorQuestionHint: '“डॉक्टर, हा अधूनमधून होणारा त्रास सांध्याची झीज झाल्यामुळे असू शकतो का?”',
      },
      screen5: {
        careHeader: 'योग्य वैद्यकीय दिशा',
        careBadge: 'तपासणीसाठी मार्गदर्शक',
        explorationNotice: 'तुमच्या दोन आठवड्यांच्या गुडघेदुखीच्या लक्षणांवरून',
        recommendedAreaTitle: 'संबंधित वैद्यकीय विभाग',
        specialtyName: 'अस्थिरोग / ऑर्थोपेडिक तज्ज्ञ (Orthopaedics)',
        specialtyScope: 'हाडे, सांधे, स्नायू आणि हालचालींशी संबंधित तपासणी',
        rationaleTitle: 'हा विभाग का योग्य?',
        rationaleText: 'त्रास दोन आठवड्यांपासून आहे, उजव्या गुडघ्याच्या सांध्याशी संबंधित आहे आणि जिन्यांवर भार पडल्यास वाढतो.',
        assessmentTitle: 'तपासणीत सामान्यतः काय होते?',
        assessmentPoints: [
          'गुडघ्याची हालचाल आणि सांध्याची तपासणी',
          'वाटी व गादीवर (Meniscus) दाब देऊन तपासणे',
          'गरज भासल्यास एक्स-रे किंवा प्राथमिक चाचण्या',
        ],
        disclaimer: 'केवळ प्राथमिक मार्गदर्शनासाठी. डॉक्टरांच्या प्रत्यक्ष तपासणीची जागा हे घेऊ शकत नाही.',
      },
      screen6: {
        briefHeader: '३० सेकंदांचा डॉक्टर ब्रीफ',
        briefBadge: 'कन्सल्टेशनसाठी तयार',
        briefSubtitle: 'डॉक्टरांना दाखवण्यासाठी संक्षिप्त सारांश',
        patientSummaryTitle: '३० सेकंदात तुमची माहिती',
        patientSummary: 'सुमारे २ आठवड्यांपासून उजव्या गुडघ्यात अधूनमधून वेदना. जिने वापरताना त्रास वाढतो, विश्रांतीने थोडा आराम मिळतो.',
        timelineSummaryTitle: 'स्थान व कालावधी',
        timelineSummary: 'सुरुवात: १४ दिवसांपूर्वी · उजवा गुडघा · कोणताही अपघात किंवा दुखापत नाही',
        keyObservationsTitle: 'डॉक्टरांशी चर्चेचे मुख्य मुद्दे',
        keyObservations: [
          'जिने उतरताना-चढताना जाणवणारा ताण',
          'सकाळी सांधा आखडत नाही (No morning lock)',
          'सूज किंवा उष्णतेबद्दल डॉक्टरांचे मत घेणे आवश्यक',
        ],
        doctorOrientationNote: 'दवाखान्यात जाताच डॉक्टरांना पहिल्या ३० सेकंदात तुमच्या त्रासाची पूर्ण कल्पना येण्यासाठी तयार केलेला ब्रीफ.',
        shareAction: 'डॉक्टरांना ब्रीफ दाखवा / शेअर करा',
        saveAction: 'माझ्या नोंदींमध्ये सेव्ह करा',
      },
    },
  },
  hi: {
    eyebrow: 'विधि से मिलिए · आपकी AI स्वास्थ्य सहायक',
    heading: 'आपकी सेहत की कहानी,',
    headingAccent: 'आपकी अपनी भाषा में।',
    description:
      'रोजमर्रा के छोटे बदलावों से लेकर डॉक्टर से साफ़ बातचीत तक, विधि आपकी सेहत के सभी संदर्भों को एक साथ लाती है।',
    languageSelectLabel: 'बातचीत की भाषा चुनें:',
    stages: {
      stage1: {
        stageNumber: '०१',
        stageTag: 'स्वागत',
        title: 'विधि से मिलिए',
        shortDesc: 'आपकी आसान भाषा में सेहत के बदलावों को समझने वाली एक संवेदनशील साथी।',
        screenTitle: 'विधि में आपका स्वागत है',
        screenSubtitle: 'व्यक्तिगत स्वास्थ्य सहायक',
      },
      stage2: {
        stageNumber: '०२',
        stageTag: 'विवरण',
        title: 'बताइए सेहत में क्या बदला',
        shortDesc: 'चैट या बोलकर अपनी तकलीफ बताएं और उचित चिकित्सीय प्रश्न पाएं।',
        screenTitle: 'आपकी आपबीती',
        screenSubtitle: 'बोलकर या लिखकर बताइए',
      },
      stage3: {
        stageNumber: '०३',
        stageTag: 'हेल्थ मेमोरी',
        title: 'अपनी हेल्थ मेमोरी बनाएं',
        shortDesc: 'बिखरी हुई बातों को एक स्पष्ट टाइमलाइन और बॉडी मैप पर व्यवस्थित रखें।',
        screenTitle: 'हेल्थ मेमोरी (Health Memory)',
        screenSubtitle: 'समयरेखा व दर्द का सटीक स्थान',
      },
      stage4: {
        stageNumber: '०४',
        stageTag: 'सरल अर्थ',
        title: 'मेडिकल जानकारी को सरलता से समझें',
        shortDesc: 'मुश्किल मेडिकल शब्दों और जांच रिपोर्टों का आसान भाषा में अर्थ समझें।',
        screenTitle: 'मेडिकल शब्दों के आसान अर्थ',
        screenSubtitle: 'सरल भाषा में व्याख्या',
      },
      stage5: {
        stageNumber: '०५',
        stageTag: 'सही डॉक्टर',
        title: 'उचित विशेषज्ञता की दिशा समझें',
        shortDesc: 'अपने लक्षणों के आधार पर समझें कि किस विभाग के डॉक्टर से मिलना सही रहेगा।',
        screenTitle: 'सही देखभाल की दिशा',
        screenSubtitle: 'संबंधित विशेषज्ञ विभाग',
      },
      stage6: {
        stageNumber: '०६',
        stageTag: 'डॉक्टर ब्रीफ',
        title: '३०-सेकंड का डॉक्टर ब्रीफ तैयार करें',
        shortDesc: 'कंसल्टेशन के लिए सभी मुख्य बातों का एक संक्षिप्त और स्पष्ट सारांश अपने पास रखें।',
        screenTitle: '३०-सेकंड का डॉक्टर ब्रीफ',
        screenSubtitle: 'डॉक्टर से बातचीत के लिए तैयार सारांश',
      },
    },
    phoneScreens: {
      screen1: {
        greeting: 'नमस्ते, मैं विधि हूँ।',
        subgreeting: 'आपकी सेहत में क्या बदलाव महसूस हो रहे हैं? आप आराम से बता सकते हैं।',
        vidhiBadge: 'AI स्वास्थ्य सहायक',
        introTitle: 'आपकी निरंतर सेहत की डायरी।',
        introBody: 'चाहे कोई नया दर्द हो, पुरानी पर्ची हो या किसी डॉक्टर से मिलने की तैयारी — मैं आपकी पूरी बात को सही रूप में संभाल कर रखती हूँ।',
        selectLanguagePrompt: 'शुरुआत के लिए अपनी भाषा चुनें:',
        startPrompt: 'अपनी तकलीफ साझा करने के लिए तैयार हैं?',
        ctaButton: 'बोलकर या लिखकर शुरू करें',
        privacyNote: 'पूरी तरह सुरक्षित एवं गोपनीय · आपके पूर्ण नियंत्रण में',
      },
      screen2: {
        chatHeader: 'लक्षणों पर बातचीत',
        patientMessage: 'मेरे दाहिने घुटने में लगभग दो हफ़्तों से रुक-रुक कर दर्द हो रहा है। सीढ़ियाँ चढ़ते-उतरते समय दर्द बढ़ जाता है।',
        patientTimestamp: 'आज, सुबह १०:२४',
        vidhiResponse: 'समझ सकती हूँ। सीढ़ियों पर घुटने में दर्द होना अक्सर जोड़ पर पड़ने वाले दबाव से जुड़ा होता है। क्या यह दर्द चुभन जैसा है या हल्का खिंचाव?',
        followupPrompt: 'ज़रूरी जानकारी',
        followupQuestion: 'क्या सुबह उठने पर घुटने में अकड़न या हल्की सूजन दिखाई देती है?',
        voiceNoteTag: 'वॉयस नोट · ०:१८',
        voiceDuration: '०:१८',
        voiceSnippet: '“आराम करने पर थोड़ा सुकून मिलता है, लेकिन फिर दर्द लौट आता है।”',
        listeningStatus: 'अपनी भाषा में बोलने के लिए माइक दबाएं',
        inputPlaceholder: 'यहाँ लिखें या बोलने के लिए दबाकर रखें...',
      },
      screen3: {
        memoryHeader: 'मौजूदा समस्या',
        memoryBadge: 'केस संदर्भ #KN-2026',
        timelineTitle: 'लक्षणों की समयरेखा',
        concernTag: 'मुख्य शिकायत',
        concernValue: 'दाहिने घुटने में बार-बार होने वाला दर्द',
        durationTag: 'अवधि',
        durationValue: 'लगभग १४ दिन (रुक-रुक कर)',
        patternTag: 'कब बढ़ता है?',
        patternValue: 'सीढ़ियां चढ़ने या अधिक चलने पर',
        bodyMapTitle: 'शरीर पर दर्द का स्थान',
        bodyMapPin: 'दाहिना घुटना (सामने का हिस्सा / कटोरी)',
        bodyMapSub: 'वज़न उठाने वाला मुख्य जोड़',
        medicinesTag: 'किए गए उपाय',
        medicinesValue: 'आराम, सामान्य पेन बाम',
      },
      screen4: {
        explainerHeader: 'मेडिकल शब्द का अर्थ',
        explainerBadge: 'सरल भाषा में अर्थ',
        termFound: 'लक्षण का प्रकार',
        termName: '“Intermittent” (रुक-रुक कर)',
        termPhonetic: '/इंटरमिटेंट/',
        simpleExplanationTitle: 'आसान शब्दों में इसका क्या मतलब है?',
        simpleExplanation: 'दर्द लगातार न रहकर बीच-बीच में होता है और फिर बंद हो जाता है। दौरों के बीच आराम का समय मिलता है।',
        patientImpactTitle: 'डॉक्टर के लिए यह क्यों ज़रूरी है?',
        patientImpact: 'इससे डॉक्टर यह समझ पाते हैं कि दर्द जोड़ पर दबाव का है या किसी अंदरूनी सूजन का।',
        doctorQuestionHintTitle: 'डॉक्टर से क्या पूछ सकते हैं?',
        doctorQuestionHint: '“डॉक्टर साहब, क्या यह रुक-रुक कर होने वाला दर्द घुटने के कार्टिलेज पर असर का संकेत है?”',
      },
      screen5: {
        careHeader: 'सही देखभाल की दिशा',
        careBadge: 'मार्गदर्शक जानकारी',
        explorationNotice: 'आपके दो हफ़्तों के घुटने के दर्द के आधार पर',
        recommendedAreaTitle: 'संबंधित विशेषज्ञ विभाग',
        specialtyName: 'हड्डी एवं जोड़ रोग विशेषज्ञ (Orthopaedics)',
        specialtyScope: 'जोड़ों का स्वास्थ्य, लिगामेंट्स, कार्टिलेज और चलने-फिरने की क्षमता',
        rationaleTitle: 'यह विभाग क्यों?',
        rationaleText: 'दर्द १४ दिनों से है, दाहिने घुटने के जोड़ पर केंद्रित है और सीढ़ियों के दबाव पर बढ़ता है।',
        assessmentTitle: 'जांच में आमतौर पर क्या होता है?',
        assessmentPoints: [
          'घुटने की गति और जोड़ की स्थिरता की जांच',
          'घुटने की कटोरी और अंदरूनी गद्दी को छूकर देखना',
          'ज़रूरत पड़ने पर साधारण एक्स-रे या सलाह',
        ],
        disclaimer: 'केवल प्राथमिक मार्गदर्शन के लिए। यह डॉक्टर के व्यक्तिगत परामर्श का विकल्प नहीं है।',
      },
      screen6: {
        briefHeader: '३०-सेकंड का डॉक्टर ब्रीफ',
        briefBadge: 'कंसल्टेशन के लिए तैयार',
        briefSubtitle: 'डॉक्टर से परामर्श के लिए संक्षिप्त रिपोर्ट',
        patientSummaryTitle: '३० सेकंड में आपका मामला',
        patientSummary: '५२ वर्षीय व्यक्ति, लगभग २ सप्ताह से दाहिने घुटने में रुक-रुक कर दर्द। सीढ़ियों पर दर्द बढ़ता है, आराम से राहत मिलती है।',
        timelineSummaryTitle: 'स्थान व समयसीमा',
        timelineSummary: 'शुरुआत: ~१४ दिन पूर्व · दाहिना घुटना · किसी चोट या गिरने का इतिहास नहीं',
        keyObservationsTitle: 'डॉक्टर से चर्चा के प्रमुख बिंदु',
        keyObservations: [
          'सीढ़ियाँ उतरते समय यांत्रिक दबाव की शिकायत',
          'सुबह जोड़ के पूरी तरह लॉक होने की शिकायत नहीं',
          'जोड़ के अंदर सूजन या दबाव पर डॉक्टर की सलाह आवश्यक',
        ],
        doctorOrientationNote: 'डॉक्टर को आपकी विज़िट के पहले ३० सेकंड में ही पूरी स्थिति का तुरंत अंदाज़ा देने के लिए तैयार किया गया ब्रीफ।',
        shareAction: 'डॉक्टर को ब्रीफ दिखाएं / शेयर करें',
        saveAction: 'मेरी फाइल में सुरक्षित करें',
      },
    },
  },
};

