import React, { useState, useEffect } from 'react';
import {
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
  ChevronDown,
  Check,
  X,
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
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

  // Pain fields
  const [painSeverity, setPainSeverity] = useState<number>(5);
  const [painOnset, setPainOnset] = useState<string>('1–3 days');
  const [painPattern, setPainPattern] = useState<string>('Comes and goes');
  const [painTrigger, setPainTrigger] = useState<string>('Movement / bending');
  const [painCharacter, setPainCharacter] = useState<string>('Dull ache');
  const [painChanges, setPainChanges] = useState<string>('Unchanged');

  // Injury fields
  const [injuryCause, setInjuryCause] = useState<string>('Strain / overuse');
  const [injuryTimeSince, setInjuryTimeSince] = useState<string>('1–3 days ago');
  const [injuryMobility, setInjuryMobility] = useState<string>('Mild stiffness');
  const [injurySigns, setInjurySigns] = useState<string>('Neither');

  // Swelling fields
  const [swellingExtent, setSwellingExtent] = useState<string>('Mild puffiness');
  const [swellingProgression, setSwellingProgression] = useState<'increasing' | 'stable' | 'decreasing'>('stable');
  const [swellingWarmth, setSwellingWarmth] = useState<boolean>(false);
  const [swellingRedness, setSwellingRedness] = useState<boolean>(false);
  const [swellingSensation, setSwellingSensation] = useState<string>('Tender to touch');

  // Cut fields
  const [cutDepth, setCutDepth] = useState<'superficial' | 'deep' | 'puncture' | 'unsure'>('superficial');
  const [cutSize, setCutSize] = useState<'< 1 cm' | '1 - 3 cm' | '> 3 cm'>('< 1 cm');
  const [cutBleeding, setCutBleeding] = useState<'stopped' | 'slow_ooze' | 'active_bleeding'>('stopped');
  const [cutChanges, setCutChanges] = useState<string>('Clean healing');

  // Skin color fields
  const [skinColor, setSkinColor] = useState<'red' | 'blue_purple' | 'dark_black' | 'pale' | 'normal' | 'unsure'>('red');
  const [skinWarmth, setSkinWarmth] = useState<boolean>(true);
  const [skinSensation, setSkinSensation] = useState<string>('Warm / burning');
  const [skinProgression, setSkinProgression] = useState<string>('Same area');

  // Numbness fields
  const [numbnessSensation, setNumbnessSensation] = useState<string>('Pins & needles (tingling)');
  const [numbnessPattern, setNumbnessPattern] = useState<string>('Intermittent');
  const [numbnessSeverity, setNumbnessSeverity] = useState<number>(4);

  // Stiffness fields
  const [stiffnessLevel, setStiffnessLevel] = useState<string>('Moderate (restricts motion)');
  const [stiffnessWorstTime, setStiffnessWorstTime] = useState<string>('Morning upon waking');
  const [stiffnessMobility, setStiffnessMobility] = useState<string>('Difficulty bending');

  // Other fields
  const [otherDescription, setOtherDescription] = useState<string>('Unexplained ache');

  // Treatments & Notes (Universal)
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
      setActiveGroupId(null);
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
    let overlayColor = '#79D0BD';

    if (selectedIssueType === 'color_change' || skinColor === 'red' || skinWarmth || swellingRedness) {
      overlayType = 'red_overlay';
      overlayColor = '#79D0BD';
    } else if (skinColor === 'blue_purple' || injurySigns.includes('Bruising')) {
      overlayType = 'bruise_overlay';
      overlayColor = '#79D0BD';
    } else if (selectedIssueType === 'swelling') {
      overlayType = 'halo';
      overlayColor = '#79D0BD';
    } else if (selectedIssueType === 'cut') {
      overlayType = 'cut_marker';
      overlayColor = '#79D0BD';
    } else if (selectedIssueType === 'numbness') {
      overlayType = 'highlight';
      overlayColor = '#79D0BD';
    } else if (selectedIssueType === 'stiffness') {
      overlayType = 'highlight';
      overlayColor = '#79D0BD';
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
            textureChange: `${skinSensation} (${skinProgression})`,
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

  // Helper to get group list for the active concern
  interface DetailGroup {
    id: string;
    title: string;
    summaryValue: string;
    renderContent: () => React.ReactNode;
  }

  const getConcernGroups = (): DetailGroup[] => {
    switch (selectedIssueType) {
      case 'pain':
        return [
          {
            id: 'severity',
            title: 'Severity (0–10)',
            summaryValue: `${painSeverity}/10`,
            renderContent: () => (
              <div className="group-content-inner">
                <div className="glass-slider-header">
                  <span className="glass-field-label">Discomfort rating</span>
                  <span className="glass-severity-numeric-pill">
                    {painSeverity}/10 · {painSeverity <= 3 ? 'Mild' : painSeverity <= 6 ? 'Moderate' : painSeverity <= 8 ? 'Severe' : 'Very Severe'}
                  </span>
                </div>
                <div className="compact-number-scale" role="radiogroup" aria-label="Pain rating scale">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`scale-num-btn ${painSeverity === num ? 'is-selected' : ''}`}
                      onClick={() => {
                        setPainSeverity(num);
                        advanceGroup('severity');
                      }}
                      aria-label={`Severity ${num}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            ),
          },
          {
            id: 'sensation',
            title: 'Sensation Character',
            summaryValue: painCharacter,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Sharp', 'Dull ache', 'Burning', 'Throbbing', 'Tingling', 'Other / unsure'].map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    className={`glass-mini-chip ${painCharacter === ch ? 'is-active' : ''}`}
                    onClick={() => {
                      setPainCharacter(ch);
                      advanceGroup('sensation');
                    }}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'onset',
            title: 'When It Started',
            summaryValue: painOnset,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Hours ago', '1–3 days', '1–2 weeks', '> 1 month', 'Unsure'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`glass-mini-chip ${painOnset === time ? 'is-active' : ''}`}
                    onClick={() => {
                      setPainOnset(time);
                      advanceGroup('onset');
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'frequency',
            title: 'Frequency & Pattern',
            summaryValue: painPattern,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Constant ache', 'Comes and goes', 'Only during movement', 'Throbbing', 'Other / unsure'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`glass-mini-chip ${painPattern === p ? 'is-active' : ''}`}
                    onClick={() => {
                      setPainPattern(p);
                      advanceGroup('frequency');
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'triggers',
            title: 'Triggers or Relief',
            summaryValue: painTrigger,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Movement / bending', 'Bearing weight', 'Rest', 'Touch', 'None / unsure'].map((trig) => (
                  <button
                    key={trig}
                    type="button"
                    className={`glass-mini-chip ${painTrigger === trig ? 'is-active' : ''}`}
                    onClick={() => {
                      setPainTrigger(trig);
                      advanceGroup('triggers');
                    }}
                  >
                    {trig}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'changes',
            title: 'Changes Over Time',
            summaryValue: painChanges,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Improving', 'Unchanged', 'Worsening', 'Fluctuating', 'Unsure'].map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    className={`glass-mini-chip ${painChanges === ch ? 'is-active' : ''}`}
                    onClick={() => {
                      setPainChanges(ch);
                      advanceGroup('changes');
                    }}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'treatment',
            title: 'Treatment Tried',
            summaryValue: remedies.length > 0 ? remedies.join(', ') : 'None yet',
            renderContent: () => (
              <div className="group-chips-grid">
                {['Medication / NSAIDs', 'Ice / cold pack', 'Heat', 'Bandage / brace', 'Rest', 'Nothing yet', 'Unsure'].map((rem) => (
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
            ),
          },
        ];

      case 'injury':
        return [
          {
            id: 'cause',
            title: 'What Happened',
            summaryValue: injuryCause,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Strain / overuse', 'Fall / slip', 'Impact / collision', 'Awkward twist', 'Other / unsure'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`glass-mini-chip ${injuryCause === c ? 'is-active' : ''}`}
                    onClick={() => {
                      setInjuryCause(c);
                      advanceGroup('cause');
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'timeSince',
            title: 'Approximate Timing',
            summaryValue: injuryTimeSince,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Hours ago', '1–3 days ago', '1–2 weeks ago', '> 1 month', 'Unsure'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`glass-mini-chip ${injuryTimeSince === t ? 'is-active' : ''}`}
                    onClick={() => {
                      setInjuryTimeSince(t);
                      advanceGroup('timeSince');
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'mobility',
            title: 'Mobility Restriction',
            summaryValue: injuryMobility,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Normal motion', 'Mild stiffness', 'Limited range', 'Cannot bear weight', 'Unsure'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`glass-mini-chip ${injuryMobility === m ? 'is-active' : ''}`}
                    onClick={() => {
                      setInjuryMobility(m);
                      advanceGroup('mobility');
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'signs',
            title: 'Visible Signs',
            summaryValue: injurySigns,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Swelling', 'Bruising', 'Both swelling & bruising', 'Cut / graze', 'Neither', 'Unsure'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`glass-mini-chip ${injurySigns === s ? 'is-active' : ''}`}
                    onClick={() => {
                      setInjurySigns(s);
                      advanceGroup('signs');
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'severity',
            title: 'Severity (0–10)',
            summaryValue: `${painSeverity}/10`,
            renderContent: () => (
              <div className="compact-number-scale">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`scale-num-btn ${painSeverity === num ? 'is-selected' : ''}`}
                    onClick={() => {
                      setPainSeverity(num);
                      advanceGroup('severity');
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            ),
          },
        ];

      case 'swelling':
        return [
          {
            id: 'onset',
            title: 'When Noticed',
            summaryValue: painOnset,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Today', '1–3 days ago', '1–2 weeks ago', '> 1 month', 'Unsure'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`glass-mini-chip ${painOnset === t ? 'is-active' : ''}`}
                    onClick={() => {
                      setPainOnset(t);
                      advanceGroup('onset');
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'extent',
            title: 'Approximate Extent',
            summaryValue: swellingExtent,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Mild puffiness', 'Distinct lump / bump', 'Spreading swelling', 'Unsure'].map((ext) => (
                  <button
                    key={ext}
                    type="button"
                    className={`glass-mini-chip ${swellingExtent === ext ? 'is-active' : ''}`}
                    onClick={() => {
                      setSwellingExtent(ext);
                      advanceGroup('extent');
                    }}
                  >
                    {ext}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'progression',
            title: 'Changes Over Time',
            summaryValue: swellingProgression,
            renderContent: () => (
              <div className="group-chips-grid">
                {[
                  { val: 'increasing', label: 'Getting larger' },
                  { val: 'stable', label: 'Stable' },
                  { val: 'decreasing', label: 'Decreasing' },
                ].map((prog) => (
                  <button
                    key={prog.val}
                    type="button"
                    className={`glass-mini-chip ${swellingProgression === prog.val ? 'is-active' : ''}`}
                    onClick={() => {
                      setSwellingProgression(prog.val as any);
                      advanceGroup('progression');
                    }}
                  >
                    {prog.label}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'sensation',
            title: 'Relevant Sensations',
            summaryValue: swellingSensation,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Warm to touch', 'Tender / painful', 'Visibly red', 'Normal sensation', 'Unsure'].map((sens) => (
                  <button
                    key={sens}
                    type="button"
                    className={`glass-mini-chip ${swellingSensation === sens ? 'is-active' : ''}`}
                    onClick={() => {
                      setSwellingSensation(sens);
                      if (sens === 'Warm to touch') setSwellingWarmth(true);
                      if (sens === 'Visibly red') setSwellingRedness(true);
                      advanceGroup('sensation');
                    }}
                  >
                    {sens}
                  </button>
                ))}
              </div>
            ),
          },
        ];

      case 'cut':
        return [
          {
            id: 'age',
            title: 'When It Occurred',
            summaryValue: painOnset,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Hours ago', 'Today', '1–3 days ago', 'Older', 'Unsure'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`glass-mini-chip ${painOnset === t ? 'is-active' : ''}`}
                    onClick={() => {
                      setPainOnset(t);
                      advanceGroup('age');
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'appearance',
            title: 'Size & Appearance',
            summaryValue: `${cutSize} (${cutDepth})`,
            renderContent: () => (
              <div className="group-chips-grid">
                {[
                  { size: '< 1 cm', depth: 'superficial', label: '< 1 cm superficial scrape' },
                  { size: '1 - 3 cm', depth: 'superficial', label: '1–3 cm clean cut' },
                  { size: '> 3 cm', depth: 'deep', label: '> 3 cm laceration' },
                  { size: '< 1 cm', depth: 'puncture', label: 'Puncture wound' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`glass-mini-chip ${cutSize === item.size && cutDepth === item.depth ? 'is-active' : ''}`}
                    onClick={() => {
                      setCutSize(item.size as any);
                      setCutDepth(item.depth as any);
                      advanceGroup('appearance');
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'bleeding',
            title: 'Bleeding Status',
            summaryValue: cutBleeding.replace('_', ' '),
            renderContent: () => (
              <div className="group-chips-grid">
                {[
                  { val: 'stopped', label: 'Completely stopped' },
                  { val: 'slow_ooze', label: 'Slow oozing' },
                  { val: 'active_bleeding', label: 'Active bleeding' },
                ].map((b) => (
                  <button
                    key={b.val}
                    type="button"
                    className={`glass-mini-chip ${cutBleeding === b.val ? 'is-active' : ''}`}
                    onClick={() => {
                      setCutBleeding(b.val as any);
                      advanceGroup('bleeding');
                    }}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'changes',
            title: 'Changes Noticed',
            summaryValue: cutChanges,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Clean healing', 'Red / inflamed edges', 'Warm or painful', 'Discharge', 'Unsure'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`glass-mini-chip ${cutChanges === c ? 'is-active' : ''}`}
                    onClick={() => {
                      setCutChanges(c);
                      advanceGroup('changes');
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            ),
          },
        ];

      case 'color_change':
        return [
          {
            id: 'observedColor',
            title: 'What Changed',
            summaryValue: skinColor,
            renderContent: () => (
              <div className="group-chips-grid">
                {[
                  { val: 'red', label: 'Red / rash' },
                  { val: 'blue_purple', label: 'Blue / purple bruise' },
                  { val: 'pale', label: 'Pale / white' },
                  { val: 'dark_black', label: 'Dark / pigmented' },
                  { val: 'unsure', label: 'Unsure' },
                ].map((c) => (
                  <button
                    key={c.val}
                    type="button"
                    className={`glass-mini-chip ${skinColor === c.val ? 'is-active' : ''}`}
                    onClick={() => {
                      setSkinColor(c.val as any);
                      advanceGroup('observedColor');
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'onset',
            title: 'When It Began',
            summaryValue: painOnset,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Today', '1–3 days ago', '1–2 weeks', '> 1 month', 'Unsure'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`glass-mini-chip ${painOnset === t ? 'is-active' : ''}`}
                    onClick={() => {
                      setPainOnset(t);
                      advanceGroup('onset');
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'progression',
            title: 'Changes Over Time',
            summaryValue: skinProgression,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Spreading / larger', 'Same area', 'Fading / shrinking', 'Changing texture', 'Unsure'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`glass-mini-chip ${skinProgression === p ? 'is-active' : ''}`}
                    onClick={() => {
                      setSkinProgression(p);
                      advanceGroup('progression');
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'sensation',
            title: 'Sensation',
            summaryValue: skinSensation,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Warm / burning', 'Itchy', 'Tender / painful', 'Normal sensation', 'Unsure'].map((sens) => (
                  <button
                    key={sens}
                    type="button"
                    className={`glass-mini-chip ${skinSensation === sens ? 'is-active' : ''}`}
                    onClick={() => {
                      setSkinSensation(sens);
                      advanceGroup('sensation');
                    }}
                  >
                    {sens}
                  </button>
                ))}
              </div>
            ),
          },
        ];

      case 'numbness':
        return [
          {
            id: 'sensation',
            title: 'Sensation Character',
            summaryValue: numbnessSensation,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Pins & needles (tingling)', 'Total loss of feeling', 'Cold sensation', 'Buzzing', 'Unsure'].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`glass-mini-chip ${numbnessSensation === n ? 'is-active' : ''}`}
                    onClick={() => {
                      setNumbnessSensation(n);
                      advanceGroup('sensation');
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'onset',
            title: 'Onset & Timing',
            summaryValue: painOnset,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Hours ago', '1–3 days', 'Weeks ago', 'Intermittent', 'Unsure'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`glass-mini-chip ${painOnset === t ? 'is-active' : ''}`}
                    onClick={() => {
                      setPainOnset(t);
                      advanceGroup('onset');
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'pattern',
            title: 'Circumstances & Pattern',
            summaryValue: numbnessPattern,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Constant', 'Position-dependent', 'Sleep / morning', 'After activity', 'Unsure'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`glass-mini-chip ${numbnessPattern === p ? 'is-active' : ''}`}
                    onClick={() => {
                      setNumbnessPattern(p);
                      advanceGroup('pattern');
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'severity',
            title: 'Severity (0–10)',
            summaryValue: `${numbnessSeverity}/10`,
            renderContent: () => (
              <div className="compact-number-scale">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`scale-num-btn ${numbnessSeverity === num ? 'is-selected' : ''}`}
                    onClick={() => {
                      setNumbnessSeverity(num);
                      advanceGroup('severity');
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            ),
          },
        ];

      case 'stiffness':
        return [
          {
            id: 'mobility',
            title: 'Affected Movement',
            summaryValue: stiffnessMobility,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Difficulty bending', 'Locked / restricted', 'General tightness', 'Painful at limits', 'Unsure'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`glass-mini-chip ${stiffnessMobility === m ? 'is-active' : ''}`}
                    onClick={() => {
                      setStiffnessMobility(m);
                      advanceGroup('mobility');
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'onset',
            title: 'Onset & Timing',
            summaryValue: painOnset,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Hours ago', '1–3 days', '1–2 weeks', 'Chronic / recurring', 'Unsure'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`glass-mini-chip ${painOnset === t ? 'is-active' : ''}`}
                    onClick={() => {
                      setPainOnset(t);
                      advanceGroup('onset');
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'severity',
            title: 'Severity Level',
            summaryValue: stiffnessLevel,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Mild (eases with motion)', 'Moderate (restricts motion)', 'Severe / locked', 'Unsure'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`glass-mini-chip ${stiffnessLevel === s ? 'is-active' : ''}`}
                    onClick={() => {
                      setStiffnessLevel(s);
                      advanceGroup('severity');
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'worstTime',
            title: 'Triggers / Peak Time',
            summaryValue: stiffnessWorstTime,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Morning upon waking', 'After sitting / rest', 'End of day', 'Constant', 'Unsure'].map((tm) => (
                  <button
                    key={tm}
                    type="button"
                    className={`glass-mini-chip ${stiffnessWorstTime === tm ? 'is-active' : ''}`}
                    onClick={() => {
                      setStiffnessWorstTime(tm);
                      advanceGroup('worstTime');
                    }}
                  >
                    {tm}
                  </button>
                ))}
              </div>
            ),
          },
        ];

      case 'other':
      default:
        return [
          {
            id: 'description',
            title: 'Description',
            summaryValue: otherDescription,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Unexplained ache', 'Fatigue / weakness', 'Unusual sensation', 'General discomfort', 'Unsure'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`glass-mini-chip ${otherDescription === d ? 'is-active' : ''}`}
                    onClick={() => {
                      setOtherDescription(d);
                      advanceGroup('description');
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'onset',
            title: 'When Noticed',
            summaryValue: painOnset,
            renderContent: () => (
              <div className="group-chips-grid">
                {['Today', '1–3 days ago', 'Weeks ago', 'Months ago', 'Unsure'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`glass-mini-chip ${painOnset === t ? 'is-active' : ''}`}
                    onClick={() => {
                      setPainOnset(t);
                      advanceGroup('onset');
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'severity',
            title: 'Severity / Impact (0–10)',
            summaryValue: `${painSeverity}/10`,
            renderContent: () => (
              <div className="compact-number-scale">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`scale-num-btn ${painSeverity === num ? 'is-selected' : ''}`}
                    onClick={() => {
                      setPainSeverity(num);
                      advanceGroup('severity');
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            ),
          },
          {
            id: 'patientNotes',
            title: 'Notes for Physician (Optional)',
            summaryValue: patientNotes.trim() ? 'Notes added' : 'Optional',
            renderContent: () => (
              <div className="group-content-inner">
                <input
                  type="text"
                  placeholder="e.g. sharp when bending, worse at night"
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  className="glass-text-input"
                />
              </div>
            ),
          },
        ];
    }
  };

  const groups = getConcernGroups();

  // Helper to advance to next group after selection
  const advanceGroup = (currentGroupId: string) => {
    const idx = groups.findIndex((g) => g.id === currentGroupId);
    if (idx !== -1 && idx < groups.length - 1) {
      setActiveGroupId(groups[idx + 1].id);
    } else {
      // All answered: collapse to concise summary
      setActiveGroupId(null);
    }
  };

  return (
    <div className={`bodymap-symptom-flow-root ${currentStep === 'concern' ? 'is-toggles-view' : 'is-form-view'}`}>
      {/* State B: Eight compact, individually selectable liquid-glass toggle tiles with heading directly above them */}
      {currentStep === 'concern' ? (
        <div className="bodymap-concern-toggles-block" aria-label="Anatomical Concern Selection">
          <div className="mobile-sheet-drag-pill" aria-hidden="true" />
          <div className="bodymap-toggles-header">
            <h4 className="bodymap-toggles-title">What have you noticed here?</h4>
            <div className="bodymap-region-sub-badge">
              <span className="bodymap-region-name">{currentDisplayTitle}</span>
              {onClose && (
                <button
                  type="button"
                  className="bodymap-region-dismiss"
                  onClick={onClose}
                  aria-label="Dismiss selection"
                  title="Close"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          <div className="bodymap-glass-toggle-grid" role="group" aria-label="Select primary concern">
            {[
              { type: 'pain', label: 'Pain or soreness', icon: Activity },
              { type: 'injury', label: 'Injury or accident', icon: Zap },
              { type: 'swelling', label: 'Swelling or lump', icon: CircleDot },
              { type: 'cut', label: 'Cut or wound', icon: Scissors },
              { type: 'color_change', label: 'Skin colour or appearance change', icon: Sparkles },
              { type: 'numbness', label: 'Numbness or tingling', icon: Radio },
              { type: 'stiffness', label: 'Stiffness or difficulty moving', icon: Lock },
              { type: 'other', label: 'Other / unsure', icon: HelpCircle },
            ].map((item) => {
              const Icon = item.icon;
              const isChosen = selectedIssueType === item.type;
              return (
                <button
                  key={item.type}
                  type="button"
                  className={`liquid-glass-toggle-tile ${isChosen ? 'is-selected' : ''}`}
                  onClick={() => {
                    setSelectedIssueType(item.type as PrimaryIssueType);
                    setCurrentStep('details');
                    // Automatically open first group
                    const initialGroup = item.type === 'pain' ? 'severity' : item.type === 'injury' ? 'cause' : 'onset';
                    setActiveGroupId(initialGroup);
                  }}
                >
                  <div className="toggle-specular-edge" aria-hidden="true" />
                  <div className="toggle-icon-wrap">
                    <Icon size={15} />
                  </div>
                  <span className="toggle-label-text">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* State C & D: Compact Concern-Specific Detail Wizard on lightweight glass surface */
        <div className="bodymap-followup-glass-surface" role="dialog" aria-label="Symptom Details Questionnaire">
          <div className="mobile-sheet-drag-pill" aria-hidden="true" />
          {/* Surface Header */}
          <div className="followup-glass-header">
            <div className="followup-header-titles">
              <span className="followup-region-tag">{currentDisplayTitle}</span>
              <h4 className="followup-concern-heading">
                {selectedIssueType.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </h4>
            </div>
            {onClose && (
              <button
                type="button"
                className="glass-panel-close-btn"
                onClick={onClose}
                aria-label="Close symptom panel"
                title="Close"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Subnav & Progress indicator */}
          {currentStep === 'details' && (
            <div className="followup-subnav-row">
              <button
                type="button"
                className="glass-back-link"
                onClick={() => setCurrentStep('concern')}
                title="Return to the 8 concern choices"
              >
                <ArrowLeft size={13} />
                <span>Change Concern</span>
              </button>
              <span className="glass-step-count-hint">
                {groups.length} categories
              </span>
            </div>
          )}

          {/* Body: Collapsible Question Groups (Progressive Wizard) */}
          <div className="glass-panel-body-scroll">
            {currentStep === 'details' && (
              <div className="glass-accordion-groups-list" role="tablist">
                {groups.map((group) => {
                  const isOpen = activeGroupId === group.id;
                  const isAnswered = Boolean(group.summaryValue && group.summaryValue !== 'Optional' && group.summaryValue !== 'None yet');

                  return (
                    <div
                      key={group.id}
                      className={`glass-accordion-card ${isOpen ? 'is-expanded' : ''} ${isAnswered ? 'is-completed' : ''}`}
                    >
                      <button
                        type="button"
                        className="glass-accordion-header-btn"
                        onClick={() => setActiveGroupId(isOpen ? null : group.id)}
                        aria-expanded={isOpen}
                      >
                        <div className="accordion-title-col">
                          <span className={`accordion-indicator-pip ${isAnswered ? 'is-done' : ''}`}>
                            {isAnswered ? <Check size={10} /> : null}
                          </span>
                          <span className="accordion-label">{group.title}</span>
                        </div>

                        <div className="accordion-meta-col">
                          <span className="accordion-value-pill">{group.summaryValue}</span>
                          <ChevronDown size={14} className={`accordion-chevron-icon ${isOpen ? 'is-open' : ''}`} />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="glass-accordion-body-pane">
                          {group.renderContent()}
                        </div>
                      )}
                    </div>
                  );
                })}
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
                    <span className="review-tag-type-pill">{selectedIssueType.replace('_', ' ').toUpperCase()}</span>
                  </div>
                  <div className="review-summary-snippet">
                    <span className="review-metric">Severity: {painSeverity}/10</span>
                    <span className="review-sep">•</span>
                    <span className="review-metric">Onset: {painOnset}</span>
                    <span className="review-sep">•</span>
                    <span className="review-metric">{painCharacter || injuryCause || swellingExtent || skinColor}</span>
                  </div>
                </div>

                <p className="glass-save-hint">
                  This landmark is attached to this body area with a soft white glass lens and pinned tag. Tap any other body area to continue mapping.
                </p>
              </div>
            )}
          </div>

          {/* Sticky Persistent Bottom Action Footer (Requirement 4) */}
          <div className="glass-panel-sticky-footer">
            <div className="glass-footer-action-row">
              {currentStep !== 'review' ? (
                <>
                  <div className="glass-footer-nav-group">
                    <button
                      type="button"
                      className="glass-secondary-btn"
                      onClick={() => setCurrentStep('concern')}
                      title="Return to the 8 concerns"
                    >
                      <ArrowLeft size={13} />
                      <span>Back</span>
                    </button>

                    {onClose && (
                      <button
                        type="button"
                        className="glass-ghost-btn"
                        onClick={onClose}
                        title="Close without saving changes"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  <div className="glass-footer-submit-group">
                    {activeGroupId && (
                      <button
                        type="button"
                        className="glass-continue-btn"
                        onClick={() => advanceGroup(activeGroupId)}
                        title="Proceed to next category"
                      >
                        <span>Continue</span>
                      </button>
                    )}

                    <button
                      type="button"
                      className="glass-primary-save-btn"
                      onClick={handleSave}
                    >
                      <CheckCircle2 size={15} />
                      <span>{existingIssue ? 'Update in Body Map' : 'Add to Body Map'}</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>

            {isSavedFeedback && (
              <div className="glass-save-toast">
                <CheckCircle2 size={14} style={{ color: '#79D0BD' }} />
                <span>Symptom tag attached to {selectedRegion.name}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextualSymptomPanel;
