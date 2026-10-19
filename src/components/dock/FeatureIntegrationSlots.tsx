import React from 'react';
import { Container } from '@/components/layout/Container/Container';
import { Badge } from '@/components/common/Badge/Badge';
import {
  FEATURES_CONFIG,
  RIGHT_DOCTOR_FEATURE,
  FeatureItem,
} from '@/config/features';
import {
  BodyMapIcon,
  VoiceIcon,
  ChatIcon,
  DoctorBriefIcon,
  HealthMemoryIcon,
  ReportExplainerIcon,
  RightDoctorIcon,
} from './DockIcons';
import './FeatureIntegrationSlots.css';

const renderSlotIcon = (id: string) => {
  switch (id) {
    case 'body-map':
      return <BodyMapIcon size={26} color="var(--color-charcoal-base)" />;
    case 'voice':
      return <VoiceIcon size={26} color="var(--color-charcoal-base)" />;
    case 'chat':
      return <ChatIcon size={26} color="var(--color-charcoal-base)" />;
    case 'doctor-brief':
      return <DoctorBriefIcon size={26} color="var(--color-charcoal-base)" />;
    case 'health-memory':
      return <HealthMemoryIcon size={26} color="var(--color-charcoal-base)" />;
    case 'report-explainer':
      return <ReportExplainerIcon size={26} color="var(--color-charcoal-base)" />;
    case 'right-doctor':
      return <RightDoctorIcon size={26} color="var(--color-charcoal-base)" />;
    default:
      return <ChatIcon size={26} color="var(--color-charcoal-base)" />;
  }
};

export const FeatureIntegrationSlots: React.FC = () => {
  return (
    <section id="features" className="feature-integration-section" aria-label="Feature Architecture Slots">
      <Container size="default" className="slots-container">
        {/* Section Header */}
        <div className="slots-header">
          <Badge variant="mint" size="sm">
            Spatial Application Dock Target Architecture
          </Badge>
          <h2 className="slots-headline">
            Reserved Feature Capabilities &amp; <span className="editorial-serif">Integration Targets</span>
          </h2>
          <p className="slots-lead">
            The floating bottom dock connects directly to these target slots on the page. 
            Full interactive modules will be implemented progressively in subsequent phases.
          </p>
        </div>

        {/* 6 Primary Feature Slots */}
        <div className="slots-grid">
          {FEATURES_CONFIG.map((feature: FeatureItem) => {
            const anchorId = feature.anchor.replace('#', '');

            return (
              <div
                key={feature.id}
                id={anchorId}
                className={`feature-slot-card ${feature.isReserved ? 'slot-reserved' : ''}`}
              >
                <div className="slot-top-bar">
                  <div className="slot-icon-box">{renderSlotIcon(feature.id)}</div>
                  {feature.isReserved ? (
                    <span className="slot-reserved-pill">Reserved Integration Slot</span>
                  ) : (
                    <span className="slot-id-tag">#{anchorId}</span>
                  )}
                </div>

                <h3 className="slot-title">{feature.name}</h3>
                <p className="slot-tagline">{feature.tagline}</p>

                {feature.isReserved ? (
                  <p className="slot-notice">
                    Original Alpha Body Map implementation will be integrated here directly. 
                    No substitute anatomical rendering created in this phase.
                  </p>
                ) : (
                  <p className="slot-status">
                    Navigation target active. Ready for interactive demonstration in the next phase.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Dedicated Separate Right Doctor Slot */}
        <div id="feature-right-doctor" className="right-doctor-slot-card">
          <div className="right-doctor-slot-inner">
            <div className="doctor-slot-left">
              <div className="doctor-slot-icon-box">
                <RightDoctorIcon size={32} color="#080A0A" />
              </div>
              <div className="doctor-slot-text">
                <div className="doctor-badge-row">
                  <Badge variant="mint" size="sm">
                    Specialist Alignment
                  </Badge>
                  <span className="slot-id-tag">#feature-right-doctor</span>
                </div>
                <h3 className="doctor-slot-title">{RIGHT_DOCTOR_FEATURE.name}</h3>
                <p className="doctor-slot-desc">
                  Dedicated care navigation bridging verified patient context with relevant healthcare 
                  professionals whose clinical expertise matches their exact presentation.
                </p>
              </div>
            </div>
            <div className="doctor-slot-right">
              <span className="doctor-slot-status-pill">
                <span className="status-dot-mint" />
                Integration Ready
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
