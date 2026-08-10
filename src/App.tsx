import React, { useState, useEffect, useCallback } from 'react';
import {
  InvestigationState,
  getInitialState,
  saveInvestigationState,
  resetInvestigationProgress
} from './services/storageService';
import { audioService } from './services/audioService';
import { Header } from './components/common/Header';
import { RulesModal } from './components/common/RulesModal';
import { AdminModal } from './components/common/AdminModal';
import { NarrativeBridge } from './components/common/NarrativeBridge';
import { LandingPage } from './components/rounds/LandingPage';
import { Round1CrackFile } from './components/rounds/Round1CrackFile';
import { Round2Pattern } from './components/rounds/Round2Pattern';
import { Round3WhoIsNext } from './components/rounds/Round3WhoIsNext';
import { CaseClosed } from './components/rounds/CaseClosed';

export const App: React.FC = () => {
  const [state, setState] = useState<InvestigationState>(() => getInitialState());
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isInitialRules, setIsInitialRules] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [narrativeModal, setNarrativeModal] = useState<{
    isOpen: boolean;
    title: string;
    statusText: string;
    narrativeText: string;
    nextRoundLabel: string;
    onProceed: () => void;
  } | null>(null);

  // Sync state to LocalStorage on changes
  useEffect(() => {
    saveInvestigationState(state);
    audioService.setMuted(state.audioMuted);
  }, [state]);

  // Global Keyboard Shortcut: Ctrl + Shift + A for Admin Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        audioService.playClick();
        setIsAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleMute = useCallback(() => {
    setState(prev => {
      const newMuted = !prev.audioMuted;
      audioService.setMuted(newMuted);
      return { ...prev, audioMuted: newMuted };
    });
  }, []);

  // Landing Page -> Enter clicked -> Open Rules Briefing
  const handleLandingEnter = () => {
    setIsInitialRules(true);
    setIsRulesOpen(true);
  };

  // Rules Confirmed -> Enter Round 1
  const handleRulesConfirmed = () => {
    setIsRulesOpen(false);
    setIsInitialRules(false);
    setState(prev => ({
      ...prev,
      currentRound: 'round1',
      unlockedRounds: prev.unlockedRounds.includes(1) ? prev.unlockedRounds : [...prev.unlockedRounds, 1]
    }));
  };

  // Round 1 Complete Handler
  const handleRound1Success = () => {
    const nowIso = new Date().toISOString();
    setState(prev => ({
      ...prev,
      round1Completed: true,
      round1CompletedAt: nowIso,
      unlockedRounds: prev.unlockedRounds.includes(2) ? prev.unlockedRounds : [...prev.unlockedRounds, 2]
    }));

    // Trigger Narrative Bridge
    setNarrativeModal({
      isOpen: true,
      title: "EVIDENCE ARCHIVE DECRYPTED",
      statusText: "ROUND 01 CLEARED // ACCESS GRANTED",
      narrativeText: "Evidence recovered.\n\nThe victim records have been decrypted and are now fully accessible.\n\nPreliminary analysis indicates multiple recurring variables across confirmed cases. Proceed to analyze the records and isolate the perpetrator's selection rule.",
      nextRoundLabel: "PROCEED TO ROUND 02 (DATA ANALYSIS)",
      onProceed: () => {
        setNarrativeModal(null);
        setState(prev => ({ ...prev, currentRound: 'round2' }));
      }
    });
  };

  // Round 2 Complete Handler
  const handleRound2Success = () => {
    const nowIso = new Date().toISOString();
    setState(prev => ({
      ...prev,
      round2Completed: true,
      round2CompletedAt: nowIso,
      unlockedRounds: prev.unlockedRounds.includes(3) ? prev.unlockedRounds : [...prev.unlockedRounds, 3]
    }));

    // Trigger Narrative Bridge
    setNarrativeModal({
      isOpen: true,
      title: "PATTERN CONFIRMED // SURVEILLANCE ARMED",
      statusText: "ROUND 02 CLEARED // TARGETS FLAGGED",
      narrativeText: "Pattern identified.\n\nA new set of potential targets has appeared on surveillance radar.\n\nSomeone in North Haven fits the exact profile. Your deduction will determine who investigators protect next.",
      nextRoundLabel: "PROCEED TO ROUND 03 (TARGET PROFILES)",
      onProceed: () => {
        setNarrativeModal(null);
        setState(prev => ({ ...prev, currentRound: 'round3' }));
      }
    });
  };

  // Round 3 Complete / Final Submission
  const handleFinalSubmission = (submissionData: {
    targetId: string;
    targetName: string;
    reasoning: string;
  }) => {
    const nowIso = new Date().toISOString();
    const submission = {
      ...submissionData,
      submittedAt: nowIso,
      investigatorId: state.teamName || 'INV-' + Math.floor(1000 + Math.random() * 9000)
    };

    setState(prev => ({
      ...prev,
      round3Completed: true,
      round3CompletedAt: nowIso,
      submission,
      currentRound: 'case_closed'
    }));
  };

  // Navigation from breadcrumb
  const handleNavigateRound = (round: InvestigationState['currentRound']) => {
    setState(prev => ({ ...prev, currentRound: round }));
  };

  // Admin Reset
  const handleResetProgress = () => {
    const fresh = resetInvestigationProgress();
    setState(fresh);
  };

  // Admin Jump
  const handleAdminJump = (round: InvestigationState['currentRound'], unlockedRounds: number[]) => {
    setState(prev => ({
      ...prev,
      currentRound: round,
      unlockedRounds
    }));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Classified Header */}
      <Header
        state={state}
        onOpenRules={() => {
          setIsInitialRules(false);
          setIsRulesOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onToggleMute={handleToggleMute}
        onNavigateRound={handleNavigateRound}
      />

      {/* Main Content Router */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {state.currentRound === 'landing' && (
          <LandingPage onEnterInvestigation={handleLandingEnter} />
        )}

        {state.currentRound === 'round1' && (
          <Round1CrackFile onSuccess={handleRound1Success} />
        )}

        {state.currentRound === 'round2' && (
          state.unlockedRounds.includes(2) ? (
            <Round2Pattern onSuccess={handleRound2Success} />
          ) : (
            <Round1CrackFile onSuccess={handleRound1Success} />
          )
        )}

        {state.currentRound === 'round3' && (
          state.unlockedRounds.includes(3) ? (
            <Round3WhoIsNext onSubmitInvestigation={handleFinalSubmission} />
          ) : (
            <Round1CrackFile onSuccess={handleRound1Success} />
          )
        )}

        {state.currentRound === 'case_closed' && (
          <CaseClosed state={state} onOpenAdmin={() => setIsAdminOpen(true)} />
        )}
      </main>

      {/* Narrative Transition Bridge Modal */}
      {narrativeModal?.isOpen && (
        <NarrativeBridge
          title={narrativeModal.title}
          statusText={narrativeModal.statusText}
          narrativeText={narrativeModal.narrativeText}
          nextRoundLabel={narrativeModal.nextRoundLabel}
          onProceed={narrativeModal.onProceed}
        />
      )}

      {/* Rules Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        isInitialEntry={isInitialRules}
        onClose={() => setIsRulesOpen(false)}
        onConfirmAndEnter={handleRulesConfirmed}
      />

      {/* Admin / Organizer Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        state={state}
        onResetProgress={handleResetProgress}
        onJumpToRound={handleAdminJump}
      />

      {/* Ambient Cyber Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '1.25rem 1rem',
        background: 'rgba(6, 8, 12, 0.95)',
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
          <div>THE PATTERN © 2026 // DIGITAL FORENSIC COMPETITION</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>TEAM UNIT: <strong style={{ color: 'var(--text-secondary)' }}>{state.teamName || 'INV-404'}</strong></span>
            <button
              onClick={() => setIsAdminOpen(true)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}
            >
              [ORGANIZER CONSOLE]
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
