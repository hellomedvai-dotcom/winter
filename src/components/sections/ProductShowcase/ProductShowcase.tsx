import React, { useState, useEffect } from 'react';
import { Container } from '@/components/layout/Container/Container';
import { FeatureIconSelector } from './FeatureIconSelector';
import { ActiveFeatureFloatingPanel } from './ActiveFeatureFloatingPanel';
import { RightDoctorSection } from './RightDoctorSection';
import './ProductShowcase.css';

export const ProductShowcase: React.FC = () => {
  const [activeFeatureId, setActiveFeatureId] = useState<string>('feature-body-map');

  // Deep-linking hash synchronizer to preserve all stable feature section IDs
  useEffect(() => {
    const syncHashToFeature = () => {
      const hash = window.location.hash.replace('#', '');
      const validFeatureIds = [
        'feature-body-map',
        'feature-voice',
        'feature-chat',
        'feature-doctor-brief',
        'feature-health-memory',
        'feature-report-explainer',
        'feature-right-doctor',
      ];
      if (validFeatureIds.includes(hash)) {
        setActiveFeatureId(hash);
      }
    };

    syncHashToFeature();
    window.addEventListener('hashchange', syncHashToFeature);
    return () => window.removeEventListener('hashchange', syncHashToFeature);
  }, []);

  const handleSelectFeature = (targetId: string) => {
    setActiveFeatureId(targetId);
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `#${targetId}`);
    }
  };

  return (
    <div className="medvidhi-showcase-suite" aria-label="MEDVIDHI Product Feature Showcase">
      {/* 0. Showcase Hub: Master Header, In-Page Horizontal Selector & Single Active Floating Preview (#features) */}
      <section id="features" className="showcase-hub-section" aria-label="MEDVIDHI Product Architecture Hub">
        <Container size="default" className="showcase-hub-container">
          <div className="showcase-master-header" data-reveal>
            <div className="showcase-header-badge" data-reveal="fade" style={{ '--si': 0 } as React.CSSProperties}>
              <span className="showcase-status-indicator" />
              <span className="badge-text">SEE THE CONTEXT TAKE SHAPE</span>
            </div>

            <h2 className="showcase-headline" data-reveal style={{ '--si': 1 } as React.CSSProperties}>
              One intelligent environment.{' '}
              <span className="editorial-serif showcase-serif-accent">Unified clinical capabilities.</span>
            </h2>

            <p className="showcase-lead" data-reveal style={{ '--si': 2 } as React.CSSProperties}>
              Health information is usually lost across different apps, clinics, and paper slips.
              MEDVIDHI unites conversational intake, spatial mapping, longitudinal memory, and pre-consultation
              synthesis into a single, cohesive clinical ecosystem.
            </p>
          </div>

          {/* In-page horizontal feature-icon selector in normal page flow */}
          <div className="showcase-selector-wrap" data-reveal style={{ '--si': 3 } as React.CSSProperties}>
            <FeatureIconSelector
              activeFeatureId={activeFeatureId}
              onSelectFeature={handleSelectFeature}
            />
          </div>

          {/* Stable anchor targets for deep navigation and screen readers */}
          <div id="feature-body-map" className="feature-anchor-target" aria-hidden="true" />
          <div id="feature-voice" className="feature-anchor-target" aria-hidden="true" />
          <div id="feature-chat" className="feature-anchor-target" aria-hidden="true" />
          <div id="feature-doctor-brief" className="feature-anchor-target" aria-hidden="true" />
          <div id="feature-health-memory" className="feature-anchor-target" aria-hidden="true" />
          <div id="feature-report-explainer" className="feature-anchor-target" aria-hidden="true" />

          {/* Single Active Floating Feature Window */}
          <div className="showcase-panel-wrap" data-reveal style={{ '--si': 4 } as React.CSSProperties}>
            <ActiveFeatureFloatingPanel
              activeFeatureId={activeFeatureId}
              onSelectFeature={handleSelectFeature}
            />
          </div>
        </Container>
      </section>

      {/* Independent Dedicated Right Doctor Section (#feature-right-doctor) */}
      <RightDoctorSection />
    </div>
  );
};

export default ProductShowcase;
