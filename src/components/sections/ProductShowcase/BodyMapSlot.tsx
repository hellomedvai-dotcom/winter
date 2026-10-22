import React, { useState } from 'react';
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

  // Handler for region selection
  const handleSelectRegion = (region: BodyRegionDefinition) => {
    setSelectedRegion(region);

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

  // Calculate anchored placement coordinates for floating frosted-glass panel
  const pin = selectedRegion?.pinCoordinates || { x: 384, y: 512 };
  const isLeftHalf = pin.x <= 384;
  const floatTopPercent = Math.min(Math.max((pin.y / 1024) * 85 - 8, 4), 48);

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
            <span className="dark-anchor-tag">#feature-body-map</span>
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
                INTERACTIVE BODY MAP • VOLATILE MEMORY
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
                <span>Session-only in this prototype</span>
              </div>
            </div>
          </div>

          {/* Unified Black Stage: Centered Realistic Model + Anchored Floating Glass UI */}
          <div className="body-map-unified-stage">
            {/* State A: Guidance banner when no region is selected */}
            {!selectedRegion && (
              <div className="bodymap-state-a-banner" aria-live="polite">
                <div className="state-a-glass-pill">
                  <span className="state-a-pill-tag">Map what you feel</span>
                  <p className="state-a-instruction">
                    Select a body area and tell us what you've noticed. Your body map helps you track changes and give your doctor a clearer picture of your symptoms.
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
                onHoverRegion={setHoveredRegion}
                onSelectSubregion={setSelectedSubregion}
              />
            </div>

            {/* State B, C, D: Anchored Floating Frosted-Glass Panel beside Selected Region */}
            {selectedRegion && (
              <div
                className={`body-map-floating-glass-pane ${isLeftHalf ? 'is-anchored-right' : 'is-anchored-left'}`}
                style={{
                  top: `clamp(20px, ${floatTopPercent}%, 46%)`,
                }}
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
