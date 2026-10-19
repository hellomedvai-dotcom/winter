import React, { useState } from 'react';
import { FloatingCapsuleNav } from '@/components/navigation/FloatingCapsuleNav';
import { HeroSection } from '@/components/sections/HeroSection/HeroSection';
import { HealthContextBridgeSection } from '@/components/sections/HealthContextBridge/HealthContextBridgeSection';
import { ProblemsSection } from '@/components/sections/ProblemsSection/ProblemsSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection/HowItWorksSection';
import { ProductShowcase } from '@/components/sections/ProductShowcase/ProductShowcase';
import { FAQSection } from '@/components/sections/FAQSection/FAQSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection/FinalCtaSection';
import { Footer } from '@/components/layout/Footer/Footer';
import { JoinModal, JoinModalMode } from '@/components/features/modals/JoinModal';
import './App.css';

export const App: React.FC = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinModalMode, setJoinModalMode] = useState<JoinModalMode>('waitlist');

  const handleOpenJoinModal = (mode: JoinModalMode = 'waitlist') => {
    setJoinModalMode(mode);
    setIsJoinModalOpen(true);
  };

  const handleCloseJoinModal = () => {
    setIsJoinModalOpen(false);
  };

  return (
    <div className="medvidhi-app">
      {/* Top Floating Glass Capsule Navigation with Join Modal trigger */}
      <FloatingCapsuleNav onOpenJoin={handleOpenJoinModal} />

      {/* Main Content Flow */}
      <main id="main-content">
        {/* 1. Hero Section: Human problem before technology */}
        <HeroSection />

        {/* 1.5. Health Context Transition & Explainer Video */}
        <HealthContextBridgeSection />

        {/* 2. Problems We Solve: Progressive narrative track */}
        <ProblemsSection />

        {/* 3. How MEDVIDHI Works: 7-stage connected product journey */}
        <HowItWorksSection />

        {/* 4. Dark Interactive Product-Feature Showcase (Features 1-7 including Health Memory, Explainer, Right Doctor) */}
        <ProductShowcase />

        {/* 5. FAQ Section: Two-panel question & answer browser */}
        <FAQSection />

        {/* 6. Final Conversion CTA & 4 Distinct Entry Options */}
        <FinalCtaSection onOpenModal={handleOpenJoinModal} />
      </main>

      {/* 9. Comprehensive Monochrome Footer */}
      <Footer onOpenJoin={handleOpenJoinModal} />

      {/* Floating Join / Application Modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={handleCloseJoinModal}
        initialMode={joinModalMode}
      />
    </div>
  );
};

export default App;
