export interface InvestigationState {
  currentRound: 'landing' | 'rules' | 'round1' | 'round2' | 'round3' | 'case_closed';
  unlockedRounds: number[]; // e.g. [1], [1, 2], [1, 2, 3]
  round1Completed: boolean;
  round1CompletedAt?: string;
  round2Completed: boolean;
  round2CompletedAt?: string;
  round3Completed: boolean;
  round3CompletedAt?: string;
  submission?: {
    targetId: string;
    targetName: string;
    reasoning: string;
    submittedAt: string;
    investigatorId: string;
  };
  audioMuted: boolean;
  teamName?: string;
}

const STORAGE_KEY = 'THE_PATTERN_INVESTIGATION_STATE_v1';

export const getInitialState = (): InvestigationState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.unlockedRounds)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load investigation state from localStorage:', err);
  }

  // Generate a random investigator ID for the team session
  const randomId = 'INV-' + Math.floor(1000 + Math.random() * 9000);

  return {
    currentRound: 'landing',
    unlockedRounds: [1],
    round1Completed: false,
    round2Completed: false,
    round3Completed: false,
    audioMuted: false,
    teamName: randomId
  };
};

export const saveInvestigationState = (state: InvestigationState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save investigation state to localStorage:', err);
  }
};

export const resetInvestigationProgress = (): InvestigationState => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to reset state:', err);
  }
  const fresh = getInitialState();
  saveInvestigationState(fresh);
  return fresh;
};
