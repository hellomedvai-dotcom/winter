import React, { useRef, useState } from 'react';
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
      'The 30-Second Doctor Brief is a high-yield clinical orientation document synthesized from the patient\'s Health Memory. It distills scattered reports, chief concerns, symptom timelines, and current medicines into structured clinical sections, enabling clinicians to grasp essential background within 30 seconds and dedicate the visit to clinical care.',
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

  const pillRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const answerPanelRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = Math.max(
    0,
    FAQ_ITEMS.findIndex((item) => item.id === selectedFaqId),
  );
  const activeFaq = FAQ_ITEMS[activeIndex];

  // Roving-tabindex arrow navigation: Up/Left -> previous, Down/Right -> next,
  // Home/End -> first/last. Selection follows focus (tabs with instant activation).
  const handleListKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const count = FAQ_ITEMS.length;
    let nextIndex: number | null = null;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        nextIndex = (activeIndex + 1) % count;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        nextIndex = (activeIndex - 1 + count) % count;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = count - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setSelectedFaqId(FAQ_ITEMS[nextIndex].id);

    const pill = pillRefs.current[nextIndex];
    if (pill) {
      pill.focus();
      // block:'nearest' keeps the auto-scroll minimal so it never fights the user.
      pill.scrollIntoView({ block: 'nearest' });
    }
  };

  // Mobile: when a pill is tapped the answer panel may sit below the fold;
  // nudge it (block:'nearest' = minimal movement) so the switch animation is seen.
  const handlePillClick = (id: string) => {
    setSelectedFaqId(id);
    const isMobileLayout = window.matchMedia('(max-width: 899px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobileLayout && answerPanelRef.current) {
      answerPanelRef.current.scrollIntoView({
        block: 'nearest',
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <section id="faq" className="medvidhi-faq-section" aria-label="Frequently Asked Questions">
      <Container size="default" className="faq-container">
        {/* Section Header */}
        <div className="faq-header" data-reveal>
          <div data-reveal="fade" style={{ '--si': 0 } as React.CSSProperties}>
            <Badge variant="neutral" size="md" icon={<HelpCircle size={13} />}>
              Inquiries &amp; Architecture
            </Badge>
          </div>

          <h2 className="faq-headline" data-reveal style={{ '--si': 1 } as React.CSSProperties}>
            <span className="editorial-serif">Good questions deserve clear answers.</span>
          </h2>

          <p className="faq-lead" data-reveal style={{ '--si': 2 } as React.CSSProperties}>
            Clear perspectives on our technology, clinical boundaries, and the future of connected care.
          </p>
        </div>

        {/* Softly Rounded Outer Composition containing Two Connected Panels */}
        <div className="faq-outer-composition" data-reveal style={{ '--si': 3 } as React.CSSProperties}>
          {/* Left Panel: Black Question-List Surface with White Text */}
          <div className="faq-left-black-panel" role="tablist" aria-label="FAQ Question Directory" aria-orientation="vertical">
            <div className="black-panel-header">
              <span className="black-panel-title">Inquiries</span>
              <span className="black-panel-count">05 Topics</span>
            </div>

            <div className="black-questions-list" onKeyDown={handleListKeyDown}>
              {FAQ_ITEMS.map((item, idx) => {
                const isSelected = item.id === selectedFaqId;
                return (
                  <div
                    key={`${item.id}-reveal`}
                    className="faq-pill-reveal-wrap"
                    data-reveal
                    style={{ '--si': idx } as React.CSSProperties}
                  >
                    <button
                      type="button"
                      role="tab"
                      id={`faq-tab-${item.id}`}
                      aria-controls={`faq-panel-${item.id}`}
                      aria-selected={isSelected}
                      tabIndex={isSelected ? 0 : -1}
                      ref={(el) => {
                        pillRefs.current[idx] = el;
                      }}
                      className={`faq-pill-btn ${isSelected ? 'is-active-pill' : 'is-inactive-question'}`}
                      onClick={() => handlePillClick(item.id)}
                    >
                      <span className="pill-index">0{idx + 1}</span>
                      <span className="pill-question-text">{item.question}</span>
                      <ChevronRight size={15} className="pill-arrow" aria-hidden="true" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: White / Frosted-White Answer Surface with Black Text */}
          <div
            className="faq-right-white-panel"
            ref={answerPanelRef}
            role="tabpanel"
            id={`faq-panel-${activeFaq.id}`}
            aria-labelledby={`faq-tab-${activeFaq.id}`}
          >
            {/* Keyed on the selected question: remounts so the CSS enter animation replays. */}
            <div className="answer-panel-content" key={activeFaq.id}>
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
