import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Activity,
  Zap,
  CircleDot,
  Scissors,
  Sparkles,
  Radio,
  Lock,
  HelpCircle,
  Trash2,
} from 'lucide-react';
import {
  BodyRegionDefinition,
  HandSubregionDefinition,
  PrimaryIssueType,
  RecordedRegionIssue,
  PainDetails,
  InjuryDetails,
  SwellingDetails,
  CutDetails,
  SkinAppearanceDetails,
  NumbnessDetails,
  StiffnessDetails,
} from '@/types/bodymap';

interface ActiveConditionDraft {
  primaryIssue: string;
  swellingExtent?: string;
  skinColor?: string;
  warmth?: boolean;
}

interface ContextualSymptomPanelProps {
  selectedRegion: BodyRegionDefinition;
  selectedSubregion?: HandSubregionDefinition | null;
  existingIssue?: RecordedRegionIssue | null;
  onDraftConditionChange?: (draft: ActiveConditionDraft) => void;
  onSaveIssue: (issue: RecordedRegionIssue) => void;
  onDeleteIssue?: (issueId: string) => void;
  onOpenDoctorSummary: () => void;
  recordedCount: number;
  onClose?: () => void;
}

type QuestionStep = 'concern' | 'details' | 'review';

export const ContextualSymptomPanel: React.FC<ContextualSymptomPanelProps> = ({
  selectedRegion,
  selectedSubregion,
  existingIssue,
  onDraftConditionChange,
  onSaveIssue,
  onDeleteIssue,
  onOpenDoctorSummary,
  recordedCount,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<QuestionStep>('concern');
  const [selectedIssueType, setSelectedIssueType] = useState<PrimaryIssueType>('pain');

  // Pain fields
  const [painSeverity, setPainSeverity] = useState<number>(5);
  const [painOnset, setPainOnset] = useState<string>('1–3 days');
  const [painPattern, setPainPattern] = useState<string>('Comes and goes');
  const [painTrigger, setPainTrigger] = useState<string>('Worse when moving/bending');
  const [painCharacter, setPainCharacter] = useState<string>('Dull ache');

  // Injury fields
  const [injuryCause, setInjuryCause] = useState<string>('Strain / overuse');
  const [injuryTimeSince, setInjuryTimeSince] = useState<string>('1–3 days ago');
  const [injuryMobility, setInjuryMobility] = useState<string>('Mild stiffness, still weight-bearing');
  const [injurySigns, setInjurySigns] = useState<string>('Neither');

  // Swelling fields
  const [swellingExtent, setSwellingExtent] = useState<string>('Mild localized puffiness');
  const [swellingProgression, setSwellingProgression] = useState<'increasing' | 'stable' | 'decreasing'>('stable');
  const [swellingWarmth, setSwellingWarmth] = useState<boolean>(false);
  const [swellingRedness, setSwellingRedness] = useState<boolean>(false);

  // Cut fields
  const [cutDepth, setCutDepth] = useState<'superficial' | 'deep' | 'puncture' | 'unsure'>('superficial');
  const [cutSize, setCutSize] = useState<'< 1 cm' | '1 - 3 cm' | '> 3 cm'>('< 1 cm');
  const [cutBleeding, setCutBleeding] = useState<'stopped' | 'slow_ooze' | 'active_bleeding'>('stopped');

  // Skin color fields
  const [skinColor, setSkinColor] = useState<'red' | 'blue_purple' | 'dark_black' | 'pale' | 'normal' | 'unsure'>('red');
  const [skinWarmth, setSkinWarmth] = useState<boolean>(true);
  const [skinSensation, setSkinSensation] = useState<string>('Warm / burning');

  // Numbness fields
  const [numbnessSensation, setNumbnessSensation] = useState<string>('Pins & needles (tingling)');
  const [numbnessPattern, setNumbnessPattern] = useState<string>('Intermittent');
  const [numbnessSeverity, setNumbnessSeverity] = useState<number>(4);

  // Stiffness fields
  const [stiffnessLevel, setStiffnessLevel] = useState<string>('Moderate (restricts motion)');
  const [stiffnessWorstTime, setStiffnessWorstTime] = useState<string>('Morning upon waking');
  const [stiffnessMobility, setStiffnessMobility] = useState<string>('Difficulty bending');

  // Treatments & Notes
  const [remedies, setRemedies] = useState<string[]>([]);
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [isSavedFeedback, setIsSavedFeedback] = useState<boolean>(false);

  // Sync state when existing issue is passed or selected area changes
  useEffect(() => {
    if (existingIssue) {
      setSelectedIssueType(existingIssue.primaryIssue);
      if (existingIssue.pain) {
        setPainSeverity(existingIssue.pain.severity);
        setPainOnset(existingIssue.pain.onset);
        setPainPattern(existingIssue.pain.frequency);
        setPainTrigger(existingIssue.pain.movementImpact);
        setPainCharacter(existingIssue.pain.character);
      }
      if (existingIssue.injury) {
        setInjuryCause(existingIssue.injury.cause);
        setInjuryTimeSince(existingIssue.injury.timeSince);
        setInjuryMobility(existingIssue.injury.mobilityRestriction);
      }
      if (existingIssue.swelling) {
        setSwellingExtent(existingIssue.swelling.extent);
        setSwellingProgression(existingIssue.swelling.progression);
        setSwellingWarmth(existingIssue.swelling.associatedWarmth);
      }
      if (existingIssue.cut) {
        setCutDepth(existingIssue.cut.depth);
        setCutSize(existingIssue.cut.size);
        setCutBleeding(existingIssue.cut.bleeding);
      }
      if (existingIssue.skinAppearance) {
        setSkinColor(existingIssue.skinAppearance.observedColor);
        setSkinWarmth(existingIssue.skinAppearance.warmthReported);
      }
      if (existingIssue.numbness) {
        setNumbnessSensation(existingIssue.numbness.sensation);
        setNumbnessPattern(existingIssue.numbness.pattern);
        setNumbnessSeverity(existingIssue.numbness.severity);
      }
      if (existingIssue.stiffness) {
        setStiffnessLevel(existingIssue.stiffness.severityLevel);
        setStiffnessWorstTime(existingIssue.stiffness.worstTime);
        setStiffnessMobility(existingIssue.stiffness.mobilityImpact);
      }
      if (existingIssue.treatmentHistory) {
        setRemedies(existingIssue.treatmentHistory.homeRemediesTried);
        setPatientNotes(existingIssue.treatmentHistory.patientNotes || '');
      }
      setCurrentStep('review');
    } else {
      setCurrentStep('concern');
      setIsSavedFeedback(false);
    }
  }, [existingIssue, selectedRegion.id, selectedSubregion?.id]);

  // Inform parent of draft symptom parameters for live localized visual feedback
  useEffect(() => {
    if (onDraftConditionChange) {
      onDraftConditionChange({
        primaryIssue: selectedIssueType,
        swellingExtent,
        skinColor,
        warmth: selectedIssueType === 'swelling' ? swellingWarmth : skinWarmth,
      });
    }
  }, [selectedIssueType, swellingExtent, skinColor, swellingWarmth, skinWarmth, onDraftConditionChange]);

  const toggleRemedy = (remedy: string) => {
    setRemedies((prev) =>
      prev.includes(remedy) ? prev.filter((r) => r !== remedy) : [...prev, remedy]
    );
  };

  const handleSave = () => {
    let overlayType: RecordedRegionIssue['visualOverlay']['type'] = 'highlight';
    let overlayColor = '#FFAA00';

    if (selectedIssueType === 'color_change' || skinColor === 'red' || skinWarmth || swellingRedness) {
      overlayType = 'red_overlay';
      overlayColor = '#FF2A4B';
    } else if (skinColor === 'blue_purple' || injurySigns.includes('Bruising')) {
      overlayType = 'bruise_overlay';
      overlayColor = '#9B51E0';
    } else if (selectedIssueType === 'swelling') {
      overlayType = 'halo';
      overlayColor = '#5FD7FF';
    } else if (selectedIssueType === 'cut') {
      overlayType = 'cut_marker';
      overlayColor = '#EF4444';
    } else if (selectedIssueType === 'numbness') {
      overlayType = 'highlight';
      overlayColor = '#A855F7';
    } else if (selectedIssueType === 'stiffness') {
      overlayType = 'highlight';
      overlayColor = '#F59E0B';
    }

    const painData: PainDetails | undefined =
      selectedIssueType === 'pain' || selectedIssueType === 'injury' || selectedIssueType === 'other'
        ? {
            severity: painSeverity,
            onset: painOnset,
            frequency: painPattern,
            character: painCharacter,
            movementImpact: painTrigger,
          }
        : undefined;

    const injuryData: InjuryDetails | undefined =
      selectedIssueType === 'injury'
        ? {
            cause: injuryCause,
            timeSince: injuryTimeSince,
            mobilityRestriction: injuryMobility,
            priorClinicalAssessment: false,
            previousInjuryInSameSpot: false,
          }
        : undefined;

    const swellingData: SwellingDetails | undefined =
      selectedIssueType === 'swelling'
        ? {
            extent: swellingExtent,
            onset: painOnset,
            progression: swellingProgression,
            associatedWarmth: swellingWarmth,
          }
        : undefined;

    const cutData: CutDetails | undefined =
      selectedIssueType === 'cut'
        ? {
            depth: cutDepth,
            size: cutSize,
            bleeding: cutBleeding,
            approximateAge: painOnset,
          }
        : undefined;

    const skinData: SkinAppearanceDetails | undefined =
      selectedIssueType === 'color_change'
        ? {
            observedColor: skinColor,
            warmthReported: skinWarmth,
            textureChange: skinSensation,
          }
        : undefined;

    const numbnessData: NumbnessDetails | undefined =
      selectedIssueType === 'numbness'
        ? {
            sensation: numbnessSensation,
            pattern: numbnessPattern,
            severity: numbnessSeverity,
          }
        : undefined;

    const stiffnessData: StiffnessDetails | undefined =
      selectedIssueType === 'stiffness'
        ? {
            severityLevel: stiffnessLevel,
            worstTime: stiffnessWorstTime,
            mobilityImpact: stiffnessMobility,
          }
        : undefined;

    const record: RecordedRegionIssue = {
      id: existingIssue ? existingIssue.id : `rec_${selectedRegion.id}_${Date.now()}`,
      regionId: selectedRegion.id,
      regionName: selectedRegion.name,
      anatomicalName: selectedRegion.anatomicalName,
      side: selectedRegion.side,
      subregionId: selectedSubregion?.id,
      subregionName: selectedSubregion?.name,
      primaryIssue: selectedIssueType,
      pain: painData,
      injury: injuryData,
      swelling: swellingData,
      cut: cutData,
      skinAppearance: skinData,
      numbness: numbnessData,
      stiffness: stiffnessData,
      treatmentHistory: {
        homeRemediesTried: remedies,
        occurredBefore: false,
        patientNotes: patientNotes.trim() || undefined,
      },
      visualOverlay: {
        type: overlayType,
        color: overlayColor,
        intensity: 0.85,
        haloRadius: selectedIssueType === 'swelling' ? 36 : 24,
      },
      recordedAt: new Date().toISOString(),
    };

    onSaveIssue(record);
    setIsSavedFeedback(true);
    setCurrentStep('review');
    setTimeout(() => setIsSavedFeedback(false), 2400);
  };

  const currentDisplayTitle = selectedSubregion
    ? `${selectedSubregion.name} (${selectedRegion.name})`
    : selectedRegion.name;

  const currentAnatomicalTerm = selectedSubregion
    ? selectedSubregion.anatomicalName
    : selectedRegion.anatomicalName;

  return (
    <div className="floating-symptom-glass-panel" aria-label="Interactive Symptom Intake Glass Panel">
      {/* 1. Translucent Frosted Glass Header */}
      <div className="glass-panel-header">
        <div className="glass-top-status-row">
          <span className="glass-prompt-tag">What have you noticed here?</span>
          <div className="glass-header-controls">
            <span className="glass-session-tag">Session-only in this prototype</span>
            {onClose && (
              <button
                type="button"
                className="glass-panel-close-btn"
                onClick={onClose}
                aria-label="Close symptom panel"
                title="Close"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="glass-title-block">
          <h4 className="glass-region-heading">{currentDisplayTitle}</h4>
          <span className="glass-anatomical-latin">
            {currentAnatomicalTerm} · {selectedRegion.side === 'midline' ? 'Midline' : selectedRegion.side.toUpperCase()}
          </span>
        </div>

        {/* Step Indicator */}
        <div className="glass-step-bar">
          <button
            type="button"
            className={`glass-step-btn ${currentStep === 'concern' ? 'is-active' : 'is-done'}`}
            onClick={() => setCurrentStep('concern')}
          >
            1. Concern
          </button>
          <span className="glass-step-sep">›</span>
          <button
            type="button"
            className={`glass-step-btn ${currentStep === 'details' ? 'is-active' : currentStep === 'review' ? 'is-done' : ''}`}
            onClick={() => setCurrentStep('details')}
          >
            2. Details
          </button>
          <span className="glass-step-sep">›</span>
          <button
            type="button"
            className={`glass-step-btn ${currentStep === 'review' ? 'is-active' : ''}`}
            onClick={() => setCurrentStep('review')}
          >
            3. Tag Pinned
          </button>
        </div>
      </div>

      {/* 2. Glass Scroll Body */}
      <div className="glass-panel-body-scroll">
        {/* STEP 1: CONCERN SELECTION (8 Frosted Chips) */}
        {currentStep === 'concern' && (
          <div className="concern-selection-view">
            <span className="glass-prompt-label">Select what best matches your observation:</span>
            <div className="glass-concern-grid" role="group" aria-label="Primary symptom type">
              {[
                { type: 'pain', label: '1. Pain or soreness', icon: Activity, desc: 'Ache, sharp discomfort, or throbbing tenderness' },
                { type: 'injury', label: '2. Injury or accident', icon: Zap, desc: 'Strain, impact, twist, or sudden trauma' },
                { type: 'swelling', label: '3. Swelling or lump', icon: CircleDot, desc: 'Puffiness, visible lump, or fluid retention' },
                { type: 'cut', label: '4. Cut or wound', icon: Scissors, desc: 'Scrape, laceration, graze, or open skin' },
                { type: 'color_change', label: '5. Skin colour or appearance change', icon: Sparkles, desc: 'Redness, bruising, rash, or discoloration' },
                { type: 'numbness', label: '6. Numbness or tingling', icon: Radio, desc: 'Pins & needles, reduced sensation, or asleep feeling' },
                { type: 'stiffness', label: '7. Stiffness or movement difficulty', icon: Lock, desc: 'Restricted range of motion, tightness, or joint resistance' },
                { type: 'other', label: '8. Other / unsure', icon: HelpCircle, desc: 'Non-specific sensation or general observation' },
              ].map((item) => {
                const Icon = item.icon;
                const isChosen = selectedIssueType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    className={`glass-concern-chip ${isChosen ? 'is-selected' : ''}`}
                    onClick={() => {
                      setSelectedIssueType(item.type as PrimaryIssueType);
                      setCurrentStep('details');
                    }}
                  >
                    <div className="concern-icon-wrap">
                      <Icon size={16} />
                    </div>
                    <div className="concern-text-wrap">
                      <span className="concern-chip-name">{item.label}</span>
                      <span className="concern-chip-desc">{item.desc}</span>
                    </div>
                    <ChevronRight size={14} className="concern-chevron" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: CONTEXTUAL FOLLOW-UP QUESTIONS (Tailored to concern) */}
        {currentStep === 'details' && (
          <div className="contextual-details-view">
            <button
              type="button"
              className="glass-back-link"
              onClick={() => setCurrentStep('concern')}
            >
              <ArrowLeft size={13} />
              <span>Change Concern ({selectedIssueType.replace('_', ' ')})</span>
            </button>

            {/* SEVERITY SLIDER (For Pain, Injury, Numbness, Other) */}
            {(selectedIssueType === 'pain' || selectedIssueType === 'injury' || selectedIssueType === 'other') && (
              <div className="glass-form-group">
                <div className="glass-slider-header">
                  <span className="glass-field-label">Discomfort Severity</span>
                  <span className="glass-severity-numeric-pill">
                    {painSeverity}/10 · {painSeverity <= 3 ? 'Mild' : painSeverity <= 6 ? 'Moderate' : painSeverity <= 8 ? 'Severe' : 'Very Severe'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={painSeverity}
                  onChange={(e) => setPainSeverity(Number(e.target.value))}
                  className="glass-severity-slider"
                  aria-label="Pain severity slider 0 to 10"
                />
                <div className="glass-slider-labels">
                  <span>0 None</span>
                  <span>3 Mild</span>
                  <span>6 Moderate</span>
                  <span>10 Severe</span>
                </div>
              </div>
            )}

            {/* ONSET & DURATION CHIPS */}
            <div className="glass-form-group">
              <span className="glass-field-label">Onset / Timing</span>
              <div className="glass-pill-options-wrap">
                {['Hours ago', '1–3 days', '1–2 weeks', '> 1 month', 'Not sure'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`glass-mini-chip ${painOnset === time ? 'is-active' : ''}`}
                    onClick={() => setPainOnset(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* PAIN-SPECIFIC QUESTIONS */}
            {selectedIssueType === 'pain' && (
              <>
                <div className="glass-form-group">
                  <span className="glass-field-label">Symptom Pattern</span>
                  <div className="glass-pill-options-wrap">
                    {['Constant ache', 'Comes and goes', 'Sharp / sudden', 'Throbbing', 'Not sure'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`glass-mini-chip ${painPattern === p ? 'is-active' : ''}`}
                        onClick={() => setPainPattern(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-form-group">
                  <span className="glass-field-label">Movement Triggers</span>
                  <div className="glass-pill-options-wrap">
                    {['Worse when moving/bending', 'Worse bearing weight', 'Worse at rest', 'None noticed', 'Not sure'].map((trig) => (
                      <button
                        key={trig}
                        type="button"
                        className={`glass-mini-chip ${painTrigger === trig ? 'is-active' : ''}`}
                        onClick={() => setPainTrigger(trig)}
                      >
                        {trig}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* INJURY-SPECIFIC QUESTIONS */}
            {selectedIssueType === 'injury' && (
              <>
                <div className="glass-form-group">
                  <span className="glass-field-label">Mechanism of Incident</span>
                  <div className="glass-pill-options-wrap">
                    {['Strain / overuse', 'Fall / slip', 'Impact / collision', 'Awkward twist', 'Not sure'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`glass-mini-chip ${injuryCause === c ? 'is-active' : ''}`}
                        onClick={() => setInjuryCause(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-form-group">
                  <span className="glass-field-label">Mobility Impact</span>
                  <div className="glass-pill-options-wrap">
                    {['Normal motion', 'Mild stiffness', 'Limited range', 'Cannot bear weight', 'Not sure'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`glass-mini-chip ${injuryMobility === m ? 'is-active' : ''}`}
                        onClick={() => setInjuryMobility(m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-form-group">
                  <span className="glass-field-label">Visible Signs</span>
                  <div className="glass-pill-options-wrap">
                    {['Swelling', 'Bruising', 'Both', 'Neither', 'Not sure'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`glass-mini-chip ${injurySigns === s ? 'is-active' : ''}`}
                        onClick={() => setInjurySigns(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* SWELLING-SPECIFIC QUESTIONS */}
            {selectedIssueType === 'swelling' && (
              <>
                <div className="glass-form-group">
                  <span className="glass-field-label">Swelling Extent</span>
                  <div className="glass-pill-options-wrap">
                    {['Mild localized puffiness', 'Distinct lump / bump', 'Spreading swelling', 'Not sure'].map((ext) => (
                      <button
                        key={ext}
                        type="button"
                        className={`glass-mini-chip ${swellingExtent === ext ? 'is-active' : ''}`}
                        onClick={() => setSwellingExtent(ext)}
                      >
                        {ext}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-form-group">
                  <span className="glass-field-label">Progression</span>
                  <div className="glass-pill-options-wrap">
                    {[
                      { val: 'increasing', label: 'Getting larger' },
                      { val: 'stable', label: 'Stable' },
                      { val: 'decreasing', label: 'Decreasing' },
                    ].map((prog) => (
                      <button
                        key={prog.val}
                        type="button"
                        className={`glass-mini-chip ${swellingProgression === prog.val ? 'is-active' : ''}`}
                        onClick={() => setSwellingProgression(prog.val as any)}
                      >
                        {prog.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-form-group">
                  <span className="glass-field-label">Associated Sensations</span>
                  <div className="glass-checkbox-row">
                    <label className="glass-toggle-label">
                      <input
                        type="checkbox"
                        checked={swellingWarmth}
                        onChange={(e) => setSwellingWarmth(e.target.checked)}
                      />
                      <span>Feels unusually warm / hot to touch</span>
                    </label>
                    <label className="glass-toggle-label">
                      <input
                        type="checkbox"
                        checked={swellingRedness}
                        onChange={(e) => setSwellingRedness(e.target.checked)}
                      />
                      <span>Skin appears visibly red</span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* CUT-SPECIFIC QUESTIONS */}
            {selectedIssueType === 'cut' && (
              <>
                <div className="glass-form-group">
                  <span className="glass-field-label">Wound Depth & Type</span>
                  <div className="glass-pill-options-wrap">
                    {[
                      { val: 'superficial', label: 'Superficial scrape / graze' },
                      { val: 'deep', label: 'Deep laceration' },
                      { val: 'puncture', label: 'Puncture wound' },
                      { val: 'unsure', label: 'Not sure' },
                    ].map((d) => (
                      <button
                        key={d.val}
                        type="button"
                        className={`glass-mini-chip ${cutDepth === d.val ? 'is-active' : ''}`}
                        onClick={() => setCutDepth(d.val as any)}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-form-group">
                  <span className="glass-field-label">Bleeding Status</span>
                  <div className="glass-pill-options-wrap">
                    {[
                      { val: 'stopped', label: 'Completely stopped' },
                      { val: 'slow_ooze', label: 'Slow oozing' },
                      { val: 'active_bleeding', label: 'Active bleeding' },
                    ].map((b) => (
                      <button
                        key={b.val}
                        type="button"
                        className={`glass-mini-chip ${cutBleeding === b.val ? 'is-active' : ''}`}
                        onClick={() => setCutBleeding(b.val as any)}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* COLOR CHANGE QUESTIONS */}
            {selectedIssueType === 'color_change' && (
              <>
                <div className="glass-form-group">
                  <span className="glass-field-label">Observed Appearance</span>
                  <div className="glass-pill-options-wrap">
                    {[
                      { val: 'red', label: 'Red / rash' },
                      { val: 'blue_purple', label: 'Blue / purple bruise' },
                      { val: 'pale', label: 'Pale / white' },
                      { val: 'dark_black', label: 'Dark / pigmented' },
                      { val: 'unsure', label: 'Not sure' },
                    ].map((c) => (
                      <button
                        key={c.val}
                        type="button"
                        className={`glass-mini-chip ${skinColor === c.val ? 'is-active' : ''}`}
                        onClick={() => setSkinColor(c.val as any)}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-form-group">
                  <span className="glass-field-label">Sensation</span>
                  <div className="glass-pill-options-wrap">
                    {['Warm / burning', 'Itchy', 'Tender / painful', 'Normal sensation', 'Not sure'].map((sens) => (
                      <button
                        key={sens}
                        type="button"
                        className={`glass-mini-chip ${skinSensation === sens ? 'is-active' : ''}`}
                        onClick={() => setSkinSensation(sens)}
                      >
                        {sens}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* NUMBNESS QUESTIONS */}
            {selectedIssueType === 'numbness' && (
              <>
                <div className="glass-form-group">
                  <span className="glass-field-label">Sensation Character</span>
                  <div className="glass-pill-options-wrap">
                    {['Pins & needles (tingling)', 'Total loss of feeling', 'Cold sensation', 'Not sure'].map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={`glass-mini-chip ${numbnessSensation === n ? 'is-active' : ''}`}
                        onClick={() => setNumbnessSensation(n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-form-group">
                  <span className="glass-field-label">Frequency & Pattern</span>
                  <div className="glass-pill-options-wrap">
                    {['Constant', 'Position-dependent', 'Sleep / morning', 'Intermittent', 'Not sure'].map((np) => (
                      <button
                        key={np}
                        type="button"
                        className={`glass-mini-chip ${numbnessPattern === np ? 'is-active' : ''}`}
                        onClick={() => setNumbnessPattern(np)}
                      >
                        {np}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* STIFFNESS QUESTIONS */}
            {selectedIssueType === 'stiffness' && (
              <>
                <div className="glass-form-group">
                  <span className="glass-field-label">Stiffness Degree</span>
                  <div className="glass-pill-options-wrap">
                    {['Mild (eases with movement)', 'Moderate (restricts motion)', 'Severe / locked', 'Not sure'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        className={`glass-mini-chip ${stiffnessLevel === st ? 'is-active' : ''}`}
                        onClick={() => setStiffnessLevel(st)}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-form-group">
                  <span className="glass-field-label">Peak Time</span>
                  <div className="glass-pill-options-wrap">
                    {['Morning upon waking', 'After sitting / rest', 'End of day', 'Constant', 'Not sure'].map((tm) => (
                      <button
                        key={tm}
                        type="button"
                        className={`glass-mini-chip ${stiffnessWorstTime === tm ? 'is-active' : ''}`}
                        onClick={() => setStiffnessWorstTime(tm)}
                      >
                        {tm}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* HOME TREATMENT / INTERVENTIONS TRIED (Universal) */}
            <div className="glass-form-group">
              <span className="glass-field-label">Home Treatments or Medications Tried</span>
              <div className="glass-pill-options-wrap">
                {['Ice / cold pack', 'Heat', 'Pain relief / NSAIDs', 'Bandage / brace', 'Rest', 'None / not sure'].map((rem) => (
                  <button
                    key={rem}
                    type="button"
                    className={`glass-mini-chip ${remedies.includes(rem) ? 'is-active' : ''}`}
                    onClick={() => toggleRemedy(rem)}
                  >
                    {rem}
                  </button>
                ))}
              </div>
            </div>

            {/* OPTIONAL NOTES */}
            <div className="glass-form-group">
              <span className="glass-field-label">Additional notes for doctor (optional)</span>
              <input
                type="text"
                placeholder="e.g. sharp when bending elbow"
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
                className="glass-text-input"
              />
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW & PINNED TAG PREVIEW */}
        {currentStep === 'review' && (
          <div className="glass-review-view">
            <div className="review-tag-card">
              <div className="review-tag-header">
                <span className="review-tag-badge">Pinned Symptom Tag</span>
                <span className="review-tag-time">Session volatile memory</span>
              </div>
              <div className="review-tag-title-row">
                <h5 className="review-tag-title">{currentDisplayTitle}</h5>
                <span className="review-tag-type-pill">{selectedIssueType.toUpperCase()}</span>
              </div>
              <div className="review-summary-snippet">
                {selectedIssueType === 'pain' && (
                  <p>Pain severity {painSeverity}/10 · Onset {painOnset} · {painTrigger}</p>
                )}
                {selectedIssueType === 'injury' && (
                  <p>{injuryCause} · Timing: {injuryTimeSince} · Mobility: {injuryMobility}</p>
                )}
                {selectedIssueType === 'swelling' && (
                  <p>{swellingExtent} · {swellingProgression} · {swellingWarmth ? 'Warmth reported' : 'No warmth'}</p>
                )}
                {selectedIssueType === 'cut' && (
                  <p>{cutDepth} cut · Bleeding: {cutBleeding} · Size: {cutSize}</p>
                )}
                {selectedIssueType === 'color_change' && (
                  <p>Observed {skinColor} · Sensation: {skinSensation}</p>
                )}
                {selectedIssueType === 'numbness' && (
                  <p>{numbnessSensation} · {numbnessPattern}</p>
                )}
                {selectedIssueType === 'stiffness' && (
                  <p>{stiffnessLevel} · Worst: {stiffnessWorstTime}</p>
                )}
                {selectedIssueType === 'other' && (
                  <p>{patientNotes || 'General discomfort reported'} · Onset: {painOnset}</p>
                )}
              </div>
              {remedies.length > 0 && (
                <div className="review-remedies-row">
                  <span className="review-sub">Interventions:</span>
                  <span>{remedies.join(', ')}</span>
                </div>
              )}
            </div>

            <p className="glass-save-hint">
              This entry is attached to this body landmark with a glowing glass lens on the black stage. You can select another region to map multiple concerns.
            </p>
          </div>
        )}
      </div>

      {/* 3. Glass Action Footer */}
      <div className="glass-panel-footer">
        <div className="glass-clinical-disclaimer-note">
          <span>Your entries reflect what you report. They are not a medical diagnosis.</span>
        </div>

        {currentStep !== 'review' ? (
          <div className="glass-footer-action-row">
            <button
              type="button"
              className="glass-secondary-btn"
              onClick={() => {
                if (currentStep === 'concern') {
                  setCurrentStep('details');
                } else {
                  handleSave();
                }
              }}
            >
              Skip / Not sure
            </button>
            <button
              type="button"
              className="glass-primary-save-btn"
              onClick={handleSave}
            >
              <CheckCircle2 size={15} />
              <span>{existingIssue ? 'Update in Body Map' : 'Add to Body Map'}</span>
            </button>
          </div>
        ) : (
          <div className="glass-footer-action-row">
            {existingIssue && onDeleteIssue && (
              <button
                type="button"
                className="glass-danger-btn"
                onClick={() => {
                  onDeleteIssue(existingIssue.id);
                  setCurrentStep('concern');
                }}
                title="Remove this mapped tag"
              >
                <Trash2 size={14} />
                <span>Remove</span>
              </button>
            )}
            <button
              type="button"
              className="glass-secondary-btn"
              onClick={() => setCurrentStep('details')}
            >
              Edit Details
            </button>
            {onClose && (
              <button
                type="button"
                className="glass-done-btn"
                onClick={onClose}
              >
                Done
              </button>
            )}
            <button
              type="button"
              className="glass-doctor-brief-link-btn"
              onClick={onOpenDoctorSummary}
            >
              <FileText size={14} />
              <span>Doctor Brief ({recordedCount})</span>
            </button>
          </div>
        )}

        {isSavedFeedback && (
          <div className="glass-save-toast">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>Symptom tag attached to {selectedRegion.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default ContextualSymptomPanel;
