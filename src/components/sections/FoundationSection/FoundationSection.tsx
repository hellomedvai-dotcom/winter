import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container/Container';
import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { WaitlistCard } from '@/components/features/waitlist/WaitlistCard';
import { SITE_CONTENT } from '@/config/siteContent';
import './FoundationSection.css';

export const FoundationSection: React.FC = () => {
  return (
    <section id="architecture" className="medvidhi-foundation-section">
      <Container size="default">
        <div className="foundation-header">
          <Badge variant="mint" size="sm">
            {SITE_CONTENT.architecture.sectionTag}
          </Badge>
          <h2 className="foundation-heading">{SITE_CONTENT.architecture.heading}</h2>
          <p className="foundation-description">{SITE_CONTENT.architecture.description}</p>
        </div>

        <div className="foundation-metrics-grid">
          {SITE_CONTENT.architecture.metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card variant="default" className="metric-card">
                <span className="metric-value">{metric.value}</span>
                <span className="metric-label">{metric.label}</span>
                <p className="metric-detail">{metric.detail}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="foundation-waitlist-wrap">
          <WaitlistCard />
        </div>
      </Container>
    </section>
  );
};
