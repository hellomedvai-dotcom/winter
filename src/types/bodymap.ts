export type AnatomicalSide = 'left' | 'right' | 'bilateral' | 'midline';

export type BodyView = 'front' | 'back';

export type PrimaryIssueType =
  | 'pain'
  | 'injury'
  | 'swelling'
  | 'cut'
  | 'color_change'
  | 'numbness'
  | 'stiffness'
  | 'other';

export interface BodyRegionDefinition {
  id: string;
  name: string;
  anatomicalName: string;
  side: AnatomicalSide;
  parentArea: 'head' | 'chest' | 'abdomen' | 'spine' | 'arms' | 'legs' | 'hands';
  view: BodyView | 'both';
  coordinates: string;
  description: string;
  isJoint?: boolean;
  pinCoordinates?: { x: number; y: number };
}

export interface HandSubregionDefinition {
  id: string;
  name: string;
  anatomicalName: string;
  side: AnatomicalSide;
  finger: 'thumb' | 'index' | 'middle' | 'ring' | 'little' | 'palm' | 'wrist';
  part: 'tip' | 'joint' | 'base' | 'body';
  coordinates: { x: number; y: number };
}

export interface PainDetails {
  severity: number; // 0-10
  onset: string;
  frequency: string;
  character: string;
  movementImpact: string;
}

export interface InjuryDetails {
  cause: string;
  timeSince: string;
  mobilityRestriction: string;
  priorClinicalAssessment: boolean;
  previousInjuryInSameSpot: boolean;
}

export interface SwellingDetails {
  extent: string;
  onset: string;
  progression: 'increasing' | 'stable' | 'decreasing';
  associatedWarmth: boolean;
}

export interface CutDetails {
  depth: 'superficial' | 'deep' | 'puncture' | 'unsure';
  size: '< 1 cm' | '1 - 3 cm' | '> 3 cm';
  bleeding: 'stopped' | 'slow_ooze' | 'active_bleeding';
  approximateAge: string;
}

export interface SkinAppearanceDetails {
  observedColor: 'red' | 'blue_purple' | 'dark_black' | 'pale' | 'normal' | 'unsure';
  warmthReported: boolean;
  textureChange?: string;
}

export interface NumbnessDetails {
  sensation: string;
  pattern: string;
  severity: number;
}

export interface StiffnessDetails {
  severityLevel: string;
  worstTime: string;
  mobilityImpact: string;
}

export interface TreatmentHistoryDetails {
  homeRemediesTried: string[];
  occurredBefore: boolean;
  patientNotes?: string;
}

export interface RecordedRegionIssue {
  id: string;
  regionId: string;
  regionName: string;
  anatomicalName: string;
  side: AnatomicalSide;
  subregionId?: string;
  subregionName?: string;
  primaryIssue: PrimaryIssueType;
  pain?: PainDetails;
  injury?: InjuryDetails;
  swelling?: SwellingDetails;
  cut?: CutDetails;
  skinAppearance?: SkinAppearanceDetails;
  numbness?: NumbnessDetails;
  stiffness?: StiffnessDetails;
  treatmentHistory?: TreatmentHistoryDetails;
  visualOverlay: {
    type: 'highlight' | 'halo' | 'red_overlay' | 'bruise_overlay' | 'cut_marker' | 'pale_overlay';
    color: string;
    intensity: number;
    haloRadius?: number;
  };
  recordedAt: string;
}

export interface HealthMemoryRecordPayload {
  sessionToken: string;
  source: 'bodymap_spatial_intake';
  records: RecordedRegionIssue[];
  status: 'session_demo_in_memory' | 'authenticated_sync_ready';
  lastUpdated: string;
}
