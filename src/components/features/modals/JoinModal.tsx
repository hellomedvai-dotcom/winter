import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, Shield } from 'lucide-react';
import { submitFormToAdapter, FormSubmissionResult } from '@/services/formSubmissionAdapter';
import './JoinModal.css';

export type JoinModalMode = 'waitlist' | 'verified_doctor' | 'doctor' | 'team';

interface JoinModalProps {
  isOpen: boolean;
  initialMode?: JoinModalMode;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  initialMode = 'waitlist',
  onClose,
}) => {
  // Each form instance is strictly tied to initialMode - NO tabs to switch between roles
  const mode = initialMode;

  // Form field state - ALWAYS begins completely blank on open
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [acknowledged, setAcknowledged] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<FormSubmissionResult | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  // Reset all state when modal opens or mode changes - zero stale values or errors carried over
  useEffect(() => {
    if (isOpen) {
      setFormData({});
      setAcknowledged(false);
      setErrors({});
      setIsSubmitting(false);
      setSubmissionResult(null);

      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus first input after slight delay for transition
      const timer = window.setTimeout(() => {
        firstInputRef.current?.focus();
      }, 80);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.clearTimeout(timer);
      };
    }
  }, [isOpen, initialMode]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    // Clear preview notice if user edits inputs
    if (submissionResult && submissionResult.isPreviewNotice) {
      setSubmissionResult(null);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mode === 'waitlist') {
      if (!formData.email?.trim()) {
        newErrors.email = 'Email address is required.';
      } else if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    } else if (mode === 'verified_doctor') {
      if (!formData.email?.trim()) {
        newErrors.email = 'Email address is required.';
      } else if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
      if (!formData.specialisation?.trim()) {
        newErrors.specialisation = 'Medical specialization is required.';
      }
      if (!acknowledged) {
        newErrors.acknowledgement =
          'Please acknowledge that verified status requires subsequent credential review.';
      }
    } else if (mode === 'doctor') {
      if (!formData.fullName?.trim()) {
        newErrors.fullName = 'Full name is required.';
      }
      if (!formData.email?.trim()) {
        newErrors.email = 'Email address is required.';
      } else if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
      if (!formData.specialisation?.trim()) {
        newErrors.specialisation = 'Medical specialization is required.';
      }
    } else if (mode === 'team') {
      if (!formData.fullName?.trim()) {
        newErrors.fullName = 'Full name is required.';
      }
      if (!formData.email?.trim()) {
        newErrors.email = 'Email address is required.';
      } else if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
      if (!formData.role?.trim()) {
        newErrors.role = 'Please select a role or area of interest.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const payload: Record<string, string> = {
        ...formData,
        ...(mode === 'verified_doctor' ? { acknowledged: String(acknowledged) } : {}),
      };
      const res = await submitFormToAdapter(mode, payload);
      setSubmissionResult(res);
    } catch {
      setSubmissionResult({
        success: false,
        isPreviewNotice: true,
        message: 'Registration is not connected yet. Your details have not been submitted.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Phase 8 Role-Specific Success View
  if (submissionResult?.success) {
    return (
      <div
        className="join-modal-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Registration Confirmation"
      >
        <div className="join-modal-window success-window" ref={modalRef} tabIndex={-1}>
          {/* Top Bar with Brand Asset and Close Button */}
          <div className="join-modal-topbar">
            <div className="modal-top-tags">
              <span className="modal-brand-tag">MEDVIDHI</span>
            </div>
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          <div className="modal-body-scroll success-body">
            {/* Real Authentic MEDVIDHI Logo inside Refined Black Capsule */}
            <div className="success-brand-capsule">
              <img
                src="/assets/brand/medvidhi-mark-white-transparent.png"
                alt="MEDVIDHI"
                className="success-capsule-logo"
              />
            </div>

            {/* Role-Specific Confirmation Content */}
            {mode === 'waitlist' && (
              <div className="success-content-block">
                <span className="success-category-badge">WAITLIST REGISTRATION RECEIVED</span>
                <h3 className="success-headline">You&rsquo;re on the list.</h3>
                <p className="success-copy">
                  Thanks for your interest in MEDVIDHI. We&rsquo;ll share relevant early-access and product updates as they become available.
                </p>
                <p className="success-brand-signoff">
                  <em>Every health story deserves the right care.</em>
                </p>
              </div>
            )}

            {mode === 'verified_doctor' && (
              <div className="success-content-block">
                <span className="success-category-badge">CLINICAL INTEREST RECEIVED</span>
                <h3 className="success-headline">Your clinical interest has been recorded.</h3>
                <p className="success-copy">
                  Thank you for your interest in MEDVIDHI&rsquo;s clinical review and verified-doctor onboarding. Relevant next steps will be shared as the process becomes available.
                </p>
                <div className="success-clarification-box">
                  <Shield size={13} aria-hidden="true" />
                  <span>Verified status remains subject to medical registration credential review.</span>
                </div>
              </div>
            )}

            {mode === 'doctor' && (
              <div className="success-content-block">
                <span className="success-category-badge">DOCTOR INTEREST RECEIVED</span>
                <h3 className="success-headline">Thank you for helping shape MEDVIDHI.</h3>
                <p className="success-copy">
                  Your interest in our clinical workflow tools has been recorded. We&rsquo;ll share relevant product updates or onboarding steps as they become available.
                </p>
              </div>
            )}

            {mode === 'team' && (
              <div className="success-content-block">
                <span className="success-category-badge">TEAM APPLICATION RECEIVED</span>
                <h3 className="success-headline">Let&rsquo;s build MEDVIDHI thoughtfully.</h3>
                <p className="success-copy">
                  Thank you for your interest in the MEDVIDHI core team. We&rsquo;ll reach out with relevant next steps if your application progresses.
                </p>
              </div>
            )}

            <div className="success-action-row">
              <button type="button" className="success-close-btn" onClick={onClose}>
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Floating Form View
  return (
    <div
      className="join-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="floating-form-heading"
    >
      <div className="join-modal-window" ref={modalRef} tabIndex={-1}>
        {/* Modal Top Bar */}
        <div className="join-modal-topbar">
          <div className="modal-top-tags">
            <span className="modal-brand-tag">MEDVIDHI</span>
            <span className="modal-mode-indicator">
              {mode === 'waitlist' && 'Early Access'}
              {mode === 'verified_doctor' && 'Clinical Review'}
              {mode === 'doctor' && 'Doctor Community'}
              {mode === 'team' && 'Core Team'}
            </span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Dynamic Body */}
        <div className="modal-body-scroll">
          {/* Header Copy for Active Independent Mode */}
          <div className="mode-header-group">
            {mode === 'waitlist' && (
              <>
                <h3 id="floating-form-heading" className="mode-title">
                  Join the MEDVIDHI Waitlist
                </h3>
                <p className="mode-desc">
                  Register your interest to receive relevant early-access and product updates.
                </p>
              </>
            )}

            {mode === 'verified_doctor' && (
              <>
                <h3 id="floating-form-heading" className="mode-title">
                  Join as MEDVIDHI Verified Doctor
                </h3>
                <p className="mode-desc">
                  Register your interest in planned clinical review and verified-doctor onboarding.
                </p>
              </>
            )}

            {mode === 'doctor' && (
              <>
                <h3 id="floating-form-heading" className="mode-title">
                  Join as Doctor
                </h3>
                <p className="mode-desc">
                  Help shape practical clinical workflows built around better-organised patient context.
                </p>
              </>
            )}

            {mode === 'team' && (
              <>
                <h3 id="floating-form-heading" className="mode-title">
                  Join the MEDVIDHI Core Team
                </h3>
                <p className="mode-desc">
                  Share your interest in helping build MEDVIDHI.
                </p>
              </>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="join-dynamic-form">
            {/* ============================================================== */}
            {/* Form A: Waitlist Floating Form                                 */}
            {/* ============================================================== */}
            {mode === 'waitlist' && (
              <div className="form-field-group">
                <label htmlFor="w-email" className="field-label">
                  Email address <span className="field-required">*</span>
                </label>
                <input
                  ref={firstInputRef as React.RefObject<HTMLInputElement>}
                  id="w-email"
                  type="email"
                  className={`form-input ${errors.email ? 'has-error' : ''}`}
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  autoComplete="email"
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
            )}

            {/* ============================================================== */}
            {/* Form B: Verified Doctor Floating Form                          */}
            {/* ============================================================== */}
            {mode === 'verified_doctor' && (
              <>
                <div className="form-field-group">
                  <label htmlFor="vd-email" className="field-label">
                    Email address <span className="field-required">*</span>
                  </label>
                  <input
                    ref={firstInputRef as React.RefObject<HTMLInputElement>}
                    id="vd-email"
                    type="email"
                    className={`form-input ${errors.email ? 'has-error' : ''}`}
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    autoComplete="email"
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="vd-spec" className="field-label">
                    Medical specialization <span className="field-required">*</span>
                  </label>
                  <input
                    id="vd-spec"
                    type="text"
                    className={`form-input ${errors.specialisation ? 'has-error' : ''}`}
                    value={formData.specialisation || ''}
                    onChange={(e) => handleInputChange('specialisation', e.target.value)}
                  />
                  {errors.specialisation && (
                    <span className="field-error">{errors.specialisation}</span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="vd-phone" className="field-label">
                    Phone number <span className="field-optional">(Optional)</span>
                  </label>
                  <input
                    id="vd-phone"
                    type="tel"
                    className="form-input"
                    value={formData.phoneNumber || ''}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    autoComplete="tel"
                  />
                </div>

                {/* Required Acknowledgement Checkbox */}
                <div className={`acknowledgement-block ${errors.acknowledgement ? 'has-error' : ''}`}>
                  <label className="acknowledgement-label">
                    <input
                      type="checkbox"
                      className="acknowledgement-checkbox"
                      checked={acknowledged}
                      onChange={(e) => {
                        setAcknowledged(e.target.checked);
                        if (errors.acknowledgement) {
                          setErrors((prev) => ({ ...prev, acknowledgement: '' }));
                        }
                      }}
                    />
                    <span className="acknowledgement-text">
                      I understand that verified status requires subsequent medical registration credential review during formal onboarding.
                    </span>
                  </label>
                  {errors.acknowledgement && (
                    <span className="field-error">{errors.acknowledgement}</span>
                  )}
                </div>

                <div className="form-informational-box">
                  <Shield size={14} className="info-icon" aria-hidden="true" />
                  <p className="info-text">
                    Submitting this form registers clinical interest. It does not automatically assign verified status or create a verified clinical account.
                  </p>
                </div>
              </>
            )}

            {/* ============================================================== */}
            {/* Form C: General Doctor Floating Form                           */}
            {/* ============================================================== */}
            {mode === 'doctor' && (
              <>
                <div className="form-field-group">
                  <label htmlFor="d-fullName" className="field-label">
                    Full name <span className="field-required">*</span>
                  </label>
                  <input
                    ref={firstInputRef as React.RefObject<HTMLInputElement>}
                    id="d-fullName"
                    type="text"
                    className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                    value={formData.fullName || ''}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    autoComplete="name"
                  />
                  {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="d-email" className="field-label">
                    Email address <span className="field-required">*</span>
                  </label>
                  <input
                    id="d-email"
                    type="email"
                    className={`form-input ${errors.email ? 'has-error' : ''}`}
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    autoComplete="email"
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="d-spec" className="field-label">
                    Medical specialization <span className="field-required">*</span>
                  </label>
                  <input
                    id="d-spec"
                    type="text"
                    className={`form-input ${errors.specialisation ? 'has-error' : ''}`}
                    value={formData.specialisation || ''}
                    onChange={(e) => handleInputChange('specialisation', e.target.value)}
                  />
                  {errors.specialisation && (
                    <span className="field-error">{errors.specialisation}</span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="d-phone" className="field-label">
                    Phone number <span className="field-optional">(Optional)</span>
                  </label>
                  <input
                    id="d-phone"
                    type="tel"
                    className="form-input"
                    value={formData.phoneNumber || ''}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    autoComplete="tel"
                  />
                </div>
              </>
            )}

            {/* ============================================================== */}
            {/* Form D: Core Team Application Floating Form                    */}
            {/* ============================================================== */}
            {mode === 'team' && (
              <>
                <div className="form-field-group">
                  <label htmlFor="t-fullName" className="field-label">
                    Full name <span className="field-required">*</span>
                  </label>
                  <input
                    ref={firstInputRef as React.RefObject<HTMLInputElement>}
                    id="t-fullName"
                    type="text"
                    className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                    value={formData.fullName || ''}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    autoComplete="name"
                  />
                  {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="t-email" className="field-label">
                    Email address <span className="field-required">*</span>
                  </label>
                  <input
                    id="t-email"
                    type="email"
                    className={`form-input ${errors.email ? 'has-error' : ''}`}
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    autoComplete="email"
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="t-role" className="field-label">
                    Area of interest or role <span className="field-required">*</span>
                  </label>
                  <select
                    id="t-role"
                    className={`form-select ${errors.role ? 'has-error' : ''}`}
                    value={formData.role || ''}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                  >
                    <option value="">Select a discipline</option>
                    <option value="Full-Stack Engineering">Full-Stack Engineering</option>
                    <option value="AI/ML Engineering">AI/ML Engineering</option>
                    <option value="Product & Motion Design">Product & Motion Design</option>
                    <option value="Clinical Advisory">Clinical Advisory</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.role && <span className="field-error">{errors.role}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="t-portfolio" className="field-label">
                    Portfolio or LinkedIn URL <span className="field-optional">(Optional)</span>
                  </label>
                  <input
                    id="t-portfolio"
                    type="url"
                    className="form-input"
                    value={formData.portfolio || ''}
                    onChange={(e) => handleInputChange('portfolio', e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Submission Status Notice (Honest preview limitations / errors) */}
            {submissionResult && !submissionResult.success && (
              <div className="submission-notice-banner" role="status" aria-live="polite">
                <AlertCircle size={16} className="notice-icon" aria-hidden="true" />
                <p className="notice-message">{submissionResult.message}</p>
              </div>
            )}

            {/* Form Submit Button */}
            <div className="form-action-row">
              <button
                type="submit"
                className="join-submit-btn"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Connecting...</span>
                ) : (
                  <span>
                    {mode === 'waitlist' && 'Join Waitlist'}
                    {mode === 'verified_doctor' && 'Register Clinical Interest'}
                    {mode === 'doctor' && 'Register Doctor Interest'}
                    {mode === 'team' && 'Submit Application'}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinModal;
