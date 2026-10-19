/**
 * Centralised Feature Dock Configuration
 * 
 * Strict Product Boundary:
 * - 6 primary features in exact order:
 *   1. Body Map (reserved integration slot)
 *   2. Voice
 *   3. Chat
 *   4. 30-Second Doctor Brief
 *   5. Health Memory
 *   6. Medical & Report Explainer
 * - Separate, distinguished Right Doctor entry
 */

export interface FeatureItem {
  id: string;
  name: string;
  shortLabel: string;
  tagline: string;
  anchor: string;
  category: 'primary' | 'specialist';
  isReserved?: boolean;
}

export const FEATURES_CONFIG: FeatureItem[] = [
  {
    id: 'body-map',
    name: 'Body Map',
    shortLabel: 'Body Map',
    tagline: 'Interactive Anatomical Region Selection',
    anchor: '#feature-body-map',
    category: 'primary',
    isReserved: true, // Reserved for legacy alpha 3D body map integration
  },
  {
    id: 'voice',
    name: 'Voice',
    shortLabel: 'Voice',
    tagline: 'Natural Conversational Speech Intake',
    anchor: '#feature-voice',
    category: 'primary',
  },
  {
    id: 'chat',
    name: 'Chat',
    shortLabel: 'Chat',
    tagline: 'Context-Aware Clinical Dialogue',
    anchor: '#feature-chat',
    category: 'primary',
  },
  {
    id: 'doctor-brief',
    name: '30-Second Doctor Brief',
    shortLabel: 'Doctor Brief',
    tagline: 'Structured Pre-Consultation Summary',
    anchor: '#feature-doctor-brief',
    category: 'primary',
  },
  {
    id: 'health-memory',
    name: 'Health Memory',
    shortLabel: 'Health Memory',
    tagline: 'Longitudinal Timeline & Sensitive Notes',
    anchor: '#feature-health-memory',
    category: 'primary',
  },
  {
    id: 'report-explainer',
    name: 'Medical & Report Explainer',
    shortLabel: 'Report Explainer',
    tagline: 'Diagnostic Translation & Clarity',
    anchor: '#feature-report-explainer',
    category: 'primary',
  },
];

export const RIGHT_DOCTOR_FEATURE: FeatureItem = {
  id: 'right-doctor',
  name: 'Right Doctor',
  shortLabel: 'Right Doctor',
  tagline: 'Specialist Alignment & Care Pathway',
  anchor: '#feature-right-doctor',
  category: 'specialist',
};
