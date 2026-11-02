import React, { useState, useRef, useEffect } from 'react';
import { Container } from '@/components/layout/Container/Container';
import { submitFormToAdapter, FormSubmissionResult } from '@/services/formSubmissionAdapter';
import { ArrowRight, AlertCircle, Info, ShieldAlert, ChevronDown } from 'lucide-react';
import './ProblemSharingSection.css';

export interface RoleConfig {
  id: string;
  label: string;
  question: string;
  suggestions: string[];
}

const ROLES: RoleConfig[] = [
  {
    id: 'patient',
    label: 'Patient',
    question: 'What healthcare problem have you faced?',
    suggestions: [
      'Understanding what was happening',
      'Finding the right care',
      'Keeping track of health information',
      'Managing medicines',
    ],
  },
  {
    id: 'family',
    label: 'Family / Caregiver',
    question: 'What has been difficult while caring for someone?',
    suggestions: [
      "Managing someone else's care",
      'Understanding what the doctor said',
      'Keeping reports and history together',
      'Knowing what to do next',
    ],
  },
  {
    id: 'doctor',
    label: 'Doctor',
    question: 'What makes it harder to understand or care for patients?',
    suggestions: [
      'Incomplete patient history',
      'Repeated history-taking',
      'Scattered information',
      'Communication with patients',
    ],
  },
  {
    id: 'nurse',
    label: 'Nurse',
    question: 'What makes everyday patient care more difficult?',
    suggestions: [
      'Missing or changing care instructions',
      'Incomplete patient handovers',
      'Coordinating between care teams',
      'Keeping patient information organised',
    ],
  },
  {
    id: 'staff',
    label: 'Healthcare Staff',
    question: 'What healthcare workflow problem do you experience?',
    suggestions: [
      'Repeated administrative work',
      'Information scattered across systems',
      'Delays between departments',
      'Difficulty coordinating patient care',
    ],
  },
  {
    id: 'other',
    label: 'Other',
    question: 'What healthcare experience would you like to improve?',
    suggestions: [
      'Accessing reliable health guidance',
      'Understanding healthcare services',
      'Managing appointments or follow-ups',
      'Something else entirely',
    ],
  },
];

export const ProblemSharingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const problemInputRef = useRef<HTMLTextAreaElement>(null);
  const solutionInputRef = useRef<HTMLTextAreaElement>(null);

  // Viewport visibility observers
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isManifestoVisible, setIsManifestoVisible] = useState(false);

  // Interactive Form State: initial state shows role selector only
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null);
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [solutionSuggestion, setSolutionSuggestion] = useState<string>('');
  const [isOptionalExpanded, setIsOptionalExpanded] = useState<boolean>(false);

  // Validation & Submission State
  const [roleError, setRoleError] = useState<string>('');
  const [problemError, setProblemError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<FormSubmissionResult | null>(null);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  // Scroll observer for section entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSectionVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Scroll observer for manifesto entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsManifestoVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    if (manifestoRef.current) {
      observer.observe(manifestoRef.current);
    }

    return () => {
      if (manifestoRef.current) {
        observer.unobserve(manifestoRef.current);
      }
    };
  }, []);

  const currentRoleConfig = ROLES.find((r) => r.id === selectedRole);

  // Handle role selection: changes suggestions smoothly without clearing typed text
  const handleSelectRole = (roleId: string) => {
    setSelectedRole(roleId);
    if (roleError) setRoleError('');
    if (submissionResult?.isPreviewNotice) setSubmissionResult(null);

    const newRoleConfig = ROLES.find((r) => r.id === roleId);
    if (newRoleConfig && activeSuggestion && !newRoleConfig.suggestions.includes(activeSuggestion)) {
      setActiveSuggestion(null);
    }
  };

  // Handle suggestion chip click: toggle active state and append/insert starter phrase
  const handleSuggestionClick = (suggestion: string) => {
    if (activeSuggestion === suggestion) {
      setActiveSuggestion(null);
    } else {
      setActiveSuggestion(suggestion);

      setProblemDescription((prev) => {
        if (!prev || prev.trim() === '') {
          return `${suggestion}... `;
        }
        if (!prev.includes(suggestion)) {
          const trimmed = prev.trim();
          return `${trimmed}\n\n${suggestion}... `;
        }
        return prev;
      });

      if (problemError) setProblemError('');
      if (submissionResult?.isPreviewNotice) setSubmissionResult(null);

      setTimeout(() => {
        if (problemInputRef.current) {
          problemInputRef.current.focus();
          const len = problemInputRef.current.value.length;
          problemInputRef.current.setSelectionRange(len, len);
        }
      }, 30);
    }
  };

  // Submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmissionResult(null);
    let hasError = false;

    if (!selectedRole) {
      setRoleError('Please select which side you are speaking from.');
      hasError = true;
    } else {
      setRoleError('');
    }

    if (!problemDescription.trim()) {
      setProblemError('Please describe the healthcare problem or challenge you experienced.');
      hasError = true;
      if (selectedRole) {
        problemInputRef.current?.focus();
      }
    } else {
      setProblemError('');
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      const result = await submitFormToAdapter('problem_sharing', {
        role: selectedRole,
        roleLabel: currentRoleConfig?.label || selectedRole,
        problem: problemDescription.trim(),
        solution: solutionSuggestion.trim(),
      });

      setSubmissionResult(result);

      if (result.success) {
        setIsSubmittedSuccessfully(true);
      }
    } catch {
      setSubmissionResult({
        success: false,
        isPreviewNotice: false,
        message: 'A network error occurred while submitting. Your description has been kept intact.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSelectedRole('');
    setActiveSuggestion(null);
    setProblemDescription('');
    setSolutionSuggestion('');
    setIsOptionalExpanded(false);
    setRoleError('');
    setProblemError('');
    setSubmissionResult(null);
    setIsSubmittedSuccessfully(false);
  };

  return (
    <section
      ref={sectionRef}
      id="share-problem"
      className={`problem-sharing-section ${isSectionVisible ? 'is-visible' : ''}`}
      aria-labelledby="problem-sharing-heading"
    >
      <Container size="default" className="problem-sharing-container">
        {/* Section Title & Direct Introduction */}
        <header className="problem-sharing-header">
          <span className="problem-sharing-quote-pill">WHAT DOES HEALTHCARE KEEP MISSING?</span>
          <h2 id="problem-sharing-heading" className="problem-sharing-heading">
            Share a Healthcare Challenge
          </h2>
          <p className="problem-sharing-intro">
            Healthcare experiences can reveal problems that deserve better solutions. Share what you
            faced so we can understand recurring challenges and explore what could improve them.
          </p>
        </header>

        {/* Perspective Prompt & Role Selector (Always shown first) */}
        <div className="problem-perspective-block">
          <h3 className="perspective-headline">Every side of healthcare sees something different.</h3>
          <p className="perspective-subquestion">Which side are you speaking from?</p>

          <div
            className="perspective-capsules-grid"
            role="radiogroup"
            aria-label="Which side are you speaking from?"
            aria-required="true"
          >
            {ROLES.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`role-capsule-button ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleSelectRole(role.id)}
                >
                  {role.label}
                </button>
              );
            })}
          </div>

          {roleError && (
            <p className="problem-error-message" role="alert">
              <AlertCircle size={14} aria-hidden="true" />
              <span>{roleError}</span>
            </p>
          )}
        </div>

        {/* Interactive Dynamic Flow: Only revealed after a role is selected */}
        <div
          className={`problem-dynamic-flow ${
            selectedRole ? 'is-expanded' : 'is-collapsed'
          }`}
          aria-hidden={!selectedRole}
        >
          {selectedRole && currentRoleConfig && (
            <>
              {/* Role-Specific Question and Suggestion Chips */}
              <div className="role-suggestions-container">
                <div className="role-question-row">
                  <h4 className="role-specific-question">{currentRoleConfig.question}</h4>
                  <span className="role-start-anywhere">Start anywhere.</span>
                </div>

                <div
                  className="role-suggestions-grid"
                  aria-label="Suggested problem topics for this role"
                >
                  {currentRoleConfig.suggestions.map((suggestion, index) => {
                    const isActive = activeSuggestion === suggestion;
                    return (
                      <button
                        key={`${currentRoleConfig.id}-${index}`}
                        type="button"
                        className={`suggestion-chip ${isActive ? 'is-active' : ''}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        aria-pressed={isActive}
                      >
                        {suggestion}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Surface Area */}
              <div className="problem-form-surface">
                {isSubmittedSuccessfully ? (
                  /* Verified Success State */
                  <div className="problem-sharing-success" role="status" aria-live="polite">
                    <div className="problem-success-icon-badge" aria-hidden="true">
                      <svg className="success-check-svg" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="22" stroke="#000000" strokeWidth="2" />
                        <path
                          d="M15 24.5L21 30.5L33 17.5"
                          stroke="#000000"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="problem-success-heading">Your experience has a place here.</h3>
                    <p className="problem-success-subtext">
                      Every experience can reveal something worth understanding. Thank you for helping
                      us look more closely at the problems that matter.
                    </p>
                    <button
                      type="button"
                      className="problem-reset-button"
                      onClick={handleResetForm}
                    >
                      Share another problem
                    </button>
                  </div>
                ) : (
                  /* Main Interactive Form with Compact Glass UI */
                  <form onSubmit={handleSubmit} className="problem-interactive-form" noValidate>
                    {/* Main Problem Description Field */}
                    <div className="problem-field-group">
                      <div className="field-label-row">
                        <label htmlFor="problem-description-input" className="field-label">
                          Tell us what happened
                          <span className="required-star" aria-hidden="true"> *</span>
                        </label>
                      </div>

                      {/* Compact Translucent Glass Box */}
                      <div className={`glass-input-container ${problemError ? 'has-error' : ''}`}>
                        <textarea
                          id="problem-description-input"
                          ref={problemInputRef}
                          value={problemDescription}
                          onChange={(e) => {
                            setProblemDescription(e.target.value);
                            if (problemError) setProblemError('');
                            if (submissionResult?.isPreviewNotice) setSubmissionResult(null);
                          }}
                          placeholder="Describe the healthcare problem or challenge you experienced..."
                          className="glass-textarea"
                          rows={4}
                          aria-required="true"
                          aria-invalid={!!problemError}
                          aria-describedby={problemError ? 'problem-field-error' : undefined}
                        />

                        {/* Integrated Privacy Reminder */}
                        <div className="glass-privacy-bar" role="note">
                          <ShieldAlert size={14} className="privacy-icon" aria-hidden="true" />
                          <p className="privacy-text">
                            Please don't include names, phone numbers, email addresses, Aadhaar numbers,
                            patient IDs or other personally identifiable medical information.
                          </p>
                        </div>
                      </div>

                      {problemError && (
                        <p id="problem-field-error" className="problem-error-message" role="alert">
                          <AlertCircle size={14} aria-hidden="true" />
                          <span>{problemError}</span>
                        </p>
                      )}
                    </div>

                    {/* Expandable Optional Field Control */}
                    <div className="optional-expandable-wrapper">
                      <button
                        type="button"
                        className={`optional-expand-toggle ${isOptionalExpanded ? 'is-expanded' : ''}`}
                        onClick={() => setIsOptionalExpanded((prev) => !prev)}
                        aria-expanded={isOptionalExpanded}
                        aria-controls="optional-solution-container"
                      >
                        <span className="optional-toggle-text">
                          A better way to... <span className="optional-tag">(optional)</span>
                        </span>
                        <ChevronDown
                          size={14}
                          className={`optional-chevron ${isOptionalExpanded ? 'is-rotated' : ''}`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Expandable Multiline Input */}
                      {isOptionalExpanded && (
                        <div
                          id="optional-solution-container"
                          className="optional-content-expanded"
                        >
                          <div className="glass-input-container glass-compact-container">
                            <textarea
                              id="problem-solution-input"
                              ref={solutionInputRef}
                              value={solutionSuggestion}
                              onChange={(e) => {
                                setSolutionSuggestion(e.target.value);
                                if (submissionResult?.isPreviewNotice) setSubmissionResult(null);
                              }}
                              placeholder="What would have made this experience easier or better?"
                              className="glass-textarea glass-textarea-compact"
                              rows={2}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Preview Notice or Server Error Notice */}
                    {submissionResult && !submissionResult.success && (
                      <div
                        className={`problem-status-notice ${
                          submissionResult.isPreviewNotice ? 'is-preview' : 'is-error'
                        }`}
                        role="status"
                      >
                        <div className="notice-icon-col" aria-hidden="true">
                          {submissionResult.isPreviewNotice ? (
                            <Info size={15} />
                          ) : (
                            <AlertCircle size={15} />
                          )}
                        </div>
                        <div className="notice-content-col">
                          <p className="notice-heading">
                            {submissionResult.isPreviewNotice
                              ? 'Development Preview Notice'
                              : 'Submission Failed'}
                          </p>
                          <p className="notice-description">{submissionResult.message}</p>
                          {submissionResult.isPreviewNotice && (
                            <p className="notice-helper-hint">
                              To test verified success in this preview, append{' '}
                              <code>?mock_success=true</code> to the URL or configure{' '}
                              <code>VITE_SUBMISSION_ENDPOINT</code> in your environment.
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Compact Submission Action Bar */}
                    <div className="problem-action-bar">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="share-experience-cta"
                        aria-label="Share My Experience"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="submit-spinner" aria-hidden="true" />
                            <span>Sharing...</span>
                          </>
                        ) : (
                          <>
                            <span>Share My Experience</span>
                            <ArrowRight size={15} aria-hidden="true" className="submit-cta-arrow" />
                          </>
                        )}
                      </button>

                      <span className="anonymous-guarantee">
                        No account required. Anonymously shared.
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </>
          )}
        </div>

        {/* Compact Closing Manifesto & 3-Stage Process Visual */}
        <div
          ref={manifestoRef}
          className={`problem-closing-manifesto ${isManifestoVisible ? 'is-visible' : ''}`}
        >
          {/* Subtle Divider */}
          <div className="manifesto-divider" aria-hidden="true" />

          {/* Manifesto Composition */}
          <div className="manifesto-composition">
            <p className="manifesto-opening-line">We're not collecting complaints.</p>
            <h3 className="manifesto-central-statement">
              We're looking for patterns worth solving.
            </h3>
            <div className="manifesto-supporting-lines">
              <p>One experience can reveal a problem.</p>
              <p>Repeated experiences can reveal a pattern.</p>
              <p>Patterns can show us where a better answer is needed.</p>
            </div>
          </div>

          {/* Process Card with Four Lines */}
          <div className="process-visual-container">
            <div className="concluding-cadence-grid">
              <div className="cadence-line-item">
                <span className="cadence-indicator" aria-hidden="true" />
                <span className="cadence-text">You tell us.</span>
              </div>
              <div className="cadence-line-item">
                <span className="cadence-indicator" aria-hidden="true" />
                <span className="cadence-text">We listen.</span>
              </div>
              <div className="cadence-line-item">
                <span className="cadence-indicator" aria-hidden="true" />
                <span className="cadence-text">We look for patterns.</span>
              </div>
              <div className="cadence-line-item">
                <span className="cadence-indicator" aria-hidden="true" />
                <span className="cadence-text">We try to build around what matters.</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
