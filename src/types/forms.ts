/**
 * Form Types and Interfaces
 */

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface WaitlistFormData {
  email: string;
  role?: string;
  organization?: string;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  timestamp: string;
  referenceId?: string;
}

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';
