import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, Shield } from 'lucide-react';
import { submitFormToAdapter, FormSubmissionResult } from '@/services/formSubmissionAdapter';
import './JoinModal.css';

/**
 * Animated numerical transition component for the confirmed database progress counter.
 * Only animates once per unique confirmed submission and respects prefers-reduced-motion.
 */
interface AnimatedCounterProps {
  target: number;
  stepAmount?: number;
  isGain?: boolean;
  reduceMotion?: boolean;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  stepAmount = 1,
  isGain,
  reduceMotion,
  className = 'counter-number-value',
}) => {
  const [displayValue, setDisplayValue] = useState<number>(
    isGain && !reduceMotion ? Math.max(0, target - stepAmount) : target
  );

  useEffect(() => {
    if (!isGain || reduceMotion) {
      setDisplayValue(target);
      return;
    }
    const startVal = Math.max(0, target - stepAmount);
    const duration = 1100;
    const startTime = performance.now();

    let frameId: number;
    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (target - startVal) * ease);
      setDisplayValue(current);
      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    };

    const timer = window.setTimeout(() => {
      frameId = requestAnimationFrame(update);
    }, 200);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, [target, stepAmount, isGain, reduceMotion]);

  return <span className={className}>{displayValue.toLocaleString()}</span>;
};

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
  // Each form instance is strictly tied to initialMode
  const mode = initialMode;

  // Form field state - begins blank on open
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [acknowledged, setAcknowledged] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<FormSubmissionResult | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const [isRendered, setIsRendered] = useState<boolean>(isOpen);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  // Keep mounted long enough to play the close transition, then restore focus.
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setIsClosing(false);
      previouslyFocusedRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      return undefined;
    }
    if (!isRendered) return undefined;
    setIsClosing(true);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(
      () => {
        setIsRendered(false);
        setIsClosing(false);
        previouslyFocusedRef.current?.focus();
      },
      reduceMotion ? 0 : 180
    );
    return () => window.clearTimeout(timer);
  }, [isOpen, isRendered]);

  // Reset all state when modal opens or mode changes
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

  // Escape to close + keep keyboard focus inside the dialog while it is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Common validations: name & email
    if (mode === 'waitlist') {
      if (!formData.fullName?.trim()) {
        newErrors.fullName = 'Full name is required.';
      }
      if (!formData.email?.trim()) {
        newErrors.email = 'Email address is required.';
      } else if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    } else if (mode === 'verified_doctor') {
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
      if (res.success) {
        setFormData({});
        setAcknowledged(false);
      }
    } catch {
      setSubmissionResult({
        success: false,
        isPreviewNotice: false,
        message: 'Unable to submit application. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Role-Specific Success View
  if (submissionResult?.success) {
    const isWaitlist = mode === 'waitlist';

    return (
      <div
        className={`join-modal-backdrop ${isClosing ? 'is-closing' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Registration Confirmation"
      >
        <div
          className={`join-modal-window success-window ${isWaitlist ? 'success-window-waitlist' : ''} ${isClosing ? 'is-closing' : ''}`}
          ref={modalRef}
          tabIndex={-1}
        >
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

          <div className={`modal-body-scroll success-body ${isWaitlist ? 'success-body-waitlist' : ''}`}>
            {isWaitlist ? (
              <div className="gamified-success-composition">
                {/* Large, softly rounded, milky-white translucent glass panel */}
                <div className="gamified-milky-glass-card">
                  {/* Central light glass logo area with floating circular number badge overlapping upper right */}
                  <div className="gamified-stage-wrapper">
                    <div className="gamified-logo-capsule">
                      <img
                        src="/assets/brand/medvidhi-mark-black-transparent.png"
                        alt="MEDVIDHI"
                        className="gamified-capsule-mark"
                      />
                    </div>

                    {/* Floating circular number badge overlapping upper-right area of the central panel */}
                    <div
                      className="gamified-floating-badge"
                      aria-label={`${submissionResult.waitlistCount ?? 'Waitlist'} people joined`}
                    >
                      <div className="floating-badge-inner">
                        <span className="floating-number">
                          {submissionResult.waitlistCount !== undefined ? (
                            <AnimatedCounter
                              target={submissionResult.waitlistCount}
                              stepAmount={1}
                              isGain={!submissionResult.isDuplicate}
                              reduceMotion={
                                typeof window !== 'undefined'
                                  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
                                  : false
                              }
                              className="stat-counter-digits"
                            />
                          ) : (
                            <span className="stat-counter-digits">—</span>
                          )}
                        </span>
                        <span className="floating-caption">
                          {submissionResult.waitlistCount === 1 ? 'PERSON JOINED' : 'PEOPLE JOINED'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Clearly organised confirmation message beneath logo and number area */}
                  <div className="gamified-confirmation-message">
                    <span className="gamified-status-label">EARLY ACCESS CONFIRMED</span>
                    <h3 className="gamified-main-heading">You&rsquo;re on the MEDVIDHI waitlist</h3>
                    <p className="gamified-supporting-text">Your early-access spot is registered.</p>
                    <p className="gamified-additional-message">
                      You&rsquo;ve been successfully added to the MEDVIDHI early-access waitlist. Thank you for helping shape a more connected healthcare experience.
                    </p>

                    {/* Separate Dynamic +6 Progress Counter metric indicator */}
                    {submissionResult.progressCounter !== undefined && (
                      <div className="gamified-metric-indicator" aria-label="Development progress metric">
                        <div className="metric-indicator-pill">
                          {!submissionResult.isDuplicate && (
                            <span className="metric-gain-pill">+6 PROGRESS UNITS</span>
                          )}
                          <span className="metric-text">
                            Progress Metric:{' '}
                            <AnimatedCounter
                              target={submissionResult.progressCounter}
                              stepAmount={6}
                              isGain={!submissionResult.isDuplicate}
                              reduceMotion={
                                typeof window !== 'undefined'
                                  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
                                  : false
                              }
                              className="metric-number"
                            />{' '}
                            units
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Final highlighted, handwritten-style quote at the bottom */}
                  <div className="gamified-handwritten-footer">
                    <p className="gamified-handwritten-quote">
                      <span className="handwritten-highlight">
                        &ldquo;Your health story deserves to be seen as a whole.&rdquo;
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Authentic MEDVIDHI Logo inside Refined Black Capsule */}
                <div className="success-brand-capsule">
                  <img
                    src="/assets/brand/medvidhi-mark-white-transparent.png"
                    alt="MEDVIDHI"
                    className="success-capsule-logo"
                  />
                </div>

                {mode === 'verified_doctor' && (
                  <div className="success-content-block">
                    <span className="success-category-badge">CLINICAL INTEREST RECEIVED</span>
                    <h3 className="success-headline">Your clinical interest has been recorded.</h3>
                    <p className="success-copy">
                      {submissionResult.message || 'Thank you for connecting with MEDVIDHI. Our team will reach out with details on verified doctor review and onboarding workflows.'}
                    </p>
                    <p className="success-brand-signoff">
                      <em>The context clinicians need, before the conversation begins.</em>
                    </p>
                  </div>
                )}

                {mode === 'doctor' && (
                  <div className="success-content-block">
                    <span className="success-category-badge">DOCTOR COMMUNITY REGISTRATION</span>
                    <h3 className="success-headline">Thank you for joining our clinical network.</h3>
                    <p className="success-copy">
                      {submissionResult.message || 'We appreciate your commitment to clearer care journeys. We’ll keep you informed as our clinical tools and Doctor Brief capabilities evolve.'}
                    </p>
                    <p className="success-brand-signoff">
                      <em>Context that respects your clinical time.</em>
                    </p>
                  </div>
                )}

                {mode === 'team' && (
                  <div className="success-content-block">
                    <span className="success-category-badge">TEAM APPLICATION RECEIVED</span>
                    <h3 className="success-headline">Application submitted.</h3>
                    <p className="success-copy">
                      {submissionResult.message || 'Thank you for your interest in building MEDVIDHI. We review every application thoughtfully and will reach out if there is a strong alignment.'}
                    </p>
                    <p className="success-brand-signoff">
                      <em>Engineering the future of clinical intelligence.</em>
                    </p>
                  </div>
                )}
              </>
            )}

            <div className="success-action-row">
              <button
                type="button"
                className="success-dismiss-btn"
                onClick={onClose}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`join-modal-backdrop ${isClosing ? 'is-closing' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="floating-form-heading"
    >
      <div
        className={`join-modal-window ${isClosing ? 'is-closing' : ''}`}
        ref={modalRef}
        tabIndex={-1}
      >
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
          {/* Header Copy for Active Mode */}
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
            {/* Form A: Waitlist Form                                          */}
            {/* ============================================================== */}
            {mode === 'waitlist' && (
              <>
                <div className="form-field-group">
                  <label htmlFor="w-fullName" className="field-label">
                    Full name <span className="field-required">*</span>
                  </label>
                  <input
                    ref={firstInputRef as React.RefObject<HTMLInputElement>}
                    id="w-fullName"
                    type="text"
                    className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                    value={formData.fullName || ''}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    autoComplete="name"
                    placeholder="Your name"
                  />
                  {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="w-email" className="field-label">
                    Email address <span className="field-required">*</span>
                  </label>
                  <input
                    id="w-email"
                    type="email"
                    className={`form-input ${errors.email ? 'has-error' : ''}`}
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    autoComplete="email"
                    placeholder="you@domain.com"
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="w-interest" className="field-label">
                    Primary interest <span className="field-optional">(Optional)</span>
                  </label>
                  <select
                    id="w-interest"
                    className="form-select"
                    value={formData.interest || 'General Early Access'}
                    onChange={(e) => handleInputChange('interest', e.target.value)}
                  >
                    <option value="General Early Access">General Early Access</option>
                    <option value="Personal Health Context">Personal Health Context</option>
                    <option value="Family Caregiving">Family Caregiving</option>
                    <option value="Clinical Review / Healthcare Professional">Clinical Review / Healthcare Professional</option>
                  </select>
                </div>
              </>
            )}

            {/* ============================================================== */}
            {/* Form B: Verified Doctor Form                                   */}
            {/* ============================================================== */}
            {mode === 'verified_doctor' && (
              <>
                <div className="form-field-group">
                  <label htmlFor="vd-fullName" className="field-label">
                    Full name <span className="field-required">*</span>
                  </label>
                  <input
                    ref={firstInputRef as React.RefObject<HTMLInputElement>}
                    id="vd-fullName"
                    type="text"
                    className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                    value={formData.fullName || ''}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    autoComplete="name"
                    placeholder="Dr. Full Name"
                  />
                  {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="vd-email" className="field-label">
                    Email address <span className="field-required">*</span>
                  </label>
                  <input
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
                    placeholder="e.g. Cardiology, Neurology, General Practice"
                  />
                  {errors.specialisation && (
                    <span className="field-error">{errors.specialisation}</span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="vd-city" className="field-label">
                    City / Location <span className="field-optional">(Optional)</span>
                  </label>
                  <input
                    id="vd-city"
                    type="text"
                    className="form-input"
                    value={formData.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="e.g. Mumbai, Bangalore, Delhi"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="vd-exp" className="field-label">
                    Years of Experience <span className="field-optional">(Optional)</span>
                  </label>
                  <input
                    id="vd-exp"
                    type="text"
                    className="form-input"
                    value={formData.experience || ''}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="e.g. 10+ years"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="vd-phone" className="field-label">
                    Phone / Profile URL <span className="field-optional">(Optional)</span>
                  </label>
                  <input
                    id="vd-phone"
                    type="text"
                    className="form-input"
                    value={formData.profileUrl || formData.phoneNumber || ''}
                    onChange={(e) => handleInputChange('profileUrl', e.target.value)}
                    placeholder="Phone number or professional profile link"
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
            {/* Form C: General Doctor Form                                    */}
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
                    placeholder="Dr. Full Name"
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
                    placeholder="e.g. Internal Medicine, Pediatrics, Oncology"
                  />
                  {errors.specialisation && (
                    <span className="field-error">{errors.specialisation}</span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="d-city" className="field-label">
                    City / Location <span className="field-optional">(Optional)</span>
                  </label>
                  <input
                    id="d-city"
                    type="text"
                    className="form-input"
                    value={formData.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="e.g. Mumbai, Bangalore, Delhi"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="d-exp" className="field-label">
                    Years of Experience <span className="field-optional">(Optional)</span>
                  </label>
                  <input
                    id="d-exp"
                    type="text"
                    className="form-input"
                    value={formData.experience || ''}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="e.g. 5+ years"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="d-phone" className="field-label">
                    Phone / Profile URL <span className="field-optional">(Optional)</span>
                  </label>
                  <input
                    id="d-phone"
                    type="text"
                    className="form-input"
                    value={formData.profileUrl || formData.phoneNumber || ''}
                    onChange={(e) => handleInputChange('profileUrl', e.target.value)}
                    placeholder="Phone or profile URL"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="d-message" className="field-label">
                    Message / Clinical Context <span className="field-optional">(Optional)</span>
                  </label>
                  <textarea
                    id="d-message"
                    rows={2}
                    className="form-textarea"
                    value={formData.message || ''}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Any specific thoughts or areas you'd like to collaborate on..."
                  />
                </div>
              </>
            )}

            {/* ============================================================== */}
            {/* Form D: Core Team Application Form                             */}
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
                    placeholder="Your name"
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
                    <option value="Operations & Growth">Operations & Growth</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.role && <span className="field-error">{errors.role}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="t-linkedin" className="field-label">
                    LinkedIn profile URL <span className="field-optional">(Optional)</span>
                  </label>
                  <input
                    id="t-linkedin"
                    type="url"
                    className="form-input"
                    value={formData.linkedinUrl || ''}
                    onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="t-portfolio" className="field-label">
                    Portfolio or GitHub URL <span className="field-optional">(Optional)</span>
                  </label>
                  <input
                    id="t-portfolio"
                    type="url"
                    className="form-input"
                    value={formData.portfolio || ''}
                    onChange={(e) => handleInputChange('portfolio', e.target.value)}
                    placeholder="https://github.com/username or portfolio link"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="t-resume" className="field-label">
                    Resume or CV Link <span className="field-optional">(Optional)</span>
                  </label>
                  <input
                    id="t-resume"
                    type="url"
                    className="form-input"
                    value={formData.resumeUrl || ''}
                    onChange={(e) => handleInputChange('resumeUrl', e.target.value)}
                    placeholder="https://drive.google.com/... or resume URL"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="t-message" className="field-label">
                    Message / Why MEDVIDHI? <span className="field-optional">(Optional)</span>
                  </label>
                  <textarea
                    id="t-message"
                    rows={2}
                    className="form-textarea"
                    value={formData.message || ''}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Share what excites you about our mission..."
                  />
                </div>
              </>
            )}

            {/* Submission Status Notice */}
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
                  <span>Submitting...</span>
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
