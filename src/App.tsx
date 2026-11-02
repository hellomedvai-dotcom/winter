import React, { useState } from 'react';
import { FloatingCapsuleNav } from '@/components/navigation/FloatingCapsuleNav';
import { HeroSection } from '@/components/sections/HeroSection/HeroSection';
import { HealthContextBridgeSection } from '@/components/sections/HealthContextBridge/HealthContextBridgeSection';
import { ProblemsSection } from '@/components/sections/ProblemsSection/ProblemsSection';
import { MeetVidhiSection } from '@/components/sections/MeetVidhiSection/MeetVidhiSection';
import { ProductShowcase } from '@/components/sections/ProductShowcase/ProductShowcase';
import { FAQSection } from '@/components/sections/FAQSection/FAQSection';
import { FounderSection } from '@/components/sections/FoundersSection/FounderSection';
import { CoFounderSection } from '@/components/sections/FoundersSection/CoFounderSection';
import { ProblemSharingSection } from '@/components/sections/ProblemSharingSection/ProblemSharingSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection/FinalCtaSection';
import { Footer } from '@/components/layout/Footer/Footer';
import { JoinModal, JoinModalMode } from '@/components/features/modals/JoinModal';
import { useRevealScan } from '@/lib/motion/useReveal';
import { CustomCursor } from '@/components/common/CustomCursor/CustomCursor';
import './App.css';

export const App: React.FC = () => {
  useRevealScan();
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
      {/* Precision LEQB-Inspired Custom Cursor */}
      <CustomCursor />

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

        {/* 3. Meet Vidhi: Interactive 6-Stage Phone Showcase (Replaces Patient Journey & How It Works) */}
        <MeetVidhiSection />

        {/* 4. Dark Interactive Product-Feature Showcase (Features 1-7 including Health Memory, Explainer, Right Doctor) */}
        <ProductShowcase />

        {/* 5. FAQ Section: Two-panel question & answer browser */}
        <FAQSection />

        {/* 5.5. Founder Section: Vishwa S. */}
        <FounderSection />

        {/* 5.6. Co-Founder Section: Shivkumar G. */}
        <CoFounderSection />

        {/* 5.7. Healthcare Problem-Sharing Section */}
        <ProblemSharingSection />

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
