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
        <div className="bridge-header">
          <Badge variant="neutral" size="md" icon={<Sparkles size={13} />}>
            The Healthcare Context Gap
          </Badge>

          <h2 className="bridge-headline">
            AI is advancing.{' '}
            <span className="editorial-serif bridge-serif-accent">
              Health context still needs a better connection.
            </span>
          </h2>

          <p className="bridge-supporting-copy">
            Healthcare technology is advancing rapidly, but a person&rsquo;s health information can 
            still remain scattered across symptoms, reports, medicines and previous consultations. 
            MEDVIDHI is being built to help connect that context over time and support a clearer 
            path toward relevant care.
          </p>
        </div>

        {/* Clear Focal Point: The Explainer Video Frame with Retro Corner Brackets */}
        <div className="bridge-video-zone">
          <ExplainerVideoFrame
            title="MEDVIDHI — Product Story"
            caption="Video coming soon"
          />
        </div>
      </Container>
    </section>
  );
};

export default HealthContextBridgeSection;
