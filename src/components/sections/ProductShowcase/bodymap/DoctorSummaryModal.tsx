import React, { useState } from 'react';
import { X, Copy, Check, Shield } from 'lucide-react';
import { RecordedRegionIssue } from '@/types/bodymap';
import { healthMemoryAdapter } from '@/services/healthMemoryAdapter';

interface DoctorSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordedIssues: RecordedRegionIssue[];
}

export const DoctorSummaryModal: React.FC<DoctorSummaryModalProps> = ({
  isOpen,
  onClose,
  recordedIssues,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const summaryText = healthMemoryAdapter.generateDoctorSummaryText();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  return (
    <div className="doctor-summary-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="summary-modal-title">
      <div className="doctor-summary-modal-card">
        {/* Modal Top Bar */}
        <div className="summary-modal-header">
          <div className="summary-title-col">
            <div className="summary-badge-row">
              <span className="summary-status-tag">Clinical Intake Synthesis</span>
              <span className="summary-session-tag">Session-Only Demo</span>
            </div>
            <h3 id="summary-modal-title" className="summary-heading">
              30-Second Physician Context Brief
            </h3>
          </div>
          <button
            type="button"
            className="summary-close-btn"
            onClick={onClose}
            aria-label="Close doctor brief summary"
          >
            <X size={16} />
          </button>
        </div>

        {/* Informative Medical Disclaimer */}
        <div className="summary-clinical-disclaimer">
          <Shield size={14} className="shrink-0 text-slate-500" />
          <p>
            <strong>Physician Notice:</strong> This summary preserves the patient’s direct subjective descriptions paired with mapped anatomical landmarks. It contains zero simulated algorithmic risk scores or medical diagnoses.
          </p>
        </div>

        {/* Content Body */}
        <div className="summary-content-scroll">
          {recordedIssues.length === 0 ? (
            <div className="empty-summary-state">
              <p>No regions have been recorded in this session yet.</p>
              <p className="empty-hint">Select a body area on the map and record symptoms to generate your brief.</p>
            </div>
          ) : (
            <div className="recorded-issues-clinical-list">
              {recordedIssues.map((issue, idx) => (
                <div key={issue.id} className="clinical-issue-item">
                  <div className="issue-item-header">
                    <span className="issue-index">#{idx + 1}</span>
                    <div className="issue-title-wrap">
                      <span className="issue-name">{issue.regionName}</span>
                      <span className="issue-side">({issue.side.toUpperCase()})</span>
                    </div>
                    <span className="issue-type-pill">{issue.primaryIssue.toUpperCase()}</span>
                  </div>

                  <div className="issue-anatomical-bar">
                    <span className="bar-label">Anatomical Landmark:</span>
                    <span className="bar-value">{issue.anatomicalName}</span>
                    {issue.subregionName && (
                      <span className="bar-subregion"> • Subregion: {issue.subregionName}</span>
                    )}
                  </div>

                  <div className="issue-details-grid">
                    {issue.pain && (
                      <>
                        <div className="grid-cell">
                          <span className="cell-k">Severity</span>
                          <span className="cell-v font-bold">{issue.pain.severity} / 10</span>
                        </div>
                        <div className="grid-cell">
                          <span className="cell-k">Onset &amp; Frequency</span>
                          <span className="cell-v">{issue.pain.onset} • {issue.pain.frequency}</span>
                        </div>
                        <div className="grid-cell col-span-2">
                          <span className="cell-k">Sensation Character</span>
                          <span className="cell-v">{issue.pain.character}</span>
                        </div>
                      </>
                    )}

                    {issue.injury && (
                      <>
                        <div className="grid-cell">
                          <span className="cell-k">Incident Mechanism</span>
                          <span className="cell-v">{issue.injury.cause}</span>
                        </div>
                        <div className="grid-cell">
                          <span className="cell-k">Time Elapsed</span>
                          <span className="cell-v">{issue.injury.timeSince}</span>
                        </div>
                        <div className="grid-cell col-span-2">
                          <span className="cell-k">Mobility Status</span>
                          <span className="cell-v">{issue.injury.mobilityRestriction}</span>
                        </div>
                      </>
                    )}

                    {issue.swelling && (
                      <>
                        <div className="grid-cell">
                          <span className="cell-k">Estimated Area</span>
                          <span className="cell-v">{issue.swelling.extent}</span>
                        </div>
                        <div className="grid-cell">
                          <span className="cell-k">Progression</span>
                          <span className="cell-v">{issue.swelling.progression}</span>
                        </div>
                      </>
                    )}

                    {issue.skinAppearance && (
                      <div className="grid-cell col-span-2">
                        <span className="cell-k">Surface Appearance</span>
                        <span className="cell-v">
                          {issue.skinAppearance.observedColor.toUpperCase()}
                          {issue.skinAppearance.warmthReported ? ' • Warmth reported' : ''}
                        </span>
                      </div>
                    )}

                    {issue.numbness && (
                      <>
                        <div className="grid-cell">
                          <span className="cell-k">Sensation</span>
                          <span className="cell-v">{issue.numbness.sensation}</span>
                        </div>
                        <div className="grid-cell">
                          <span className="cell-k">Pattern</span>
                          <span className="cell-v">{issue.numbness.pattern} ({issue.numbness.severity}/10)</span>
                        </div>
                      </>
                    )}

                    {issue.stiffness && (
                      <>
                        <div className="grid-cell">
                          <span className="cell-k">Stiffness Level</span>
                          <span className="cell-v">{issue.stiffness.severityLevel}</span>
                        </div>
                        <div className="grid-cell">
                          <span className="cell-k">Peak Time & Impact</span>
                          <span className="cell-v">{issue.stiffness.worstTime} • {issue.stiffness.mobilityImpact}</span>
                        </div>
                      </>
                    )}

                    {issue.treatmentHistory && (
                      <div className="grid-cell col-span-2">
                        <span className="cell-k">Prior Interventions</span>
                        <span className="cell-v">
                          {issue.treatmentHistory.homeRemediesTried.length > 0
                            ? issue.treatmentHistory.homeRemediesTried.join(', ')
                            : 'No home remedies reported'}
                          {issue.treatmentHistory.occurredBefore ? ' • (Prior history in same spot)' : ''}
                        </span>
                      </div>
                    )}

                    {issue.treatmentHistory?.patientNotes && (
                      <div className="grid-cell col-span-2 verbatim-notes">
                        <span className="cell-k">Patient Verbatim Note</span>
                        <p className="cell-quote">&ldquo;{issue.treatmentHistory.patientNotes}&rdquo;</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Action Bar */}
        <div className="summary-modal-footer">
          <div className="footer-status-indicator">
            <span className="pulse-dot-green" />
            <span>Health Memory Adapter Connected (Demo Payload Ready)</span>
          </div>

          <div className="footer-button-group">
            <button
              type="button"
              className="btn-summary-copy"
              onClick={handleCopy}
              disabled={recordedIssues.length === 0}
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Formatted Text'}</span>
            </button>
            <button
              type="button"
              className="btn-summary-done"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
