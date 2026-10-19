import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container/Container';
import { Badge } from '@/components/common/Badge/Badge';
import { ShieldIcon, PulseIcon, CheckIcon } from '@/components/icons/CustomIcons';
import { SITE_CONTENT } from '@/config/siteContent';
import './ContextGapSection.css';

export const ContextGapSection: React.FC = () => {
  const { contextGap } = SITE_CONTENT;

  return (
    <section id="context-gap" className="medvidhi-context-gap" aria-label="The Healthcare AI Gap">
      <Container size="default" className="context-gap-container">
        {/* Section Header */}
        <div className="gap-header">
          <Badge variant="neutral" size="md">
            {contextGap.eyebrow}
          </Badge>

          <h2 className="gap-headline">
            {contextGap.headlinePrefix}{' '}
            <span className="editorial-serif gap-serif-accent">
              {contextGap.headlineEditorial}
            </span>{' '}
            {contextGap.headlineSuffix}
          </h2>

          <p className="gap-lead-text">{contextGap.lead}</p>
        </div>

        {/* Visual Contrast: Isolated Q&A vs. Connected Context (Focused Dark Panel Interruption) */}
        <div className="gap-contrast-grid">
          {/* Left: Light Panel - The Isolated Question Trap */}
          <motion.div
            className="contrast-card card-isolated"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="card-top-tag">
              <span className="isolated-tag-indicator" />
              <span className="tag-label">{contextGap.isolatedView.tag}</span>
            </div>

            <h3 className="card-title">{contextGap.isolatedView.title}</h3>
            <p className="card-summary">{contextGap.isolatedView.summary}</p>

            {/* Illustrative Isolated Dialogue Fragment */}
            <div className="isolated-preview-box" aria-hidden="true">
              <div className="dialogue-bubble user-bubble">
                <span className="bubble-role">User</span>
                <p>&ldquo;Can I take this medicine with my symptoms?&rdquo;</p>
              </div>
              <div className="dialogue-bubble bot-bubble">
                <span className="bubble-role">Isolated Bot</span>
                <p>Generates generic textbook response with zero knowledge of past lab panels or drug allergies.</p>
              </div>
              <div className="isolated-loss-notice">
                <span className="notice-cross">&times;</span>
                <span>Context cleared upon session exit. Doctor visit starts from scratch.</span>
              </div>
            </div>

            <ul className="points-list">
              {contextGap.isolatedView.points.map((point) => (
                <li key={point} className="point-item isolated-point">
                  <span className="point-bullet bullet-muted">&ndash;</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Focused Black Panel Interruption - Connected Context Engine */}
          <motion.div
            className="contrast-card card-connected"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="card-top-tag dark-tag">
              <span className="connected-tag-indicator" />
              <span className="tag-label text-white">{contextGap.connectedView.tag}</span>
            </div>

            <h3 className="card-title text-white">{contextGap.connectedView.title}</h3>
            <p className="card-summary text-muted-dark">{contextGap.connectedView.summary}</p>

            {/* Illustrative Connected Context Synthesis Box */}
            <div className="connected-preview-box" aria-hidden="true">
              <div className="synthesis-header">
                <span className="synthesis-badge">Longitudinal Context Matrix</span>
                <span className="synthesis-status">Linked</span>
              </div>
              <div className="synthesis-layers">
                <div className="synthesis-layer">
                  <PulseIcon size={14} color="#A1A1AA" />
                  <span>Timeline: Symptoms documented across 3 weeks</span>
                </div>
                <div className="synthesis-layer">
                  <ShieldIcon size={14} color="#A1A1AA" />
                  <span>History: Diagnostic PDF &amp; medication sensitivities linked</span>
                </div>
                <div className="synthesis-layer highlight-layer">
                  <CheckIcon size={14} color="#000000" />
                  <span>Output: Structured Doctor Brief ready for clinical appointment</span>
                </div>
              </div>
            </div>

            <ul className="points-list">
              {contextGap.connectedView.points.map((point) => (
                <li key={point} className="point-item connected-point">
                  <span className="point-bullet bullet-white">&#10003;</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
