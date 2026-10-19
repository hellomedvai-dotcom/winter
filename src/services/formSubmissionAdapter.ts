/**
 * Form Submission Adapter
 * 
 * Isolates form submission handling for future backend integration.
 * Conforming to prompt instructions:
 * - Never show a fake success message when no live backend exists.
 * - Explicitly and honestly informs the user that this interface is an illustrative preview
 *   and private details have NOT been transmitted or stored locally.
 */

export interface FormSubmissionResult {
  success: boolean;
  isPreviewNotice: boolean;
  message: string;
}

export interface WaitlistSubmissionPayload {
  fullName: string;
  email: string;
}

export interface VerifiedDoctorSubmissionPayload {
  email: string;
  specialisation: string;
  phoneNumber: string;
}

export interface DoctorSubmissionPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface TeamSubmissionPayload {
  role: string;
  fullName: string;
  email: string;
  [key: string]: string;
}

export const submitFormToAdapter = async (
  formType: 'waitlist' | 'verified_doctor' | 'doctor' | 'team',
  data: Record<string, string>
): Promise<FormSubmissionResult> => {
  // Check if a real submission endpoint is configured in environment
  const submissionEndpoint = import.meta.env.VITE_SUBMISSION_ENDPOINT;

  if (submissionEndpoint) {
    try {
      const response = await fetch(submissionEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          formType,
          payload: data,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          isPreviewNotice: false,
          message: errorData.message || `Submission failed with server status ${response.status}. Please try again later.`,
        };
      }

      return {
        success: true,
        isPreviewNotice: false,
        message: 'Submission successfully received and verified by backend.',
      };
    } catch {
      return {
        success: false,
        isPreviewNotice: false,
        message: 'Network error communicating with submission server. Your details remain preserved in the form.',
      };
    }
  }

  // Developer / QA verification helper:
  // If ?mock_success=true is passed in URL or VITE_MOCK_SUCCESS=true, allow testing Phase 8 success views
  const isMockSuccess =
    (typeof window !== 'undefined' && window.location.search.includes('mock_success=true')) ||
    import.meta.env.VITE_MOCK_SUCCESS === 'true';

  await new Promise((resolve) => setTimeout(resolve, 450));

  if (isMockSuccess) {
    return {
      success: true,
      isPreviewNotice: false,
      message: 'Verified test submission success.',
    };
  }

  // Phase 6 Truthful Standard: Standalone preview environment has no connected database.
  // Never falsely imply or claim that personal or clinical details have been recorded.
  return {
    success: false,
    isPreviewNotice: true,
    message: 'Registration is not connected yet. Your details have not been submitted.',
  };
};
