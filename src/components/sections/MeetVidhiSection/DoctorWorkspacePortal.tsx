import React from 'react';
import {
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
  Lock,
  PlusCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { SectionContent } from './translations';
import './DoctorWorkspacePortal.css';

interface DoctorWorkspacePortalProps {
  content: SectionContent;
}

export const DoctorWorkspacePortal: React.FC<DoctorWorkspacePortalProps> = ({ content }) => {
  const d = content.doctorWorkspace;

  return (
    <div className="doctor-workspace-panel">
      {/* Browser-style Top Bar */}
      <div className="workspace-browser-header">
        <div className="browser-traffic-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="browser-address-bar">
          <Lock size={12} className="ws-teal-icon" />
          <span>{d.url}</span>
        </div>
        <span className="doctor-role-badge">
          <Stethoscope size={11} />
          {d.role}
        </span>
      </div>

      <div className="workspace-inner-content">
        {/* Clinician Header Bar */}
        <div className="doctor-portal-header">
          <div className="doctor-badge-cluster">
            <div className="doctor-avatar-initials">SM</div>
            <div className="doctor-identity-meta">
              <span className="doctor-name">{d.doctorName}</span>
              <span className="doctor-reg">{d.doctorReg}</span>
            </div>
          </div>
          <div className="patient-auth-stamp">
            <ShieldCheck size={13} className="ws-teal-icon" />
            <span>{d.authScopeTag}</span>
          </div>
        </div>

        {/* Clinical Brief Container */}
        <div className="doctor-received-brief-card">
          <div className="brief-card-kicker-row">
            <span className="brief-kicker-tag">{d.briefCardTitle}</span>
            <span className="brief-sync-time">{d.briefSyncMeta}</span>
          </div>

          <div className="clinical-observations-grid">
            <div className="obs-item">
              <span className="obs-label">{d.chiefConcernLabel}</span>
              <p className="obs-val">{d.chiefConcernVal}</p>
            </div>
            <div className="obs-item">
              <span className="obs-label">{d.trajectoryLabel}</span>
              <p className="obs-val">{d.trajectoryVal}</p>
            </div>
            <div className="obs-item">
              <span className="obs-label">{d.medsLabel}</span>
              <p className="obs-val">{d.medsVal}</p>
            </div>
            <div className="obs-item">
              <span className="obs-label">{d.recordsLabel}</span>
              <p className="obs-val">{d.recordsVal}</p>
            </div>
          </div>
        </div>

        {/* Post-Consultation Attributed Clinical Update */}
        <div className="doctor-post-consult-card">
          <div className="post-consult-head">
            <div className="consult-tag-left">
              <PlusCircle size={13} className="ws-teal-icon" />
              <span className="consult-head-title">{d.postConsultTitle}</span>
            </div>
            <span className="provenance-tag">{d.authorTag}</span>
          </div>

          <div className="consult-note-body">
            <p className="note-text">{d.clinicalNoteText}</p>
            <div className="note-footer-row">
              <div className="note-timestamp">
                <Clock size={11} />
                <span>{d.recordedTime}</span>
              </div>
              <div className="note-synced-badge">
                <CheckCircle2 size={12} className="ws-teal-icon" />
                <span>{d.syncedBadge}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Journey Tagline */}
        <div className="portal-memory-continuity-tag">
          <Sparkles size={13} className="ws-teal-icon" />
          <span>{d.finalContinuityTagline}</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorWorkspacePortal;
