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
        <div className="final-tagline-container" data-reveal>
          <div className="final-tagline-pill" data-reveal="fade" style={{ '--si': 0 } as React.CSSProperties}>
            <span className="tagline-dot" />
            <span className="tagline-text">BE PART OF WHAT COMES NEXT</span>
          </div>
        </div>

        {/* Narrative Headline */}
        <div className="final-cta-header" data-reveal style={{ '--si': 1 } as React.CSSProperties}>
          <h2 id="final-cta-heading" className="final-cta-title" data-reveal style={{ '--si': 0 } as React.CSSProperties}>
            Your health story is{' '}
            <span className="final-serif-highlight">bigger than a single visit.</span>
          </h2>
          <p className="final-cta-supporting" data-reveal style={{ '--si': 1 } as React.CSSProperties}>
            {SITE_CONTENT.finalCta.supportingCopy}
          </p>
        </div>

        {/* ================================================================== */}
        {/* HIERARCHICAL ENTRY PATH 1: WIDE HORIZONTAL WHITE-GLASS CAPSULE     */}
        {/* Clear Primary Entry: Join the MEDVIDHI Waitlist                    */}
        {/* ================================================================== */}
        <div className="waitlist-horizontal-capsule" data-reveal style={{ '--si': 2 } as React.CSSProperties}>
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
              data-nudge-arrow
            >
              <span>Join the Waitlist</span>
              <ArrowRight size={16} aria-hidden="true" className="cta-arrow-icon arrow-nudge" />
            </button>
            <span className="capsule-caption">Product updates and early-access announcements. No unnecessary noise.</span>
          </div>
        </div>

        {/* ================================================================== */}
        {/* HIERARCHICAL ENTRY PATHS 2, 3, 4: THREE EDITORIAL OPPORTUNITY CARDS */}
        {/* Deep charcoal cards, top-right pill, metadata row & mint CTA      */}
        {/* ================================================================== */}
        <div className="secondary-entries-grid">
          {/* Card 1: Verified Doctor */}
          <div
            className="dark-opportunity-card"
            data-reveal="fade"
            style={{ '--si': 1 } as React.CSSProperties}
            onClick={() => onOpenModal('verified_doctor')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenModal('verified_doctor');
              }
            }}
            aria-label="Join as a MEDVIDHI Verified Doctor"
            data-cursor="explore"
          >
            {/* Top row: Upper-left icon squircle & Upper-right category badge */}
            <div className="opportunity-top-row">
              <div className="opportunity-icon-squircle" aria-hidden="true">
                <ShieldCheck size={20} />
              </div>
              <div className="opportunity-category-pill">
                <span className="category-accent-dot" />
                <span className="category-pill-label">CLINICAL REVIEW</span>
              </div>
            </div>

            {/* Strong, readable title */}
            <h3 className="opportunity-card-title">Join as a MEDVIDHI Verified Doctor</h3>

            {/* Compact metadata row separated by subtle vertical dividers */}
            <div className="opportunity-metadata-row">
              <div className="meta-col">
                <span className="meta-label">Domain</span>
                <span className="meta-val">Clinical Review</span>
              </div>
              <div className="meta-divider" aria-hidden="true" />
              <div className="meta-col">
                <span className="meta-label">Focus</span>
                <span className="meta-val">Patient Context</span>
              </div>
            </div>

            {/* Concise description with comfortable line-height */}
            <p className="opportunity-description">
              Help review clinical context, patient summaries and structured pre-consultation workflows.
            </p>

            {/* Thin separator above bottom action row */}
            <div className="opportunity-divider" />

            {/* Bottom action row with restrained mint accent CTA */}
            <div className="opportunity-bottom-row">
              <div className="opportunity-cohort-tag">
                <span className="cohort-label">Clinical Network</span>
              </div>
              <button
                type="button"
                className="opportunity-mint-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal('verified_doctor');
                }}
                aria-label="Express Clinical Interest"
              >
                <span>Express Clinical Interest</span>
                <ArrowRight size={14} aria-hidden="true" className="mint-btn-arrow" />
              </button>
            </div>
          </div>

          {/* Card 2: General Doctor */}
          <div
            className="dark-opportunity-card"
            data-reveal="fade"
            style={{ '--si': 2 } as React.CSSProperties}
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
            data-cursor="explore"
          >
            {/* Top row: Upper-left icon squircle & Upper-right category badge */}
            <div className="opportunity-top-row">
              <div className="opportunity-icon-squircle" aria-hidden="true">
                <Stethoscope size={20} />
              </div>
              <div className="opportunity-category-pill">
                <span className="category-accent-dot" />
                <span className="category-pill-label">DOCTOR COMMUNITY</span>
              </div>
            </div>

            {/* Strong, readable title */}
            <h3 className="opportunity-card-title">Join as a Doctor</h3>

            {/* Compact metadata row separated by subtle vertical dividers */}
            <div className="opportunity-metadata-row">
              <div className="meta-col">
                <span className="meta-label">Domain</span>
                <span className="meta-val">Clinical Perspective</span>
              </div>
              <div className="meta-divider" aria-hidden="true" />
              <div className="meta-col">
                <span className="meta-label">Focus</span>
                <span className="meta-val">Care Navigation</span>
              </div>
            </div>

            {/* Concise description with comfortable line-height */}
            <p className="opportunity-description">
              Help shape practical healthcare tools around better-organised patient history and more informed consultations.
            </p>

            {/* Thin separator above bottom action row */}
            <div className="opportunity-divider" />

            {/* Bottom action row with restrained mint accent CTA */}
            <div className="opportunity-bottom-row">
              <div className="opportunity-cohort-tag">
                <span className="cohort-label">Care Advisory</span>
              </div>
              <button
                type="button"
                className="opportunity-mint-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal('doctor');
                }}
                aria-label="Join as Doctor"
              >
                <span>Join as Doctor</span>
                <ArrowRight size={14} aria-hidden="true" className="mint-btn-arrow" />
              </button>
            </div>
          </div>

          {/* Card 3: Core Team */}
          <div
            className="dark-opportunity-card"
            data-reveal="fade"
            style={{ '--si': 3 } as React.CSSProperties}
            onClick={() => onOpenModal('team')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenModal('team');
              }
            }}
            aria-label="Join the MEDVIDHI Core Team"
            data-cursor="explore"
          >
            {/* Top row: Upper-left icon squircle & Upper-right category badge */}
            <div className="opportunity-top-row">
              <div className="opportunity-icon-squircle" aria-hidden="true">
                <Users size={20} />
              </div>
              <div className="opportunity-category-pill">
                <span className="category-accent-dot" />
                <span className="category-pill-label">ENGINEERING &amp; DESIGN</span>
              </div>
            </div>

            {/* Strong, readable title */}
            <h3 className="opportunity-card-title">Join the MEDVIDHI Core Team</h3>

            {/* Compact metadata row separated by subtle vertical dividers */}
            <div className="opportunity-metadata-row">
              <div className="meta-col">
                <span className="meta-label">Roles</span>
                <span className="meta-val">Engineering &middot; AI/ML</span>
              </div>
              <div className="meta-divider" aria-hidden="true" />
              <div className="meta-col">
                <span className="meta-label">Discipline</span>
                <span className="meta-val">Product Design</span>
              </div>
            </div>

            {/* Concise description with comfortable line-height */}
            <p className="opportunity-description">
              Help build MEDVIDHI across engineering, AI/ML, product design and clinical advisory.
            </p>

            {/* Thin separator above bottom action row */}
            <div className="opportunity-divider" />

            {/* Bottom action row with restrained mint accent CTA */}
            <div className="opportunity-bottom-row">
              <div className="opportunity-cohort-tag">
                <span className="cohort-label">Active Cohort</span>
              </div>
              <button
                type="button"
                className="opportunity-mint-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal('team');
                }}
                aria-label="Explore Team Opportunities"
              >
                <span>Explore Team Opportunities</span>
                <ArrowRight size={14} aria-hidden="true" className="mint-btn-arrow" />
              </button>
            </div>
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
