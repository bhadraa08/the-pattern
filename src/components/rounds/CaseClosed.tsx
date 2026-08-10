import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { eventConfig } from '../../config/gameConfig';
import { InvestigationState } from '../../services/storageService';
import { audioService } from '../../services/audioService';
import { ShieldCheck, FileCheck, Award, Printer, Copy, Check, Terminal, Lock } from 'lucide-react';

interface CaseClosedProps {
  state: InvestigationState;
  onOpenAdmin?: () => void;
}

export const CaseClosed: React.FC<CaseClosedProps> = ({ state, onOpenAdmin }) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    // Cyber forensic celebratory confetti
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#e63946', '#10b981', '#00f0ff', '#ffffff']
      });
    } catch {
      // Ignore confetti errors
    }
  }, []);

  const submission = state.submission;

  const handleCopySummary = () => {
    audioService.playClick();
    const text = `--- THE PATTERN: DIGITAL CRIME INVESTIGATION ---
INVESTIGATOR ID: ${submission?.investigatorId || state.teamName || 'INV-404'}
SUBMITTED AT: ${submission?.submittedAt || new Date().toISOString()}
CASE CODE: ${eventConfig.caseCode}

PREDICTED VICTIM: ${submission?.targetName || 'N/A'} (${submission?.targetId || 'N/A'})

FORENSIC REASONING:
${submission?.reasoning || 'N/A'}

STATUS: PENDING JUDICIAL REVIEW
-------------------------------------------------`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    audioService.playClick();
    window.print();
  };

  return (
    <div className="page-wrapper fade-in">
      <div className="container" style={{ maxWidth: '860px' }}>
        
        {/* Main Status Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '2px solid var(--accent-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            color: 'var(--accent-emerald)',
            boxShadow: 'var(--shadow-glow-green)'
          }}>
            <ShieldCheck size={36} />
          </div>

          <div className="status-pill status-pill-emerald" style={{ marginBottom: '0.75rem' }}>
            <Award size={13} />
            <span>SUBMISSION ENCRYPTED & ARCHIVED</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            letterSpacing: '0.12em',
            marginBottom: '0.5rem'
          }}>
            CASE CLOSED
          </h1>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.15rem',
            color: 'var(--accent-emerald)',
            letterSpacing: '0.08em',
            fontWeight: 600
          }}>
            Investigation Complete
          </div>
        </div>

        {/* Judging Panel Notice Banner */}
        <div className="cyber-card corner-bracket" style={{
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          borderLeft: '4px solid var(--accent-emerald)',
          background: 'rgba(12, 20, 26, 0.95)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
            <FileCheck size={18} />
            <span>SUBMISSION STATUS // OFFICIAL RECEIPT</span>
          </div>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 500 }}>
            The investigation has been submitted to the judging panel.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
            Your findings and deductive justification are now securely recorded for evaluation. Answers are finalized.
          </p>
        </div>

        {/* Submitted Dossier Summary */}
        <div className="cyber-card" style={{
          padding: '2.25rem',
          marginBottom: '2rem',
          background: 'rgba(10, 14, 22, 0.95)',
          border: '1px solid var(--border-medium)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <Terminal size={16} color="var(--accent-cyan)" />
              <span>OFFICIAL FORENSIC RECORD // CASE {eventConfig.caseCode}</span>
            </div>
            <div className="status-pill status-pill-cyan" style={{ fontSize: '0.75rem' }}>
              UNIT: {submission?.investigatorId || state.teamName || 'INV-404'}
            </div>
          </div>

          {/* Predicted Target Box */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              PREDICTED NEXT VICTIM
            </div>
            <div style={{
              background: 'rgba(230, 57, 70, 0.1)',
              border: '1px solid var(--border-crimson)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                  {submission?.targetName || 'No Target Selected'}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-red)', marginTop: '0.2rem' }}>
                  DESIGNATION: {submission?.targetId || 'N/A'}
                </div>
              </div>
              <div className="status-pill status-pill-red">
                <Lock size={12} />
                LOCKED IN
              </div>
            </div>
          </div>

          {/* Submitted Reasoning Box */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              SUBMITTED FORENSIC REASONING & PATTERN PROOF
            </div>
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'var(--text-primary)',
              lineHeight: 1.7,
              whiteSpace: 'pre-line'
            }}>
              {submission?.reasoning || 'No reasoning submitted.'}
            </div>
          </div>

          {/* Timestamp & Metadata */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <span>TIMESTAMP: {submission?.submittedAt || 'JUST NOW'}</span>
            <span>ENCRYPTION: SHA-256 VERIFIED</span>
          </div>

        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleCopySummary}
            className="cyber-btn"
            style={{ padding: '0.85rem 1.5rem' }}
          >
            {copied ? <Check size={16} color="var(--accent-emerald)" /> : <Copy size={16} />}
            <span>{copied ? 'DOSSIER COPIED TO CLIPBOARD' : 'COPY SUBMISSION SUMMARY'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="cyber-btn"
            style={{ padding: '0.85rem 1.5rem' }}
          >
            <Printer size={16} />
            <span>PRINT / SAVE AS PDF</span>
          </button>

          {onOpenAdmin && (
            <button
              onClick={() => {
                audioService.playClick();
                onOpenAdmin();
              }}
              className="cyber-btn"
              style={{ padding: '0.85rem 1.5rem', borderColor: 'var(--border-crimson)', color: 'var(--accent-red)' }}
            >
              ORGANIZER ACCESS
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
