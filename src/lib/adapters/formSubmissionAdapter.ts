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
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export interface FormSubmissionAdapter {
  submitWaitlist(data: WaitlistFormData): Promise<SubmissionResponse>;
}

/**
 * Pluggable form submission adapter that uses Supabase when configured,
 * or simulates async delivery safely when environment variables are not set.
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

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseClient();
        const email = data.email.trim().toLowerCase();
        const payload = {
          email,
          full_name: 'Waitlist Member',
          interest: 'General Early Access',
        };
        const { error } = await supabase.from('waitlist_signups').insert([payload]);
        if (error && error.code !== '23505') {
          throw new Error(error.message || 'Unable to submit waitlist registration.');
        }
      } catch (err: unknown) {
        if (err instanceof Error) throw err;
        throw new Error('Database connection failed.');
      }
    } else {
      // Simulate realistic async roundtrip when unconfigured
      await new Promise((resolve) => setTimeout(resolve, this.delayMs));
    }

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
