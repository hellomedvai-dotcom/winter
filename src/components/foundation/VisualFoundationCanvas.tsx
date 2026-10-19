import React from 'react';
import { Container } from '@/components/layout/Container/Container';
import { Badge } from '@/components/common/Badge/Badge';
import { WaitlistCard } from '@/components/features/waitlist/WaitlistCard';
import { PulseIcon, ShieldIcon, SparkleIcon } from '@/components/icons/CustomIcons';
import './VisualFoundationCanvas.css';

export const VisualFoundationCanvas: React.FC = () => {
  return (
    <div className="foundation-canvas">
      {/* Visual Foundation Header / Intro Area */}
      <section className="foundation-hero-preview">
        <Container size="default" className="foundation-hero-inner">
          <div className="foundation-badge-row">
            <Badge variant="mint" size="md" icon={<PulseIcon size={14} color="var(--color-mint-700)" />}>
              Visual Foundation • Top Navigation Phase
            </Badge>
          </div>

          <h1 className="foundation-title">
            Engineering health intelligence with{' '}
            <span className="editorial-serif">clinical precision</span> and{' '}
            <span className="editorial-serif">restrained design</span>.
          </h1>

          <p className="foundation-lead">
            MEDVIDHI is establishing the digital foundations for next-generation clinical workflows, 
            built upon strict privacy boundaries, deterministic architectures, and uncompromising clarity.
          </p>

          {/* Softly curved asymmetrical indicator cards */}
          <div className="foundation-asymmetric-strip">
            <div className="asymmetric-card card-primary">
              <div className="asymmetric-card-header">
                <span className="asymmetric-icon-box">
                  <ShieldIcon size={20} color="var(--color-charcoal-base)" />
                </span>
                <span className="asymmetric-tag">Color System</span>
              </div>
              <h3 className="asymmetric-title">Predominantly White Canvas</h3>
              <p className="asymmetric-text">
                Clean white surfaces with high contrast pure black text and monochrome accents. Zero unapproved colors.
              </p>
            </div>

            <div className="asymmetric-card card-secondary">
              <div className="asymmetric-card-header">
                <span className="asymmetric-icon-box">
                  <SparkleIcon size={20} color="var(--color-black)" />
                </span>
                <span className="asymmetric-tag">Typography</span>
              </div>
              <h3 className="asymmetric-title">Sans-Serif + <span className="editorial-serif">Editorial Accent</span></h3>
              <p className="asymmetric-text">
                Plus Jakarta Sans for analytical clarity, paired selectively with Newsreader editorial serif for elevated statements.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Integration Target: #features */}
      <section id="features" className="foundation-anchor-section">
        <Container size="default">
          <div className="anchor-panel">
            <div className="anchor-panel-content">
              <Badge variant="neutral" size="sm">
                Target: #features
              </Badge>
              <h2 className="anchor-heading">Bottom Feature Dock Destination</h2>
              <p className="anchor-subtext">
                The top capsule navigation &ldquo;Features&rdquo; button is connected to dispatch 
                <code>medvidhi:open-feature-dock</code> and scroll here smoothly. Ready for dock implementation in the next phase.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Integration Target: #how-it-works */}
      <section id="how-it-works" className="foundation-anchor-section">
        <Container size="default">
          <div className="anchor-panel">
            <div className="anchor-panel-content">
              <Badge variant="neutral" size="sm">
                Target: #how-it-works
              </Badge>
              <h2 className="anchor-heading">How It Works Destination</h2>
              <p className="anchor-subtext">
                Dedicated anchor target for the navigation capsule. Structural sections will be composed here upon instruction.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Selected Full-Black Product / Conversion Section Target: #join */}
      <section id="join" className="foundation-dark-conversion-section">
        <Container size="default">
          <div className="dark-conversion-header">
            <Badge variant="mint" size="sm">
              Conversion Section • Deep Charcoal
            </Badge>
            <h2 className="dark-conversion-heading">
              Step into the future of <span className="editorial-serif">intelligent healthcare</span>.
            </h2>
            <p className="dark-conversion-subtext">
              Experience the full-black architectural contrast specified for selected product and conversion sections.
            </p>
          </div>

          <div className="dark-waitlist-wrapper">
            <WaitlistCard />
          </div>
        </Container>
      </section>
    </div>
  );
};
