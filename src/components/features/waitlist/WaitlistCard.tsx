import React, { useState } from 'react';
import { Card } from '@/components/common/Card/Card';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { Badge } from '@/components/common/Badge/Badge';
import { CheckIcon } from '@/components/icons/CustomIcons';
import { SITE_CONTENT } from '@/config/siteContent';
import { FormSubmissionAdapter, defaultSubmissionAdapter } from '@/lib/adapters/formSubmissionAdapter';
import { validateWaitlistForm } from '@/lib/validation/formValidation';
import { SubmissionStatus } from '@/types/forms';
import './WaitlistCard.css';

interface WaitlistCardProps {
  adapter?: FormSubmissionAdapter;
}

export const WaitlistCard: React.FC<WaitlistCardProps> = ({
  adapter = defaultSubmissionAdapter,
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = validateWaitlistForm({ email });
    if (!validation.isValid) {
      setError(validation.errors.email || 'Please enter a valid email address.');
      return;
    }

    try {
      setStatus('submitting');
      const response = await adapter.submitWaitlist({ email });
      if (response.success) {
        setStatus('success');
        setReferenceId(response.referenceId || null);
        setEmail('');
      } else {
        setStatus('error');
        setError(response.message || 'Submission could not be completed.');
      }
    } catch (err: unknown) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
  };

  return (
    <Card id="updates" variant="highlight" glow className="waitlist-card">
      <div className="waitlist-header">
        <Badge variant="neutral" size="sm">
          {SITE_CONTENT.waitlist.badge}
        </Badge>
        <h3 className="waitlist-title">{SITE_CONTENT.waitlist.title}</h3>
        <p className="waitlist-description">{SITE_CONTENT.waitlist.description}</p>
      </div>

      {status === 'success' ? (
        <div className="waitlist-success-box" role="status">
          <div className="success-icon-wrapper">
            <CheckIcon size={24} color="var(--color-bg-base)" />
          </div>
          <div className="success-content">
            <h4 className="success-heading">Access Request Confirmed</h4>
            <p className="success-message">{SITE_CONTENT.waitlist.successMessage}</p>
            {referenceId && (
              <span className="success-reference">
                Tracking ID: <code>{referenceId}</code>
              </span>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="waitlist-form" noValidate>
          <div className="waitlist-input-row">
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder={SITE_CONTENT.waitlist.emailPlaceholder}
              error={error || undefined}
              disabled={status === 'submitting'}
              required
              aria-label="Email Address for MEDVIDHI Updates"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={status === 'submitting'}
              className="waitlist-submit-btn"
            >
              {SITE_CONTENT.waitlist.buttonLabel}
            </Button>
          </div>
          <p className="waitlist-disclaimer">{SITE_CONTENT.waitlist.privacyDisclaimer}</p>
        </form>
      )}
    </Card>
  );
};
