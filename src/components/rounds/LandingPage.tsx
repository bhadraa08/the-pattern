import React from 'react';
import { eventConfig } from '../../config/gameConfig';
import { audioService } from '../../services/audioService';
import { Shield, Terminal, ArrowRight, Fingerprint, Search, Cpu } from 'lucide-react';

interface LandingPageProps {
  onEnterInvestigation: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterInvestigation }) => {
  return (
    <div className="page-wrapper fade-in" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 120px)',
      position: 'relative'
    }}>
      <div className="container" style={{ maxWidth: '900px', textAlign: 'center', position: 'relative', zIndex: 5 }}>
        
        {/* Top Classified Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
          <div className="status-pill status-pill-red">
            <Fingerprint size={13} />
            <span>CASE ID: {eventConfig.caseCode}</span>
          </div>
          <div className="status-pill status-pill-cyan">
            <Cpu size={13} />
            <span>COLLEGE INVESTIGATION PORTAL</span>
          </div>
        </div>

        {/* Main Glitch Title */}
        <div style={{ marginBottom: '1rem', position: 'relative' }}>
          <h1 
            className="glitch-title"
            data-text={eventConfig.title}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.75rem)',
              lineHeight: 1.1,
              fontWeight: 900
            }}
          >
            {eventConfig.title}
          </h1>
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
          letterSpacing: '0.15em',
          color: 'var(--accent-red)',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginBottom: '2rem',
          textShadow: '0 0 12px rgba(230, 57, 70, 0.4)'
        }}>
          {eventConfig.subtitle}
        </div>

        {/* Short Lore / Description Panel */}
        <div className="cyber-card corner-bracket" style={{
          maxWidth: '640px',
          margin: '0 auto 2.5rem',
          padding: '1.75rem 2rem',
          background: 'rgba(12, 16, 24, 0.85)',
          border: '1px solid var(--border-medium)'
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.1rem',
            color: 'var(--text-primary)',
            lineHeight: 1.8,
            fontWeight: 400,
            whiteSpace: 'pre-line'
          }}>
            {eventConfig.tagline}
          </p>
        </div>

        {/* Enter Action Button */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={() => {
              audioService.playClick();
              onEnterInvestigation();
            }}
            className="cyber-btn cyber-btn-primary"
            style={{
              padding: '1.1rem 2.75rem',
              fontSize: '1.05rem',
              letterSpacing: '0.12em',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 0 30px rgba(230, 57, 70, 0.5)'
            }}
          >
            <Search size={20} />
            <span>ENTER THE INVESTIGATION</span>
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Instruction Tagline */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          letterSpacing: '0.05em'
        }}>
          Team-based investigation • 3 Rounds • Logic • Data Analysis • Deduction
        </p>

        {/* Atmospheric Meta Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '3.5rem',
          textAlign: 'left'
        }}>
          <div className="cyber-card" style={{ padding: '1.2rem 1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-red)' }}>
              <Terminal size={16} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>ROUND 01</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>Crack the Evidence</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Decrypt the encrypted incident file via hidden clues.</div>
          </div>

          <div className="cyber-card" style={{ padding: '1.2rem 1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-cyan)' }}>
              <Cpu size={16} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>ROUND 02</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>Uncover the Pattern</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Analyze victim dataset and isolate recurring criteria.</div>
          </div>

          <div className="cyber-card" style={{ padding: '1.2rem 1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-emerald)' }}>
              <Shield size={16} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>ROUND 03</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>Who is Next?</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Identify the vulnerable target and justify your reasoning.</div>
          </div>
        </div>

      </div>
    </div>
  );
};
