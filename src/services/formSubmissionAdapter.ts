import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export interface FormSubmissionResult {
  success: boolean;
  isPreviewNotice: boolean;
  message: string;
  waitlistCount?: number;
  progressCounter?: number;
  isDuplicate?: boolean;
}

/**
 * Safely fetches the confirmed unique waitlist members count from the database function.
 * Returns null if unconfigured or if the RPC is not yet created in Supabase.
 */
export const fetchWaitlistCount = async (): Promise<number | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.rpc('get_waitlist_count');
    if (error || typeof data !== 'number') {
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

/**
 * Safely fetches the confirmed MEDVIDHI progress counter from the database function.
 * Returns null if unconfigured or if the RPC is not yet created in Supabase.
 */
export const fetchWaitlistProgressCounter = async (): Promise<number | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.rpc('get_waitlist_progress_counter');
    if (error || typeof data !== 'number') {
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

/**
 * Trims and normalizes string inputs. Returns null if empty string.
 */
const cleanString = (val?: string): string | null => {
  if (!val) return null;
  const trimmed = val.trim();
  return trimmed.length > 0 ? trimmed : null;
};

/**
 * Submits form data to the appropriate Supabase table.
 *
 * Tables:
 * - waitlist: 'waitlist_signups' (full_name, email, interest)
 * - doctor / verified_doctor: 'doctor_applications' (full_name, email, specialty, city, experience, profile_url, message)
 * - team: 'team_applications' (full_name, email, role_name, linkedin_url, portfolio_url, resume_url, message)
 */
export const submitFormToAdapter = async (
  formType: 'waitlist' | 'verified_doctor' | 'doctor' | 'team' | 'problem_sharing',
  data: Record<string, string>
): Promise<FormSubmissionResult> => {
  // Check if Supabase client is configured
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      isPreviewNotice: true,
      message:
        'Database connection not configured: Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.local.',
    };
  }

  try {
    const supabase = getSupabaseClient();

    if (formType === 'waitlist') {
      const fullName = cleanString(data.fullName || data.full_name);
      const email = cleanString(data.email)?.toLowerCase();
      const interest = cleanString(data.interest) || 'General Early Access';

      if (!email) {
        return {
          success: false,
          isPreviewNotice: false,
          message: 'A valid email address is required.',
        };
      }

      const payload: Record<string, string> = {
        email,
        full_name: fullName || 'Waitlist Member',
        interest,
      };

      const { error } = await supabase.from('waitlist_signups').insert([payload]);

      if (error) {
        if (error.code === '23505') {
          // Unique violation: user already on waitlist
          const [currentCount, currentProgress] = await Promise.all([
            fetchWaitlistCount(),
            fetchWaitlistProgressCounter(),
          ]);
          return {
            success: true,
            isPreviewNotice: false,
            isDuplicate: true,
            waitlistCount: currentCount ?? undefined,
            progressCounter: currentProgress ?? undefined,
            message: 'You are already registered on the waitlist. Thank you for your continued interest!',
          };
        }
        return {
          success: false,
          isPreviewNotice: false,
          message: error.message || 'Unable to complete waitlist registration. Please try again.',
        };
      }

      // Successful new insert: query confirmed atomic count and progress
      const [confirmedCount, confirmedProgress] = await Promise.all([
        fetchWaitlistCount(),
        fetchWaitlistProgressCounter(),
      ]);

      return {
        success: true,
        isPreviewNotice: false,
        isDuplicate: false,
        waitlistCount: confirmedCount ?? undefined,
        progressCounter: confirmedProgress ?? undefined,
        message: 'You have been successfully added to the MEDVIDHI early access waitlist.',
      };
    }

    if (formType === 'doctor' || formType === 'verified_doctor') {
      const fullName = cleanString(data.fullName || data.full_name);
      const email = cleanString(data.email)?.toLowerCase();
      const specialty = cleanString(data.specialty || data.specialisation);
      const city = cleanString(data.city);
      const experience = cleanString(data.experience);
      const profileUrl = cleanString(data.profile_url || data.profileUrl || data.phoneNumber);
      const message = cleanString(
        data.message || (formType === 'verified_doctor' ? 'Verified doctor clinical interest' : '')
      );

      if (!fullName) {
        return {
          success: false,
          isPreviewNotice: false,
          message: 'Full name is required.',
        };
      }

      if (!email) {
        return {
          success: false,
          isPreviewNotice: false,
          message: 'A valid email address is required.',
        };
      }

      if (!specialty) {
        return {
          success: false,
          isPreviewNotice: false,
          message: 'Medical specialization is required.',
        };
      }

      const payload: Record<string, string> = {
        full_name: fullName,
        email,
        specialty,
      };

      if (city) payload.city = city;
      if (experience) payload.experience = experience;
      if (profileUrl) payload.profile_url = profileUrl;
      if (message) payload.message = message;

      const { error } = await supabase.from('doctor_applications').insert([payload]);

      if (error) {
        if (error.code === '23505') {
          return {
            success: true,
            isPreviewNotice: false,
            message: 'Your doctor application has already been received. We will be in touch soon.',
          };
        }
        return {
          success: false,
          isPreviewNotice: false,
          message: error.message || 'Unable to submit doctor application. Please try again.',
        };
      }

      return {
        success: true,
        isPreviewNotice: false,
        message: 'Your application has been received. Our clinical onboarding team will review it.',
      };
    }

    if (formType === 'team') {
      const fullName = cleanString(data.fullName || data.full_name);
      const email = cleanString(data.email)?.toLowerCase();
      const roleName = cleanString(data.role_name || data.role);
      const linkedinUrl = cleanString(data.linkedin_url || data.linkedinUrl);
      const portfolioUrl = cleanString(data.portfolio_url || data.portfolioUrl || data.portfolio);
      const resumeUrl = cleanString(data.resume_url || data.resumeUrl);
      const message = cleanString(data.message);

      if (!fullName) {
        return {
          success: false,
          isPreviewNotice: false,
          message: 'Full name is required.',
        };
      }

      if (!email) {
        return {
          success: false,
          isPreviewNotice: false,
          message: 'A valid email address is required.',
        };
      }

      if (!roleName) {
        return {
          success: false,
          isPreviewNotice: false,
          message: 'Please select a role or area of interest.',
        };
      }

      const payload: Record<string, string> = {
        full_name: fullName,
        email,
        role_name: roleName,
      };

      if (linkedinUrl) payload.linkedin_url = linkedinUrl;
      if (portfolioUrl) payload.portfolio_url = portfolioUrl;
      if (resumeUrl) payload.resume_url = resumeUrl;
      if (message) payload.message = message;

      const { error } = await supabase.from('team_applications').insert([payload]);

      if (error) {
        if (error.code === '23505') {
          return {
            success: true,
            isPreviewNotice: false,
            message: 'Your application has already been received. Thank you!',
          };
        }
        return {
          success: false,
          isPreviewNotice: false,
          message: error.message || 'Unable to submit team application. Please try again.',
        };
      }

      return {
        success: true,
        isPreviewNotice: false,
        message: 'Your application has been received. Our team will review your background.',
      };
    }

    // Problem sharing fallback (preview state or custom endpoint)
    return {
      success: true,
      isPreviewNotice: false,
      message: 'Thank you for sharing your experience. We appreciate your perspective.',
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred.';
    return {
      success: false,
      isPreviewNotice: false,
      message: errorMsg,
    };
  }
};
