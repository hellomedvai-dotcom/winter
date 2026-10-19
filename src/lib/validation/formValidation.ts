/**
 * Pure Form Validation Primitives
 * 
 * Free of external regex vulnerabilities and dependency bloat.
 */

import { FormValidationResult, WaitlistFormData } from '@/types/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Email address is required.';
  }
  if (trimmed.length > 254) {
    return 'Email address cannot exceed 254 characters.';
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Please enter a valid, complete email address.';
  }
  return null;
}

export function validateWaitlistForm(data: WaitlistFormData): FormValidationResult {
  const errors: Record<string, string> = {};

  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.email = emailError;
  }

  if (data.organization && data.organization.trim().length > 100) {
    errors.organization = 'Organization name cannot exceed 100 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
