import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  Building2,
  Calendar,
  Filter,
  BadgeCheck,
  Eye,
} from 'lucide-react';
import { SectionContent } from './translations';
import './CareConsultantWorkspace.css';

interface CareConsultantWorkspaceProps {
  content: SectionContent;
  onMatchesConfirmed?: () => void;
}

export const CareConsultantWorkspace: React.FC<CareConsultantWorkspaceProps> = ({
  content,
  onMatchesConfirmed,
}) => {
  const c = content.consultantWorkspace;
  const [requestStatus, setRequestStatus] = useState<'pending' | 'accepted'>('pending');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isReviewed, setIsReviewed] = useState<boolean>(false);

  // Auto-advance through the 7-step matching funnel once accepted
  useEffect(() => {
    if (requestStatus !== 'accepted') return;

    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < 7) {
          return prev + 1;
        }
        clearInterval(timer);
        setIsReviewed(true);
        if (onMatchesConfirmed) onMatchesConfirmed();
        return prev;
      });
    }, 700);

    return () => clearInterval(timer);
  }, [requestStatus, onMatchesConfirmed]);

  return (
    <div className="consultant-workspace-panel">
      {/* Browser-style Top Bar */}
      <div className="workspace-browser-header">
        <div className="browser-traffic-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="browser-address-bar">
          <ShieldCheck size={12} className="ws-teal-icon" />
          <span>{c.url}</span>
        </div>
        <span className="consultant-role-badge">
          <UserCheck size={11} />
          {c.role}
        </span>
      </div>

      <div className="workspace-inner-content">
        {/* Case Banner & Scope Notice */}
        <div className="case-banner-row">
          <div className="case-title-block">
            <span className="case-id-tag">{c.caseTag}</span>
            <h4 className="case-heading">{c.caseHeading}</h4>
          </div>
          <div className="scope-boundary-pill">
            <Eye size={12} />
            <span>{c.scopeBoundary}</span>
          </div>
        </div>

        {/* Request Status / Actions */}
        {requestStatus === 'pending' ? (
          <motion.div
            className="incoming-request-card"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="incoming-request-top">
              <div className="patient-avatar-dot" />
              <div className="patient-meta">
                <span className="patient-alias">{c.patientAlias}</span>
                <span className="request-time">{c.requestTime}</span>
              </div>
            </div>
            <p className="request-note">{c.requestNote}</p>
            <div className="request-action-buttons">
              <button
                type="button"
                className="btn-ws-primary"
                onClick={() => setRequestStatus('accepted')}
              >
                <CheckCircle2 size={13} />
                <span>{c.acceptBtn}</span>
              </button>
              <button type="button" className="btn-ws-secondary">
                {c.declineBtn}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="consultant-engine-flow">
            {/* Matching Funnel Pipeline */}
            <div className="matching-funnel-card">
              <div className="funnel-header">
                <div className="funnel-title">
                  <Filter size={13} className="ws-teal-icon" />
                  <span>{c.funnelTitle}</span>
                </div>
                <span className="funnel-step-badge">
                  {activeStep < 7 ? `${c.funnelStepPrefix} ${activeStep + 1} of 7` : c.funnelReady}
                </span>
              </div>

              {/* Progress Steps Grid */}
              <div className="funnel-steps-list">
                {c.filterSteps.map((step, idx) => {
                  const isDone = activeStep > idx;
                  const isCurrent = activeStep === idx;
                  return (
                    <div
                      key={step.title}
                      className={`funnel-step-row ${isDone ? 'is-done' : ''} ${isCurrent ? 'is-current' : ''}`}
                    >
                      <div className="step-icon-col">
                        {isDone ? (
                          <CheckCircle2 size={12} className="check-done" />
                        ) : (
                          <span className="step-number">{idx + 1}</span>
                        )}
                      </div>
                      <div className="step-text-col">
                        <span className="step-name">{step.title}</span>
                        <span className="step-desc">{step.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Verified Candidate Shortlist Output */}
            <AnimatePresence>
              {activeStep >= 6 && (
                <motion.div
                  className="verified-shortlist-section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="shortlist-header">
                    <span className="shortlist-kicker">{c.shortlistKicker}</span>
                    <span className="verified-count-badge">{c.shortlistCount}</span>
                  </div>

                  <div className="doctor-cards-grid">
                    {/* Doctor 1 */}
                    <div className="ws-doctor-card">
                      <div className="doc-card-head">
                        <div className="doc-meta-primary">
                          <h5 className="doc-name">{c.doc1Name}</h5>
                          <span className="doc-cred">{c.doc1Cred}</span>
                        </div>
                        <span className="verified-stamp">
                          <BadgeCheck size={13} />
                          {c.verifiedStamp}
                        </span>
                      </div>
                      <p className="doc-clinic-line">
                        <Building2 size={12} />
                        <span>{c.doc1Clinic}</span>
                      </p>
                      <div className="doc-rationale-box">
                        <span className="rationale-tag">MATCH REASON</span>
                        <p>{c.doc1Why}</p>
                      </div>
                      <div className="doc-verified-date">
                        <Calendar size={11} />
                        <span>{c.verifiedDate}</span>
                      </div>
                    </div>

                    {/* Doctor 2 */}
                    <div className="ws-doctor-card">
                      <div className="doc-card-head">
                        <div className="doc-meta-primary">
                          <h5 className="doc-name">{c.doc2Name}</h5>
                          <span className="doc-cred">{c.doc2Cred}</span>
                        </div>
                        <span className="verified-stamp">
                          <BadgeCheck size={13} />
                          {c.verifiedStamp}
                        </span>
                      </div>
                      <p className="doc-clinic-line">
                        <Building2 size={12} />
                        <span>{c.doc2Clinic}</span>
                      </p>
                      <div className="doc-rationale-box">
                        <span className="rationale-tag">MATCH REASON</span>
                        <p>{c.doc2Why}</p>
                      </div>
                      <div className="doc-verified-date">
                        <Calendar size={11} />
                        <span>{c.verifiedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Consultant Review & Dispatch Action */}
                  <div className="consultant-confirmation-bar">
                    <div className="confirmation-meta">
                      <CheckCircle2 size={14} className="ws-teal-icon" />
                      <span>{isReviewed ? c.statusReviewed : c.statusReviewing}</span>
                    </div>
                    <span className="consultant-signoff-badge">{c.consultantSignoff}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareConsultantWorkspace;
