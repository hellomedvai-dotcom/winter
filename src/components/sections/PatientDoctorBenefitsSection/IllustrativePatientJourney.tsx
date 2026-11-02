import React, { useState } from 'react';
import {
  MessageSquare,
  Mic,
  Crosshair,
  Clock,
  Layers,
  Compass,
  FileCheck2,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import './IllustrativePatientJourney.css';

export interface JourneyStageData {
  id: string;
  stepNumber: string;
  title: string;
  shortLabel: string;
  subtext: string;
  summary: string;
  patientPerspective: string;
  doctorPerspective: string;
}

export const JOURNEY_STAGES: JourneyStageData[] = [
  {
    id: 'tell-story',
    stepNumber: '01',
    title: 'TELL YOUR STORY',
    shortLabel: 'Tell Your Story',
    subtext: 'Firsthand narrative via natural conversational input',
    summary:
      'The patient shares their experience in everyday language, preserving firsthand observations without forced clinical jargon.',
    patientPerspective:
      'Describe symptoms in your own words through chat, voice notes, and body location without worrying about medical terminology.',
    doctorPerspective:
      "Review the patient's original words with reported duration and location preserved alongside initial context.",
  },
  {
    id: 'connect-context',
    stepNumber: '02',
    title: 'CONNECT THE CONTEXT',
    shortLabel: 'Connect Context',
    subtext: 'Unstructured fragments converge into an organized timeline',
    summary:
      'Patient statements, duration, and symptom patterns assemble into an evolving Health Memory timeline, clearly distinguishing reported facts from gaps requiring clarification.',
    patientPerspective:
      'Daily observations and symptom changes organize into a coherent timeline so you do not have to rebuild the story from memory.',
    doctorPerspective:
      'Quickly review how the concern evolved over time, what has been tried, and which clinical details still need clarification.',
  },
  {
    id: 'explore-care',
    stepNumber: '03',
    title: 'EXPLORE RELEVANT CARE',
    shortLabel: 'Explore Care',
    subtext: 'Navigating toward relevant medical expertise domains',
    summary:
      'Health context guides the patient toward exploring relevant medical expertise, reducing navigational uncertainty before scheduling.',
    patientPerspective:
      'Explore which specialty domains typically evaluate these symptoms, easing navigational anxiety and avoiding misdirected appointments.',
    doctorPerspective:
      'Patients arrive at the appropriate clinical threshold with realistic expectations and relevant focus suited to the specialty domain.',
  },
  {
    id: 'doctor-brief',
    stepNumber: '04',
    title: 'PREPARE THE DOCTOR BRIEF',
    shortLabel: 'Doctor Brief',
    subtext: 'Pre-consultation synthesis supporting clinical review',
    summary:
      'A structured pre-consultation brief separates the patient account from organized clinical facts, preparing both parties for a clearer conversation.',
    patientPerspective:
      'Carry a concise, organized summary into the consultation so important details and questions are ready to share.',
    doctorPerspective:
      'Gain a rapid 30-second orientation before the visit, supporting clinical judgment without replacing diagnosis.',
  },
];

export const IllustrativePatientJourney: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveStageIndex(index);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveStageIndex((prev) => (prev + 1) % JOURNEY_STAGES.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveStageIndex((prev) => (prev - 1 + JOURNEY_STAGES.length) % JOURNEY_STAGES.length);
    }
  };

  const currentStage = JOURNEY_STAGES[activeStageIndex];

  return (
    <div className="illustrative-journey" aria-label="Illustrative Patient Journey">
      {/* ------------------------------------------------------------------ */}
      {/* Section Header                                                     */}
      {/* ------------------------------------------------------------------ */}
      <header className="journey-header" data-reveal style={{ '--si': 0 } as React.CSSProperties}>
        <span className="journey-eyebrow">
          <Sparkles size={13} aria-hidden="true" />
          ILLUSTRATIVE PATIENT JOURNEY &middot; FICTIONAL EXAMPLE
        </span>

        <h3 className="journey-headline">
          One health concern.{' '}
          <span className="journey-serif-accent">A clearer story</span> to take into care.
        </h3>

        <p className="journey-supporting">
          See how everyday details can be organised into health context, helping people explore
          relevant medical expertise and prepare for a clearer conversation with a healthcare
          professional.
        </p>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Main Two-Column Composition                                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="journey-layout-grid">
        {/* ================================================================ */}
        {/* LEFT COLUMN: 4-Stage Controls & Explanatory Perspectives          */}
        {/* ================================================================ */}
        <div className="journey-controls-col">
          {/* Stepper Track */}
          <nav
            className="journey-stepper-track"
            aria-label="Patient Journey Stages"
            role="tablist"
          >
            <div className="stepper-header-row">
              <span className="stepper-counter">
                STAGE {currentStage.stepNumber}{' '}
                <span className="stepper-counter-total">/ 04</span>
              </span>

              <div className="stepper-nav-buttons" role="group" aria-label="Step navigation">
                <button
                  type="button"
                  className="stepper-nav-btn"
                  onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeStageIndex === 0}
                  aria-label="Previous Stage"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="stepper-nav-btn"
                  onClick={() =>
                    setActiveStageIndex((prev) =>
                      Math.min(JOURNEY_STAGES.length - 1, prev + 1)
                    )
                  }
                  disabled={activeStageIndex === JOURNEY_STAGES.length - 1}
                  aria-label="Next Stage"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Stage Selector List */}
            <div className="journey-stages-list">
              {JOURNEY_STAGES.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <button
                    key={stage.id}
                    id={`stage-tab-${idx}`}
                    role="tab"
                    type="button"
                    className={`stage-nav-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveStageIndex(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    aria-selected={isActive}
                    aria-controls={`stage-panel-${idx}`}
                    tabIndex={isActive ? 0 : -1}
                  >
                    <span className="stage-nav-num">{stage.stepNumber} &mdash;</span>
                    <div className="stage-nav-content">
                      <span className="stage-nav-title">{stage.title}</span>
                      <span className="stage-nav-subtext">{stage.subtext}</span>
                    </div>
                    {isActive && <span className="stage-active-indicator" />}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Active Stage Explanatory Perspectives Card */}
          <article
            className="active-stage-card"
            aria-live="polite"
            data-reveal
            style={{ '--si': 1 } as React.CSSProperties}
          >
            <div className="active-stage-header">
              <span className="active-stage-badge">
                {currentStage.stepNumber} &middot; {currentStage.shortLabel}
              </span>
            </div>

            <p className="active-stage-summary-text">{currentStage.summary}</p>

            <div className="active-perspectives-grid">
              <div className="perspective-block">
                <span className="perspective-tag tag-patient">PATIENT</span>
                <p className="perspective-desc">{currentStage.patientPerspective}</p>
              </div>

              <div className="perspective-block">
                <span className="perspective-tag tag-doctor">DOCTOR</span>
                <p className="perspective-desc">{currentStage.doctorPerspective}</p>
              </div>
            </div>
          </article>
        </div>

        {/* ================================================================ */}
        {/* RIGHT COLUMN: Large Interactive Product Preview Canvas             */}
        {/* ================================================================ */}
        <section
          id={`stage-panel-${activeStageIndex}`}
          role="tabpanel"
          aria-labelledby={`stage-tab-${activeStageIndex}`}
          className="journey-preview-stage"
        >
          {/* Top Bar */}
          <div className="preview-topbar">
            <div className="preview-stage-pill">
              <span className="preview-pulse-dot" />
              <span className="preview-pill-title">
                STAGE {currentStage.stepNumber} &middot; {currentStage.title}
              </span>
            </div>
            <span className="preview-disclaimer-badge">Fictional patient demonstration</span>
          </div>

          {/* Canvas Content */}
          <div className="preview-canvas-content">
            {/* -------------------------------------------------------------- */}
            {/* STAGE 01 — TELL YOUR STORY                                     */}
            {/* -------------------------------------------------------------- */}
            {activeStageIndex === 0 && (
              <div className="stage-tell-story-view" data-reveal>
                {/* Natural Conversational Statement Bubble */}
                <div className="patient-statement-bubble">
                  <div className="bubble-meta-head">
                    <span className="patient-author-tag">
                      <MessageSquare size={13} />
                      PATIENT ACCOUNT &middot; FIRSTHAND
                    </span>
                    <span className="bubble-timestamp">Day 14</span>
                  </div>

                  <blockquote className="patient-actual-quote">
                    &ldquo;My knee has been hurting on and off for about two weeks. Stairs seem to
                    make it worse. Rest helps for a while, but it keeps returning.&rdquo;
                  </blockquote>
                </div>

                {/* Input Facet Badges (Voice note, Body Map, Duration) */}
                <div className="story-inputs-grid">
                  {/* Facet 1: Voice Note */}
                  <div className="input-facet-card">
                    <div className="facet-head">
                      <Mic size={13} className="facet-icon" />
                      <span className="facet-label">Voice note &middot; 0:18</span>
                    </div>
                    <div className="voice-waveform-preview" aria-label="Audio waveform representation">
                      <span className="waveform-bar bar-1" />
                      <span className="waveform-bar bar-2" />
                      <span className="waveform-bar bar-3" />
                      <span className="waveform-bar bar-4" />
                      <span className="waveform-bar bar-5" />
                      <span className="waveform-bar bar-6" />
                      <span className="waveform-bar bar-7" />
                      <span className="waveform-bar bar-8" />
                    </div>
                    <span className="facet-detail">&ldquo;...stairs make it worse...&rdquo;</span>
                  </div>

                  {/* Facet 2: Body Map Location */}
                  <div className="input-facet-card">
                    <div className="facet-head">
                      <Crosshair size={13} className="facet-icon" />
                      <span className="facet-label">Body Map &middot; Knee</span>
                    </div>
                    <div className="bodymap-mini-pin">
                      <span className="pin-indicator" />
                      <span>Right Knee (Anterior)</span>
                    </div>
                    <span className="facet-detail">Patellar / load-bearing joint</span>
                  </div>

                  {/* Facet 3: Reported Duration */}
                  <div className="input-facet-card">
                    <div className="facet-head">
                      <Clock size={13} className="facet-icon" />
                      <span className="facet-label">Reported duration</span>
                    </div>
                    <span className="duration-tag-text">Approximately 2 weeks</span>
                    <span className="facet-detail">Intermittent, episodic pattern</span>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------- */}
            {/* STAGE 02 — CONNECT THE CONTEXT                                 */}
            {/* -------------------------------------------------------------- */}
            {activeStageIndex === 1 && (
              <div className="stage-connect-context-view" data-reveal>
                <div className="convergence-head-strip">
                  <span className="strip-label">
                    <Layers size={13} />
                    HEALTH MEMORY &middot; STRUCTURED TIMELINE
                  </span>
                  <span className="strip-status">Inputs Organized</span>
                </div>

                {/* Distinguished Blocks: Reported vs To Clarify */}
                <div className="context-blocks-grid">
                  {/* Left: Patient Reported Context */}
                  <div className="context-block reported-block">
                    <div className="block-title-row">
                      <CheckCircle2 size={13} />
                      <span className="block-tag tag-solid">PATIENT-REPORTED CONTEXT</span>
                    </div>

                    <div className="context-key-value-list">
                      <div className="context-row">
                        <span className="context-k">Concern:</span>
                        <span className="context-v">Recurring knee discomfort</span>
                      </div>
                      <div className="context-row">
                        <span className="context-k">Timeline:</span>
                        <span className="context-v">Approximately two weeks, patient-reported</span>
                      </div>
                      <div className="context-row">
                        <span className="context-k">Reported pattern:</span>
                        <span className="context-v">
                          Worse on stairs; temporary relief with rest
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Information to Clarify */}
                  <div className="context-block clarify-block">
                    <div className="block-title-row">
                      <HelpCircle size={13} />
                      <span className="block-tag tag-dashed">TO CLARIFY WITH CLINICIAN</span>
                    </div>

                    <ul className="clarify-items-list">
                      <li>
                        <strong>How it began:</strong> Insidious onset vs. sudden incident or strain
                      </li>
                      <li>
                        <strong>Severity:</strong> Numerical rating (1–10) and character (sharp vs. dull)
                      </li>
                      <li>
                        <strong>Effect on movement:</strong> Impact on walking, flexion, squatting
                      </li>
                      <li>
                        <strong>Other relevant symptoms:</strong> Swelling, joint locking, warmth, clicking
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------- */}
            {/* STAGE 03 — EXPLORE RELEVANT CARE                               */}
            {/* -------------------------------------------------------------- */}
            {activeStageIndex === 2 && (
              <div className="stage-explore-care-view" data-reveal>
                <div className="care-navigation-card">
                  <div className="care-card-header">
                    <span className="care-nav-title">
                      <Compass size={13} />
                      CARE NAVIGATION
                    </span>
                    <span className="care-nav-badge">EXPLORATORY PATHWAY</span>
                  </div>

                  <div className="care-headline-group">
                    <h4 className="care-main-heading">
                      A clearer starting point for exploring relevant care.
                    </h4>
                    <p className="care-description-text">
                      Musculoskeletal or orthopaedic expertise may be relevant to explore, depending on
                      the fuller clinical context. A qualified healthcare professional determines the
                      appropriate assessment.
                    </p>
                  </div>

                  <div className="care-pathway-details-box">
                    <div className="pathway-row">
                      <span className="pathway-label">Potential Area:</span>
                      <span className="pathway-value">Musculoskeletal / Orthopaedic Care</span>
                    </div>
                    <div className="pathway-row">
                      <span className="pathway-label">Clinical Rationale:</span>
                      <span className="pathway-value">
                        Mechanical symptom pattern (stairs), subacute timeline (~2 weeks), localized to knee joint
                      </span>
                    </div>
                    <div className="pathway-row">
                      <span className="pathway-label">Typical Scope:</span>
                      <span className="pathway-value">
                        Joint palpation, functional mobility testing, structural stability assessment
                      </span>
                    </div>
                  </div>

                  <div className="pathway-guidance-note">
                    <AlertCircle size={12} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>
                      Illustrative exploration only. Not an automated diagnosis, guaranteed doctor match,
                      or appointment referral. Consultation with a licensed clinician is required.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------- */}
            {/* STAGE 04 — PREPARE THE DOCTOR BRIEF                            */}
            {/* -------------------------------------------------------------- */}
            {activeStageIndex === 3 && (
              <div className="stage-doctor-brief-view" data-reveal>
                <div className="doctor-brief-sheet">
                  {/* Top Bar of Brief */}
                  <div className="brief-doc-topbar">
                    <span className="brief-doc-title">
                      <FileCheck2 size={13} />
                      PRE-CONSULTATION DOCTOR BRIEF
                    </span>
                    <span className="brief-doc-pill">CLINICAL ORIENTATION</span>
                  </div>

                  {/* Document Content Hierarchy */}
                  <div className="brief-hierarchy-grid">
                    {/* Patient Account Direct Quote */}
                    <div className="brief-section-card account-section">
                      <div className="account-section-label">PATIENT&rsquo;S FIRSTHAND ACCOUNT</div>
                      <blockquote className="account-section-quote">
                        &ldquo;My knee has been hurting on and off for about two weeks. Stairs seem to
                        make it worse. Rest helps for a while, but it keeps returning.&rdquo;
                      </blockquote>
                    </div>

                    {/* Structured Clinical Synthesis Grid */}
                    <div className="synthesis-grid">
                      <div className="synthesis-item">
                        <span className="synthesis-label">Patient-Reported Concern</span>
                        <span className="synthesis-val">Recurring knee discomfort</span>
                      </div>
                      <div className="synthesis-item">
                        <span className="synthesis-label">Approximate Timeline</span>
                        <span className="synthesis-val">Approximately 2 weeks (intermittent)</span>
                      </div>
                      <div className="synthesis-item">
                        <span className="synthesis-label">Reported Symptom Pattern</span>
                        <span className="synthesis-val">
                          Worse on stairs; temporary relief with rest
                        </span>
                      </div>
                      <div className="synthesis-item">
                        <span className="synthesis-label">Previous Steps</span>
                        <span className="synthesis-val">
                          Rest attempted (transient relief; no medications reported)
                        </span>
                      </div>
                    </div>

                    {/* Clarification Points */}
                    <div className="clarification-block-brief">
                      <div className="clarify-brief-head">
                        <HelpCircle size={11} />
                        <span>DETAILS REQUIRING CLARIFICATION</span>
                      </div>
                      <p className="clarify-brief-text">
                        Initial onset mechanism &bull; Severity scale (1&ndash;10) &bull; Range of
                        motion / functional impairment &bull; Accompanying swelling, heat, or locking
                      </p>
                    </div>
                  </div>

                  {/* Visible Mandatory Disclosure */}
                  <footer className="mandatory-brief-disclosure">
                    Illustrative example using fictional information. Not a diagnosis, verified doctor
                    match or clinical recommendation.
                  </footer>
                </div>
              </div>
            )}
          </div>

          {/* Canvas Footer Controls */}
          <footer className="preview-footer-controls">
            <div className="footer-step-dots" role="tablist" aria-label="Quick stage select">
              {JOURNEY_STAGES.map((stg, i) => (
                <button
                  key={stg.id}
                  type="button"
                  className={`footer-step-btn ${activeStageIndex === i ? 'is-active' : ''}`}
                  onClick={() => setActiveStageIndex(i)}
                  aria-label={`Go to stage 0${i + 1} - ${stg.shortLabel}`}
                >
                  <span className="footer-step-num">0{i + 1}</span>
                  <span className="footer-step-name">{stg.shortLabel}</span>
                </button>
              ))}
            </div>

            <div className="footer-actions-group">
              <button
                type="button"
                className="footer-btn"
                onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeStageIndex === 0}
                aria-label="Previous Stage"
              >
                <ChevronLeft size={14} />
                <span>Prev</span>
              </button>

              <button
                type="button"
                className="footer-btn"
                onClick={() =>
                  setActiveStageIndex((prev) =>
                    Math.min(JOURNEY_STAGES.length - 1, prev + 1)
                  )
                }
                disabled={activeStageIndex === JOURNEY_STAGES.length - 1}
                aria-label="Next Stage"
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default IllustrativePatientJourney;
