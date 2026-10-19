import React from 'react';
import { Container } from '@/components/layout/Container/Container';
import { Badge } from '@/components/common/Badge/Badge';
import { ShieldCheck, Lock, Eye, Stethoscope, AlertTriangle } from 'lucide-react';
import { SITE_CONTENT } from '@/config/siteContent';
import './PrivacyTrustSection.css';

export const PrivacyTrustSection: React.FC = () => {
  const { privacyTrust } = SITE_CONTENT;

  const principleIcons = [
    <Eye size={20} className="principle-icon" key="eye" />,
    <Lock size={20} className="principle-icon" key="lock" />,
    <ShieldCheck size={20} className="principle-icon" key="shield" />,
    <Stethoscope size={20} className="principle-icon" key="steth" />,
  ];

  return (
    <section id="privacy-trust" className="medvidhi-privacy-trust-section" aria-label="Privacy, Data Authority and Clinical Trust">
      <Container size="default" className="privacy-trust-container">
        {/* Section Header */}
        <div className="privacy-header">
          <Badge variant="neutral" size="md" icon={<ShieldCheck size={13} />}>
            {privacyTrust.badge}
          </Badge>

          <h2 className="privacy-headline">
            {privacyTrust.heading}
          </h2>

          <p className="privacy-lead">
            We believe health information belongs to the individual. Our technological architecture 
            is being designed around explicit transparency, patient-governed permissions, and clinical primacy.
          </p>
        </div>

        {/* 4 Core Accurate Principles Grid */}
        <div className="privacy-principles-grid">
          {privacyTrust.principles.map((p, idx) => (
            <div key={idx} className="principle-card">
              <div className="principle-icon-wrapper">
                {principleIcons[idx] || <ShieldCheck size={20} className="principle-icon" />}
              </div>
              <h3 className="principle-title">{p.title}</h3>
              <p className="principle-desc">{p.description}</p>
            </div>
          ))}
        </div>

        {/* Dedicated Medical Disclaimer Card */}
        <div className="medical-disclaimer-card" role="note" aria-label="Clinical Notice and Medical Disclaimer">
          <div className="disclaimer-header">
            <AlertTriangle size={18} className="disclaimer-icon" />
            <h4 className="disclaimer-title">Clinical Disclaimer &amp; Boundaries</h4>
          </div>
          <p className="disclaimer-body">
            {privacyTrust.medicalDisclaimer}
          </p>
        </div>
      </Container>
    </section>
  );
};

export default PrivacyTrustSection;
