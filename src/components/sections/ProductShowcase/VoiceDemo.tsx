import React, { useState, useEffect, useRef } from 'react';
import { Mic, Volume2, RotateCcw, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { VOICE_DEMO_CONTENT, LanguageCode } from '@/config/showcaseContent';
import './VoiceDemo.css';

type DemoState = 'idle' | 'listening' | 'understanding' | 'followup' | 'structured' | 'added';

export const VoiceDemo: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('mr'); // Default to Marathi per prompt example
  const [demoState, setDemoState] = useState<DemoState>('idle');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const currentContent = VOICE_DEMO_CONTENT[selectedLang];

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const runSimulation = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsAutoPlaying(true);
    setDemoState('listening');

    timerRef.current = window.setTimeout(() => {
      setDemoState('understanding');

      timerRef.current = window.setTimeout(() => {
        setDemoState('followup');

        timerRef.current = window.setTimeout(() => {
          setDemoState('structured');

          timerRef.current = window.setTimeout(() => {
            setDemoState('added');
            setIsAutoPlaying(false);
          }, 1400);
        }, 1600);
      }, 1600);
    }, 1800);
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsAutoPlaying(false);
    setDemoState('idle');
  };

  const handleStepClick = (state: DemoState) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsAutoPlaying(false);
    setDemoState(state);
  };

  return (
    <section
      id="feature-voice"
      className="showcase-feature-section theme-light voice-showcase-section"
      aria-label="Voice Feature Demonstration"
    >
      <div className="feature-section-inner">
        {/* Section Header */}
        <div className="dark-feature-header">
          <div className="dark-badge-row">
            <span className="dark-mint-pill">
              <Mic size={13} className="pill-icon" />
              Multilingual Voice Intake
            </span>
            <span className="dark-anchor-tag">#feature-voice</span>
          </div>

          <h3 className="dark-feature-headline">
            You can speak naturally.{' '}
            <span className="editorial-serif dark-serif-mint">MEDVIDHI structures the context.</span>
          </h3>

          <p className="dark-feature-lead">
            Patients describe pain using their mother tongue and intuitive metaphors. MEDVIDHI preserves 
            the exact spoken account while structuring clinical coordinates for healthcare professionals.
          </p>

          {/* Language Selector Controls */}
          <div className="voice-lang-bar">
            <span className="voice-lang-label">Spoken Language:</span>
            <div className="voice-lang-options" role="tablist" aria-label="Spoken language options">
              <button
                type="button"
                role="tab"
                aria-selected={selectedLang === 'en'}
                className={`voice-lang-btn ${selectedLang === 'en' ? 'is-active' : ''}`}
                onClick={() => {
                  setSelectedLang('en');
                  handleReset();
                }}
              >
                English
              </button>
              <span className="lang-pipe" aria-hidden="true">|</span>
              <button
                type="button"
                role="tab"
                aria-selected={selectedLang === 'mr'}
                className={`voice-lang-btn ${selectedLang === 'mr' ? 'is-active' : ''}`}
                onClick={() => {
                  setSelectedLang('mr');
                  handleReset();
                }}
              >
                मराठी
              </button>
              <span className="lang-pipe" aria-hidden="true">|</span>
              <button
                type="button"
                role="tab"
                aria-selected={selectedLang === 'hi'}
                className={`voice-lang-btn ${selectedLang === 'hi' ? 'is-active' : ''}`}
                onClick={() => {
                  setSelectedLang('hi');
                  handleReset();
                }}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>

        {/* Main Voice Interactive Studio Card */}
        <div className="voice-studio-card">
          {/* Top Stage Progression Indicator */}
          <div className="voice-stages-stepper">
            <button
              type="button"
              className={`stage-step-btn ${
                demoState === 'listening' || demoState === 'idle' ? 'is-active' : 'is-completed'
              }`}
              onClick={() => handleStepClick('listening')}
            >
              <span className="step-num">1</span>
              <span className="step-label">Listening</span>
            </button>
            <span className="step-arrow">→</span>
            <button
              type="button"
              className={`stage-step-btn ${
                demoState === 'understanding'
                  ? 'is-active'
                  : ['followup', 'structured', 'added'].includes(demoState)
                  ? 'is-completed'
                  : ''
              }`}
              onClick={() => handleStepClick('understanding')}
            >
              <span className="step-num">2</span>
              <span className="step-label">Understanding</span>
            </button>
            <span className="step-arrow">→</span>
            <button
              type="button"
              className={`stage-step-btn ${
                demoState === 'followup'
                  ? 'is-active'
                  : ['structured', 'added'].includes(demoState)
                  ? 'is-completed'
                  : ''
              }`}
              onClick={() => handleStepClick('followup')}
            >
              <span className="step-num">3</span>
              <span className="step-label">Follow-up</span>
            </button>
            <span className="step-arrow">→</span>
            <button
              type="button"
              className={`stage-step-btn ${
                demoState === 'structured' || demoState === 'added' ? 'is-active is-completed' : ''
              }`}
              onClick={() => handleStepClick('structured')}
            >
              <span className="step-num">4</span>
              <span className="step-label">Structured context</span>
            </button>
          </div>

          {/* Voice Interface Body */}
          <div className="voice-studio-body">
            {/* Left: Custom Microphone & Waveform Interface */}
            <div className="voice-mic-column">
              <div className="voice-mic-pod">
                {/* Glowing Pulse Aura */}
                <div className={`mic-glow-aura ${demoState === 'listening' ? 'is-pulsing' : ''}`} />

                {/* Central Microphone Button */}
                <button
                  type="button"
                  className={`voice-mic-circle ${demoState === 'listening' ? 'is-active-mic' : ''}`}
                  onClick={runSimulation}
                  aria-label={demoState === 'idle' ? 'Simulate spoken input' : 'Restart voice simulation'}
                  title="Simulate spoken input"
                >
                  <Mic size={32} className="mic-icon" />
                </button>

                {/* State Tag */}
                <div className="mic-state-badge">
                  {demoState === 'idle' && <span>Ready to Listen</span>}
                  {demoState === 'listening' && <span>Listening Spoken Input...</span>}
                  {demoState === 'understanding' && <span>Analyzing Phonetics &amp; Grammar...</span>}
                  {demoState === 'followup' && <span>Follow-up Clarification Prompt</span>}
                  {demoState === 'structured' && <span>Synthesizing Clinical Schema...</span>}
                  {demoState === 'added' && <span>Stored in Health Memory</span>}
                </div>

                {/* Animated Waveform Bars */}
                <div className="voice-waveform" aria-hidden="true">
                  {[24, 48, 70, 36, 85, 95, 60, 42, 90, 75, 40, 68, 52, 80, 45, 30].map(
                    (height, idx) => (
                      <span
                        key={idx}
                        className={`wave-bar ${demoState === 'listening' ? 'anim-wave' : ''}`}
                        style={{
                          height: demoState === 'listening' ? `${height}%` : '20%',
                          animationDelay: `${idx * 0.08}s`,
                        }}
                      />
                    )
                  )}
                </div>

                {/* Control Action Buttons */}
                <div className="voice-action-row">
                  <button
                    type="button"
                    className="voice-simulate-btn"
                    onClick={runSimulation}
                    disabled={isAutoPlaying}
                  >
                    <Volume2 size={15} />
                    <span>{demoState === 'idle' ? 'Simulate Spoken Input' : 'Replay Simulation'}</span>
                  </button>

                  {demoState !== 'idle' && (
                    <button
                      type="button"
                      className="voice-reset-btn"
                      onClick={handleReset}
                      title="Reset simulation"
                      aria-label="Reset simulation"
                    >
                      <RotateCcw size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Live Transcript & Structured Context Panel */}
            <div className="voice-results-column">
              {/* Spoken Input Box */}
              <div className="voice-speech-box">
                <div className="speech-box-header">
                  <span className="speech-box-label">
                    Spoken Account • {currentContent.nativeLabel} ({currentContent.langLabel})
                  </span>
                  <span className="speech-box-state-tag">
                    {demoState === 'idle' ? 'Sample Transcript' : 'Captured Audio Stream'}
                  </span>
                </div>

                <p className="voice-raw-input">{currentContent.rawInput}</p>

                {currentContent.phoneticHint && (
                  <p className="voice-phonetic-hint">Phonetic: &ldquo;{currentContent.phoneticHint}&rdquo;</p>
                )}
              </div>

              {/* Follow-up Question Callout (States: followup, structured, added) */}
              {(demoState === 'followup' || demoState === 'structured' || demoState === 'added') && (
                <div className="voice-followup-box">
                  <div className="followup-badge-row">
                    <Sparkles size={14} />
                    <span className="followup-title">Intelligent Follow-up Question</span>
                  </div>
                  <p className="followup-question">{currentContent.followUpQuestion}</p>
                  <p className="followup-reply-sample">
                    <span className="reply-label">Patient Clarification:</span> {currentContent.suggestedReply}
                  </p>
                </div>
              )}

              {/* Structured Context Output Card */}
              <div
                className={`voice-structured-card ${
                  ['structured', 'added'].includes(demoState) ? 'is-revealed' : 'is-pending'
                }`}
              >
                <div className="structured-card-top">
                  <span className="structured-title">Structured Context</span>
                  <span className="structured-category">Clinical Coordinate Extraction</span>
                </div>

                <div className="structured-fields-list">
                  <div className="structured-field-row">
                    <span className="field-name">Chief Presentation</span>
                    <span className="field-val highlight">Right elbow pain</span>
                  </div>
                  <div className="structured-field-row">
                    <span className="field-name">Duration</span>
                    <span className="field-val">5 days</span>
                  </div>
                  <div className="structured-field-row">
                    <span className="field-name">Aggravating Factor</span>
                    <span className="field-val">Worse while lifting</span>
                  </div>
                  <div className="structured-field-row">
                    <span className="field-name">Anatomical Target</span>
                    <span className="field-val">{currentContent.extractedContext.target}</span>
                  </div>
                </div>

                {/* Added to Health Memory Confirmation */}
                {demoState === 'added' ? (
                  <div className="added-memory-pill anim-glow">
                    <CheckCircle2 size={16} className="pill-check-icon" />
                    <span className="pill-text">Added to Health Memory</span>
                    <span className="pill-time">Just now</span>
                  </div>
                ) : (
                  <div className="pending-memory-pill">
                    <span className="pending-dot" />
                    <span>Awaiting confirmation step</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Compliance & Simulation Notice Footer */}
          <div className="voice-studio-footer">
            <ShieldAlert size={14} className="notice-icon" />
            <span className="notice-text">
              <strong>Simulated Demonstration:</strong> No microphone permissions requested or used. 
              Demonstrates intended natural language speech recognition and clinical entity structuring.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
