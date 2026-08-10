import React, { useState, useEffect } from 'react';
import { InvestigationState } from '../../services/storageService';
import { audioService } from '../../services/audioService';
import { Volume2, VolumeX, ShieldAlert, KeyRound, Clock, CheckCircle2, Lock } from 'lucide-react';

interface HeaderProps {
  state: InvestigationState;
  onOpenRules: () => void;
  onOpenAdmin: () => void;
  onToggleMute: () => void;
  onNavigateRound: (round: InvestigationState['currentRound']) => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  onOpenRules,
  onOpenAdmin,
  onToggleMute,
  onNavigateRound,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isRound1Unlocked = state.unlockedRounds.includes(1);
  const isRound2Unlocked = state.unlockedRounds.includes(2);
  const isRound3Unlocked = state.unlockedRounds.includes(3);

  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(8, 11, 16, 0.95)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0.75rem 1.25rem'
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Brand & Case Code */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div 
            onClick={() => {
              audioService.playClick();
              if (state.currentRound === 'landing') return;
              // If in investigation, allow going to current or unlocked round
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #e63946, #9d0208)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 10px rgba(230, 57, 70, 0.4)'
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.85rem', color: '#fff' }}>P</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.1em', color: '#ffffff' }}>
                THE PATTERN
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                DIGITAL FORENSIC WORKSTATION
              </div>
            </div>
          </div>

          <div className="status-pill status-pill-red">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-red)' }} />
            CLASSIFIED // LEVEL-3
          </div>
        </div>

        {/* Round Progression Breadcrumb */}
        {state.currentRound !== 'landing' && (
          <nav aria-label="Investigation Progress" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(15, 20, 29, 0.8)',
            padding: '0.35rem 0.6rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            {/* Round 1 */}
            <button
              onClick={() => {
                if (isRound1Unlocked) {
                  audioService.playClick();
                  onNavigateRound('round1');
                }
              }}
              disabled={!isRound1Unlocked}
              style={{
                background: state.currentRound === 'round1' ? 'rgba(230, 57, 70, 0.2)' : 'transparent',
                border: state.currentRound === 'round1' ? '1px solid var(--border-crimson)' : '1px solid transparent',
                color: state.round1Completed ? 'var(--accent-emerald)' : state.currentRound === 'round1' ? '#fff' : 'var(--text-secondary)',
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: isRound1Unlocked ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              {state.round1Completed ? <CheckCircle2 size={13} /> : <span style={{ opacity: 0.7 }}>01</span>}
              ROUND 01
              {state.round1Completed ? ' ✓' : state.currentRound === 'round1' ? ' [ACTIVE]' : ''}
            </button>

            <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>➔</span>

            {/* Round 2 */}
            <button
              onClick={() => {
                if (isRound2Unlocked) {
                  audioService.playClick();
                  onNavigateRound('round2');
                }
              }}
              disabled={!isRound2Unlocked}
              style={{
                background: state.currentRound === 'round2' ? 'rgba(230, 57, 70, 0.2)' : 'transparent',
                border: state.currentRound === 'round2' ? '1px solid var(--border-crimson)' : '1px solid transparent',
                color: state.round2Completed ? 'var(--accent-emerald)' : state.currentRound === 'round2' ? '#fff' : isRound2Unlocked ? 'var(--text-primary)' : 'var(--text-muted)',
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: isRound2Unlocked ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              {state.round2Completed ? <CheckCircle2 size={13} /> : !isRound2Unlocked ? <Lock size={12} /> : <span style={{ opacity: 0.7 }}>02</span>}
              ROUND 02
              {state.round2Completed ? ' ✓' : state.currentRound === 'round2' ? ' [ACTIVE]' : !isRound2Unlocked ? ' 🔒' : ''}
            </button>

            <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>➔</span>

            {/* Round 3 */}
            <button
              onClick={() => {
                if (isRound3Unlocked) {
                  audioService.playClick();
                  if (state.round3Completed) {
                    onNavigateRound('case_closed');
                  } else {
                    onNavigateRound('round3');
                  }
                }
              }}
              disabled={!isRound3Unlocked}
              style={{
                background: (state.currentRound === 'round3' || state.currentRound === 'case_closed') ? 'rgba(230, 57, 70, 0.2)' : 'transparent',
                border: (state.currentRound === 'round3' || state.currentRound === 'case_closed') ? '1px solid var(--border-crimson)' : '1px solid transparent',
                color: state.round3Completed ? 'var(--accent-emerald)' : state.currentRound === 'round3' ? '#fff' : isRound3Unlocked ? 'var(--text-primary)' : 'var(--text-muted)',
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: isRound3Unlocked ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              {state.round3Completed ? <CheckCircle2 size={13} /> : !isRound3Unlocked ? <Lock size={12} /> : <span style={{ opacity: 0.7 }}>03</span>}
              ROUND 03
              {state.round3Completed ? ' ✓' : state.currentRound === 'round3' ? ' [ACTIVE]' : !isRound3Unlocked ? ' 🔒' : ''}
            </button>
          </nav>
        )}

        {/* Right Tools & Clock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* UTC Clock */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            background: 'rgba(255,255,255,0.03)',
            padding: '0.35rem 0.7rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)'
          }}>
            <Clock size={13} color="var(--accent-red)" />
            <span>{timeStr || 'SYSTEM CLOCK'}</span>
          </div>

          {/* Rules Briefing Button */}
          <button
            onClick={() => {
              audioService.playClick();
              onOpenRules();
            }}
            title="Event Rules & Protocol"
            className="cyber-btn"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
          >
            <ShieldAlert size={14} />
            <span style={{ display: 'inline' }}>RULES</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              audioService.playClick();
              onToggleMute();
            }}
            title={state.audioMuted ? 'Unmute Forensic Audio' : 'Mute Forensic Audio'}
            className="cyber-btn"
            style={{ padding: '0.4rem 0.6rem', color: state.audioMuted ? 'var(--text-muted)' : 'var(--accent-cyan)' }}
          >
            {state.audioMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* Organizer / Admin Trigger */}
          <button
            onClick={() => {
              audioService.playClick();
              onOpenAdmin();
            }}
            title="Organizer / Admin Console"
            style={{
              background: 'transparent',
              border: '1px dashed rgba(255,255,255,0.15)',
              color: 'var(--text-muted)',
              padding: '0.4rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <KeyRound size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};
