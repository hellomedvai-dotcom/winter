import React from 'react';
import { Container } from '@/components/layout/Container/Container';
import { SITE_CONTENT } from '@/config/siteContent';
import { ArrowRight, ShieldCheck, Stethoscope, Users } from 'lucide-react';
import './FinalCtaSection.css';

export interface FinalCtaSectionProps {
  onOpenModal: (mode: 'waitlist' | 'verified_doctor' | 'doctor' | 'team') => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="join" className="final-cta-section" aria-labelledby="final-cta-heading">
      <Container size="default" className="final-cta-container">
        {/* Central Editable Brand Tagline Badge */}
        <div className="final-tagline-container">
          <div className="final-tagline-pill">
            <span className="tagline-dot" />
            <span className="tagline-text">{SITE_CONTENT.brandTagline}</span>
          </div>
        </div>

        {/* Narrative Headline */}
        <div className="final-cta-header">
          <h2 id="final-cta-heading" className="final-cta-title">
            Your health story is{' '}
            <span className="final-serif-highlight">bigger than a single visit.</span>
          </h2>
          <p className="final-cta-supporting">
            {SITE_CONTENT.finalCta.supportingCopy}
          </p>
        </div>

        {/* ================================================================== */}
        {/* HIERARCHICAL ENTRY PATH 1: WIDE HORIZONTAL WHITE-GLASS CAPSULE     */}
        {/* Clear Primary Entry: Join the MEDVIDHI Waitlist                    */}
        {/* ================================================================== */}
        <div className="waitlist-horizontal-capsule">
          <div className="capsule-left-content">
            <div className="capsule-badge-row">
              <span className="capsule-primary-tag">EARLY ACCESS</span>
              <span className="capsule-signal">EARLY ACCESS INTEREST</span>
            </div>
            <h3 className="capsule-heading">Join the MEDVIDHI Waitlist</h3>
            <p className="capsule-description">
              Get updates as MEDVIDHI develops its early-access experience for more context-connected healthcare.
            </p>
          </div>

          <div className="capsule-action-col">
            <button
              type="button"
              className="capsule-cta-button"
              onClick={() => onOpenModal('waitlist')}
              aria-label="Join the MEDVIDHI Waitlist"
            >
              <span>Join the Waitlist</span>
              <ArrowRight size={16} aria-hidden="true" className="cta-arrow-icon" />
            </button>
            <span className="capsule-caption">Product updates and early-access announcements. No unnecessary noise.</span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* HIERARCHICAL ENTRY PATHS 2, 3, 4: THREE DISTINCT VERTICAL BLACK CARDS */}
        {/* Softly curved black cards with white typography & subtle glass edge */}
        {/* ================================================================== */}
        <div className="secondary-entries-grid">
          {/* Card 1: MEDVIDHI Verified Doctor */}
          <div
            className="dark-entry-card"
            onClick={() => onOpenModal('verified_doctor')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenModal('verified_doctor');
              }
            }}
            aria-label="Join as MEDVIDHI Verified Doctor"
          >
            <div className="card-top-row">
              <span className="card-icon-wrap" aria-hidden="true">
                <ShieldCheck size={18} />
              </span>
              <span className="card-index-tag">CLINICAL REVIEW</span>
            </div>
            <h3 className="card-title">Join as MEDVIDHI Verified Doctor</h3>
            <p className="card-body">
              Help review clinical context, patient summaries and structured pre-consultation workflows.
            </p>
            <button
              type="button"
              className="card-action-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal('verified_doctor');
              }}
              aria-label="Express Clinical Interest"
            >
              <span>Express Clinical Interest</span>
              <ArrowRight size={14} aria-hidden="true" className="card-arrow-icon" />
            </button>
          </div>

          {/* Card 2: General Doctor */}
          <div
            className="dark-entry-card"
            onClick={() => onOpenModal('doctor')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenModal('doctor');
              }
            }}
            aria-label="Join as Doctor"
          >
            <div className="card-top-row">
              <span className="card-icon-wrap" aria-hidden="true">
                <Stethoscope size={18} />
              </span>
              <span className="card-index-tag">DOCTOR COMMUNITY</span>
            </div>
            <h3 className="card-title">Join as Doctor</h3>
            <p className="card-body">
              Help shape practical clinical tools around better-organised patient context and prepared consultations.
            </p>
            <button
              type="button"
              className="card-action-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal('doctor');
              }}
              aria-label="Join as Doctor"
            >
              <span>Join as Doctor</span>
              <ArrowRight size={14} aria-hidden="true" className="card-arrow-icon" />
            </button>
          </div>

          {/* Card 3: Core Team Member */}
          <div
            className="dark-entry-card"
            onClick={() => onOpenModal('team')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenModal('team');
              }
            }}
            aria-label="Join Our Core Team"
          >
            <div className="card-top-row">
              <span className="card-icon-wrap" aria-hidden="true">
                <Users size={18} />
              </span>
              <span className="card-index-tag">ENGINEERING &amp; DESIGN</span>
            </div>
            <h3 className="card-title">Join Our Core Team</h3>
            <p className="card-body">
              Help build MEDVIDHI across engineering, AI/ML, product design and clinical advisory.
            </p>
            <button
              type="button"
              className="card-action-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal('team');
              }}
              aria-label="Explore Team Opportunities"
            >
              <span>Explore Team Opportunities</span>
              <ArrowRight size={14} aria-hidden="true" className="card-arrow-icon" />
            </button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* CONCISE MEDICAL & CLINICAL SAFETY STATEMENT                        */}
        {/* ================================================================== */}
        <div className="final-safety-disclaimer-strip">
          <p className="safety-disclaimer-text">
            <strong>Clinical Responsibility Notice:</strong> MEDVIDHI is designed to organize health context and assist pre-consultation preparation. It does not replace a qualified medical professional, clinic, or emergency medical service, and should not be presented as an autonomous diagnostician or prescriber. Qualified healthcare professionals remain exclusively responsible for patient clinical assessment, diagnosis, and all treatment decisions.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default FinalCtaSection;
