import React, { useState } from 'react';
import {
  Mic,
  History,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Database,
  FileText,
  MessageSquare,
  Crosshair,
  Pill,
  Stethoscope,
  Activity,
  RotateCcw,
  Clock,
  Compass,
  HelpCircle,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import {
  VOICE_DEMO_CONTENT,
  CHAT_DEMO_STEPS,
  HEALTH_MEMORY_SOURCES,
  HEALTH_MEMORY_TIMELINE,
  REPORT_EXPLAINER_SAMPLES,
  LanguageCode,
  ChatMessage,
  ChatSuggestedAnswer,
} from '@/config/showcaseContent';
import { BodyMapSlot } from './BodyMapSlot';
import { SwipeHint } from '@/components/common/SwipeHint/SwipeHint';
import { useSwipeHint } from '@/lib/motion/useSwipeHint';
import './ActiveFeatureFloatingPanel.css';

interface ActiveFeatureFloatingPanelProps {
  activeFeatureId: string;
  onSelectFeature: (id: string) => void;
}

const FEATURE_LIST = [
  { id: 'feature-body-map', label: 'Body Map', index: '01' },
  { id: 'feature-voice', label: 'Voice', index: '02' },
  { id: 'feature-chat', label: 'Chat', index: '03' },
  { id: 'feature-doctor-brief', label: '30-Second Doctor Brief', index: '04' },
  { id: 'feature-health-memory', label: 'Health Memory', index: '05' },
  { id: 'feature-report-explainer', label: 'Medical & Report Explainer', index: '06' },
  { id: 'feature-right-doctor', label: 'Right Doctor', index: '07' },
];

/**
 * Custom Balanced Geometric Network Icon
 * Designed specifically for the MEDVIDHI Health Memory central core.
 * Features an octagonal node matrix, concentric calibration rings,
 * 8 radial axes, and a pure monochrome nucleus.
 */
const HealthMemoryCentralNetworkSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 64,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`central-network-svg ${className}`}
    aria-hidden="true"
  >
    {/* Concentric Calibration Rings */}
    <circle cx="40" cy="40" r="37" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.35" />
    <circle cx="40" cy="40" r="28" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.25" />
    <circle cx="40" cy="40" r="18" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.4" />

    {/* 8 Radial Directional Axes */}
    <line x1="40" y1="3" x2="40" y2="77" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 2" />
    <line x1="3" y1="40" x2="77" y2="40" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 2" />
    <line x1="14" y1="14" x2="66" y2="66" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 2" />
    <line x1="14" y1="66" x2="66" y2="14" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="2 2" />

    {/* Octagonal Interconnected Matrix */}
    <polygon
      points="40,12 60,20 68,40 60,60 40,68 20,60 12,40 20,20"
      stroke="#FFFFFF"
      strokeWidth="1.6"
      strokeOpacity="0.75"
      fill="rgba(255, 255, 255, 0.04)"
      strokeLinejoin="round"
    />

    {/* Inner Secondary Diamond Grid */}
    <polygon
      points="40,22 58,40 40,58 22,40"
      stroke="#FFFFFF"
      strokeWidth="1.2"
      strokeOpacity="0.6"
      fill="none"
    />

    {/* 8 Radial Node Vertices */}
    <circle cx="40" cy="12" r="2.8" fill="#FFFFFF" />
    <circle cx="60" cy="20" r="2.8" fill="#D4D4D8" />
    <circle cx="68" cy="40" r="2.8" fill="#FFFFFF" />
    <circle cx="60" cy="60" r="2.8" fill="#D4D4D8" />
    <circle cx="40" cy="68" r="2.8" fill="#FFFFFF" />
    <circle cx="20" cy="60" r="2.8" fill="#D4D4D8" />
    <circle cx="12" cy="40" r="2.8" fill="#FFFFFF" />
    <circle cx="20" cy="20" r="2.8" fill="#D4D4D8" />

    {/* Center Core Nucleus */}
    <circle cx="40" cy="40" r="6" fill="#FFFFFF" />
  </svg>
);

export const ActiveFeatureFloatingPanel: React.FC<ActiveFeatureFloatingPanelProps> = ({
  activeFeatureId,
  onSelectFeature,
}) => {
  // ---------------------------------------------------------------------------
  // State for Sub-Feature Interactions
  // ---------------------------------------------------------------------------

  // Horizontal timeline step strip (Health Memory)
  const timelineSwipe = useSwipeHint<HTMLDivElement>();


  // 2. Voice Demo
  const [voiceLang, setVoiceLang] = useState<LanguageCode>('mr');

  // 3. Chat Demo
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(CHAT_DEMO_STEPS.initialMessages);
  const [chatEntities, setChatEntities] = useState<{ label: string; value: string }[]>([
    { label: 'Chief Complaint', value: 'Lightheadedness upon rapid rising' },
    { label: 'Duration', value: '14 days subacute' },
    { label: 'Postural Trigger', value: 'Sit-to-stand transition' },
  ]);
  const [selectedChipId, setSelectedChipId] = useState<string | null>(null);

  // 4. Doctor Brief Demo (Illustrative Knee-Discomfort Interactive Exploration)
  type BriefTab = 'reported' | 'timeline' | 'to_clarify' | 'care_to_explore' | 'doctor_brief';
  const [briefTab, setBriefTab] = useState<BriefTab>('reported');
  const [briefViewMode, setBriefViewMode] = useState<'doctor' | 'patient'>('patient');

  // 5. Health Memory Demo
  // Crucial requirement: cards should react ONLY to actual pointer hover or keyboard focus,
  // returning to their neutral appearance when neither applies (NO permanent active hover effects on Body Map / Voice).
  const [hoveredMemorySourceId, setHoveredMemorySourceId] = useState<string | null>(null);
  const [selectedTimelineEventId, setSelectedTimelineEventId] = useState<string>('ev-1');

  // 6. Report Explainer Demo
  const [explainerLang, setExplainerLang] = useState<LanguageCode>('mr');
  const [selectedReportId, setSelectedReportId] = useState<string>('lipid-panel');

  // Current feature metadata
  const currentIdx = FEATURE_LIST.findIndex((f) => f.id === activeFeatureId);
  const safeIdx = currentIdx >= 0 ? currentIdx : 0;
  const currentMeta = FEATURE_LIST[safeIdx];

  const handlePrevFeature = () => {
    const prev = safeIdx > 0 ? safeIdx - 1 : FEATURE_LIST.length - 1;
    onSelectFeature(FEATURE_LIST[prev].id);
  };

  const handleNextFeature = () => {
    const next = safeIdx < FEATURE_LIST.length - 1 ? safeIdx + 1 : 0;
    onSelectFeature(FEATURE_LIST[next].id);
  };

  const handleSelectSuggestedAnswer = (ans: ChatSuggestedAnswer) => {
    if (selectedChipId) return;
    setSelectedChipId(ans.id);

    const userMsg: ChatMessage = {
      id: `p-${Date.now()}`,
      sender: 'patient',
      text: ans.fullText,
      timestamp: '10:44 AM',
    };
    setChatMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      setChatMessages((prev) => [...prev, CHAT_DEMO_STEPS.followUpResponse]);
      setChatEntities((prev) => [
        ...prev,
        { label: ans.resultingEntity.label, value: ans.resultingEntity.value },
      ]);
    }, 450);
  };

  const renderMemorySourceIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare size={15} />;
      case 'Mic':
        return <Mic size={15} />;
      case 'Crosshair':
        return <Crosshair size={15} />;
      case 'FileText':
        return <FileText size={15} />;
      case 'Pill':
        return <Pill size={15} />;
      case 'Stethoscope':
        return <Stethoscope size={15} />;
      case 'History':
        return <History size={15} />;
      case 'Activity':
      default:
        return <Activity size={15} />;
    }
  };

  const selectedTimelineEvent =
    HEALTH_MEMORY_TIMELINE.find((e) => e.id === selectedTimelineEventId) ||
    HEALTH_MEMORY_TIMELINE[0];

  return (
    <div
      id="feature-preview-window"
      className="showcase-floating-panel"
      role="region"
      aria-label={`${currentMeta.label} Feature Preview Window`}
    >
      {/* Floating Panel Top Navigation Bar */}
      <div className="panel-topbar">
        <div className="panel-badge-group">
          <span className="panel-feature-index">FEATURE {currentMeta.index} OF 07</span>
          <span className="panel-divider" aria-hidden="true">•</span>
          <span className="panel-feature-title">{currentMeta.label}</span>
        </div>

        <div className="panel-nav-controls">
          <button
            type="button"
            className="panel-nav-btn"
            onClick={handlePrevFeature}
            aria-label="Previous feature preview"
            title="Previous feature"
          >
            <ChevronLeft size={14} />
            <span>Prev</span>
          </button>

          <div
            className="panel-dots-track"
            role="group"
            aria-label="Feature preview pagination"
          >
            {FEATURE_LIST.map((feat, i) => (
              <button
                key={feat.id}
                type="button"
                className={`panel-dot ${i === safeIdx ? 'is-active' : ''}`}
                onClick={() => onSelectFeature(feat.id)}
                aria-label={`Switch to ${feat.label}`}
                aria-current={i === safeIdx ? 'true' : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            className="panel-nav-btn"
            onClick={handleNextFeature}
            aria-label="Next feature preview"
            title="Next feature"
          >
            <span>Next</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Main Dynamic Feature Content Viewport */}
      <div className="panel-content-viewport" key={activeFeatureId}>
        {/* ================================================================ */}
        {/* 01. BODY MAP PREVIEW                                             */}
        {/* ================================================================ */}
        {activeFeatureId === 'feature-body-map' && (
          <div className="preview-container preview-body-map-wrap">
            <BodyMapSlot />
          </div>
        )}


        {/* ================================================================ */}
        {/* 02. VOICE DEMONSTRATION PREVIEW                                  */}
        {/* ================================================================ */}
        {activeFeatureId === 'feature-voice' && (
          <div className="preview-container preview-voice">
            <div className="preview-header-block">
              <span className="preview-eyebrow">Multilingual Conversational Capture</span>
              <h3 className="preview-headline">
                Speak in your own words.{' '}
                <span className="editorial-serif preview-serif">MEDVIDHI structures the context.</span>
              </h3>
              <p className="preview-description">
                Visual demonstration of multi-modal intake. Patients can speak naturally in English, Marathi, 
                or Hindi without reciting medical jargon.
              </p>
            </div>

            {/* Language Switcher Bar: English | मराठी | हिन्दी */}
            <div className="voice-lang-bar">
              <span className="voice-lang-label">Language:</span>
              <div className="voice-lang-chips">
                {(['en', 'mr', 'hi'] as LanguageCode[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    className={`voice-lang-chip ${voiceLang === lang ? 'is-active' : ''}`}
                    onClick={() => setVoiceLang(lang)}
                  >
                    {lang === 'en' && 'English'}
                    {lang === 'mr' && 'मराठी'}
                    {lang === 'hi' && 'हिन्दी'}
                  </button>
                ))}
              </div>
            </div>

            <div className="voice-interactive-grid">
              {/* Left: Waveform & Microphone Visual */}
              <div className="voice-waveform-pane">
                <div className="voice-mic-halo">
                  <div className="mic-outer-ring" />
                  <div className="mic-icon-circle">
                    <Mic size={24} className="mic-svg" />
                  </div>
                </div>

                {/* Animated Soundwave Frequency Bars */}
                <div className="waveform-frequency-bars" aria-hidden="true">
                  {[24, 48, 68, 35, 78, 92, 54, 70, 85, 42, 60, 80, 50, 68, 36].map((h, i) => (
                    <span
                      key={i}
                      className="frequency-bar"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 0.08}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="voice-status-indicator">
                  <span className="voice-live-dot" />
                  <span>{VOICE_DEMO_CONTENT[voiceLang].langLabel} Voice Input Active</span>
                </div>
              </div>

              {/* Right: Spoken vs Structured Translation */}
              <div className="voice-translation-pane">
                <div className="spoken-quote-bubble">
                  <span className="bubble-label">Spoken Natural Description:</span>
                  <p className="bubble-text">
                    &ldquo;{VOICE_DEMO_CONTENT[voiceLang].rawInput}&rdquo;
                  </p>
                </div>

                <div className="structured-output-card">
                  <div className="structured-topline">
                    <Sparkles size={14} />
                    <span>Synthesized Clinical Coordinates</span>
                  </div>

                  <div className="structured-specs">
                    <div className="spec-tag-item">
                      <span className="tag-key">Chief Concern:</span>
                      <span className="tag-val">{VOICE_DEMO_CONTENT[voiceLang].extractedContext.target}</span>
                    </div>
                    <div className="spec-tag-item">
                      <span className="tag-key">Timeline:</span>
                      <span className="tag-val">3-5 days subacute duration</span>
                    </div>
                    <div className="spec-tag-item">
                      <span className="tag-key">Exertional Trigger:</span>
                      <span className="tag-val">Stair climbing / physical activity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* 03. CHAT DEMONSTRATION PREVIEW                                   */}
        {/* ================================================================ */}
        {activeFeatureId === 'feature-chat' && (
          <div className="preview-container preview-chat">
            <div className="preview-header-block">
              <span className="preview-eyebrow">Interactive Conversational Intake</span>
              <h3 className="preview-headline">
                Structured conversations.{' '}
                <span className="editorial-serif preview-serif">Not static questionnaires.</span>
              </h3>
              <p className="preview-description">
                Interactive demonstration of structured dialogue. Patients answer straightforward clarifying questions, 
                and MEDVIDHI continuously extracts clinically verified coordinates.
              </p>
            </div>

            <div className="chat-interactive-grid">
              {/* Left Column: Sample Dialogue Flow */}
              <div className="chat-dialogue-pane">
                <div className="chat-messages-scroll">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`chat-bubble-row ${msg.sender === 'patient' ? 'is-patient' : 'is-ai'}`}
                    >
                      <div className="chat-bubble">
                        <span className="chat-sender-tag">
                          {msg.sender === 'patient' ? 'Patient' : 'MEDVIDHI Context Engine'}
                        </span>
                        <p className="chat-msg-text">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Suggested Chips */}
                <div className="chat-chips-row">
                  <div className="chat-chips-header-row">
                    <span className="chips-row-label">Click a response to test context extraction:</span>
                    {selectedChipId && (
                      <button
                        type="button"
                        className="chat-reset-action-btn"
                        onClick={() => {
                          setSelectedChipId(null);
                          setChatMessages(CHAT_DEMO_STEPS.initialMessages);
                          setChatEntities([
                            { label: 'Chief Complaint', value: 'Lightheadedness upon rapid rising' },
                            { label: 'Duration', value: '14 days subacute' },
                            { label: 'Postural Trigger', value: 'Sit-to-stand transition' },
                          ]);
                        }}
                        aria-label="Reset illustrative dialogue"
                      >
                        <RotateCcw size={11} />
                        <span>Reset dialogue</span>
                      </button>
                    )}
                  </div>
                  <div className="chips-list">
                    {CHAT_DEMO_STEPS.suggestedAnswers.map((chip) => (
                      <button
                        key={chip.id}
                        type="button"
                        className={`chat-chip-btn ${selectedChipId === chip.id ? 'is-selected' : ''}`}
                        onClick={() => handleSelectSuggestedAnswer(chip)}
                        disabled={selectedChipId !== null}
                      >
                        {chip.chipLabel}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Real-time Extracted Entities */}
              <div className="chat-entities-pane">
                <div className="entities-topbar">
                  <Database size={14} />
                  <span>Verified Health Coordinates</span>
                </div>

                <div className="entities-list">
                  {chatEntities.map((ent, idx) => (
                    <div key={idx} className="entity-item-card">
                      <span className="entity-label">{ent.label}</span>
                      <span className="entity-value">{ent.value}</span>
                    </div>
                  ))}
                </div>

                <div className="entities-summary-note">
                  <CheckCircle2 size={13} />
                  <span>Ready to carry forward into the 30-Second Doctor Brief.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* 04. 30-SECOND DOCTOR BRIEF PREVIEW: KNEE-DISCOMFORT DEMO         */}
        {/* ================================================================ */}
        {activeFeatureId === 'feature-doctor-brief' && (
          <div className="preview-container preview-doctor-brief">
            <div className="preview-header-block">
              <span className="preview-eyebrow">Pre-Consultation Synthesis</span>
              <h3 className="preview-headline">
                Orientation in 30 seconds.{' '}
                <span className="editorial-serif preview-serif">Time reclaimed for clinical listening.</span>
              </h3>
              <p className="preview-description">
                Scattered symptom descriptions, timelines, and details requiring clarification are organized into a structured briefing before a doctor consultation.
              </p>
            </div>

            {/* Illustrative Patient Statement Box */}
            <div className="brief-illustrative-statement-card">
              <div className="brief-statement-topbar">
                <span className="brief-statement-pill">
                  <Activity size={12} aria-hidden="true" />
                  Illustrative example &middot; Not real patient data
                </span>
                <span className="brief-statement-meta">Reported Concern &middot; Knee Discomfort</span>
              </div>
              <blockquote className="brief-statement-quote">
                &ldquo;My knee has been hurting on and off for about two weeks. Stairs seem to make it worse. Rest helps temporarily, but it keeps coming back.&rdquo;
              </blockquote>
            </div>

            {/* 5 Accessible User-Controlled Tabs */}
            <div
              className="brief-tabs-nav"
              role="tablist"
              aria-label="Doctor Brief illustrative knee demonstration facets"
            >
              {[
                { id: 'reported' as const, label: 'Reported', icon: <FileText size={13} /> },
                { id: 'timeline' as const, label: 'Timeline', icon: <Clock size={13} /> },
                { id: 'to_clarify' as const, label: 'To clarify', icon: <HelpCircle size={13} /> },
                { id: 'care_to_explore' as const, label: 'Relevant care to explore', icon: <Compass size={13} /> },
                { id: 'doctor_brief' as const, label: 'Doctor Brief', icon: <FileCheck2 size={13} /> },
              ].map((tab) => {
                const isActive = briefTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`brief-tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`brief-panel-${tab.id}`}
                    className={`brief-tab-nav-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setBriefTab(tab.id)}
                  >
                    <span className="tab-btn-icon" aria-hidden="true">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Panel */}
            <div
              id={`brief-panel-${briefTab}`}
              role="tabpanel"
              aria-labelledby={`brief-tab-${briefTab}`}
              className="brief-tab-panel-container"
            >
              {/* TAB 1: REPORTED */}
              {briefTab === 'reported' && (
                <div className="brief-tab-view brief-view-reported">
                  <div className="brief-view-header">
                    <div className="brief-view-badge">
                      <span className="badge-dot dot-mint" />
                      <span>REPORTED BY PATIENT</span>
                    </div>
                    <span className="brief-view-hint">Natural language account, without medical jargon</span>
                  </div>

                  <div className="brief-core-summary-box">
                    <p className="brief-core-statement">
                      Intermittent knee discomfort, described as worse on stairs and temporarily relieved by rest.
                    </p>
                  </div>

                  <div className="brief-details-grid">
                    <div className="brief-detail-card">
                      <span className="detail-tag">Reported Sensation</span>
                      <h5 className="detail-title">Episodic Knee Discomfort</h5>
                      <p className="detail-desc">
                        Described by the person as an aching, non-continuous pain located in the knee area that recurs across daily routines.
                      </p>
                    </div>

                    <div className="brief-detail-card">
                      <span className="detail-tag">Aggravating Factor</span>
                      <h5 className="detail-title">Stairs Navigation</h5>
                      <p className="detail-desc">
                        Reported as a primary trigger that aggravates the discomfort, suggesting potential biomechanical joint loading.
                      </p>
                    </div>

                    <div className="brief-detail-card">
                      <span className="detail-tag">Relieving Factor</span>
                      <h5 className="detail-title">Temporary Rest Relief</h5>
                      <p className="detail-desc">
                        Rest or non-weight-bearing periods provide temporary relief, though the concern recurs once active again.
                      </p>
                    </div>
                  </div>

                  <div className="brief-clarity-note">
                    <CheckCircle2 size={13} aria-hidden="true" />
                    <span>Distinction: Direct patient-reported symptoms, preserving the human account for clinician review.</span>
                  </div>
                </div>
              )}

              {/* TAB 2: TIMELINE */}
              {briefTab === 'timeline' && (
                <div className="brief-tab-view brief-view-timeline">
                  <div className="brief-view-header">
                    <div className="brief-view-badge">
                      <span className="badge-dot dot-blue" />
                      <span>TEMPORAL PROGRESSION</span>
                    </div>
                    <span className="brief-view-hint">Chronological tracking over days and weeks</span>
                  </div>

                  <div className="brief-core-summary-box">
                    <p className="brief-core-statement">
                      Reported timeframe: approximately two weeks. Reported pattern: comes and goes, with stairs reported as a possible aggravating factor.
                    </p>
                  </div>

                  <div className="brief-details-grid">
                    <div className="brief-detail-card">
                      <span className="detail-tag">Timeframe</span>
                      <h5 className="detail-title">~14-Day Duration</h5>
                      <p className="detail-desc">
                        Subacute timeframe; not an instantaneous acute injury, but ongoing long enough to rule out transient day-to-day muscle fatigue.
                      </p>
                    </div>

                    <div className="brief-detail-card">
                      <span className="detail-tag">Pattern Evolution</span>
                      <h5 className="detail-title">Intermittent Recurrence</h5>
                      <p className="detail-desc">
                        Fluctuating episodes. Discomfort does not persist 24/7; it ebbs and flows with physical activity and stair elevation.
                      </p>
                    </div>

                    <div className="brief-detail-card">
                      <span className="detail-tag">Resolution Status</span>
                      <h5 className="detail-title">Unresolved Trajectory</h5>
                      <p className="detail-desc">
                        Symptom persists without spontaneous recovery, motivating the patient to explore appropriate clinical navigation.
                      </p>
                    </div>
                  </div>

                  <div className="brief-clarity-note">
                    <Clock size={13} aria-hidden="true" />
                    <span>Chronological context helps clinicians determine appropriate diagnostic velocity and follow-up urgency.</span>
                  </div>
                </div>
              )}

              {/* TAB 3: TO CLARIFY */}
              {briefTab === 'to_clarify' && (
                <div className="brief-tab-view brief-view-to-clarify">
                  <div className="brief-view-header">
                    <div className="brief-view-badge">
                      <span className="badge-dot dot-amber" />
                      <span>INFORMATION STILL TO CLARIFY</span>
                    </div>
                    <span className="brief-view-hint">Missing context flagged for the clinician</span>
                  </div>

                  <div className="brief-core-summary-box">
                    <p className="brief-core-statement">
                      Onset, severity, other symptoms, relevant health history and whether any previous evaluation has occurred.
                    </p>
                  </div>

                  <div className="brief-checkpoints-list">
                    <div className="brief-checkpoint-item">
                      <div className="checkpoint-num">01</div>
                      <div className="checkpoint-content">
                        <h5 className="checkpoint-title">Onset Circumstances</h5>
                        <p className="checkpoint-desc">
                          Did the discomfort start after a specific twist, slip, or impact, or did it begin gradually during normal daily tasks?
                        </p>
                      </div>
                    </div>

                    <div className="brief-checkpoint-item">
                      <div className="checkpoint-num">02</div>
                      <div className="checkpoint-content">
                        <h5 className="checkpoint-title">Severity Rating &amp; Functional Impact</h5>
                        <p className="checkpoint-desc">
                          Pain intensity on a 1&ndash;10 numerical scale at rest vs. descending stairs; any night pain or sleep disturbance.
                        </p>
                      </div>
                    </div>

                    <div className="brief-checkpoint-item">
                      <div className="checkpoint-num">03</div>
                      <div className="checkpoint-content">
                        <h5 className="checkpoint-title">Associated Joint Symptoms</h5>
                        <p className="checkpoint-desc">
                          Presence of visible swelling, localized warmth, joint effusion, catching, true locking, or a giving-way sensation.
                        </p>
                      </div>
                    </div>

                    <div className="brief-checkpoint-item">
                      <div className="checkpoint-num">04</div>
                      <div className="checkpoint-content">
                        <h5 className="checkpoint-title">Relevant Health &amp; Activity History</h5>
                        <p className="checkpoint-desc">
                          Prior knee injuries, repetitive occupational loading, sports participation, or known systemic/joint conditions.
                        </p>
                      </div>
                    </div>

                    <div className="brief-checkpoint-item">
                      <div className="checkpoint-num">05</div>
                      <div className="checkpoint-content">
                        <h5 className="checkpoint-title">Previous Interventions &amp; Consultations</h5>
                        <p className="checkpoint-desc">
                          Whether any over-the-counter anti-inflammatories, braces, ice/heat, or earlier clinician evaluations were attempted.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="brief-clarity-note note-amber">
                    <AlertCircle size={13} aria-hidden="true" />
                    <span>Distinguishing reported facts from unverified details protects against false diagnostic assumptions.</span>
                  </div>
                </div>
              )}

              {/* TAB 4: RELEVANT CARE TO EXPLORE */}
              {briefTab === 'care_to_explore' && (
                <div className="brief-tab-view brief-view-care">
                  <div className="brief-view-header">
                    <div className="brief-view-badge">
                      <span className="badge-dot dot-purple" />
                      <span>CARE NAVIGATION EXPLORATION</span>
                    </div>
                    <span className="brief-view-hint">Guiding the consultation starting point without diagnosis</span>
                  </div>

                  <div className="brief-core-summary-box">
                    <p className="brief-core-statement">
                      The appropriate type of healthcare professional depends on the full clinical context. No definitive specialist is named and no match is confirmed without professional evaluation.
                    </p>
                  </div>

                  <div className="brief-details-grid">
                    <div className="brief-detail-card">
                      <span className="detail-tag">Primary Starting Point</span>
                      <h5 className="detail-title">Primary Care / General Physician</h5>
                      <p className="detail-desc">
                        A clinical physical examination to assess knee range of motion, joint line tenderness, ligament laxity, and patellofemoral tracking.
                      </p>
                    </div>

                    <div className="brief-detail-card">
                      <span className="detail-tag">Specialist Pathways</span>
                      <h5 className="detail-title">Musculoskeletal / Sports Medicine</h5>
                      <p className="detail-desc">
                        Depending on clinical examination findings, exploration of sports medicine, orthopedic evaluation, or physical therapy may be discussed.
                      </p>
                    </div>

                    <div className="brief-detail-card">
                      <span className="detail-tag">Clinical Stewardship</span>
                      <h5 className="detail-title">Clinician-Directed Diagnostics</h5>
                      <p className="detail-desc">
                        Imaging (e.g. weight-bearing plain radiographs) or advanced testing is evaluated strictly if the examining clinician determines it is indicated.
                      </p>
                    </div>
                  </div>

                  <div className="brief-clarity-note">
                    <Compass size={13} aria-hidden="true" />
                    <span>MEDVIDHI supports patient navigation and communication. It never provides a diagnosis or definitive specialist match.</span>
                  </div>
                </div>
              )}

              {/* TAB 5: DOCTOR BRIEF (ASSEMBLED SUMMARY) */}
              {briefTab === 'doctor_brief' && (
                <div className="brief-tab-view brief-view-brief-assembled">
                  <div className="brief-view-header">
                    <div className="brief-view-badge">
                      <span className="badge-dot dot-mint" />
                      <span>ASSEMBLED PRE-CONSULTATION SUMMARY</span>
                    </div>
                    <div className="brief-view-toggle-wrap">
                      <button
                        type="button"
                        className={`brief-view-toggle-btn ${briefViewMode === 'patient' ? 'is-active' : ''}`}
                        onClick={() => setBriefViewMode('patient')}
                      >
                        Patient Language
                      </button>
                      <button
                        type="button"
                        className={`brief-view-toggle-btn ${briefViewMode === 'doctor' ? 'is-active' : ''}`}
                        onClick={() => setBriefViewMode('doctor')}
                      >
                        Clinical Structure
                      </button>
                    </div>
                  </div>

                  {/* Assembled Document Card */}
                  <div className="brief-assembled-document-sheet">
                    <div className="assembled-doc-header">
                      <div>
                        <span className="doc-mono-brand">MEDVIDHI &middot; CLINICAL BRIEF SYNTHESIS</span>
                        <h4 className="doc-main-title">
                          {briefViewMode === 'doctor'
                            ? 'Pre-Consultation Clinical Intake Brief'
                            : 'Patient Experience Summary'}
                        </h4>
                      </div>
                      <span className="doc-illustrative-tag">Illustrative Sample</span>
                    </div>

                    <div className="assembled-doc-meta-strip">
                      <div className="doc-meta-col">
                        <span className="meta-lbl">Chief Presentation:</span>
                        <span className="meta-val">
                          {briefViewMode === 'doctor'
                            ? 'Subacute Knee Arthralgia with Mechanical Loading'
                            : 'Intermittent Knee Discomfort (2-Week Duration)'}
                        </span>
                      </div>
                      <div className="doc-meta-col">
                        <span className="meta-lbl">Navigation Focus:</span>
                        <span className="meta-val">Primary Care / Musculoskeletal Clinical Exam</span>
                      </div>
                    </div>

                    <div className="assembled-sections-grid">
                      <div className="assembled-sec-box">
                        <div className="assembled-sec-top">
                          <span className="sec-idx">01</span>
                          <span className="sec-lbl">Reported Concern</span>
                        </div>
                        <p className="sec-txt">
                          {briefViewMode === 'doctor'
                            ? 'Intermittent knee discomfort aggravated by stair ambulation; temporary symptomatic alleviation achieved with non-weight-bearing rest.'
                            : 'My knee has been hurting on and off for about two weeks. Stairs seem to make it worse, and rest helps temporarily.'}
                        </p>
                      </div>

                      <div className="assembled-sec-box">
                        <div className="assembled-sec-top">
                          <span className="sec-idx">02</span>
                          <span className="sec-lbl">Timeline &amp; Pattern</span>
                        </div>
                        <p className="sec-txt">
                          {briefViewMode === 'doctor'
                            ? 'Subacute ~14-day history. Fluctuating episodic recurrence with activity, without spontaneous resolution.'
                            : 'Has lasted approximately two weeks. Comes and goes rather than hurting constantly.'}
                        </p>
                      </div>

                      <div className="assembled-sec-box sec-box-clarify">
                        <div className="assembled-sec-top">
                          <span className="sec-idx">03</span>
                          <span className="sec-lbl">Details to Clarify</span>
                        </div>
                        <p className="sec-txt">
                          {briefViewMode === 'doctor'
                            ? 'Elicit: mechanism of onset (twist vs gradual load), VAS score, presence of joint effusion/locking/instability, prior NSAID use or clinic visits.'
                            : 'Key points to discuss: exact start circumstances, pain level, any knee swelling or locking, and past treatments tried.'}
                        </p>
                      </div>

                      <div className="assembled-sec-box">
                        <div className="assembled-sec-top">
                          <span className="sec-idx">04</span>
                          <span className="sec-lbl">Care Navigation Horizon</span>
                        </div>
                        <p className="sec-txt">
                          {briefViewMode === 'doctor'
                            ? 'Outpatient evaluation for hands-on musculoskeletal physical examination (ROM, joint stability, patellar tracking). Imaging at clinician discretion.'
                            : 'Initial consultation with a primary doctor to examine the knee, check joint stability, and explore relevant care.'}
                        </p>
                      </div>
                    </div>

                    <div className="assembled-doc-footer">
                      <Stethoscope size={13} aria-hidden="true" />
                      <span>
                        Assembled to prepare for consultation. Qualified healthcare professionals remain solely responsible for clinical assessment, diagnosis, and treatment.
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* 05. HEALTH MEMORY PREVIEW                                        */}
        {/* ================================================================ */}
        {activeFeatureId === 'feature-health-memory' && (
          <div className="preview-container preview-health-memory">
            <div className="preview-header-block">
              <span className="preview-eyebrow">Longitudinal Context Matrix</span>
              <h3 className="preview-headline">
                One continuous memory.{' '}
                <span className="editorial-serif preview-serif">Zero starting over.</span>
              </h3>
              <p className="preview-description">
                Multiple streams of health information connect to an intelligent, longitudinal patient memory, 
                preserving medications, allergies, and symptom progressions across consultations.
              </p>

              {/* Sample Data Disclaimer Badge */}
              <div className="memory-sample-tag-row">
                <span className="memory-illustrative-pill">
                  Illustrative Sample Data • Educational Simulation
                </span>
              </div>
            </div>

            {/* Central Constellation Network Hub with Animated Monochrome Trajectories */}
            <div className="memory-constellation-hub">
              {/* Left Wing: 4 Source Nodes */}
              <div className="constellation-wing wing-left">
                {HEALTH_MEMORY_SOURCES.slice(0, 4).map((source) => {
                  const isHovered = hoveredMemorySourceId === source.id;
                  return (
                    <div
                      key={source.id}
                      className={`memory-source-tile ${isHovered ? 'is-card-hovered' : ''}`}
                      onMouseEnter={() => setHoveredMemorySourceId(source.id)}
                      onMouseLeave={() => setHoveredMemorySourceId(null)}
                      onFocus={() => setHoveredMemorySourceId(source.id)}
                      onBlur={() => setHoveredMemorySourceId(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setHoveredMemorySourceId(hoveredMemorySourceId === source.id ? null : source.id);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isHovered}
                      aria-label={`${source.name}: ${source.description}`}
                    >
                      <div className="mem-icon-box">{renderMemorySourceIcon(source.iconName)}</div>
                      <div className="mem-info-box">
                        <span className="mem-source-name">{source.name}</span>
                        <span className="mem-source-category">{source.category}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Central Geometric Hub Icon with Connecting Trajectory Vectors */}
              <div className="constellation-center">
                <svg className="constellation-trajectories-svg" viewBox="0 0 180 200" fill="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="memPathGradL" x1="0" y1="100" x2="90" y2="100" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="memPathGradR" x1="180" y1="100" x2="90" y2="100" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Left 4 Connecting Curves to Center (90, 100) */}
                  <path d="M 0 25 C 45 25, 45 100, 90 100" stroke="url(#memPathGradL)" strokeWidth="1.2" strokeDasharray="3 3" className="memory-stream-line" />
                  <path d="M 0 75 C 45 75, 45 100, 90 100" stroke="url(#memPathGradL)" strokeWidth="1.2" strokeDasharray="3 3" className="memory-stream-line" />
                  <path d="M 0 125 C 45 125, 45 100, 90 100" stroke="url(#memPathGradL)" strokeWidth="1.2" strokeDasharray="3 3" className="memory-stream-line" />
                  <path d="M 0 175 C 45 175, 45 100, 90 100" stroke="url(#memPathGradL)" strokeWidth="1.2" strokeDasharray="3 3" className="memory-stream-line" />

                  {/* Right 4 Connecting Curves from Center (90, 100) */}
                  <path d="M 180 25 C 135 25, 135 100, 90 100" stroke="url(#memPathGradR)" strokeWidth="1.2" strokeDasharray="3 3" className="memory-stream-line" />
                  <path d="M 180 75 C 135 75, 135 100, 90 100" stroke="url(#memPathGradR)" strokeWidth="1.2" strokeDasharray="3 3" className="memory-stream-line" />
                  <path d="M 180 125 C 135 125, 135 100, 90 100" stroke="url(#memPathGradR)" strokeWidth="1.2" strokeDasharray="3 3" className="memory-stream-line" />
                  <path d="M 180 175 C 135 175, 135 100, 90 100" stroke="url(#memPathGradR)" strokeWidth="1.2" strokeDasharray="3 3" className="memory-stream-line" />

                  {/* Restrained Monochrome Traveling Markers */}
                  <circle r="2.5" fill="#FFFFFF" opacity="0.9">
                    <animateMotion path="M 0 25 C 45 25, 45 100, 90 100" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle r="2.5" fill="#FFFFFF" opacity="0.9">
                    <animateMotion path="M 180 75 C 135 75, 135 100, 90 100" dur="3.2s" repeatCount="indefinite" />
                  </circle>
                  <circle r="2.5" fill="#FFFFFF" opacity="0.9">
                    <animateMotion path="M 0 125 C 45 125, 45 100, 90 100" dur="2.8s" repeatCount="indefinite" />
                  </circle>
                  <circle r="2.5" fill="#FFFFFF" opacity="0.9">
                    <animateMotion path="M 180 175 C 135 175, 135 100, 90 100" dur="3.4s" repeatCount="indefinite" />
                  </circle>
                </svg>

                <div className="central-symbol-wrapper">
                  <HealthMemoryCentralNetworkSymbol size={76} />
                  <span className="hub-core-label">Continuous Memory Core</span>
                </div>
              </div>

              {/* Right Wing: 4 Source Nodes */}
              <div className="constellation-wing wing-right">
                {HEALTH_MEMORY_SOURCES.slice(4, 8).map((source) => {
                  const isHovered = hoveredMemorySourceId === source.id;
                  return (
                    <div
                      key={source.id}
                      className={`memory-source-tile ${isHovered ? 'is-card-hovered' : ''}`}
                      onMouseEnter={() => setHoveredMemorySourceId(source.id)}
                      onMouseLeave={() => setHoveredMemorySourceId(null)}
                      onFocus={() => setHoveredMemorySourceId(source.id)}
                      onBlur={() => setHoveredMemorySourceId(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setHoveredMemorySourceId(hoveredMemorySourceId === source.id ? null : source.id);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isHovered}
                      aria-label={`${source.name}: ${source.description}`}
                    >
                      <div className="mem-icon-box">{renderMemorySourceIcon(source.iconName)}</div>
                      <div className="mem-info-box">
                        <span className="mem-source-name">{source.name}</span>
                        <span className="mem-source-category">{source.category}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Illustrative History Sequence:
                Problem begins → Medicine taken → Doctor visit → Treatment changes → Symptoms change → New information added */}
            <div className="memory-timeline-section">
              <div className="timeline-top-bar">
                <span className="timeline-bar-label">Illustrative History Sequence:</span>
                <span className="timeline-bar-hint">
                  <SwipeHint active={timelineSwipe.active} />
                  <span className="timeline-bar-hint-text">Select any step to view longitudinal continuity</span>
                </span>
              </div>

              <div
                className="timeline-steps-track h-scroll-row"
                role="tablist"
                aria-label="Health Memory Timeline Steps"
                ref={timelineSwipe.rowRef}
                onScroll={timelineSwipe.onRowScroll}
              >
                {HEALTH_MEMORY_TIMELINE.map((evt, idx) => {
                  const isSelected = selectedTimelineEventId === evt.id;
                  return (
                    <React.Fragment key={evt.id}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        className={`timeline-step-chip ${isSelected ? 'is-active-step' : ''}`}
                        onClick={() => {
                          setSelectedTimelineEventId(evt.id);
                          timelineSwipe.notify();
                        }}
                      >
                        <span className="step-num">0{evt.stepNumber}</span>
                        <span className="step-stage">{evt.stageName}</span>
                      </button>
                      {idx < HEALTH_MEMORY_TIMELINE.length - 1 && (
                        <div className="step-arrow-connector" aria-hidden="true">
                          <ArrowRight size={13} />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Selected Event Detail Card */}
              <div className="timeline-event-detail-card">
                <div className="detail-top-row">
                  <span className="detail-badge">{selectedTimelineEvent.badge}</span>
                  <span className="detail-date">{selectedTimelineEvent.dateStr}</span>
                </div>
                <h4 className="detail-event-title">{selectedTimelineEvent.title}</h4>
                <p className="detail-event-summary">{selectedTimelineEvent.summary}</p>
                <div className="detail-significance-box">
                  <span className="sig-label">Clinical Continuity Impact:</span>
                  <p className="sig-text">{selectedTimelineEvent.detailedContext.clinicalSignificance}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* 06. MEDICAL & REPORT EXPLAINER PREVIEW                           */}
        {/* ================================================================ */}
        {activeFeatureId === 'feature-report-explainer' && (
          <div className="preview-container preview-explainer">
            <div className="preview-header-block">
              <span className="preview-eyebrow">Diagnostic Plain-Language Engine</span>
              <h3 className="preview-headline">
                Complex lab results,{' '}
                <span className="editorial-serif preview-serif">in words you actually understand.</span>
              </h3>
              <p className="preview-description">
                Medical reports are written for specialists. MEDVIDHI translates dense diagnostic sheets 
                into clear, reassuring plain-language explanations in your preferred language.
              </p>
            </div>

            {/* Language Selection: English | मराठी | हिन्दी */}
            <div className="explainer-toolbar">
              <div className="explainer-lang-group" role="tablist" aria-label="Explanation language options">
                <span className="bar-label">Language:</span>
                {(['en', 'mr', 'hi'] as LanguageCode[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    role="tab"
                    aria-selected={explainerLang === lang}
                    className={`explainer-chip ${explainerLang === lang ? 'is-active' : ''}`}
                    onClick={() => setExplainerLang(lang)}
                  >
                    {lang === 'en' && 'English'}
                    {lang === 'mr' && 'मराठी'}
                    {lang === 'hi' && 'हिन्दी'}
                  </button>
                ))}
              </div>

              <div className="explainer-sample-group">
                <span className="bar-label">Sample Report:</span>
                <select
                  className="explainer-select"
                  value={selectedReportId}
                  onChange={(e) => setSelectedReportId(e.target.value)}
                  aria-label="Select sample medical report"
                >
                  {REPORT_EXPLAINER_SAMPLES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Side-by-Side Comparison */}
            {(() => {
              const rep =
                REPORT_EXPLAINER_SAMPLES.find((r) => r.id === selectedReportId) ||
                REPORT_EXPLAINER_SAMPLES[0];
              const exp = rep.languages[explainerLang];

              return (
                <div className="explainer-dual-card">
                  {/* Left: Original Technical Excerpt */}
                  <div className="technical-excerpt-box">
                    <div className="box-topbar">
                      <span className="box-tag">ORIGINAL LAB REPORT EXCERPT</span>
                      <span className="box-mono-ref">{rep.id}</span>
                    </div>
                    <div className="excerpt-callout">
                      <p className="excerpt-quote">&ldquo;{rep.rawExcerpt}&rdquo;</p>
                    </div>
                  </div>

                  {/* Right: Plain-Language Translation */}
                  <div className="plain-language-box">
                    <div className="box-topbar">
                      <span className="box-tag">PLAIN-LANGUAGE EXPLANATION</span>
                      <span className="box-verified-tag">Educational Context</span>
                    </div>

                    <div className="plain-content">
                      <h5 className="plain-summary-title">Summary Explanation</h5>
                      <p className="plain-detail-text">{exp.patientExplanation}</p>
                    </div>

                    <div className="plain-questions-box">
                      <span className="questions-label">What Remains Uncertain:</span>
                      <p className="plain-detail-text">{exp.whatRemainsUncertain}</p>
                      <span className="questions-label" style={{ marginTop: '8px' }}>
                        Helpful Discussion for Your Doctor:
                      </span>
                      <p className="plain-detail-text">{exp.whatToDiscussWithDoctor}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ================================================================ */}
        {/* 07. RIGHT DOCTOR PREVIEW                                         */}
        {/* ================================================================ */}
        {activeFeatureId === 'feature-right-doctor' && (
          <div className="preview-container preview-right-doctor">
            <div className="preview-header-block">
              <span className="preview-eyebrow">Care Navigation Pathway</span>
              <h3 className="preview-headline">
                The right care path,{' '}
                <span className="editorial-serif preview-serif">without the directory maze.</span>
              </h3>
              <p className="preview-description">
                Instead of guessing specialties or scrolling unverified commercial directories, MEDVIDHI aligns 
                your structured health context with appropriate healthcare disciplines.
              </p>
            </div>

            {/* 5-Stage Journey:
                Your Health Context → MEDVIDHI → Relevant Care Path → Appropriate Doctor → Doctor Brief */}
            <div className="right-doctor-preview-path">
              {[
                { step: '01', title: 'Your Health Context', desc: 'Symptoms, timeline & reports synthesized' },
                { step: '02', title: 'MEDVIDHI', desc: 'Clinical discipline & urgency alignment' },
                { step: '03', title: 'Relevant Care Path', desc: 'Appropriate clinical management track' },
                { step: '04', title: 'Appropriate Doctor', desc: 'Aligned specialty without directory guessing' },
                { step: '05', title: 'Doctor Brief', desc: '30-second orientation ready for visit' },
              ].map((node, i) => (
                <React.Fragment key={node.step}>
                  <div className={`path-node ${node.step === '02' ? 'is-hub' : ''}`}>
                    <span className="node-num">{node.step}</span>
                    <span className="node-label">{node.title}</span>
                    <p className="node-desc">{node.desc}</p>
                  </div>
                  {i < 4 && (
                    <div className="path-connector" aria-hidden="true">
                      <ArrowRight size={14} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Sample Case Demonstration & Dedicated Section Link */}
            <div className="sample-matching-card">
              <div className="matching-card-top">
                <div className="match-case-info">
                  <span className="case-tag">ILLUSTRATIVE CARE PATHWAY</span>
                  <h4 className="case-title">Musculoskeletal & Sports Medicine Pathway</h4>
                  <p className="case-condition">
                    Subacute lateral elbow pain aligned with conservative tendinopathy care rather than invasive surgery.
                  </p>
                </div>

                <a
                  href="#feature-right-doctor"
                  className="explore-dedicated-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('feature-right-doctor');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                      el.setAttribute('tabindex', '-1');
                      el.focus({ preventScroll: true });
                    }
                  }}
                >
                  <span>Explore Dedicated Right Doctor Section</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
