/**
 * Pluggable Form Submission Adapter
 * 
 * Strict Product Boundary:
 * - Does not invent fake backend infrastructure or call unverified external endpoints.
 * - Provides a clean, decoupled interface pattern that allows the production adapter
 *   to be swapped in later without modifying UI components.
 */

import { WaitlistFormData, SubmissionResponse } from '@/types/forms';
import { validateWaitlistForm } from '@/lib/validation/formValidation';

export interface FormSubmissionAdapter {
  submitWaitlist(data: WaitlistFormData): Promise<SubmissionResponse>;
}

/**
 * Local development adapter for initial phase.
 * Simulates async delivery and validation without invoking external networks.
 */
export class LocalDevelopmentAdapter implements FormSubmissionAdapter {
  private readonly delayMs: number;

  constructor(delayMs = 600) {
    this.delayMs = delayMs;
  }

  async submitWaitlist(data: WaitlistFormData): Promise<SubmissionResponse> {
    const validation = validateWaitlistForm(data);
    if (!validation.isValid) {
      throw new Error(validation.errors.email || 'Invalid form submission data.');
    }

    // Simulate realistic async roundtrip
    await new Promise((resolve) => setTimeout(resolve, this.delayMs));

    const referenceId = `MEDV-${Date.now().toString(36).toUpperCase()}`;

    return {
      success: true,
      message: 'Access request successfully registered for MEDVIDHI technical milestones.',
      timestamp: new Date().toISOString(),
      referenceId,
    };
  }
}

/**
 * Default adapter instance for application usage.
 */
export const defaultSubmissionAdapter: FormSubmissionAdapter = new LocalDevelopmentAdapter();
