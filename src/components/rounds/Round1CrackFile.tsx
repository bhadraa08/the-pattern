import React, { useState } from 'react';
import { eventConfig } from '../../config/gameConfig';
import { audioService } from '../../services/audioService';
import { Lock, Unlock, FileText, Terminal, AlertCircle, CheckCircle2, Hash, HardDrive } from 'lucide-react';

interface Round1CrackFileProps {
  onSuccess: () => void;
}

export const Round1CrackFile: React.FC<Round1CrackFileProps> = ({ onSuccess }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;

    // Compare with centralized config (case-insensitive for convenience or exact match trimmed)
    const normalizedInput = passwordInput.trim().toUpperCase();
    const targetPassword = eventConfig.round1.password.trim().toUpperCase();

    if (normalizedInput === targetPassword) {
      audioService.playAccessGranted();
      setIsSuccess(true);
      setErrorStatus(null);

      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      audioService.playError();
      setIsShaking(true);
      setErrorStatus('INCORRECT PASSWORD. The evidence remains locked. Try again.');
      setPasswordInput('');
      setAttemptCount(prev => prev + 1);

      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  return (
    <div className="page-wrapper fade-in">
      <div className="container" style={{ maxWidth: '820px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="status-pill status-pill-red" style={{ marginBottom: '0.75rem' }}>
            <Terminal size={13} />
            <span>PHASE 1 OF 3 // EVIDENCE DECRYPTION</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            letterSpacing: '0.08em',
            marginBottom: '0.5rem'
          }}>
            {eventConfig.round1.title}
          </h1>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.15rem',
            color: 'var(--accent-red)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            {eventConfig.round1.subtitle}
          </div>
        </div>

        {/* Story Briefing Card */}
        <div className="cyber-card" style={{
          padding: '1.5rem 1.75rem',
          marginBottom: '2rem',
          borderLeft: '4px solid var(--accent-red)',
          background: 'rgba(15, 19, 28, 0.9)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            <FileText size={15} color="var(--accent-red)" />
            <span>MISSION BRIEFING</span>
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.7 }}>
            {eventConfig.round1.story}
          </p>
        </div>

        {/* Case File Main Panel */}
        <div className={`cyber-card corner-bracket ${isShaking ? 'shake-animation' : ''} ${isSuccess ? 'pulse-success' : ''}`} style={{
          padding: '2.25rem',
          marginBottom: '2rem',
          border: isSuccess ? '1px solid var(--accent-emerald)' : '1px solid var(--border-medium)',
          background: 'rgba(12, 16, 24, 0.92)'
        }}>
          
          {/* Case File Metadata Header */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingBottom: '1.25rem',
            marginBottom: '1.5rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: isSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(230, 57, 70, 0.15)',
                border: isSuccess ? '1px solid var(--border-emerald)' : '1px solid var(--border-crimson)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isSuccess ? 'var(--accent-emerald)' : 'var(--accent-red)'
              }}>
                {isSuccess ? <Unlock size={20} /> : <Lock size={20} />}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', letterSpacing: '0.04em' }}>
                  {eventConfig.round1.caseFileName}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {eventConfig.round1.fileSize}
                </div>
              </div>
            </div>

            <div className="status-pill status-pill-red">
              <HardDrive size={13} />
              <span>STATUS: {isSuccess ? 'DECRYPTED' : 'ENCRYPTED'}</span>
            </div>
          </div>

          {/* Hash Preview Bar */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '0.6rem 0.9rem',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.75rem',
            overflowX: 'auto'
          }}>
            <Hash size={13} style={{ flexShrink: 0 }} />
            <span>{eventConfig.round1.hashPreview}</span>
          </div>

          {/* Forensic Clue / Hint Box */}
          <div style={{
            background: 'rgba(230, 57, 70, 0.06)',
            border: '1px dashed var(--border-crimson)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--accent-red)',
              letterSpacing: '0.08em',
              marginBottom: '0.75rem'
            }}>
              <AlertCircle size={15} />
              <span>RECOVERED CLUE // HINT</span>
            </div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              color: '#ffffff',
              lineHeight: 1.7,
              whiteSpace: 'pre-line'
            }}>
              "{eventConfig.round1.hint}"
            </p>
          </div>

          {/* Decryption Input Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label 
                htmlFor="round1-password-input"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em'
                }}
              >
                EVIDENCE ACCESS CODE / PASSWORD
              </label>
              
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  id="round1-password-input"
                  type="text"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (errorStatus) setErrorStatus(null);
                  }}
                  placeholder="Enter investigation password"
                  className="cyber-input"
                  style={{ flex: 1, minWidth: '220px' }}
                  disabled={isSuccess}
                  autoComplete="off"
                  autoFocus
                />
                
                <button
                  type="submit"
                  disabled={!passwordInput.trim() || isSuccess}
                  className={`cyber-btn ${isSuccess ? 'cyber-btn-emerald' : 'cyber-btn-primary'}`}
                  style={{ padding: '0.85rem 1.75rem', flexShrink: 0 }}
                >
                  {isSuccess ? (
                    <>
                      <CheckCircle2 size={18} />
                      <span>ACCESS GRANTED</span>
                    </>
                  ) : (
                    <>
                      <Unlock size={18} />
                      <span>UNLOCK EVIDENCE</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorStatus && !isSuccess && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'rgba(230, 57, 70, 0.15)',
                border: '1px solid var(--accent-red)',
                borderRadius: 'var(--radius-sm)',
                color: '#ff8591',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{errorStatus}</span>
              </div>
            )}

            {/* Success Message */}
            {isSuccess && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.25rem',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid var(--accent-emerald)',
                borderRadius: 'var(--radius-sm)',
                color: '#34d399',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                fontWeight: 600
              }}>
                <CheckCircle2 size={18} />
                <span>ACCESS GRANTED — Evidence unlocked. Transitioning to Round 2...</span>
              </div>
            )}

            {/* Attempts Info */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <span>UNLIMITED ATTEMPTS PERMITTED</span>
              {attemptCount > 0 && <span>ATTEMPTS RECORDED: {attemptCount}</span>}
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
