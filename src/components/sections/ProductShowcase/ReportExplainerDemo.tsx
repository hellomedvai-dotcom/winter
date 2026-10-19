import React, { useState } from 'react';
import {
  FileCheck,
  Sparkles,
  HelpCircle,
  MessageCircleQuestion,
  ShieldAlert,
  BookOpen,
} from 'lucide-react';
import {
  REPORT_EXPLAINER_SAMPLES,
  ReportSampleData,
  LanguageCode,
} from '@/config/showcaseContent';
import './ReportExplainerDemo.css';

export const ReportExplainerDemo: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('mr'); // Default to conversational Marathi
  const [selectedReportId, setSelectedReportId] = useState<string>('lipid-panel');

  const currentReport: ReportSampleData =
    REPORT_EXPLAINER_SAMPLES.find((r) => r.id === selectedReportId) ||
    REPORT_EXPLAINER_SAMPLES[0];

  const currentExplanation = currentReport.languages[selectedLang];

  return (
    <section
      id="feature-report-explainer"
      className="showcase-feature-section theme-light report-explainer-showcase-section"
      aria-label="Medical and Report Explainer Feature"
    >
      <div className="feature-section-inner">
        {/* Section Header */}
        <div className="dark-feature-header">
          <div className="dark-badge-row">
            <span className="dark-mint-pill">
              <FileCheck size={13} className="pill-icon" />
              Diagnostic Clarity Engine
            </span>
            <span className="dark-anchor-tag">#feature-report-explainer</span>
          </div>

          <h3 className="dark-feature-headline">
            Medical language,{' '}
            <span className="editorial-serif dark-serif-mint">in words you understand.</span>
          </h3>

          <p className="dark-feature-lead">
            Diagnostic lab sheets and imaging impressions are written for specialists. MEDVIDHI translates 
            intimidating clinical jargon into clear, reassuring context in your preferred language.
          </p>

          {/* Multilingual Selector */}
          <div className="explainer-lang-bar">
            <span className="explainer-lang-label">Explanation Language:</span>
            <div className="explainer-lang-options" role="tablist" aria-label="Explanation language toggle">
              <button
                type="button"
                role="tab"
                aria-selected={selectedLang === 'en'}
                className={`explainer-lang-btn ${selectedLang === 'en' ? 'is-active' : ''}`}
                onClick={() => setSelectedLang('en')}
              >
                English
              </button>
              <span className="lang-pipe" aria-hidden="true">|</span>
              <button
                type="button"
                role="tab"
                aria-selected={selectedLang === 'mr'}
                className={`explainer-lang-btn ${selectedLang === 'mr' ? 'is-active' : ''}`}
                onClick={() => setSelectedLang('mr')}
              >
                मराठी (संभाषण सुलभ)
              </button>
              <span className="lang-pipe" aria-hidden="true">|</span>
              <button
                type="button"
                role="tab"
                aria-selected={selectedLang === 'hi'}
                className={`explainer-lang-btn ${selectedLang === 'hi' ? 'is-active' : ''}`}
                onClick={() => setSelectedLang('hi')}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>

        {/* Main Studio Card */}
        <div className="explainer-studio-card">
          {/* Sample Diagnostic Report Tabs */}
          <div className="report-sample-tabs" role="tablist" aria-label="Sample diagnostic reports">
            {REPORT_EXPLAINER_SAMPLES.map((sample: ReportSampleData) => {
              const isSelected = sample.id === selectedReportId;
              return (
                <button
                  key={sample.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`report-tab-btn ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedReportId(sample.id)}
                >
                  <span className="tab-indicator" />
                  <span className="tab-title">{sample.title}</span>
                  <span className="tab-category">{sample.category}</span>
                </button>
              );
            })}
          </div>

          {/* Raw Diagnostic Excerpt Viewport */}
          <div className="raw-excerpt-container">
            <div className="excerpt-header-strip">
              <div className="excerpt-label-group">
                <BookOpen size={14} />
                <span className="excerpt-title">Raw Diagnostic Lab / Imaging Excerpt</span>
              </div>
              <span className="excerpt-source-tag">{currentReport.sourceContext}</span>
            </div>

            <div className="excerpt-text-box">
              <pre className="excerpt-code-snippet">{currentReport.rawExcerpt}</pre>
            </div>
          </div>

          {/* 3 Patient-Friendly Understanding Pillars */}
          <div className="explainer-three-pillars-grid">
            {/* Pillar 1: What the Sample Says */}
            <div className="pillar-card pillar-meaning">
              <div className="pillar-header">
                <div className="pillar-icon-box meaning-icon">
                  <Sparkles size={16} />
                </div>
                <div className="pillar-title-group">
                  <span className="pillar-tag">Plain Language Translation</span>
                  <h4 className="pillar-headline">What This Sample Says</h4>
                </div>
              </div>
              <p className="pillar-body-text">{currentExplanation.patientExplanation}</p>
            </div>

            {/* Pillar 2: What Remains Uncertain */}
            <div className="pillar-card pillar-uncertainty">
              <div className="pillar-header">
                <div className="pillar-icon-box uncertainty-icon">
                  <HelpCircle size={16} />
                </div>
                <div className="pillar-title-group">
                  <span className="pillar-tag">Clinical Boundary &amp; Nuance</span>
                  <h4 className="pillar-headline">What Remains Uncertain</h4>
                </div>
              </div>
              <p className="pillar-body-text">{currentExplanation.whatRemainsUncertain}</p>
            </div>

            {/* Pillar 3: What to Discuss with Doctor */}
            <div className="pillar-card pillar-discussion">
              <div className="pillar-header">
                <div className="pillar-icon-box discussion-icon">
                  <MessageCircleQuestion size={16} />
                </div>
                <div className="pillar-title-group">
                  <span className="pillar-tag">Doctor Consultation Agenda</span>
                  <h4 className="pillar-headline">What to Discuss with Doctor</h4>
                </div>
              </div>
              <p className="pillar-body-text">{currentExplanation.whatToDiscussWithDoctor}</p>
            </div>
          </div>

          {/* Compliance & Educational Notice */}
          <div className="explainer-studio-footer">
            <ShieldAlert size={14} className="notice-icon" />
            <span className="notice-text">
              <strong>Illustrative Educational Context:</strong> Explanations are strictly educational 
              to empower constructive dialogue with your doctor. A report value is never transformed into 
              an autonomous clinical diagnosis.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
