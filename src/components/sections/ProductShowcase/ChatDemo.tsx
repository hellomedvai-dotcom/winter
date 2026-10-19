import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  Database,
  Layers,
} from 'lucide-react';
import { CHAT_DEMO_STEPS, ChatSuggestedAnswer, ChatMessage } from '@/config/showcaseContent';
import './ChatDemo.css';

export const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_DEMO_STEPS.initialMessages);
  const [selectedChipId, setSelectedChipId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [customInputValue, setCustomInputValue] = useState<string>('');
  const [hasConfirmedMemory, setHasConfirmedMemory] = useState<boolean>(false);

  // Active extracted context list
  const [extractedEntities, setExtractedEntities] = useState<
    { label: string; value: string; isNew?: boolean }[]
  >([
    { label: 'Chief Complaint', value: 'Lightheadedness upon rapid rising' },
    { label: 'Duration', value: '14 days subacute' },
    { label: 'Postural Trigger', value: 'Sit-to-stand transition' },
  ]);

  const handleSelectSuggestedAnswer = (answer: ChatSuggestedAnswer) => {
    if (selectedChipId) return; // Prevent double trigger
    setSelectedChipId(answer.id);
    setIsTyping(true);

    // 1. Add patient message
    const patientMsg: ChatMessage = {
      id: `p-${Date.now()}`,
      sender: 'patient',
      text: answer.fullText,
      timestamp: '10:42 AM',
    };

    setMessages((prev) => [...prev, patientMsg]);

    // 2. Simulate short clinical comprehension delay then post MEDVIDHI response
    setTimeout(() => {
      setMessages((prev) => [...prev, CHAT_DEMO_STEPS.followUpResponse]);
      setIsTyping(false);

      // Add new structured entity from this answer
      setExtractedEntities((prev) => [
        ...prev,
        {
          label: answer.resultingEntity.label,
          value: answer.resultingEntity.value,
          isNew: true,
        },
      ]);
    }, 900);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputValue.trim() || selectedChipId) return;

    const patientMsg: ChatMessage = {
      id: `p-${Date.now()}`,
      sender: 'patient',
      text: customInputValue,
      timestamp: '10:42 AM',
    };

    setMessages((prev) => [...prev, patientMsg]);
    setCustomInputValue('');
    setSelectedChipId('custom');
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, CHAT_DEMO_STEPS.followUpResponse]);
      setIsTyping(false);
      setExtractedEntities((prev) => [
        ...prev,
        {
          label: 'Patient Note',
          value: 'Custom verbal clarification recorded and parsed',
          isNew: true,
        },
      ]);
    }, 900);
  };

  const handleReset = () => {
    setMessages(CHAT_DEMO_STEPS.initialMessages);
    setSelectedChipId(null);
    setIsTyping(false);
    setCustomInputValue('');
    setHasConfirmedMemory(false);
    setExtractedEntities([
      { label: 'Chief Complaint', value: 'Lightheadedness upon rapid rising' },
      { label: 'Duration', value: '14 days subacute' },
      { label: 'Postural Trigger', value: 'Sit-to-stand transition' },
    ]);
  };

  return (
    <section
      id="feature-chat"
      className="showcase-feature-section theme-dark chat-showcase-section"
      aria-label="Chat Clinical Intake Demonstration"
    >
      <div className="feature-section-inner">
        {/* Section Header */}
        <div className="dark-feature-header">
          <div className="dark-badge-row">
            <span className="dark-mint-pill">
              <MessageSquare size={13} className="pill-icon" />
              Conversational Clinical Intake
            </span>
            <span className="dark-anchor-tag">#feature-chat</span>
          </div>

          <h3 className="dark-feature-headline">
            Start with the story.{' '}
            <span className="editorial-serif dark-serif-mint">Not a form.</span>
          </h3>

          <p className="dark-feature-lead">{CHAT_DEMO_STEPS.subhead}</p>
        </div>

        {/* Coordinated Studio Card (Dialogue + Structured Extraction) */}
        <div className="chat-studio-card">
          {/* Top Control Bar */}
          <div className="chat-studio-topbar">
            <div className="dialogue-meta-left">
              <span className="status-live-dot" />
              <span className="dialogue-meta-title">Interactive Dialogue Simulation</span>
              <span className="dialogue-meta-pill">Cardiovascular &amp; Orthostatic Flow</span>
            </div>

            <button
              type="button"
              className="chat-reset-btn"
              onClick={handleReset}
              title="Reset sample conversation"
            >
              <RotateCcw size={13} />
              <span>Reset Dialogue</span>
            </button>
          </div>

          {/* Coordinated 2-Column Split */}
          <div className="chat-studio-grid">
            {/* Left: Interactive Chat Conversation Thread */}
            <div className="chat-thread-pane">
              <div className="chat-messages-container" role="log" aria-live="polite">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chat-bubble-row ${msg.sender === 'patient' ? 'is-patient' : 'is-assistant'}`}
                  >
                    <div className="chat-avatar-box">
                      {msg.sender === 'patient' ? (
                        <span className="patient-avatar-badge">You</span>
                      ) : (
                        <div className="assistant-avatar-badge">
                          <Sparkles size={14} className="avatar-icon-mint" />
                        </div>
                      )}
                    </div>

                    <div className="chat-bubble-content">
                      <div className="chat-bubble-header">
                        <span className="bubble-sender-name">
                          {msg.sender === 'patient' ? 'Patient Account' : 'MEDVIDHI Context Engine'}
                        </span>
                        <span className="bubble-timestamp">{msg.timestamp}</span>
                      </div>

                      <div className="chat-bubble-text">{msg.text}</div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="chat-bubble-row is-assistant anim-fade">
                    <div className="chat-avatar-box">
                      <div className="assistant-avatar-badge">
                        <Sparkles size={14} className="avatar-icon-mint" />
                      </div>
                    </div>
                    <div className="chat-bubble-content is-typing-bubble">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                )}
              </div>

              {/* Suggested Answer Chips */}
              <div className="chat-suggestions-area">
                <span className="suggestions-label">Select a sample answer to explore follow-up:</span>
                <div className="suggestions-chips-row">
                  {CHAT_DEMO_STEPS.suggestedAnswers.map((chip) => {
                    const isSelected = selectedChipId === chip.id;
                    return (
                      <button
                        key={chip.id}
                        type="button"
                        className={`suggestion-chip ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => handleSelectSuggestedAnswer(chip)}
                        disabled={selectedChipId !== null}
                      >
                        <span className="chip-plus">+</span>
                        <span className="chip-text">{chip.chipLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chat Input Bar */}
              <form className="chat-input-bar" onSubmit={handleCustomSend}>
                <input
                  type="text"
                  className="chat-text-input"
                  placeholder={
                    selectedChipId
                      ? 'Follow-up structured. Click Reset to test other responses.'
                      : 'Type a sample reply or select a chip above...'
                  }
                  value={customInputValue}
                  onChange={(e) => setCustomInputValue(e.target.value)}
                  disabled={selectedChipId !== null}
                  aria-label="Type sample reply"
                />
                <button
                  type="submit"
                  className="chat-send-btn"
                  disabled={!customInputValue.trim() || selectedChipId !== null}
                  aria-label="Send reply"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>

            {/* Right: Real-Time Structured Context & Proposed Health Memory Entry */}
            <div className="chat-context-pane">
              <div className="context-pane-header">
                <div className="context-header-title">
                  <Database size={15} />
                  <span>Real-Time Context Extraction</span>
                </div>
                <span className="context-tag">Continuous Stream</span>
              </div>

              {/* Extracted Entities List */}
              <div className="extracted-entities-list">
                {extractedEntities.map((entity, idx) => (
                  <div
                    key={idx}
                    className={`entity-badge-item ${entity.isNew ? 'is-highlight-entity' : ''}`}
                  >
                    <span className="entity-name">{entity.label}</span>
                    <span className="entity-val">{entity.value}</span>
                  </div>
                ))}
              </div>

              {/* Proposed Health Memory Entry Card */}
              <div className="proposed-memory-card">
                <div className="memory-card-header">
                  <div className="memory-title-row">
                    <Layers size={15} />
                    <span className="memory-card-title">
                      {CHAT_DEMO_STEPS.structuredOutput.entryTitle}
                    </span>
                  </div>
                  <span className="memory-category-tag">
                    {CHAT_DEMO_STEPS.structuredOutput.domain}
                  </span>
                </div>

                <div className="memory-items-grid">
                  {CHAT_DEMO_STEPS.structuredOutput.items.map((item, idx) => (
                    <div key={idx} className="memory-item-line">
                      <span className="item-key">{item.key}:</span>
                      <span className="item-val">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Confirm & Add to Health Memory Action */}
                <div className="memory-confirm-footer">
                  {hasConfirmedMemory ? (
                    <div className="memory-confirmed-state">
                      <CheckCircle2 size={16} />
                      <span className="confirmed-text">Stored in Longitudinal Health Memory</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="confirm-memory-btn"
                      onClick={() => setHasConfirmedMemory(true)}
                    >
                      <Sparkles size={14} />
                      <span>Confirm &amp; Add to Health Memory</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="chat-studio-footer">
            <ShieldAlert size={14} className="notice-icon" />
            <span className="notice-text">
              <strong>Scripted Demonstration:</strong> This interactive conversation is pre-scripted 
              to illustrate clinical reasoning pathways. No live AI is claiming medical autonomy.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
