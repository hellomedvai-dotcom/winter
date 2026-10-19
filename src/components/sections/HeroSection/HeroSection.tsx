import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container/Container';
import { Button } from '@/components/common/Button/Button';
import { ArrowUpRightIcon, ChevronRightIcon } from '@/components/icons/CustomIcons';
import { SITE_CONTENT } from '@/config/siteContent';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  const { hero } = SITE_CONTENT;

  const handleScrollTo = (selector: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="medvidhi-hero" aria-label="Hero Introduction">
      <Container size="default" className="hero-editorial-container">
        {/* Confident Editorial Headline with Responsive Clamp & Controlled Line Breaks */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="hero-headline"
        >
          <span className="hero-headline-line-1">Your health, understood.</span>
          <span className="hero-headline-line-2">
            The right care, <span className="editorial-serif hero-serif-accent">within reach</span>.
          </span>
        </motion.h1>

        {/* Empathetic Supporting Statement */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-supporting-text"
        >
          {hero.supportingCopy}
        </motion.p>

        {/* Action Button Row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="hero-actions-row"
        >
          <Button
            variant="primary"
            size="lg"
            asAnchor
            href={hero.primaryCtaHref}
            onClick={handleScrollTo(hero.primaryCtaHref)}
            rightIcon={<ChevronRightIcon size={16} />}
            className="hero-primary-btn"
          >
            {hero.primaryCta}
          </Button>

          <Button
            variant="outline"
            size="lg"
            asAnchor
            href={hero.secondaryCtaHref}
            onClick={handleScrollTo(hero.secondaryCtaHref)}
            rightIcon={<ArrowUpRightIcon size={16} />}
            className="hero-secondary-btn"
          >
            {hero.secondaryCta}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};
