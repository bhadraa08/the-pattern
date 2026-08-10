import React, { useState } from 'react';
import { eventConfig } from '../../config/gameConfig';
import { InvestigationState } from '../../services/storageService';
import { audioService } from '../../services/audioService';
import { KeyRound, RotateCcw, Eye, EyeOff, ShieldCheck, X, FastForward, CheckCircle2 } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: InvestigationState;
  onResetProgress: () => void;
  onJumpToRound: (round: InvestigationState['currentRound'], unlockedRounds: number[]) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  state,
  onResetProgress,
  onJumpToRound,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSecrets, setShowSecrets] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === eventConfig.admin.pin) {
      audioService.playAccessGranted();
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      audioService.playError();
      setErrorMsg('INVALID ORGANIZER PIN');
      setPinInput('');
    }
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    audioService.playAccessGranted();
    onResetProgress();
    setConfirmReset(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container cyber-card"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem', border: '1px solid var(--accent-red)' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(230, 57, 70, 0.2)',
              border: '1px solid var(--border-crimson)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-red)'
            }}>
              <KeyRound size={18} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', letterSpacing: '0.05em' }}>
                ORGANIZER CONTROL PANEL
              </h2>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                EVENT DEBUGGING & ANSWER KEY INSPECTION
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioService.playClick();
              onClose();
            }}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Auth Gate */}
        {!isAuthenticated ? (
          <form onSubmit={handleVerifyPin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Enter the event organizer PIN to view confidential answers and manage game state:
            </p>
            
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: admin2026)"
                className="cyber-input"
                autoFocus
              />
              {errorMsg && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-red)', marginTop: '0.4rem' }}>
                  {errorMsg}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                type="button"
                onClick={onClose}
                className="cyber-btn"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="cyber-btn cyber-btn-primary"
              >
                UNLOCK ADMIN PANEL
              </button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Answer Key Vault */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-amber)' }}>
                  <ShieldCheck size={16} />
                  CENTRALIZED ANSWER KEY (from gameConfig.ts)
                </div>
                <button
                  type="button"
                  onClick={() => setShowSecrets(!showSecrets)}
                  className="cyber-btn"
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                >
                  {showSecrets ? <EyeOff size={13} /> : <Eye size={13} />}
                  {showSecrets ? 'HIDE' : 'REVEAL'}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>ROUND 1 PASSWORD:</span>
                  <strong style={{ color: 'var(--accent-emerald)' }}>
                    {showSecrets ? eventConfig.round1.password : '••••••••'}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>ROUND 2 ACCESS KEY:</span>
                  <strong style={{ color: 'var(--accent-emerald)' }}>
                    {showSecrets ? eventConfig.round2.accessKey : '••••••••'}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>ROUND 3 CORRECT TARGET:</span>
                  <strong style={{ color: 'var(--accent-cyan)' }}>
                    {showSecrets ? `${eventConfig.round3.correctVictimId} — ${eventConfig.round3.correctVictimName}` : '••••••••'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Current Participant Progress */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem'
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                PARTICIPANT LOCAL STORAGE STATUS
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div>Current View: <span style={{ color: 'var(--accent-cyan)' }}>{state.currentRound}</span></div>
                <div>Unlocked Rounds: <span style={{ color: 'var(--accent-emerald)' }}>{JSON.stringify(state.unlockedRounds)}</span></div>
                <div>Round 1 Done: {state.round1Completed ? '✅ YES' : '❌ NO'}</div>
                <div>Round 2 Done: {state.round2Completed ? '✅ YES' : '❌ NO'}</div>
                <div>Round 3 Submitted: {state.round3Completed ? '✅ YES' : '❌ NO'}</div>
                {state.submission && (
                  <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                    <div style={{ color: 'var(--accent-amber)' }}>Submitted Target: {state.submission.targetName} ({state.submission.targetId})</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      Reasoning: "{state.submission.reasoning}"
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Round Navigation for Testing */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                <FastForward size={16} color="var(--accent-cyan)" />
                QUICK JUMP (FOR TESTING & JUDGING)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    onJumpToRound('landing', [1]);
                    onClose();
                  }}
                  className="cyber-btn"
                  style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                >
                  Landing Page
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onJumpToRound('round1', [1]);
                    onClose();
                  }}
                  className="cyber-btn"
                  style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                >
                  Round 1
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onJumpToRound('round2', [1, 2]);
                    onClose();
                  }}
                  className="cyber-btn"
                  style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                >
                  Round 2
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onJumpToRound('round3', [1, 2, 3]);
                    onClose();
                  }}
                  className="cyber-btn"
                  style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                >
                  Round 3
                </button>
              </div>
            </div>

            {/* Reset Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
              <button
                type="button"
                onClick={handleReset}
                className="cyber-btn"
                style={{
                  background: confirmReset ? 'rgba(230, 57, 70, 0.3)' : 'transparent',
                  borderColor: 'var(--accent-red)',
                  color: 'var(--accent-red)'
                }}
              >
                <RotateCcw size={15} />
                {confirmReset ? 'CONFIRM RESET ALL PROGRESS?' : 'RESET PROGRESS'}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="cyber-btn cyber-btn-primary"
              >
                <CheckCircle2 size={16} />
                CLOSE PANEL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
