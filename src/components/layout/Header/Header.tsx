import React from 'react';
import { Container } from '../Container/Container';
import { MedvidhiLogo } from '@/components/brand/MedvidhiLogo';
import { Button } from '@/components/common/Button/Button';
import { SITE_CONTENT } from '@/config/siteContent';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="medvidhi-header">
      <Container size="default" className="header-inner">
        <a href="/" className="header-brand-link" aria-label="MEDVIDHI Home">
          <MedvidhiLogo height={32} priority />
        </a>

        <nav className="header-nav" aria-label="Primary Navigation">
          <ul className="header-nav-list">
            {SITE_CONTENT.navigation.map((item) => (
              <li key={item.href} className="header-nav-item">
                <a href={item.href} className="header-nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <Button
            variant="primary"
            size="sm"
            asAnchor
            href="#updates"
          >
            Stay Informed
          </Button>
        </div>
      </Container>
    </header>
  );
};
