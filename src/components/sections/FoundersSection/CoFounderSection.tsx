import React, { useEffect, useRef, useState } from 'react';
import './FoundersSection.css';

const COFOUNDER_PARAGRAPHS = [
  'I believe that Medvidhi will help every individual access the right treatment and gain a better understanding of their own health. We have built this platform for people who often struggle to access expert medical advice and guidance.',
  'Our vision is to ensure that every individual has access to the right medical guidance and quality healthcare, regardless of their circumstances. Through Medvidhi, we aim to empower people to understand their health better, make informed healthcare decisions, and connect with the right doctors when they need them.',
  'Our mission is simple: to make quality healthcare and expert medical guidance more accessible to everyone.',
];

const LINKEDIN_URL = 'https://www.linkedin.com/in/shivkumar-gorge-5262a61b7/';

export const CoFounderSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="co-founder"
      className={`co-founder-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Co-Founder statement from Shivkumar G."
    >
      <div className="co-founder-container">
        <article className="co-founder-composition">
          <h2 className="cofounder-heading">Co-Founder&rsquo;s Words</h2>

          {/* Reference composition: quotation artwork left, statement
              centre, portrait with identity right */}
          <div className="cofounder-grid">
            <div className="cofounder-quote-wrap">
              <img
                className="cofounder-quote"
                src="/assets/founders/cofounder-quote.png"
                alt=""
                aria-hidden="true"
                draggable="false"
              />
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cofounder-linkedin-hit"
                aria-label="Shivkumar G. on LinkedIn"
              />
            </div>

            <div className="cofounder-body">
              {COFOUNDER_PARAGRAPHS.map((paragraph, index) => (
                <p
                  key={index}
                  className="cofounder-text"
                  style={{ '--si': index } as React.CSSProperties}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <figure className="cofounder-portrait-wrap">
              <img
                className="cofounder-portrait"
                src="/assets/founders/cofounder-portrait.png"
                alt="Portrait of Shivkumar G., Co-founder of MEDVIDHI"
                draggable="false"
              />
              <figcaption className="cofounder-caption">
                <span className="cofounder-name">Shivkumar G.</span>
                <span className="cofounder-role">Co-founder, MEDVIDHI</span>
              </figcaption>
            </figure>
          </div>
        </article>
      </div>
    </section>
  );
};

export default CoFounderSection;
