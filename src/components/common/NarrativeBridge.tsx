import React, { useEffect, useState } from 'react';
import { audioService } from '../../services/audioService';
import { Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';

interface NarrativeBridgeProps {
  title: string;
  statusText: string;
  narrativeText: string;
  nextRoundLabel: string;
  onProceed: () => void;
}

export const NarrativeBridge: React.FC<NarrativeBridgeProps> = ({
  title,
  statusText,
  narrativeText,
  nextRoundLabel,
  onProceed
}) => {
  const [displayedChars, setDisplayedChars] = useState(0);

  useEffect(() => {
    setDisplayedChars(0);
    const interval = setInterval(() => {
      setDisplayedChars(prev => {
        if (prev < narrativeText.length) {
          audioService.playKeyType();
          return prev + 2;
        }
        clearInterval(interval);
        return prev;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [narrativeText]);

  return (
    <div className="modal-backdrop" style={{ animation: 'fadeIn 0.3s ease' }}>
      <div 
        className="modal-container cyber-card corner-bracket pulse-success"
        style={{
          maxWidth: '620px',
          padding: '2.5rem',
          textAlign: 'center',
          background: 'rgba(10, 14, 22, 0.96)',
          border: '1px solid var(--accent-emerald)'
        }}
      >
        {/* Status Icon */}
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '2px solid var(--accent-emerald)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          color: 'var(--accent-emerald)',
          boxShadow: 'var(--shadow-glow-green)'
        }}>
          <CheckCircle2 size={32} />
        </div>

        {/* Title */}
        <div className="status-pill status-pill-emerald" style={{ marginBottom: '0.75rem' }}>
          {statusText}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          letterSpacing: '0.08em',
          color: '#ffffff',
          marginBottom: '1.5rem'
        }}>
          {title}
        </h2>

        {/* Narrative Box with Typewriter Effect */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.95rem',
          color: 'var(--text-primary)',
          lineHeight: 1.8,
          textAlign: 'left',
          marginBottom: '2rem',
          minHeight: '100px',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            <Terminal size={14} color="var(--accent-cyan)" />
            <span>SECURE FORENSIC LOG // DISPATCH NOTICE</span>
          </div>

          <p style={{ whiteSpace: 'pre-line' }}>
            {narrativeText.slice(0, displayedChars)}
            {displayedChars < narrativeText.length && (
              <span style={{ display: 'inline-block', width: '8px', height: '15px', background: 'var(--accent-cyan)', marginLeft: '4px', verticalAlign: 'middle', animation: 'pulseGlow 0.8s infinite' }} />
            )}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            audioService.playClick();
            onProceed();
          }}
          className="cyber-btn cyber-btn-emerald"
          style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', letterSpacing: '0.08em' }}
        >
          <span>{nextRoundLabel}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
