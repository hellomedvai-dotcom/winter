import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Paperclip,
  ArrowUp,
  CheckCircle2,
  FileText,
  FileCheck2,
  Compass,
  ShieldCheck,
  Layers,
  Pill,
  UploadCloud,
  Stethoscope,
  UserCheck,
  Check,
  Lock,
  Sparkles,
} from 'lucide-react';
import { MedvidhiLogo } from '@/components/brand/MedvidhiLogo';
import { VidhiAnimatedFace } from './VidhiAnimatedFace';
import { SectionContent } from './translations';
import './PhoneScreens.css';

interface ScreenProps {
  content: SectionContent;
}

// ============================================================================
// SCENE 01 — MEET VIDHI (Opening Screen with Real Logo & Animated Face)
// ============================================================================
export const Scene01MeetVidhi: React.FC<ScreenProps> = ({ content }) => {
  const d = content.screen1;

  return (
    <div className="ps-screen ps-screen-1 dark-theme">
      {/* 1. Actual Authentic MEDVIDHI Logo & Assistant Status */}
      <motion.div
        className="ps-brand-topbar"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="ps-brand-logo-row">
          <MedvidhiLogo height={20} theme="dark" />
        </div>
        <div className="ps-brand-badge-row">
          <span className="ps-assistant-status-badge">
            <span className="ps-online-dot" />
            {d.badge}
          </span>
        </div>
      </motion.div>

      {/* 2. Centerpiece: Animated Vidhi Face with Eye-Tracking */}
      <div className="ps-character-hero-stage">
        <motion.div
          className="ps-face-cluster"
          initial={{ scale: 0.86, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ps-face-ambient-aura" />
          <VidhiAnimatedFace size={105} theme="dark" />
        </motion.div>

        {/* Signature Greeting Sequence */}
        <motion.div
          className="ps-greeting-content"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="ps-vidhi-name-title">{d.greeting}</h3>
          <p className="ps-vidhi-lead-text">{d.lead}</p>
        </motion.div>

        {/* Contextual Quick Starters */}
        <motion.div
          className="ps-starters-cluster"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.32 }}
        >
          {d.starters.map((starter, idx) => (
            <span key={idx} className="ps-starter-chip">
              {starter}
            </span>
          ))}
        </motion.div>
      </div>

      {/* 3. Refined Text & Voice Interaction Composer */}
      <motion.div
        className="ps-composer-container"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.4 }}
      >
        <div className="ps-composer-capsule">
          <button type="button" className="ps-composer-btn" aria-label="Attach medical document">
            <Paperclip size={15} />
          </button>
          <span className="ps-composer-input-placeholder">{d.placeholder}</span>
          <div className="ps-composer-right-actions">
            <button type="button" className="ps-voice-mic-btn" aria-label="Record voice note">
              <Mic size={14} />
            </button>
            <button type="button" className="ps-send-action-btn" aria-label="Send message">
              <ArrowUp size={13} />
            </button>
          </div>
        </div>

        {/* Public Privacy Assurance */}
        <div className="ps-privacy-anchor">
          <ShieldCheck size={11} className="ps-teal-icon" />
          <span>{d.privacy}</span>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================================
// SCENE 02 — SHARE A CONCERN (Sequential Conversation & Voice Waveform)
// ============================================================================
export const Scene02ShareConcern: React.FC<ScreenProps> = ({ content }) => {
  const d = content.screen2;
  const [showTyping, setShowTyping] = useState(false);
  const [showVidhiReply, setShowVidhiReply] = useState(false);
  const [isTranscriptConfirmed, setIsTranscriptConfirmed] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTyping(true), 350);
    const t2 = setTimeout(() => {
      setShowTyping(false);
      setShowVidhiReply(true);
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="ps-screen ps-screen-2 dark-theme">
      {/* Header */}
      <div className="ps-chat-header-bar">
        <div className="ps-chat-header-left">
          <span className="ps-active-status-dot" />
          <span className="ps-screen-header-title">{d.headerTitle}</span>
        </div>
        <span className="ps-source-tag">{d.inputTag}</span>
      </div>

      {/* Sequential Chat Bubbles Stream */}
      <div className="ps-chat-scroll-stream">
        {/* Patient Message */}
        <motion.div
          className="ps-chat-bubble-user"
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="ps-bubble-text">{d.patientMessage}</p>
          <span className="ps-bubble-meta">{d.patientMeta}</span>
        </motion.div>

        {/* Typing Indicator */}
        <AnimatePresence>
          {showTyping && (
            <motion.div
              className="ps-typing-box"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vidhi Response */}
        {showVidhiReply && (
          <motion.div
            className="ps-chat-bubble-assistant"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="ps-bubble-assistant-head">
              <span className="ps-avatar-pill">VIDHI</span>
              <span className="ps-context-pill">CONTEXTUAL FOLLOW-UP</span>
            </div>
            <p className="ps-bubble-text">{d.vidhiFollowup1}</p>
            <p className="ps-bubble-text ps-bubble-second">{d.vidhiFollowup2}</p>
          </motion.div>
        )}

        {/* Patient Voice Waveform & Editable Transcript */}
        <motion.div
          className="ps-voice-recording-card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
        >
          <div className="ps-voice-waveform-row">
            <div className="ps-waveform-bars" aria-hidden="true">
              <span className="w-bar bar-1" />
              <span className="w-bar bar-2" />
              <span className="w-bar bar-3" />
              <span className="w-bar bar-4" />
              <span className="w-bar bar-5" />
              <span className="w-bar bar-6" />
              <span className="w-bar bar-7" />
            </div>
            <span className="ps-voice-rec-status">{d.voiceDuration}</span>
          </div>

          <div className="ps-transcript-edit-box">
            <span className="ps-transcript-label">{d.transcriptLabel}</span>
            <p className="ps-transcript-text">{d.transcriptText}</p>
            <button
              type="button"
              className={`ps-confirm-transcript-btn ${isTranscriptConfirmed ? 'is-confirmed' : ''}`}
              onClick={() => setIsTranscriptConfirmed(true)}
            >
              <Check size={12} />
              <span>{isTranscriptConfirmed ? d.confirmedBtn : d.confirmBtn}</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Input Tray */}
      <div className="ps-composer-capsule ps-composer-compact">
        <span className="ps-composer-input-placeholder">{d.composerPlaceholder}</span>
        <button type="button" className="ps-voice-mic-btn active" aria-label="Mic">
          <Mic size={14} />
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 03 — ADD HEALTH RECORDS (Upload, Extraction & Patient Review)
// ============================================================================
export const Scene03AddRecords: React.FC<ScreenProps> = ({ content }) => {
  const d = content.screen3;
  const [uploadPercent, setUploadPercent] = useState(30);
  const [isExtracted, setIsExtracted] = useState(false);
  const [isApprovedByPatient, setIsApprovedByPatient] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUploadPercent((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsExtracted(true);
          return 100;
        }
        return p + 35;
      });
    }, 280);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ps-screen ps-screen-3 dark-theme">
      {/* Header */}
      <div className="ps-chat-header-bar">
        <div className="ps-chat-header-left">
          <FileText size={15} className="ps-teal-icon" />
          <span className="ps-screen-header-title">{d.headerTitle}</span>
        </div>
        <span className="ps-source-tag">{d.sourceTag}</span>
      </div>

      {/* Documents List */}
      <div className="ps-records-stream">
        {/* Uploading MRI Report Card */}
        <motion.div
          className="ps-record-entry-card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="ps-record-entry-head">
            <div className="ps-record-type-icon">
              <FileText size={16} />
            </div>
            <div className="ps-record-entry-titles">
              <span className="ps-entry-filename">{d.mriTitle}</span>
              <span className="ps-entry-meta">{d.mriMeta}</span>
            </div>
            <span className={`ps-status-pill-badge ${isExtracted ? 'is-complete' : ''}`}>
              {isExtracted ? d.extractedBadge : `${uploadPercent}%`}
            </span>
          </div>

          <div className="ps-upload-bar-track">
            <div className="ps-upload-bar-fill" style={{ width: `${uploadPercent}%` }} />
          </div>

          {/* Extracted Details Requiring Review */}
          {isExtracted && (
            <motion.div
              className="ps-extraction-review-box"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <div className="ps-extraction-status-row">
                <span className="ps-tag-needs-review">
                  {isApprovedByPatient ? d.statusConfirmed : d.statusNeedsReview}
                </span>
                {!isApprovedByPatient && (
                  <button
                    type="button"
                    className="ps-btn-confirm-extraction"
                    onClick={() => setIsApprovedByPatient(true)}
                  >
                    {d.confirmReviewBtn}
                  </button>
                )}
              </div>
              <p className="ps-extracted-finding">{d.mriExtracted}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Existing Prescription Card */}
        <motion.div
          className="ps-record-entry-card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="ps-record-entry-head">
            <div className="ps-record-type-icon icon-prescription">
              <FileCheck2 size={16} />
            </div>
            <div className="ps-record-entry-titles">
              <span className="ps-entry-filename">{d.rxTitle}</span>
              <span className="ps-entry-meta">{d.rxMeta}</span>
            </div>
            <span className="ps-status-pill-badge is-complete">{d.statusConfirmed}</span>
          </div>
          <div className="ps-record-snippet-block">
            <span>{d.rxExtracted}</span>
          </div>
        </motion.div>

        {/* Medicine Record */}
        <motion.div
          className="ps-record-entry-card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
        >
          <div className="ps-record-entry-head">
            <div className="ps-record-type-icon icon-med">
              <Pill size={16} />
            </div>
            <div className="ps-record-entry-titles">
              <span className="ps-entry-filename">{d.medTitle}</span>
              <span className="ps-entry-meta">{d.medMeta}</span>
            </div>
            <span className="ps-status-pill-badge is-neutral">{d.medStatus}</span>
          </div>
        </motion.div>
      </div>

      {/* Upload button */}
      <button type="button" className="ps-add-document-action-btn">
        <UploadCloud size={14} />
        <span>{d.addDocBtn}</span>
      </button>
    </div>
  );
};

// ============================================================================
// SCENE 04 — CONTINUOUS AI HEALTH MEMORY (Timeline with Source Badges)
// ============================================================================
export const Scene04HealthMemory: React.FC<ScreenProps> = ({ content }) => {
  const d = content.screen4;

  return (
    <div className="ps-screen ps-screen-4 dark-theme">
      {/* Header */}
      <div className="ps-chat-header-bar">
        <div className="ps-chat-header-left">
          <Layers size={15} className="ps-teal-icon" />
          <span className="ps-screen-header-title">{d.headerTitle}</span>
        </div>
        <span className="ps-source-tag">{d.episodeTag}</span>
      </div>

      <p className="ps-memory-kicker">{d.kicker}</p>

      {/* Chronological Timeline Container */}
      <div className="ps-timeline-stream">
        <div className="ps-timeline-stem-line" />

        {/* Event 1: Present Day */}
        <motion.div
          className="ps-timeline-node-card is-current"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="ps-timeline-node-dot active-dot" />
          <div className="ps-node-header">
            <span className="ps-node-date">{d.event1Date}</span>
            <span className="ps-provenance-badge badge-patient-confirmed">{d.event1Badge}</span>
          </div>
          <h4 className="ps-node-title">{d.event1Title}</h4>
          <p className="ps-node-body">{d.event1Body}</p>
        </motion.div>

        {/* Event 2: 3 Days Ago */}
        <motion.div
          className="ps-timeline-node-card"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <span className="ps-timeline-node-dot" />
          <div className="ps-node-header">
            <span className="ps-node-date">{d.event2Date}</span>
            <span className="ps-provenance-badge badge-doc-extracted">{d.event2Badge}</span>
          </div>
          <h4 className="ps-node-title">{d.event2Title}</h4>
          <p className="ps-node-body">{d.event2Body}</p>
        </motion.div>

        {/* Event 3: 10 Days Ago */}
        <motion.div
          className="ps-timeline-node-card"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="ps-timeline-node-dot" />
          <div className="ps-node-header">
            <span className="ps-node-date">{d.event3Date}</span>
            <span className="ps-provenance-badge badge-patient-reported">{d.event3Badge}</span>
          </div>
          <h4 className="ps-node-title">{d.event3Title}</h4>
          <p className="ps-node-body">{d.event3Body}</p>
        </motion.div>

        {/* Event 4: 3 Weeks Ago */}
        <motion.div
          className="ps-timeline-node-card"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
        >
          <span className="ps-timeline-node-dot" />
          <div className="ps-node-header">
            <span className="ps-node-date">{d.event4Date}</span>
            <span className="ps-provenance-badge badge-patient-reported">{d.event4Badge}</span>
          </div>
          <h4 className="ps-node-title">{d.event4Title}</h4>
          <p className="ps-node-body">{d.event4Body}</p>
        </motion.div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 05 — COMPLETE MEDICAL HANDOVER (Doctor Brief: Review → Edit → Approve)
// ============================================================================
export const Scene05DoctorBrief: React.FC<ScreenProps> = ({ content }) => {
  const d = content.screen5;
  const [isApproved, setIsApproved] = useState<boolean>(false);

  return (
    <div className="ps-screen ps-screen-5 dark-theme">
      {/* Header */}
      <div className="ps-chat-header-bar">
        <div className="ps-chat-header-left">
          <Stethoscope size={15} className="ps-teal-icon" />
          <span className="ps-screen-header-title">{d.headerTitle}</span>
        </div>
        <span className="ps-source-tag">{d.statusTag}</span>
      </div>

      <div className="ps-brief-body-scroll">
        {/* Review -> Edit -> Approve Banner */}
        <div className="ps-workflow-step-pills">
          <span className="wf-pill done">{d.wf1}</span>
          <span className="wf-pill-arrow">→</span>
          <span className="wf-pill done">{d.wf2}</span>
          <span className="wf-pill-arrow">→</span>
          <span className={`wf-pill ${isApproved ? 'done' : 'active'}`}>{d.wf3}</span>
        </div>

        {/* Clinical Brief Card (Light Card Element on Dark Canvas for Medical Contrast) */}
        <div className="ps-doctor-brief-box">
          <div className="ps-brief-section">
            <span className="ps-brief-label">{d.concernLabel}</span>
            <p className="ps-brief-value">{d.concernVal}</p>
          </div>

          <div className="ps-brief-divider" />

          <div className="ps-brief-section">
            <span className="ps-brief-label">{d.trajectoryLabel}</span>
            <p className="ps-brief-value">{d.trajectoryVal}</p>
          </div>

          <div className="ps-brief-divider" />

          <div className="ps-brief-section">
            <span className="ps-brief-label">{d.medsLabel}</span>
            <p className="ps-brief-value">{d.medsVal}</p>
          </div>

          <div className="ps-brief-divider" />

          <div className="ps-brief-section">
            <span className="ps-brief-label">{d.recordsLabel}</span>
            <p className="ps-brief-value">{d.recordsVal}</p>
          </div>
        </div>

        {/* Patient Approval Action */}
        <div className="ps-brief-approval-action">
          <button
            type="button"
            className={`ps-btn-approve-brief ${isApproved ? 'is-approved' : ''}`}
            onClick={() => setIsApproved(true)}
          >
            <CheckCircle2 size={14} />
            <span>{isApproved ? d.approvedBtn : d.approveBtn}</span>
          </button>
          <span className="ps-brief-disclaimer-note">{d.disclaimer}</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 06 — RIGHT DOCTOR NAVIGATION (Route A Direct & Route B Assisted)
// ============================================================================
export const Scene06RightDoctor: React.FC<ScreenProps> = ({ content }) => {
  const d = content.screen6;
  const [activeRoute, setActiveRoute] = useState<'routeA' | 'routeB'>('routeA');

  return (
    <div className="ps-screen ps-screen-6 dark-theme">
      {/* Header */}
      <div className="ps-chat-header-bar">
        <div className="ps-chat-header-left">
          <Compass size={15} className="ps-teal-icon" />
          <span className="ps-screen-header-title">{d.headerTitle}</span>
        </div>
        <span className="ps-source-tag">{d.routesTag}</span>
      </div>

      {/* Two Routes Switcher */}
      <div className="ps-routes-switcher" role="tablist">
        <button
          type="button"
          className={`ps-route-tab ${activeRoute === 'routeA' ? 'is-active' : ''}`}
          onClick={() => setActiveRoute('routeA')}
        >
          {d.tabRouteA}
        </button>
        <button
          type="button"
          className={`ps-route-tab ${activeRoute === 'routeB' ? 'is-active' : ''}`}
          onClick={() => setActiveRoute('routeB')}
        >
          {d.tabRouteB}
        </button>
      </div>

      <div className="ps-routes-body">
        {activeRoute === 'routeA' ? (
          <motion.div
            className="ps-route-content"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="ps-context-rationale-box">
              <span className="ps-rationale-kicker">{d.filterKicker}</span>
              <p>{d.filterText}</p>
            </div>

            <div className="ps-doctor-shortlist-compact">
              <div className="ps-shortlist-item">
                <div className="ps-item-top">
                  <span className="ps-doc-title">{d.doc1Title}</span>
                  <span className="ps-verified-pill">{d.verifiedPill}</span>
                </div>
                <p className="ps-doc-desc">{d.doc1Desc}</p>
                <div className="ps-match-why">{d.doc1Why}</div>
              </div>

              <div className="ps-shortlist-item">
                <div className="ps-item-top">
                  <span className="ps-doc-title">{d.doc2Title}</span>
                  <span className="ps-verified-pill">{d.verifiedPill}</span>
                </div>
                <p className="ps-doc-desc">{d.doc2Desc}</p>
                <div className="ps-match-why">{d.doc2Why}</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="ps-route-content"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="ps-consultant-active-notice">
              <UserCheck size={16} className="ps-teal-icon" />
              <div className="ps-notice-text">
                <span className="ps-notice-title">{d.consultantNoticeTitle}</span>
                <p>{d.consultantNoticeText}</p>
              </div>
            </div>

            <div className="ps-consultant-preview-status">
              <span className="ps-status-line">
                <CheckCircle2 size={12} className="ps-teal-icon" />
                <span>{d.consultantScope1}</span>
              </span>
              <span className="ps-status-line">
                <CheckCircle2 size={12} className="ps-teal-icon" />
                <span>{d.consultantScope2}</span>
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// SCENE 07 — PATIENT-CONTROLLED HANDOVER (Scope Authorization & Portal Link)
// ============================================================================
export const Scene07PatientHandover: React.FC<ScreenProps> = ({ content }) => {
  const d = content.screen7;

  return (
    <div className="ps-screen ps-screen-7 dark-theme">
      {/* Header */}
      <div className="ps-chat-header-bar">
        <div className="ps-chat-header-left">
          <Lock size={15} className="ps-teal-icon" />
          <span className="ps-screen-header-title">{d.headerTitle}</span>
        </div>
        <span className="ps-source-tag">{d.scopeTag}</span>
      </div>

      <div className="ps-handover-body">
        {/* Doctor Selection */}
        <div className="ps-handover-item">
          <span className="ps-handover-label">{d.docSelectLabel}</span>
          <div className="ps-target-doc-card">
            <span className="doc-bold">{d.selectedDocName}</span>
            <span className="doc-sub">{d.selectedDocClinic}</span>
          </div>
        </div>

        {/* Scope Boundaries */}
        <div className="ps-handover-item">
          <span className="ps-handover-label">{d.scopeLabel}</span>
          <div className="ps-scope-chips">
            <span className="scope-chip">{d.scopeChip1}</span>
            <span className="scope-chip">{d.scopeChip2}</span>
            <span className="scope-chip">{d.scopeChip3}</span>
            <span className="scope-chip restricted">{d.scopeChipRestricted}</span>
          </div>
        </div>

        {/* Authorization Button */}
        <div className="ps-handover-pass-status">
          <div className="pass-status-header">
            <ShieldCheck size={14} className="ps-teal-icon" />
            <span>{d.passActiveTitle}</span>
          </div>
          <p className="pass-status-desc">{d.passActiveDesc}</p>
        </div>

        {/* Continuity Footer */}
        <div className="ps-continuity-reminder">
          <Sparkles size={13} className="ps-teal-icon" />
          <span>{d.continuityTagline}</span>
        </div>
      </div>
    </div>
  );
};
