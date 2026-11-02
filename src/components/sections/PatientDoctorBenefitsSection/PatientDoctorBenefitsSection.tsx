import React from 'react';
import { Container } from '@/components/layout/Container/Container';
import { Badge } from '@/components/common/Badge/Badge';
import {
  Stethoscope,
  Shield,
  Sparkles,
} from 'lucide-react';
import { IllustrativePatientJourney } from './IllustrativePatientJourney';
import './PatientDoctorBenefitsSection.css';

export const PatientDoctorBenefitsSection: React.FC = () => {
  return (
    <section
      id="patient-doctor-benefits"
      className="medvidhi-benefits"
      aria-label="Patient and Doctor Benefits"
    >
      <Container size="default" className="benefits-container">
        {/* ================================================================ */}
        {/* Section Header (Preserved)                                       */}
        {/* ================================================================ */}
        <header className="benefits-header">
          <span className="benefits-eyebrow-reveal" data-reveal="fade">
            <Badge variant="neutral" size="md" className="benefits-eyebrow-badge">
              TWO PERSPECTIVES &middot; ONE CONNECTED STORY
            </Badge>
            <span className="benefits-editorial-quote">&ldquo;Better context can make every conversation more meaningful.&rdquo;</span>
          </span>

          <h2 className="benefits-headline" data-reveal style={{ '--si': 1 } as React.CSSProperties}>
            Understand the story.{' '}
            <span className="editorial-serif benefits-serif-accent">
              Find a clearer path to care.
            </span>
          </h2>

          <p className="benefits-lead-text" data-reveal style={{ '--si': 2 } as React.CSSProperties}>
            MEDVIDHI connects a patient's ongoing health context with care navigation,
            helping people explain what they have experienced and helping doctors begin with a clearer picture.
          </p>
        </header>

        {/* ================================================================ */}
        {/* Two Balanced Introductory Rectangles (Approved Content Preserved) */}
        {/* ================================================================ */}
        <div
          className="benefits-intros-grid"
          role="region"
          aria-label="Patient and Doctor perspectives introduction"
        >
          {/* LEFT: PATIENT INTRODUCTION RECTANGLE */}
          <article
            className="benefit-intro-card patient-intro-card"
            data-cursor="explore"
            tabIndex={0}
            aria-label="Patient Introduction: Health Memory + Care Navigation"
          >
            <div className="intro-card-eyebrow-row" data-reveal style={{ '--si': 0 } as React.CSSProperties}>
              <span className="role-eyebrow patient-eyebrow">
                YOUR EXPERIENCE SHOULD NOT GET LOST BETWEEN CONSULTATIONS
              </span>
            </div>

            <h3 className="intro-card-heading" data-reveal style={{ '--si': 1 } as React.CSSProperties}>
              Bring the details together before you explain them again.
            </h3>

            <p className="intro-card-body-text" data-reveal style={{ '--si': 2 } as React.CSSProperties}>
              When symptoms continue for days or weeks, or previous treatments and consultations have not brought
              the relief you hoped for, it can be difficult to explain the full story again. MEDVIDHI helps bring
              together what you have experienced, what you have tried and what happened over time. Relevant follow-up
              questions help build a clearer picture and guide you toward a doctor or specialist suited to your concern.
            </p>

            <footer className="intro-card-footer patient-card-footer" data-reveal style={{ '--si': 3 } as React.CSSProperties}>
              <Sparkles size={14} className="intro-footer-icon" aria-hidden="true" />
              <span>Your experience matters. Your health story should be easier to explain.</span>
            </footer>
          </article>

          {/* RIGHT: DOCTOR INTRODUCTION RECTANGLE */}
          <article
            className="benefit-intro-card doctor-intro-card"
            data-cursor="explore"
            tabIndex={0}
            aria-label="Doctor Introduction: Pre-Consultation Context"
          >
            <div className="intro-card-eyebrow-row" data-reveal style={{ '--si': 0 } as React.CSSProperties}>
              <span className="role-eyebrow doctor-eyebrow">
                <Stethoscope size={13} aria-hidden="true" />
                A CLEARER STARTING POINT FOR THE CONVERSATION
              </span>
            </div>

            <h3 className="intro-card-heading" data-reveal style={{ '--si': 1 } as React.CSSProperties}>
              Understand the patient&rsquo;s story beyond a single moment.
            </h3>

            <p className="intro-card-body-text" data-reveal style={{ '--si': 3 } as React.CSSProperties}>
              MEDVIDHI brings together the patient's reported symptoms, timeline, previous consultations,
              treatments, medicines and available reports into an organised pre-consultation Doctor Brief.
              Relevant follow-up questions can help clarify missing context. The brief presents the patient's
              account in plain language alongside a clinically structured summary for the doctor to review.
            </p>

            <footer className="intro-card-footer doctor-card-footer" data-reveal style={{ '--si': 4 } as React.CSSProperties}>
              <Shield size={14} className="intro-footer-icon" aria-hidden="true" />
              <span>Built to support clinical judgement, never replace it.</span>
            </footer>
          </article>
        </div>

        {/* ================================================================ */}
        {/* Illustrative Patient Journey (4-Stage Interactive Product Story)  */}
        {/* ================================================================ */}
        <IllustrativePatientJourney />

        {/* ================================================================ */}
        {/* Bottom Safety & Boundaries Note                                  */}
        {/* ================================================================ */}
        <div className="benefits-boundary-note" role="note" data-reveal style={{ '--si': 4 } as React.CSSProperties}>
          <Shield size={14} className="boundary-icon" aria-hidden="true" />
          <p className="boundary-text">
            MEDVIDHI organizes health information to facilitate clinical communication. It does not replace
            independent clinical judgment, perform autonomous diagnosis, guarantee doctor matching, or promise clinical outcomes.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default PatientDoctorBenefitsSection;
