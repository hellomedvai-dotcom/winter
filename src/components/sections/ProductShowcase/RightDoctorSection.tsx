import React, { useState } from 'react';
import {
  Stethoscope,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { useReveal } from '@/lib/motion/useReveal';
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

interface CareNavigationFactor {
  id: 'symptoms' | 'timeline' | 'reports' | 'previous_care';
  label: string;
  factorName: string;
  contextThatMayHelp: string;
  relevantCareToExplore: string;
  informationStillToClarify: string;
}

const CARE_FACTORS: CareNavigationFactor[] = [
  {
    id: 'symptoms',
    label: 'Reported Symptoms',
    factorName: 'Reported Symptoms',
    contextThatMayHelp:
      'Intermittent knee discomfort described as worse on stairs and temporarily relieved by rest provides clinical clues about mechanical joint loading.',
    relevantCareToExplore:
      'Initial clinical evaluation by a primary care physician or sports/musculoskeletal clinician, who can examine joint stability and load tolerance.',
    informationStillToClarify:
      'Exact anatomical location (anterior, medial, or lateral), presence of swelling or locking, and severity rating on stairs.',
  },
  {
    id: 'timeline',
    label: 'Timeline',
    factorName: 'Timeline & Progression',
    contextThatMayHelp:
      'A reported duration of approximately two weeks with fluctuating episodes indicates a subacute pattern rather than sudden acute trauma.',
    relevantCareToExplore:
      'Subacute musculoskeletal patterns typically start with conservative physician evaluation, functional movement assessment, or guided physiotherapy.',
    informationStillToClarify:
      'Whether the symptom intensity is progressively worsening or stabilizing, and whether morning stiffness exceeds 30 minutes.',
  },
  {
    id: 'reports',
    label: 'Available Reports',
    factorName: 'Available Reports & Tests',
    contextThatMayHelp:
      'Any historical plain radiographs (X-rays), joint ultrasound, or basic inflammatory labs help provide a baseline and prevent duplicate testing.',
    relevantCareToExplore:
      'Clinicians review available imaging reports to determine whether conservative management or specialized orthopedic consultation is warranted.',
    informationStillToClarify:
      'Date of previous imaging, whether weight-bearing views were taken, and whether any previous clinician reviewed the results.',
  },
  {
    id: 'previous_care',
    label: 'Previous Care',
    factorName: 'Previous Consultations & Care',
    contextThatMayHelp:
      'Details of temporary relief from rest, topical treatments, braces, or earlier clinical advice clarify what has already been attempted.',
    relevantCareToExplore:
      'If rest provides only fleeting relief and symptoms return with daily stairs, discussion with a healthcare professional regarding structured rehab is appropriate.',
    informationStillToClarify:
      'Whether any prescription anti-inflammatories, knee braces, or physical therapy exercises were formally evaluated.',
  },
];

export const RightDoctorSection: React.FC = () => {
  const [selectedFactorId, setSelectedFactorId] = useState<CareNavigationFactor['id']>('symptoms');

  // Triggers the connector draw-in once the care path enters view (no layout impact).
  const { ref: carePathRef, isVisible: isCarePathVisible } = useReveal<HTMLDivElement>();

  const activeFactor =
    CARE_FACTORS.find((f) => f.id === selectedFactorId) || CARE_FACTORS[0];

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
        <div className="dark-feature-header" data-reveal style={{ '--si': 0 } as React.CSSProperties}>
          <div className="dark-badge-row">
            <span className="dark-mono-pill">
              <Stethoscope size={13} className="pill-icon" />
              BEYOND A DIRECTORY
            </span>
            <span className="dark-editorial-quote">&ldquo;The right next step starts with understanding the need.&rdquo;</span>
            <span className="dark-illustrative-tag">Care Navigation</span>
          </div>

          <h3 className="dark-feature-headline">
            The right care starts with the right context.
          </h3>

          <p className="dark-feature-lead">
            MEDVIDHI is being built to help patients explore which kind of healthcare expertise 
            may be relevant to their concern and carry useful health context into the consultation.
          </p>
        </div>

        {/* Master Studio Card */}
        <div className="right-doctor-studio-card">
          {/* Section Topbar */}
          <div className="doctor-studio-topbar" data-reveal style={{ '--si': 1 } as React.CSSProperties}>
            <div className="doctor-topbar-left">
              <span className="status-dot-pulse" />
              <span className="doctor-topbar-title">Contextual Care-Navigation Explorer</span>
            </div>
            <span className="doctor-topbar-tag">Illustrative Guidance • Not a Diagnosis</span>
          </div>

          {/* Clean 5-Stage Core Visual Journey */}
          <div className="care-navigation-path-container" aria-label="Five-step care navigation path">
            <div className={`care-path-grid ${isCarePathVisible ? 'is-visible' : ''}`} ref={carePathRef}>
              {CARE_PATH_NODES.map((node, idx) => (
                <React.Fragment key={node.step}>
                  <div
                    className={`care-path-node-card ${node.isHub ? 'is-medvidhi-hub' : ''}`}
                    data-reveal
                    style={{ '--si': idx + 2 } as React.CSSProperties}
                  >
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

          {/* Contextual Factor Explorer Studio */}
          <div className="path-scenario-studio" data-reveal style={{ '--si': 7 } as React.CSSProperties}>
            <div className="scenario-selector-bar">
              <span className="scenario-bar-label">Explore by Context Factor:</span>
              <div className="scenario-chips" role="tablist" aria-label="Selectable care navigation factors">
                {CARE_FACTORS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedFactorId === f.id}
                    className={`scenario-chip ${selectedFactorId === f.id ? 'is-active' : ''}`}
                    onClick={() => setSelectedFactorId(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="scenario-display-grid">
              <div className="scenario-detail-tile">
                <span className="tile-eyebrow">Context that may help</span>
                <p className="tile-value">{activeFactor.contextThatMayHelp}</p>
              </div>

              <div className="scenario-detail-tile">
                <span className="tile-eyebrow">Relevant care to explore</span>
                <p className="tile-value highlight-expertise">{activeFactor.relevantCareToExplore}</p>
              </div>

              <div className="scenario-detail-tile">
                <span className="tile-eyebrow">Information still to clarify</span>
                <p className="tile-value">{activeFactor.informationStillToClarify}</p>
              </div>
            </div>

            {/* Context Navigation Notice & Link to Doctor Brief */}
            <div className="scenario-handover-footer">
              <div className="handover-info">
                <div className="handover-title-row">
                  <FileText size={15} />
                  <span className="handover-title">Care Navigation &amp; Communication Notice</span>
                </div>
                <p className="handover-desc">
                  MEDVIDHI supports care navigation and consultation preparation, never replacing professional medical evaluation or diagnostic assessment.
                </p>
              </div>

              <button
                type="button"
                className="handover-jump-btn"
                onClick={handleScrollToDoctorBrief}
                data-nudge-arrow
              >
                <span>Inspect Illustrative Doctor Brief</span>
                <ArrowRight size={14} className="arrow-nudge" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightDoctorSection;
