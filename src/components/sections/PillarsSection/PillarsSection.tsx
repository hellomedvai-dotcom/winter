import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container/Container';
import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { SITE_CONTENT, PillarItem } from '@/config/siteContent';
import {
  StethoscopeIcon,
  ShieldIcon,
  PulseIcon,
  SparkleIcon,
} from '@/components/icons/CustomIcons';
import './PillarsSection.css';

const renderIcon = (iconName: PillarItem['iconName']) => {
  switch (iconName) {
    case 'stethoscope':
      return <StethoscopeIcon size={24} color="var(--color-mint-500)" />;
    case 'shield':
      return <ShieldIcon size={24} color="var(--color-mint-500)" />;
    case 'pulse':
      return <PulseIcon size={24} color="var(--color-mint-500)" />;
    case 'sparkle':
      return <SparkleIcon size={24} color="var(--color-mint-500)" />;
    default:
      return <PulseIcon size={24} color="var(--color-mint-500)" />;
  }
};

export const PillarsSection: React.FC = () => {
  return (
    <section id="pillars" className="medvidhi-pillars-section">
      <Container size="default">
        <div className="pillars-header">
          <Badge variant="mint" size="sm">
            {SITE_CONTENT.pillars.sectionTag}
          </Badge>
          <h2 className="pillars-heading">{SITE_CONTENT.pillars.heading}</h2>
          <p className="pillars-description">{SITE_CONTENT.pillars.description}</p>
        </div>

        <div className="pillars-grid">
          {SITE_CONTENT.pillars.items.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card variant="interactive" className="pillar-card">
                <div className="pillar-top-row">
                  <div className="pillar-icon-box">{renderIcon(pillar.iconName)}</div>
                  <Badge variant="neutral" size="sm">
                    {pillar.badge}
                  </Badge>
                </div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-subtitle">{pillar.subtitle}</p>
                <p className="pillar-detail">{pillar.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
