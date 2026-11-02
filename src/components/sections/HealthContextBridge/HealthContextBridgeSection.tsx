import React from 'react';
import { Container } from '@/components/layout/Container/Container';
import { Badge } from '@/components/common/Badge/Badge';
import { ExplainerVideoFrame } from './ExplainerVideoFrame';
import { Sparkles } from 'lucide-react';
import './HealthContextBridgeSection.css';

export const HealthContextBridgeSection: React.FC = () => {
  return (
    <section
      id="context-bridge"
      className="medvidhi-context-bridge"
      aria-label="Health Context Transition and Explainer"
    >
      <Container size="default" className="context-bridge-container">
        {/* Editorial Narrative Header */}
        <div className="bridge-header" data-reveal>
          <div data-reveal="fade" style={{ '--si': 0 } as React.CSSProperties} className="bridge-badge-row">
            <Badge variant="neutral" size="md" icon={<Sparkles size={13} />}>
              THE BIGGER PICTURE
            </Badge>
            <span className="bridge-editorial-microcopy">&ldquo;Small details can change the bigger picture.&rdquo;</span>
          </div>

          <h2 className="bridge-headline" data-reveal style={{ '--si': 1 } as React.CSSProperties}>
            AI is advancing.{' '}
            <span className="editorial-serif bridge-serif-accent">
              Health context still needs a better connection.
            </span>
          </h2>

          <p className="bridge-supporting-copy" data-reveal style={{ '--si': 2 } as React.CSSProperties}>
            Healthcare technology is advancing rapidly, but a person&rsquo;s health information can
            still remain scattered across symptoms, reports, medicines and previous consultations.
            MEDVIDHI is being built to help connect that context over time and support a clearer
            path toward relevant care.
          </p>
        </div>

        {/* Clear Secondary Focal Point: The Explainer Video Frame with Liquid Glass Controls */}
        <div className="bridge-video-zone" data-reveal style={{ '--si': 3 } as React.CSSProperties}>
          <ExplainerVideoFrame />
        </div>
      </Container>
    </section>
  );
};

export default HealthContextBridgeSection;

