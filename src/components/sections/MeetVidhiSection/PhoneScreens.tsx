import React from 'react';
import {
  Sparkles,
  Mic,
  Crosshair,
  Clock,
  Layers,
  Compass,
  FileCheck2,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  Share2,
  Bookmark,
  ChevronRight,
  Shield,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { MedvidhiLogo } from '@/components/brand/MedvidhiLogo';
import { MeetVidhiContent } from '@/config/meetVidhiContent';
import './PhoneScreens.css';

interface ScreenProps {
  content: MeetVidhiContent;
}

// --------------------------------------------------------------------------
// Screen 1: Meet Vidhi (Welcome Screen)
// --------------------------------------------------------------------------
export const PhoneScreen1: React.FC<ScreenProps> = ({ content }) => {
  const d = content.phoneScreens.screen1;

  return (
    <div className="ps-container ps-screen-1">
      {/* Top Header with Authentic MEDVIDHI Logo */}
      <div className="ps-app-header">
        <MedvidhiLogo height={20} theme="light" />
        <span className="ps-status-pill">{d.vidhiBadge}</span>
      </div>

      {/* Hero Welcome Message */}
      <div className="ps-hero-card">
        <div className="ps-avatar-cluster">
          <div className="ps-vidhi-avatar">
            <Sparkles size={22} className="ps-avatar-icon" />
          </div>
          <span className="ps-online-dot" />
        </div>

        <h3 className="ps-greeting-title">{d.greeting}</h3>
        <p className="ps-greeting-lead">{d.subgreeting}</p>
      </div>

      {/* Value Proposition Box */}
      <div className="ps-intro-block">
        <div className="ps-intro-header">
          <Activity size={14} className="ps-accent-icon" />
          <span className="ps-intro-heading">{d.introTitle}</span>
        </div>
        <p className="ps-intro-body">{d.introBody}</p>
      </div>

      {/* Suggested Quick Starters */}
      <div className="ps-action-tray">
        <span className="ps-tray-label">{d.startPrompt}</span>
        <button type="button" className="ps-primary-cta">
          <span>{d.ctaButton}</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Privacy Anchor */}
      <div className="ps-footer-privacy">
        <Shield size={12} className="ps-shield-icon" />
        <span>{d.privacyNote}</span>
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------
// Screen 2: Tell Vidhi what changed (Chat + Voice Note)
// --------------------------------------------------------------------------
export const PhoneScreen2: React.FC<ScreenProps> = ({ content }) => {
  const d = content.phoneScreens.screen2;

  return (
    <div className="ps-container ps-screen-2">
      {/* Top Bar */}
      <div className="ps-app-header">
        <div className="ps-header-left">
          <span className="ps-chat-title">{d.chatHeader}</span>
        </div>
        <span className="ps-live-indicator">LIVE</span>
      </div>

      {/* Conversational Stream */}
      <div className="ps-chat-stream">
        {/* Patient Message */}
        <div className="ps-chat-bubble ps-bubble-patient">
          <p className="ps-bubble-text">{d.patientMessage}</p>
          <span className="ps-bubble-time">{d.patientTimestamp}</span>
        </div>

        {/* Voice Note Widget */}
        <div className="ps-voice-note-card">
          <div className="ps-voice-head">
            <Mic size={13} className="ps-mic-icon" />
            <span className="ps-voice-tag">{d.voiceNoteTag}</span>
          </div>
          <div className="ps-waveform-bars" aria-hidden="true">
            <span className="wbar bar-a" />
            <span className="wbar bar-b" />
            <span className="wbar bar-c" />
            <span className="wbar bar-d" />
            <span className="wbar bar-e" />
            <span className="wbar bar-f" />
            <span className="wbar bar-g" />
            <span className="wbar bar-h" />
            <span className="wbar bar-i" />
          </div>
          <p className="ps-voice-quote">{d.voiceSnippet}</p>
        </div>

        {/* Vidhi Response */}
        <div className="ps-chat-bubble ps-bubble-vidhi">
          <div className="ps-vidhi-tag-row">
            <span className="ps-vidhi-name">VIDHI</span>
            <span className="ps-tag-dot" />
            <span className="ps-tag-type">{d.followupPrompt}</span>
          </div>
          <p className="ps-bubble-text">{d.vidhiResponse}</p>
          <div className="ps-followup-box">
            <HelpCircle size={13} className="ps-help-icon" />
            <p className="ps-followup-text">{d.followupQuestion}</p>
          </div>
        </div>
      </div>

      {/* Mic Input Dock */}
      <div className="ps-input-dock">
        <div className="ps-input-fake-field">
          <span>{d.inputPlaceholder}</span>
        </div>
        <button type="button" className="ps-mic-btn" aria-label="Microphone">
          <Mic size={16} />
        </button>
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------
// Screen 3: Build your Health Memory (Timeline + Knee Body Map)
// --------------------------------------------------------------------------
export const PhoneScreen3: React.FC<ScreenProps> = ({ content }) => {
  const d = content.phoneScreens.screen3;

  return (
    <div className="ps-container ps-screen-3">
      {/* Top Bar */}
      <div className="ps-app-header">
        <div className="ps-header-left">
          <Layers size={14} className="ps-accent-icon" />
          <span className="ps-chat-title">{d.memoryHeader}</span>
        </div>
        <span className="ps-status-pill">{d.memoryBadge}</span>
      </div>

      {/* Body Map Widget Mini Representation */}
      <div className="ps-bodymap-widget">
        <div className="ps-bodymap-head">
          <Crosshair size={13} className="ps-crosshair-icon" />
          <span className="ps-bodymap-title">{d.bodyMapTitle}</span>
        </div>
        <div className="ps-bodymap-visual">
          <div className="ps-knee-pin-badge">
            <span className="ps-pin-pulse" />
            <span className="ps-pin-text">{d.bodyMapPin}</span>
          </div>
          <span className="ps-pin-detail">{d.bodyMapSub}</span>
        </div>
      </div>

      {/* Structured Health Memory Timeline */}
      <div className="ps-memory-timeline">
        <div className="ps-timeline-head">
          <Clock size={13} />
          <span>{d.timelineTitle}</span>
        </div>

        <div className="ps-timeline-card">
          <div className="ps-tl-row">
            <span className="ps-tl-label">{d.concernTag}</span>
            <span className="ps-tl-val">{d.concernValue}</span>
          </div>
          <div className="ps-tl-divider" />
          <div className="ps-tl-row">
            <span className="ps-tl-label">{d.durationTag}</span>
            <span className="ps-tl-val">{d.durationValue}</span>
          </div>
          <div className="ps-tl-divider" />
          <div className="ps-tl-row">
            <span className="ps-tl-label">{d.patternTag}</span>
            <span className="ps-tl-val">{d.patternValue}</span>
          </div>
          <div className="ps-tl-divider" />
          <div className="ps-tl-row">
            <span className="ps-tl-label">{d.medicinesTag}</span>
            <span className="ps-tl-val">{d.medicinesValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------
// Screen 4: Understand your health information (Medical explainer)
// --------------------------------------------------------------------------
export const PhoneScreen4: React.FC<ScreenProps> = ({ content }) => {
  const d = content.phoneScreens.screen4;

  return (
    <div className="ps-container ps-screen-4">
      {/* Top Bar */}
      <div className="ps-app-header">
        <div className="ps-header-left">
          <HelpCircle size={14} className="ps-accent-icon" />
          <span className="ps-chat-title">{d.explainerHeader}</span>
        </div>
        <span className="ps-status-pill">{d.explainerBadge}</span>
      </div>

      {/* Focus Term Card */}
      <div className="ps-term-focus-card">
        <span className="ps-term-found-label">{d.termFound}</span>
        <h4 className="ps-term-word">{d.termName}</h4>
        <span className="ps-term-phonetic">{d.termPhonetic}</span>
      </div>

      {/* Simple Everyday Explanation */}
      <div className="ps-explainer-card">
        <div className="ps-exp-head">
          <CheckCircle2 size={13} className="ps-check-icon" />
          <span className="ps-exp-title">{d.simpleExplanationTitle}</span>
        </div>
        <p className="ps-exp-body">{d.simpleExplanation}</p>
      </div>

      {/* Why it Matters for Doctor */}
      <div className="ps-explainer-card ps-exp-secondary">
        <div className="ps-exp-head">
          <Activity size={13} className="ps-accent-icon" />
          <span className="ps-exp-title">{d.patientImpactTitle}</span>
        </div>
        <p className="ps-exp-body">{d.patientImpact}</p>
      </div>

      {/* Suggested Doctor Question */}
      <div className="ps-doc-question-pill">
        <span className="ps-q-tag">{d.doctorQuestionHintTitle}:</span>
        <p className="ps-q-text">{d.doctorQuestionHint}</p>
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------
// Screen 5: Explore relevant medical expertise (Specialist exploration)
// --------------------------------------------------------------------------
export const PhoneScreen5: React.FC<ScreenProps> = ({ content }) => {
  const d = content.phoneScreens.screen5;

  return (
    <div className="ps-container ps-screen-5">
      {/* Top Bar */}
      <div className="ps-app-header">
        <div className="ps-header-left">
          <Compass size={14} className="ps-accent-icon" />
          <span className="ps-chat-title">{d.careHeader}</span>
        </div>
        <span className="ps-status-pill">{d.careBadge}</span>
      </div>

      {/* Contextual notice */}
      <div className="ps-context-notice">
        <span>{d.explorationNotice}</span>
      </div>

      {/* Recommended Domain Card */}
      <div className="ps-specialty-card">
        <span className="ps-specialty-eyebrow">{d.recommendedAreaTitle}</span>
        <h4 className="ps-specialty-name">{d.specialtyName}</h4>
        <p className="ps-specialty-scope">{d.specialtyScope}</p>
      </div>

      {/* Clinical Rationale Box */}
      <div className="ps-rationale-box">
        <span className="ps-rationale-title">{d.rationaleTitle}</span>
        <p className="ps-rationale-body">{d.rationaleText}</p>
      </div>

      {/* Typical Assessment Points */}
      <div className="ps-assessment-box">
        <span className="ps-assessment-title">{d.assessmentTitle}</span>
        <ul className="ps-points-list">
          {d.assessmentPoints.map((pt, idx) => (
            <li key={idx}>
              <ChevronRight size={12} className="ps-list-chevron" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Safety Disclaimer */}
      <div className="ps-safety-footnote">
        <AlertCircle size={12} />
        <span>{d.disclaimer}</span>
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------
// Screen 6: Prepare your 30-second Doctor Brief (Handoff Summary)
// --------------------------------------------------------------------------
export const PhoneScreen6: React.FC<ScreenProps> = ({ content }) => {
  const d = content.phoneScreens.screen6;

  return (
    <div className="ps-container ps-screen-6">
      {/* Top Bar */}
      <div className="ps-app-header">
        <div className="ps-header-left">
          <FileCheck2 size={14} className="ps-accent-icon" />
          <span className="ps-chat-title">{d.briefHeader}</span>
        </div>
        <span className="ps-status-pill">{d.briefBadge}</span>
      </div>

      {/* Subtitle */}
      <span className="ps-brief-subhead">{d.briefSubtitle}</span>

      {/* 30-Second Summary Card */}
      <div className="ps-brief-card">
        <div className="ps-brief-section">
          <span className="ps-brief-tag">{d.patientSummaryTitle}</span>
          <p className="ps-brief-body">{d.patientSummary}</p>
        </div>

        <div className="ps-brief-divider" />

        <div className="ps-brief-section">
          <span className="ps-brief-tag">{d.timelineSummaryTitle}</span>
          <p className="ps-brief-body">{d.timelineSummary}</p>
        </div>

        <div className="ps-brief-divider" />

        <div className="ps-brief-section">
          <span className="ps-brief-tag">{d.keyObservationsTitle}</span>
          <ul className="ps-brief-list">
            {d.keyObservations.map((obs, idx) => (
              <li key={idx}>
                <CheckCircle2 size={12} className="ps-check-icon" />
                <span>{obs}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Doctor Orientation Note */}
      <p className="ps-orientation-note">{d.doctorOrientationNote}</p>

      {/* Action Buttons */}
      <div className="ps-brief-actions">
        <button type="button" className="ps-brief-primary-btn">
          <Share2 size={14} />
          <span>{d.shareAction}</span>
        </button>
        <button type="button" className="ps-brief-secondary-btn">
          <Bookmark size={14} />
          <span>{d.saveAction}</span>
        </button>
      </div>
    </div>
  );
};
