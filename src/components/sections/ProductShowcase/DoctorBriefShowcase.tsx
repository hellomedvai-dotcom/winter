import React, { useState } from 'react';
import { useReveal } from '@/lib/motion/useReveal';
import {
  FileText,
  Sparkles,
  Share2,
  Eye,
  CheckCircle2,
  Shield,
  Clock,
  ShieldAlert,
  X,
  RotateCcw,
  MessageSquare,
  Mic,
  Crosshair,
  Pill,
  History,
  Activity,
  Layers,
} from 'lucide-react';
import {
  DOCTOR_BRIEF_SOURCES,
  DOCTOR_BRIEF_SECTIONS,
  DoctorBriefSection,
  DoctorBriefSourceFragment,
} from '@/config/showcaseContent';
import './DoctorBriefShowcase.css';

export const DoctorBriefShowcase: React.FC = () => {
  const [viewMode, setViewMode] = useState<'medical' | 'patient'>('patient');
  const [activeHighlightFragmentId, setActiveHighlightFragmentId] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [animationStage, setAnimationStage] = useState<'converging' | 'synthesizing' | 'revealing' | 'ready'>('ready');
  const [shareConsentGranted, setShareConsentGranted] = useState<boolean>(false);

  // Gate the self-playing convergence/scan animations until the section is in view.
  const { ref: revealRef, isVisible: isSectionVisible } = useReveal<HTMLElement>();

  // Progressive cinematic reveal sequence
  const handleReplaySequence = () => {
    setAnimationStage('converging');
    setTimeout(() => {
      setAnimationStage('synthesizing');
    }, 400);
    setTimeout(() => {
      setAnimationStage('revealing');
    }, 800);
    setTimeout(() => {
      setAnimationStage('ready');
    }, 1400);
  };

  // Toggle selection of fragment
  const handleFragmentClick = (fragmentId: string) => {
    setActiveHighlightFragmentId(activeHighlightFragmentId === fragmentId ? null : fragmentId);
  };

  const renderFragmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare size={13} />;
      case 'Mic':
        return <Mic size={13} />;
      case 'Crosshair':
        return <Crosshair size={13} />;
      case 'FileText':
        return <FileText size={13} />;
      case 'Pill':
        return <Pill size={13} />;
      case 'History':
        return <History size={13} />;
      case 'Activity':
        return <Activity size={13} />;
      default:
        return <Layers size={13} />;
    }
  };

  return (
    <section
      ref={revealRef}
      id="feature-doctor-brief"
      className={`showcase-feature-section theme-light doctor-brief-showcase-section ${isSectionVisible ? 'is-visible' : ''}`}
      aria-label="30-Second Doctor Brief Feature"
    >
      <div className="feature-section-inner">
        {/* Section Header */}
        <div className="dark-feature-header" data-reveal style={{ '--si': 0 } as React.CSSProperties}>
          <div className="dark-badge-row">
            <span className="dark-mint-pill">
              <FileText size={13} className="pill-icon" />
              Pre-Consultation Synthesis
            </span>
            <span className="dark-editorial-quote">&ldquo;The context clinicians need, before the conversation begins.&rdquo;</span>
            <span className="dark-anchor-tag">#feature-doctor-brief</span>
          </div>

          <h3 className="dark-feature-headline">
            Don&rsquo;t make your doctor{' '}
            <span className="editorial-serif dark-serif-mint">rebuild the story.</span>
          </h3>

          <p className="dark-feature-lead">
            Physicians face crowded appointments and fragmented records. MEDVIDHI synthesizes fragmented 
            conversations, pain locations, medicines, and imaging into a structured brief ready for clinical review.
          </p>
        </div>

        {/* Cinematic 3-Column Studio Canvas */}
        <div className="brief-studio-card" data-reveal="scale" style={{ '--si': 1 } as React.CSSProperties}>
          {/* Top Bar with Status & Interactive Controls */}
          <div className="brief-studio-topbar">
            <div className="brief-meta-row">
              <span className={`brief-ready-pill ${animationStage === 'ready' ? 'is-complete' : 'is-progress'}`}>
                <span className="pulse-mono-dot pulse-mint-dot" />
                {animationStage === 'ready' ? 'READY TO SHARE' : 'SYNTHESIZING CONTEXT...'}
              </span>
              <span className="brief-target-spec">
                Clinical Target: Orthopedic / Sports Medicine Consultation
              </span>
            </div>

            {/* Working Preview Controls */}
            <div className="brief-controls-group" role="toolbar" aria-label="Doctor Brief Controls">
              {/* Patient vs Medical View Toggle */}
              <div className="toggle-pill-container" role="radiogroup" aria-label="Perspective view mode">
                <button
                  type="button"
                  role="radio"
                  aria-checked={viewMode === 'patient'}
                  className={`toggle-pill-btn ${viewMode === 'patient' ? 'is-active' : ''}`}
                  onClick={() => setViewMode('patient')}
                >
                  Patient Language
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={viewMode === 'medical'}
                  className={`toggle-pill-btn ${viewMode === 'medical' ? 'is-active' : ''}`}
                  onClick={() => setViewMode('medical')}
                >
                  Medical View
                </button>
              </div>

              {/* View Source Context Toggle */}
              <button
                type="button"
                className={`brief-action-btn ${activeHighlightFragmentId ? 'is-active-btn' : ''}`}
                onClick={() =>
                  setActiveHighlightFragmentId(activeHighlightFragmentId ? null : 'frag-voice')
                }
                title="Toggle bidirectional context inspection"
              >
                <Eye size={13} />
                <span>
                  {activeHighlightFragmentId ? 'Clear Source Context' : 'View Source Context'}
                </span>
              </button>

              {/* Progressive Sequence Replay Trigger */}
              <button
                type="button"
                className="brief-action-btn"
                onClick={handleReplaySequence}
                title="Re-run animated convergence and progressive brief reveal"
              >
                <RotateCcw size={13} />
                <span>Re-resolve Sequence</span>
              </button>

              {/* Share with Doctor Modal Trigger */}
              <button
                type="button"
                className="brief-share-btn"
                onClick={() => setIsShareModalOpen(true)}
              >
                <Share2 size={13} />
                <span>Share with Doctor</span>
              </button>
            </div>
          </div>

          {/* Wide Cinematic Three-Column Sequence */}
          <div className={`brief-three-column-grid stage-${animationStage}`}>
            {/* ============================================================== */}
            {/* LEFT COLUMN: Fragmented Patient Health Context                 */}
            {/* ============================================================== */}
            <div className="brief-column inputs-column">
              <div className="column-header">
                <span className="column-eyebrow">Input Layer • Multi-Channel Signals</span>
                <h4 className="column-title">Fragmented Health Context</h4>
                <p className="column-desc">
                  Separate, slightly scattered information fragments captured across daily patient interactions.
                </p>
              </div>

              <div className="fragments-stack" role="list">
                {DOCTOR_BRIEF_SOURCES.map((frag: DoctorBriefSourceFragment, idx: number) => {
                  const isHighlighted = activeHighlightFragmentId === frag.id;
                  return (
                    <div
                      key={frag.id}
                      role="listitem"
                      className={`fragment-card type-${frag.iconName.toLowerCase()} ${
                        isHighlighted ? 'is-highlighted-source' : ''
                      }`}
                      onClick={() => handleFragmentClick(frag.id)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handleFragmentClick(frag.id);
                      }}
                      aria-label={`${frag.sourceType}: ${frag.title}`}
                    >
                      <div className="fragment-top">
                        <span className="fragment-type-pill">
                          <span className="frag-icon">{renderFragmentIcon(frag.iconName)}</span>
                          {frag.sourceType}
                        </span>
                        <span className="fragment-timestamp">{frag.timestamp}</span>
                      </div>
                      <h5 className="fragment-title">{frag.title}</h5>
                      <p className="fragment-raw">{frag.rawText}</p>
                      <span className="fragment-slot-index">Fragment 0{idx + 1}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ============================================================== */}
            {/* CENTRE COLUMN: Context Comes Together (Convergence Scanner)    */}
            {/* ============================================================== */}
            <div className="brief-column synthesis-column" aria-hidden="true">
              <div className="synthesis-pipeline-container">
                {/* Visual Converging Curved Vector Paths */}
                <svg className="convergence-paths-canvas" viewBox="0 0 120 480" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="curveBeam" x1="0" y1="0" x2="100%" y2="0">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  {/* Curved trajectories from left to center vertical axis */}
                  <path d="M 0 40 C 60 40, 60 240, 120 240" stroke="url(#curveBeam)" strokeWidth="1.2" fill="none" className="stream-path path-1" />
                  <path d="M 0 100 C 60 100, 60 240, 120 240" stroke="url(#curveBeam)" strokeWidth="1.2" fill="none" className="stream-path path-2" />
                  <path d="M 0 170 C 60 170, 60 240, 120 240" stroke="url(#curveBeam)" strokeWidth="1.2" fill="none" className="stream-path path-3" />
                  <path d="M 0 240 L 120 240" stroke="#FFFFFF" strokeWidth="1.5" fill="none" className="stream-path path-4 active-stream" />
                  <path d="M 0 310 C 60 310, 60 240, 120 240" stroke="url(#curveBeam)" strokeWidth="1.2" fill="none" className="stream-path path-5" />
                  <path d="M 0 380 C 60 380, 60 240, 120 240" stroke="url(#curveBeam)" strokeWidth="1.2" fill="none" className="stream-path path-6" />
                  <path d="M 0 440 C 60 440, 60 240, 120 240" stroke="url(#curveBeam)" strokeWidth="1.2" fill="none" className="stream-path path-7" />
                </svg>

                {/* Central Alignment Spine & Scanning Node */}
                <div className="synthesis-core-node">
                  <div className="synthesis-scanning-line" />
                  <Sparkles size={22} className="synthesis-icon" />
                  <span className="synthesis-label">Synthesis Engine</span>
                </div>

                {/* Vertical Alignment Status Chip */}
                <div className="synthesis-status-chip">
                  <span className="chip-code">CONTEXT CONVERGENCE</span>
                  <span className="chip-sub">7 Streams → Structured Brief</span>
                  <div className="convergence-pulse-dots">
                    <span className="dot dot-1" />
                    <span className="dot dot-2" />
                    <span className="dot dot-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================== */}
            {/* RIGHT COLUMN: The Actual-Looking Doctor Brief Preview          */}
            {/* ============================================================== */}
            <div className="brief-column brief-output-column">
              <div className="brief-glass-document">
                {/* Document Master Header with Custom Scanning SVG Emblem */}
                <div className="document-header">
                  <div className="doc-header-left">
                    {/* Custom Monochrome Document Scanning Icon */}
                    <div className="doc-custom-emblem">
                      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                        <rect x="5" y="4" width="22" height="24" rx="3" stroke="#FFFFFF" strokeWidth="1.8" fill="rgba(255, 255, 255, 0.08)" />
                        <path d="M11 4V2.5C11 1.7 11.7 1 12.5 1H19.5C20.3 1 21 1.7 21 2.5V4" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                        <line x1="9" y1="10" x2="23" y2="10" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="9" y1="15" x2="19" y2="15" stroke="#D4D4D8" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="9" y1="20" x2="16" y2="20" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M19 20L21 22L24.5 18.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    <div className="doc-header-titles">
                      <span className="doc-brand">MEDVIDHI • CLINICAL SYNTHESIS</span>
                      <h4 className="doc-title">Structured Pre-Consultation Brief</h4>
                    </div>
                  </div>

                  <div className="doc-header-right">
                    <span className="doc-sample-badge">
                      Illustrative Sample Data
                    </span>
                    <span className="doc-timestamp">Single-Consultation Access Link</span>
                  </div>
                </div>

                {/* Patient Summary & Perspective Strip */}
                <div className="doc-patient-strip">
                  <div className="patient-strip-item">
                    <span className="strip-label">Chief Presentation:</span>
                    <span className="strip-val">Right Lateral Elbow Pain (5-Day Duration)</span>
                  </div>
                  <div className="patient-strip-item">
                    <span className="strip-label">View Perspective:</span>
                    <span className="strip-val view-mode-val">
                      {viewMode === 'patient' ? 'Patient Clarified Terms' : 'Clinical Medical Terminology'}
                    </span>
                  </div>
                </div>

                {/* 8 Required Concise, Readable Illustrative Sections */}
                <div className="doc-sections-list">
                  {DOCTOR_BRIEF_SECTIONS.map((sec: DoctorBriefSection, idx: number) => {
                    const isMatchedSource = activeHighlightFragmentId === sec.sourceFragmentId;
                    return (
                      <div
                        key={sec.id}
                        className={`doc-section-card sec-index-${idx} ${
                          isMatchedSource ? 'is-matched-highlight' : ''
                        }`}
                        onClick={() => handleFragmentClick(sec.sourceFragmentId)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') handleFragmentClick(sec.sourceFragmentId);
                        }}
                        aria-label={`${sec.number} ${sec.title}: click to locate source context`}
                      >
                        <div className="sec-header-row">
                          <div className="sec-number-box">{sec.number}</div>
                          <h5 className="sec-title">{sec.title}</h5>
                          {sec.statusBadge && (
                            <span className="sec-alert-pill">{sec.statusBadge}</span>
                          )}
                          {isMatchedSource && (
                            <span className="source-linked-pill">
                              Linked to {sec.sourceFragmentId.replace('frag-', '')}
                            </span>
                          )}
                        </div>

                        <p className="sec-content-text">
                          {viewMode === 'patient' ? sec.patientViewText : sec.medicalViewText}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Document Footer Strip */}
                <div className="doc-document-footer">
                  <div className="footer-mint-state">
                    <CheckCircle2 size={15} />
                    <span>READY TO SHARE • Clinical Assessment by Qualified Physician</span>
                  </div>
                  <span className="footer-doc-id">DOC-ID: MV-SAMPLE-ELB-8429</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Notice with Prominent Illustrative Sample Data Disclaimer */}
          <div className="brief-studio-footer">
            <ShieldAlert size={15} className="notice-icon flex-shrink-0" />
            <span className="notice-text">
              <strong>Illustrative Sample Data:</strong> This demonstration models how multi-channel 
              patient accounts organize into a structured pre-consultation brief. Not a real patient record. 
              Diagnostic evaluation and patient care decisions are conducted exclusively by qualified medical professionals.
            </span>
          </div>
        </div>

        {/* Share with Doctor Interactive Preview Modal */}
        {isShareModalOpen && (
          <div
            className="share-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-modal-title"
          >
            <div className="share-modal-card">
              <div className="modal-header">
                <div className="modal-title-group">
                  <Shield size={16} />
                  <h4 id="share-modal-title" className="modal-title">
                    Share with Doctor • Consent &amp; Access Boundaries
                  </h4>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setIsShareModalOpen(false)}
                  aria-label="Close sharing modal"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="modal-body">
                <p className="modal-desc">
                  You maintain full granular authority over what information is transmitted to your doctor. 
                  Select the exact sections included in your single-consultation access link:
                </p>

                {/* Granular Consent Checklist */}
                <div className="consent-checklist">
                  <label className="consent-check-item">
                    <input type="checkbox" defaultChecked />
                    <span className="check-text">
                      <strong>Current Concern &amp; Symptom Timeline:</strong> 5-day lateral elbow presentation
                    </span>
                  </label>
                  <label className="consent-check-item">
                    <input type="checkbox" defaultChecked />
                    <span className="check-text">
                      <strong>Medicines &amp; Self-Care:</strong> Topical Diclofenac gel trial
                    </span>
                  </label>
                  <label className="consent-check-item">
                    <input type="checkbox" defaultChecked />
                    <span className="check-text">
                      <strong>Relevant Reports:</strong> Plain radiograph report attached
                    </span>
                  </label>
                  <label className="consent-check-item">
                    <input type="checkbox" defaultChecked={false} />
                    <span className="check-text">
                      <strong>Complete Health Memory:</strong> Include previous annual wellness history
                    </span>
                  </label>
                </div>

                {/* Time-Limited Expiration Settings */}
                <div className="modal-expiry-box">
                  <div className="expiry-row">
                    <Clock size={15} />
                    <span className="expiry-title">Time-Bound Token Expiration:</span>
                  </div>
                  <div className="expiry-options">
                    <span className="expiry-chip is-selected">Single-Consultation (2 Hours)</span>
                    <span className="expiry-chip">24 Hours</span>
                    <span className="expiry-chip">Revoke Immediately Upon Exam</span>
                  </div>
                </div>

                {/* Sharing Notice */}
                <div className="modal-compliance-notice">
                  <ShieldAlert size={14} className="notice-icon" />
                  <span>
                    <strong>Illustrative Preview:</strong> Demonstrates patient consent controls and access 
                    boundaries. No live hospital linking, network transmit, or MEDVIDHI ID sharing is performed.
                  </span>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-secondary-btn"
                  onClick={() => setIsShareModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="modal-primary-btn"
                  onClick={() => {
                    setShareConsentGranted(true);
                    setTimeout(() => setIsShareModalOpen(false), 900);
                  }}
                >
                  {shareConsentGranted ? (
                    <>
                      <CheckCircle2 size={15} />
                      <span>Consent Token Generated</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={15} />
                      <span>Generate Temporary Share Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorBriefShowcase;
