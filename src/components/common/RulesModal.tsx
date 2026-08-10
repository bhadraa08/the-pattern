import React from 'react';
import { eventConfig } from '../../config/gameConfig';
import { audioService } from '../../services/audioService';
import { ShieldAlert, CheckSquare, X, Terminal } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmAndEnter?: () => void;
  isInitialEntry?: boolean;
}

export const RulesModal: React.FC<RulesModalProps> = ({
  isOpen,
  onClose,
  onConfirmAndEnter,
  isInitialEntry = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container cyber-card corner-bracket"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem', border: '1px solid var(--border-crimson)' }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'rgba(230, 57, 70, 0.15)',
              border: '1px solid var(--border-crimson)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-red)'
            }}>
              <ShieldAlert size={20} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', letterSpacing: '0.05em' }}>
                INVESTIGATION PROTOCOL
              </h2>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                OFFICIAL COMPETITION RULES & GUIDELINES
              </p>
            </div>
          </div>

          {!isInitialEntry && (
            <button
              onClick={() => {
                audioService.playClick();
                onClose();
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '0.25rem'
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Terminal Alert Banner */}
        <div style={{
          background: 'rgba(230, 57, 70, 0.08)',
          borderLeft: '3px solid var(--accent-red)',
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '0.65rem'
        }}>
          <Terminal size={18} color="var(--accent-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#ffb3ba', lineHeight: 1.5 }}>
            All investigator units must acknowledge the operational rules before accessing classified terminal archives. Failure to comply results in disqualification.
          </p>
        </div>

        {/* Rules List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {eventConfig.rules.map((rule, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                padding: '0.75rem 1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--accent-red)',
                background: 'rgba(230, 57, 70, 0.15)',
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {idx + 1}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {rule}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          {isInitialEntry && onConfirmAndEnter ? (
            <button
              onClick={() => {
                audioService.playAccessGranted();
                onConfirmAndEnter();
              }}
              className="cyber-btn cyber-btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem' }}
            >
              <CheckSquare size={18} />
              I UNDERSTAND — ENTER ROUND 1
            </button>
          ) : (
            <button
              onClick={() => {
                audioService.playClick();
                onClose();
              }}
              className="cyber-btn"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              DISMISS RULES
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
