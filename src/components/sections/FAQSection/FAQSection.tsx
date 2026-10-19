import React, { useState } from 'react';
import { Container } from '@/components/layout/Container/Container';
import { Badge } from '@/components/common/Badge/Badge';
import { HelpCircle, ChevronRight } from 'lucide-react';
import { MedvidhiLogo } from '@/components/brand/MedvidhiLogo';
import './FAQSection.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-what-is',
    category: 'Platform Foundation',
    question: 'What is MEDVIDHI?',
    answer:
      'MEDVIDHI is an intelligent health context platform being built to connect a person’s symptoms, medical reports, medications, and clinical history over time. Rather than starting from zero at every medical visit, MEDVIDHI organizes your continuous health context and synthesizes it into clear, pre-consultation briefings for healthcare professionals.',
  },
  {
    id: 'faq-replace-doctor',
    category: 'Clinical Primacy',
    question: 'Does MEDVIDHI replace a doctor?',
    answer:
      'No. MEDVIDHI is designed to support the consultation, never to replace qualified healthcare professionals. It does not provide autonomous clinical diagnoses, prescribe medications, or replace physical examinations. Qualified medical professionals remain solely responsible for all diagnostic and therapeutic decisions.',
  },
  {
    id: 'faq-health-memory',
    category: 'Context Architecture',
    question: 'How does Health Memory work?',
    answer:
      'Health Memory is our planned longitudinal context engine. It connects multi-modal inputs—spoken notes, conversational intake, anatomical Body Map coordinates, and uploaded lab excerpts—into an indexed, chronological patient timeline. This preserves vital context (such as past medication trials or changing symptoms) across consultations.',
  },
  {
    id: 'faq-doctor-brief',
    category: 'Clinical Workflow',
    question: 'What is the 30-Second Doctor Brief?',
    answer:
      'The 30-Second Doctor Brief is a high-yield clinical orientation document synthesized from the patient’s Health Memory. It distills scattered reports, chief concerns, symptom timelines, and current medicines into structured clinical sections, enabling clinicians to grasp essential background within 30 seconds and dedicate the visit to clinical care.',
  },
  {
    id: 'faq-reach-care',
    category: 'Care Navigation',
    question: 'How does MEDVIDHI help patients reach relevant care?',
    answer:
      'Patients often struggle to know which healthcare discipline is relevant to their specific concern. MEDVIDHI aligns verified presentation characteristics and anatomical landmarks with appropriate clinical care pathways—such as conservative rehabilitation versus specialist surgical evaluation—helping patients carry structured context to the right specialist without directory guessing.',
  },
  {
    id: 'faq-doctor-network',
    category: 'Operational Staging',
    question: 'Is a verified doctor network currently available?',
    answer:
      'Not currently. MEDVIDHI is currently in development and staging. Clinician registration and credential verification are core components of our planned physician onboarding pipeline, but an active, on-demand live doctor network is not operational today.',
  },
  {
    id: 'faq-data-handling',
    category: 'Data Governance',
    question: 'How is health information handled?',
    answer:
      'Our core architecture is designed around patient-governed data authority. Patients decide what information is assembled, what records are attached, and which fields are shared with doctors. Every consultation handover is intended to operate under explicit, patient-directed consent without commercial monetization of private records.',
  },
];

export const FAQSection: React.FC = () => {
  const [selectedFaqId, setSelectedFaqId] = useState<string>(FAQ_ITEMS[0].id);

  const activeFaq =
    FAQ_ITEMS.find((item) => item.id === selectedFaqId) || FAQ_ITEMS[0];

  return (
    <section id="faq" className="medvidhi-faq-section" aria-label="Frequently Asked Questions">
      <Container size="default" className="faq-container">
        {/* Section Header */}
        <div className="faq-header">
          <Badge variant="neutral" size="md" icon={<HelpCircle size={13} />}>
            Inquiries &amp; Architecture
          </Badge>

          <h2 className="faq-headline">
            <span className="editorial-serif">Good questions.</span>
          </h2>

          <p className="faq-lead">
            Clear answers about our technology, clinical boundaries, and the future of connected care.
          </p>
        </div>

        {/* Softly Rounded Outer Composition containing Two Connected Panels */}
        <div className="faq-outer-composition">
          {/* Left Panel: Black Question-List Surface with White Text */}
          <div className="faq-left-black-panel" role="tablist" aria-label="FAQ Question Directory">
            <div className="black-panel-header">
              <span className="black-panel-title">Inquiries</span>
              <span className="black-panel-count">07 Topics</span>
            </div>

            <div className="black-questions-list">
              {FAQ_ITEMS.map((item, idx) => {
                const isSelected = item.id === selectedFaqId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`faq-tab-${item.id}`}
                    aria-controls={`faq-panel-${item.id}`}
                    aria-selected={isSelected}
                    className={`faq-pill-btn ${isSelected ? 'is-active-pill' : 'is-inactive-question'}`}
                    onClick={() => setSelectedFaqId(item.id)}
                  >
                    <span className="pill-index">0{idx + 1}</span>
                    <span className="pill-question-text">{item.question}</span>
                    <ChevronRight size={15} className="pill-arrow" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: White / Frosted-White Answer Surface with Black Text */}
          <div
            className="faq-right-white-panel"
            role="tabpanel"
            id={`faq-panel-${activeFaq.id}`}
            aria-labelledby={`faq-tab-${activeFaq.id}`}
          >
            <div className="answer-panel-content">
              {/* Top Answer Bar with Genuine Supplied Brand Mark */}
              <div className="answer-top-bar">
                <div className="answer-category-badge">
                  <span className="category-indicator-dot" />
                  <span>{activeFaq.category}</span>
                </div>

                <div className="answer-brand-mark-wrap">
                  <MedvidhiLogo height={20} theme="light" />
                </div>
              </div>

              {/* Question Heading */}
              <h3 className="answer-main-headline">{activeFaq.question}</h3>

              <div className="answer-hairline-separator" aria-hidden="true" />

              {/* Explanatory Body */}
              <p className="answer-narrative">{activeFaq.answer}</p>

              {/* Footer Distinction Notice */}
              <div className="answer-honest-footnote">
                <span className="footnote-symbol">&bull;</span>
                <span className="footnote-copy">
                  Distinguishes intended product capabilities from features currently in developmental staging.
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
