import React, { useState, useEffect } from 'react';
import {
  Crosshair,
  Shield,
  FileText,
  RotateCcw,
} from 'lucide-react';
import {
  BodyRegionDefinition,
  HandSubregionDefinition,
  BodyView,
  RecordedRegionIssue,
} from '@/types/bodymap';
import { ALL_BODY_REGIONS, HAND_SUBREGIONS } from '@/config/bodyRegions';
import { healthMemoryAdapter } from '@/services/healthMemoryAdapter';
import { AnatomicalFigure } from './bodymap/AnatomicalFigure';
import { ContextualSymptomPanel } from './bodymap/ContextualSymptomPanel';
import { DoctorSummaryModal } from './bodymap/DoctorSummaryModal';
import './BodyMapSlot.css';

export const BodyMapSlot: React.FC = () => {
  // Body View: Front vs Back
  const [bodyView, setBodyView] = useState<BodyView>('front');

  // Selection state (null by default in State A)
  const [selectedRegion, setSelectedRegion] = useState<BodyRegionDefinition | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<BodyRegionDefinition | null>(null);

  // Hand subregion state (for finger-level precision)
  const [selectedSubregion, setSelectedSubregion] = useState<HandSubregionDefinition | null>(null);

  // Recorded Session Issues
  const [recordedIssues, setRecordedIssues] = useState<RecordedRegionIssue[]>(() =>
    healthMemoryAdapter.getAllRecords()
  );

  // Doctor Brief Modal
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState<boolean>(false);

  // Active Draft Symptom State for Live Overlays
  const [draftCondition, setDraftCondition] = useState<{
    primaryIssue: string;
    swellingExtent?: string;
    skinColor?: string;
    warmth?: boolean;
  }>({
    primaryIssue: 'pain',
  });

  // Automated Introductory Feature Animation (Locate -> Track -> Share)
  const [introStep, setIntroStep] = useState<number>(1);
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);

  useEffect(() => {
    if (selectedRegion || hasUserInteracted) return;
    const interval = setInterval(() => {
      setIntroStep((prev) => (prev % 3) + 1);
    }, 3200);
    return () => clearInterval(interval);
  }, [selectedRegion, hasUserInteracted]);

  // Handler for region selection
  const handleSelectRegion = (region: BodyRegionDefinition) => {
    setSelectedRegion(region);
    setHasUserInteracted(true);

    // If region belongs specifically to a different view, switch view cleanly
    if (region.view === 'back' && bodyView !== 'back') {
      setBodyView('back');
    } else if (region.view === 'front' && bodyView !== 'front') {
      setBodyView('front');
    }

    // Reset subregion if moving away from hands
    if (region.parentArea !== 'hands' && !region.id.includes('hand') && !region.id.includes('finger')) {
      setSelectedSubregion(null);
    }
  };

  const handleHoverRegion = (region: BodyRegionDefinition | null) => {
    setHoveredRegion(region);
    if (region) {
      setHasUserInteracted(true);
    }
  };

  // View switch handler (Front <-> Back)
  const handleSwitchView = (newView: BodyView) => {
    if (newView === bodyView) return;
    setBodyView(newView);

    // If currently selected region is view-specific, safely clear selection without losing entered data
    if (selectedRegion && selectedRegion.view !== 'both' && selectedRegion.view !== newView) {
      setSelectedRegion(null);
      setSelectedSubregion(null);
    }
  };

  // Save issue handler
  const handleSaveIssue = (issue: RecordedRegionIssue) => {
    healthMemoryAdapter.saveRecord(issue);
    setRecordedIssues(healthMemoryAdapter.getAllRecords());
  };

  // Delete issue handler
  const handleDeleteIssue = (issueId: string) => {
    healthMemoryAdapter.deleteRecord(issueId);
    setRecordedIssues(healthMemoryAdapter.getAllRecords());
    setSelectedRegion(null);
    setSelectedSubregion(null);
  };

  // Find if currently selected area has an existing record
  const currentExistingIssue = selectedRegion
    ? recordedIssues.find(
        (issue) =>
          issue.regionId === selectedRegion.id &&
          (!selectedSubregion || issue.subregionId === selectedSubregion.id)
      )
    : null;

  // Window resize tracking for responsive positioning recalculation
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate anchored placement coordinates for floating frosted-glass panel
  const pin = selectedRegion?.pinCoordinates || { x: 384, y: 512 };

  // For head/face (y < 170), dock toward the side of the feature so connector never crosses face.
  // For torso/limbs, dock on opposite side where space is greatest.
  const isHeadOrFace = pin.y < 170;
  const isDockRight = isHeadOrFace ? pin.x >= 384 : pin.x <= 384;

  // Determine vertical anchor mode:
  // For upper body (pin.y < 360), anchor from top beside region
  // For lower body (pin.y >= 360: lower abdomen, pelvis, hips, thighs, knees, ankles, feet),
  // anchor from bottom so the panel & sticky footer NEVER get pushed below the visible stage or viewport!
  const isAnchorBottom = pin.y >= 360;

  const isMobile = windowWidth <= 860;
  const topPx = Math.max(20, Math.round((pin.y / 1024) * 600 - 36));
  const panelPositionStyle: React.CSSProperties = isMobile
    ? {}
    : isAnchorBottom
    ? {
        bottom: '20px',
        top: 'auto',
        maxHeight: 'calc(100% - 40px)',
      }
    : {
        top: `${topPx}px`,
        bottom: 'auto',
        maxHeight: `calc(100% - ${topPx + 20}px)`,
      };

  return (
    <section
      id="feature-body-map"
      className="showcase-feature-section theme-dark body-map-showcase-section"
      aria-label="MEDVIDHI Interactive Anatomical Body Map"
      data-reveal="scale"
    >
      <div className="feature-section-inner">
        {/* Section Subhead & Eyebrow */}
        <div className="dark-feature-header">
          <div className="dark-badge-row">
            <span className="dark-mint-pill">
              <Crosshair size={13} className="pill-icon" />
              Realistic Anatomical Digital Twin
            </span>
          </div>

          <h3 className="dark-feature-headline">
            Map what you feel.{' '}
            <span className="editorial-serif dark-serif-mint">Let context follow.</span>
          </h3>

          <p className="dark-feature-lead">
            Select a body area and tell us what you've noticed. Your body map helps you track changes and give your doctor a clearer picture of your symptoms.
          </p>
        </div>

        {/* Main Body Map Integration Card (Pure Black Stage) */}
        <div className="body-map-integration-card">
          {/* Card Topbar: Status, Front/Back Glass Toggles, Privacy Tag */}
          <div className="body-map-card-topbar">
            <div className="slot-boundary-badge">
              <span className="boundary-pulse-dot" />
              <span className="boundary-label">
                Interactive Body Map
              </span>
            </div>

            <div className="slot-topbar-controls">
              {/* Compact Glass Controls: Front & Back */}
              <div className="body-view-toggle-pill" role="group" aria-label="Anatomical view selector">
                <button
                  type="button"
                  className={`view-toggle-btn ${bodyView === 'front' ? 'is-active' : ''}`}
                  onClick={() => handleSwitchView('front')}
                  aria-pressed={bodyView === 'front'}
                >
                  Front
                </button>
                <button
                  type="button"
                  className={`view-toggle-btn ${bodyView === 'back' ? 'is-active' : ''}`}
                  onClick={() => handleSwitchView('back')}
                  aria-pressed={bodyView === 'back'}
                >
                  Back
                </button>
              </div>

              {/* Reset view to center */}
              <button
                type="button"
                className="view-reset-btn"
                onClick={() => {
                  setSelectedRegion(null);
                  setSelectedSubregion(null);
                  setBodyView('front');
                }}
                title="Reset selection"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>

              <div className="slot-security-tag" title="Sensitive medical data stays in volatile browser memory">
                <Shield size={13} className="security-icon" />
                <span>Session-only</span>
              </div>
            </div>
          </div>

          {/* Unified Black Stage: Centered Realistic Model + Anchored Floating Glass UI */}
          <div className="body-map-unified-stage">
            {/* State A: Guidance group positioned BESIDE the body (never over the face, no outer card) */}
            {!selectedRegion && (
              <div className="bodymap-state-a-panel is-docked-beside" aria-live="polite">
                <div className="bodymap-intro-text-group">
                  <h3 className="state-a-pill-tag">Map what you feel</h3>
                  <p className="state-a-instruction">
                    Your body can tell a story over time. Track where something feels different, what has changed and when it started, so you can share a clearer picture of your health with your doctor.
                  </p>

                  {/* Three short visual steps */}
                  <div className="bodymap-intro-steps-list" role="list" aria-label="Body map 3-step workflow">
                    <div
                      className={`intro-step-item ${introStep === 1 && !hasUserInteracted ? 'is-active-step' : ''}`}
                      onClick={() => {
                        setIntroStep(1);
                        setHasUserInteracted(true);
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="step-num-badge">01</div>
                      <div className="step-copy-wrap">
                        <span className="step-title">Locate</span>
                        <span className="step-desc">Choose the body area you're concerned about.</span>
                      </div>
                    </div>

                    <div
                      className={`intro-step-item ${introStep === 2 && !hasUserInteracted ? 'is-active-step' : ''}`}
                      onClick={() => {
                        setIntroStep(2);
                        setHasUserInteracted(true);
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="step-num-badge">02</div>
                      <div className="step-copy-wrap">
                        <span className="step-title">Track</span>
                        <span className="step-desc">Record symptoms, timing and changes over time.</span>
                      </div>
                    </div>

                    <div
                      className={`intro-step-item ${introStep === 3 && !hasUserInteracted ? 'is-active-step' : ''}`}
                      onClick={() => {
                        setIntroStep(3);
                        setHasUserInteracted(true);
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="step-num-badge">03</div>
                      <div className="step-copy-wrap">
                        <span className="step-title">Share</span>
                        <span className="step-desc">Give your doctor a clearer, location-specific summary.</span>
                      </div>
                    </div>
                  </div>

                  <p className="bodymap-intro-supporting-line">
                    A clearer history starts with knowing where, when and how something changed.
                  </p>
                </div>
              </div>
            )}

            {/* Central Realistic Anatomical Body Model */}
            <div className="body-map-figure-pane">
              <AnatomicalFigure
                view={bodyView}
                selectedRegion={selectedRegion}
                hoveredRegion={hoveredRegion}
                recordedIssues={recordedIssues}
                activeCondition={draftCondition}
                selectedSubregion={selectedSubregion}
                onSelectRegion={handleSelectRegion}
                onHoverRegion={handleHoverRegion}
                onSelectSubregion={setSelectedSubregion}
                introSequenceStep={!selectedRegion && !hasUserInteracted ? introStep : undefined}
                isDockRight={isDockRight}
                isAnchorBottom={isAnchorBottom}
              />
            </div>

            {/* Mobile backdrop for outside dismiss */}
            {selectedRegion && isMobile && (
              <div
                className="bodymap-mobile-backdrop"
                onClick={() => {
                  setSelectedRegion(null);
                  setSelectedSubregion(null);
                }}
                aria-hidden="true"
              />
            )}

            {/* State B, C, D: Compact UI Group beside Selected Region (No oversized outer card) */}
            {selectedRegion && (
              <div
                className={`bodymap-compact-glass-container ${
                  isDockRight ? 'is-anchored-right' : 'is-anchored-left'
                } ${isAnchorBottom ? 'is-anchored-bottom' : 'is-anchored-top'}`}
                style={panelPositionStyle}
              >
                <ContextualSymptomPanel
                  selectedRegion={selectedRegion}
                  selectedSubregion={selectedSubregion}
                  existingIssue={currentExistingIssue}
                  onDraftConditionChange={setDraftCondition}
                  onSaveIssue={handleSaveIssue}
                  onDeleteIssue={handleDeleteIssue}
                  onOpenDoctorSummary={() => setIsDoctorModalOpen(true)}
                  recordedCount={recordedIssues.length}
                  onClose={() => {
                    setSelectedRegion(null);
                    setSelectedSubregion(null);
                  }}
                />
              </div>
            )}
          </div>

          {/* Bottom Timeline Strip: Session Recorded Landmarks */}
          <div className="stage-bottom-timeline-strip">
            <div className="strip-label-row">
              <span className="strip-title">Session Recorded Landmarks ({recordedIssues.length})</span>
              {recordedIssues.length > 0 && (
                <button
                  type="button"
                  className="strip-doctor-btn"
                  onClick={() => setIsDoctorModalOpen(true)}
                >
                  <FileText size={12} />
                  <span>Physician Brief</span>
                </button>
              )}
            </div>

            <div className="recorded-chips-scroll" role="list">
              {recordedIssues.length === 0 ? (
                <span className="empty-chips-msg">
                  Touch any anatomical region above to attach a glass symptom tag. Entries persist throughout your session.
                </span>
              ) : (
                recordedIssues.map((issue) => {
                  const isCurrentActive =
                    issue.regionId === selectedRegion?.id &&
                    (!selectedSubregion || issue.subregionId === selectedSubregion.id);

                  return (
                    <div
                      key={issue.id}
                      className={`landmark-record-chip ${isCurrentActive ? 'is-active' : ''}`}
                      onClick={() => {
                        const reg = ALL_BODY_REGIONS.find((r) => r.id === issue.regionId);
                        if (reg) {
                          handleSelectRegion(reg);
                          if (issue.subregionId) {
                            const sub = HAND_SUBREGIONS.find((s) => s.id === issue.subregionId);
                            if (sub) {
                              setSelectedSubregion(sub);
                            }
                          }
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <span
                        className="chip-color-dot"
                        style={{ backgroundColor: issue.visualOverlay?.color || '#FFAA00' }}
                      />
                      <span className="chip-name">
                        {issue.subregionName || issue.regionName}
                      </span>
                      <span className="chip-type-tag">
                        {issue.primaryIssue}
                        {issue.pain ? ` ${issue.pain.severity}/10` : ''}
                      </span>
                      <button
                        type="button"
                        className="chip-remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteIssue(issue.id);
                        }}
                        title="Remove landmark record"
                        aria-label={`Remove ${issue.regionName} record`}
                      >
                        ×
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* 30-Second Doctor Brief Modal */}
        <DoctorSummaryModal
          isOpen={isDoctorModalOpen}
          onClose={() => setIsDoctorModalOpen(false)}
          recordedIssues={recordedIssues}
        />
      </div>
    </section>
  );
};

export default BodyMapSlot;
