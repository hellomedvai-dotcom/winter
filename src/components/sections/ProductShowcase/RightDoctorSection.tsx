import React, { useState } from 'react';
import {
  Stethoscope,
  ArrowRight,
  FileText,
} from 'lucide-react';
import './RightDoctorSection.css';

interface CarePathNode {
  step: string;
  title: string;
  description: string;
  isHub?: boolean;
}

const CARE_PATH_NODES: CarePathNode[] = [
  {
    step: '01',
    title: 'Your Health Context',
    description: 'Symptoms, timeline, medications & diagnostic reports gathered in Health Memory',
  },
  {
    step: '02',
    title: 'MEDVIDHI',
    description: 'Synthesizes clinical signals and identifies relevant care pathways',
    isHub: true,
  },
  {
    step: '03',
    title: 'Relevant Care Path',
    description: 'Oriented toward appropriate clinical management (e.g. conservative musculoskeletal care)',
  },
  {
    step: '04',
    title: 'Appropriate Doctor',
    description: 'Targeted healthcare expertise aligned with the patient’s clinical presentation',
  },
  {
    step: '05',
    title: 'Doctor Brief',
    description: '30-second structured handover ready for the consultation under patient consent',
  },
];

interface IllustrativeScenario {
  id: string;
  label: string;
  symptom: string;
  pathway: string;
  targetExpertise: string;
  briefConnection: string;
}

const ILLUSTRATIVE_SCENARIOS: IllustrativeScenario[] = [
  {
    id: 'ortho',
    label: 'Musculoskeletal Concern',
    symptom: 'Subacute lateral elbow pain worsening with load (5 days)',
    pathway: 'Conservative Tendinopathy Pathway',
    targetExpertise: 'Musculoskeletal & Sports Medicine',
    briefConnection: 'Point tenderness, timeline, and topical gel response carried into Doctor Brief',
  },
  {
    id: 'hemodynamic',
    label: 'Postural Concern',
    symptom: 'Transient lightheadedness and blurring on sit-to-stand (14 days)',
    pathway: 'Autonomic & Postural Assessment Pathway',
    targetExpertise: 'Internal Medicine / Cardiology',
    briefConnection: 'Absence of syncope, postural timing, and hydration factors organized in Doctor Brief',
  },
  {
    id: 'metabolic',
    label: 'Preventive Lab Reading',
    symptom: 'Elevated Non-HDL cholesterol (184 mg/dL) on routine blood test',
    pathway: 'Cardiovascular Risk Prevention Pathway',
    targetExpertise: 'Preventive Medicine & Metabolic Health',
    briefConnection: 'Lab parameters and lifestyle baseline structured for physician discussion',
  },
];

export const RightDoctorSection: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('ortho');

  const activeScenario =
    ILLUSTRATIVE_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
    ILLUSTRATIVE_SCENARIOS[0];

  const handleScrollToDoctorBrief = (e: React.MouseEvent) => {
    e.preventDefault();
    const briefEl = document.getElementById('feature-doctor-brief');
    if (briefEl) {
      briefEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="feature-right-doctor"
      className="showcase-feature-section theme-dark right-doctor-showcase-section"
      aria-label="Right Doctor Care Navigation Feature"
    >
      <div className="feature-section-inner">
        {/* Section Header */}
        <div className="dark-feature-header">
          <div className="dark-badge-row">
            <span className="dark-mono-pill">
              <Stethoscope size={13} className="pill-icon" />
              Care Navigation
            </span>
            <span className="dark-illustrative-tag">Illustrative Pathway</span>
          </div>

          <h3 className="dark-feature-headline">
            The right care starts with the right context.
          </h3>

          <p className="dark-feature-lead">
            MEDVIDHI is being built to help patients understand which kind of healthcare expertise 
            may be relevant to their concern and carry useful health context into the consultation.
          </p>
        </div>

        {/* Master Studio Card */}
        <div className="right-doctor-studio-card">
          {/* Section Topbar */}
          <div className="doctor-studio-topbar">
            <div className="doctor-topbar-left">
              <span className="status-dot-pulse" />
              <span className="doctor-topbar-title">Care Navigation Pathway</span>
            </div>
            <span className="doctor-topbar-tag">Illustrative Handover</span>
          </div>

          {/* Clean 5-Stage Core Visual Journey */}
          <div className="care-navigation-path-container" aria-label="Five-step care navigation path">
            <div className="care-path-grid">
              {CARE_PATH_NODES.map((node, idx) => (
                <React.Fragment key={node.step}>
                  <div className={`care-path-node-card ${node.isHub ? 'is-medvidhi-hub' : ''}`}>
                    <div className="path-node-header">
                      <span className="path-node-num">{node.step}</span>
                      {node.isHub && <span className="path-hub-pill">Core Engine</span>}
                    </div>
                    <h4 className="path-node-title">{node.title}</h4>
                    <p className="path-node-desc">{node.description}</p>
                  </div>
                  {idx < CARE_PATH_NODES.length - 1 && (
                    <div className="care-path-arrow" aria-hidden="true">
                      <ArrowRight size={18} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Illustrative Pathway Scenario Selector */}
          <div className="path-scenario-studio">
            <div className="scenario-selector-bar">
              <span className="scenario-bar-label">Illustrative Scenario:</span>
              <div className="scenario-chips" role="tablist" aria-label="Illustrative presentation scenarios">
                {ILLUSTRATIVE_SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedScenarioId === sc.id}
                    className={`scenario-chip ${selectedScenarioId === sc.id ? 'is-active' : ''}`}
                    onClick={() => setSelectedScenarioId(sc.id)}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="scenario-display-grid">
              <div className="scenario-detail-tile">
                <span className="tile-eyebrow">Patient Presentation</span>
                <p className="tile-value">{activeScenario.symptom}</p>
              </div>

              <div className="scenario-detail-tile">
                <span className="tile-eyebrow">Relevant Care Path</span>
                <p className="tile-value">{activeScenario.pathway}</p>
              </div>

              <div className="scenario-detail-tile">
                <span className="tile-eyebrow">Appropriate Expertise</span>
                <p className="tile-value highlight-expertise">{activeScenario.targetExpertise}</p>
              </div>
            </div>

            {/* Link to Doctor Brief */}
            <div className="scenario-handover-footer">
              <div className="handover-info">
                <div className="handover-title-row">
                  <FileText size={15} />
                  <span className="handover-title">Pre-Consultation Handover</span>
                </div>
                <p className="handover-desc">{activeScenario.briefConnection}</p>
              </div>

              <button
                type="button"
                className="handover-jump-btn"
                onClick={handleScrollToDoctorBrief}
              >
                <span>Inspect Linked Doctor Brief</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightDoctorSection;
