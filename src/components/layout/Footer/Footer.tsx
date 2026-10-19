import React from 'react';
import { Container } from '../Container/Container';
import { MedvidhiLogo } from '@/components/brand/MedvidhiLogo';
import { SITE_CONTENT } from '@/config/siteContent';
import './Footer.css';

export interface FooterProps {
  onOpenJoin?: (mode?: 'waitlist' | 'verified_doctor' | 'doctor' | 'team') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenJoin }) => {
  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="medvidhi-monochrome-footer">
      <Container size="default">
        <div className="footer-top-grid">
          {/* Brand & Mission column */}
          <div className="footer-brand-col">
            <div className="footer-logo-wrap">
              <MedvidhiLogo height={28} />
            </div>
            <p className="footer-description">
              {SITE_CONTENT.footer.description}
            </p>
            <div className="footer-contact-block">
              <span className="contact-label">Direct Communication:</span>
              <a
                href={`mailto:${SITE_CONTENT.footer.contactEmail}`}
                className="contact-email-link"
              >
                {SITE_CONTENT.footer.contactEmail}
              </a>
            </div>
          </div>

          {/* Navigation & Exploration Links */}
          <div className="footer-nav-col">
            <h4 className="footer-column-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <a
                  href="#features"
                  className="footer-nav-link"
                  onClick={(e) => handleLinkClick(e, '#features')}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="footer-nav-link"
                  onClick={(e) => handleLinkClick(e, '#how-it-works')}
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="footer-nav-link"
                  onClick={(e) => handleLinkClick(e, '#faq')}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#join"
                  className="footer-nav-link"
                  onClick={(e) => handleLinkClick(e, '#join')}
                >
                  Early Access
                </a>
              </li>
            </ul>
          </div>

          {/* Joining & Opportunities */}
          <div className="footer-nav-col">
            <h4 className="footer-column-heading">Engage &amp; Build</h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  className="footer-action-link"
                  onClick={() => onOpenJoin?.('waitlist')}
                >
                  Early Access Waitlist
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-action-link"
                  onClick={() => onOpenJoin?.('verified_doctor')}
                >
                  Join as Verified Doctor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-action-link"
                  onClick={() => onOpenJoin?.('doctor')}
                >
                  Join as Doctor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-action-link"
                  onClick={() => onOpenJoin?.('team')}
                >
                  Join Our Team
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copy-text">{SITE_CONTENT.footer.copyright}</p>
          <p className="footer-clinical-reminder">
            Intended platform preview. Healthcare professionals remain responsible for clinical evaluation, diagnosis, and treatment.
          </p>
        </div>
      </Container>
    </footer>
  );
};
