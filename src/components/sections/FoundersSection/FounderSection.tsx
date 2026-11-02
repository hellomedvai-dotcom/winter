import React from 'react';
import { useReveal } from '@/lib/motion/useReveal';
import './FoundersSection.css';

const FOUNDER_MESSAGE =
  'People often sense that something is changing in their body, but struggle to understand what it means, what to do next, or how to explain it to a doctor. Symptoms may be ignored, online searches can create more confusion, and important details can be lost during consultations. As patients move from one doctor to another seeking answers, valuable time may pass while their condition worsens. MEDVIDHI aims to help connect these scattered pieces into a clearer health story and guide people toward appropriate care sooner.';

const LINKEDIN_URL = 'https://www.linkedin.com/in/vishwa-s11/';

const DESKTOP_FRAME_PATH =
  'M 20 170 A 150 150 0 0 0 170 20 H 1130 Q 1180 20 1180 70 V 470 A 150 150 0 0 0 1030 620 H 70 Q 20 620 20 570 Z';

const MOBILE_FRAME_PATH =
  'M 24 124 A 100 100 0 0 0 124 24 H 380 Q 406 24 406 50 V 650 A 100 100 0 0 0 306 750 H 50 Q 24 750 24 724 Z';

export const FounderSection: React.FC = () => {
  const { ref, isVisible } = useReveal<HTMLElement>({
    threshold: 0.12,
    rootMargin: '0px 0px -5% 0px',
  });

  return (
    <section
      ref={ref}
      id="founder"
      className={`founder-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Founder's Note from Vishwa S."
    >
      <div className="founder-container">
        <div className="founders-eyebrow-row">
          <span className="founders-section-eyebrow">WHY WE&rsquo;RE BUILDING MEDVIDHI</span>
        </div>
        <h2 className="founders-area-heading">A Note from Our Founders</h2>
        <p className="founders-editorial-sub">&ldquo;Built around the details that too often get lost between visits.&rdquo;</p>

        <article className="founder-note" aria-label="Founder's Note">
          <svg
            className="founder-note-frame founder-frame-desktop"
            viewBox="0 0 1200 640"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              className="founder-frame-stroke"
              d={DESKTOP_FRAME_PATH}
              pathLength={1}
            />
          </svg>

          <svg
            className="founder-note-frame founder-frame-mobile"
            viewBox="0 0 430 820"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              className="founder-frame-stroke"
              d={MOBILE_FRAME_PATH}
              pathLength={1}
            />
          </svg>

          <span className="founder-note-mark founder-mark-open" aria-hidden="true">
            &ldquo;
          </span>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="founder-note-linkedin"
            aria-label="Visit Vishwa S.'s LinkedIn profile"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
              />
            </svg>
          </a>

          <div className="founder-note-identity">
            <p className="founder-note-name">Vishwa S.</p>
            <p className="founder-note-role">Founder, MEDVIDHI</p>
          </div>

          <p className="founder-note-message">{FOUNDER_MESSAGE}</p>

          <div className="founder-note-signature-row">
            <img
              className="founder-note-signature"
              src="/assets/founders/founder-signature.png"
              alt="Vishwa S.'s signature"
              draggable="false"
            />
          </div>

          <span className="founder-note-mark founder-mark-close" aria-hidden="true">
            &rdquo;
          </span>
        </article>
      </div>
    </section>
  );
};

export default FounderSection;
