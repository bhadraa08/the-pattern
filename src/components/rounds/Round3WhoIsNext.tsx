import React, { useState } from 'react';
import { eventConfig, TargetProfile } from '../../config/gameConfig';
import { audioService } from '../../services/audioService';
import { Shield, User, Activity, AlertTriangle, Send, CheckCircle2, Eye, Layers } from 'lucide-react';

interface Round3WhoIsNextProps {
  onSubmitInvestigation: (submission: {
    targetId: string;
    targetName: string;
    reasoning: string;
  }) => void;
}

export const Round3WhoIsNext: React.FC<Round3WhoIsNextProps> = ({ onSubmitInvestigation }) => {
  const [selectedTargetId, setSelectedTargetId] = useState<string>('');
  const [reasoning, setReasoning] = useState<string>('');
  const [activeDossier, setActiveDossier] = useState<TargetProfile | null>(null);
  const [showMatrix, setShowMatrix] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const targets = eventConfig.round3.targets;

  const handleSelectTarget = (targetId: string) => {
    audioService.playClick();
    setSelectedTargetId(targetId);
    if (validationError) setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTargetId) {
      audioService.playError();
      setValidationError('Please select the target most likely to be the next victim.');
      return;
    }

    if (!reasoning.trim() || reasoning.trim().length < 20) {
      audioService.playError();
      setValidationError('Please provide a detailed forensic reasoning explaining how this target matches the pattern (minimum 20 characters).');
      return;
    }

    const chosenTarget = targets.find(t => t.id === selectedTargetId);
    if (!chosenTarget) return;

    audioService.playAccessGranted();
    setIsSubmitting(true);

    setTimeout(() => {
      onSubmitInvestigation({
        targetId: chosenTarget.id,
        targetName: chosenTarget.name,
        reasoning: reasoning.trim()
      });
    }, 1200);
  };

  return (
    <div className="page-wrapper fade-in">
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="status-pill status-pill-red" style={{ marginBottom: '0.75rem' }}>
            <Activity size={13} />
            <span>PHASE 3 OF 3 // TARGET SURVEILLANCE & DEDUCTION</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            letterSpacing: '0.08em',
            marginBottom: '0.5rem'
          }}>
            {eventConfig.round3.title}
          </h1>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.15rem',
            color: 'var(--accent-red)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            {eventConfig.round3.subtitle}
          </div>
        </div>

        {/* Story Briefing */}
        <div className="cyber-card" style={{
          padding: '1.5rem 1.75rem',
          marginBottom: '2rem',
          borderLeft: '4px solid var(--accent-red)',
          background: 'rgba(15, 19, 28, 0.9)'
        }}>
          <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
            {eventConfig.round3.story}
          </p>
        </div>

        {/* Action Toggle Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            IDENTIFIED PERSONS OF INTEREST (<strong style={{ color: '#fff' }}>{targets.length} DOSSIERS</strong>)
          </div>

          <button
            type="button"
            onClick={() => {
              audioService.playClick();
              setShowMatrix(!showMatrix);
            }}
            className="cyber-btn"
            style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
          >
            <Layers size={15} color="var(--accent-cyan)" />
            <span>{showMatrix ? 'VIEW CARDS LAYOUT' : 'OPEN COMPARISON MATRIX'}</span>
          </button>
        </div>

        {/* Comparative Matrix View */}
        {showMatrix ? (
          <div className="cyber-card" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
              SIDE-BY-SIDE TARGET COMPARISON MATRIX
            </div>
            <div className="table-container">
              <table className="cyber-table">
                <thead>
                  <tr>
                    <th>Target</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Blood Group</th>
                    <th>Commute</th>
                    <th>Birth Month</th>
                    <th>City</th>
                    <th>Hobby</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {targets.map(t => (
                    <tr key={t.id} style={{ background: selectedTargetId === t.id ? 'rgba(230, 57, 70, 0.15)' : 'transparent' }}>
                      <td style={{ color: 'var(--accent-red)', fontWeight: 700 }}>{t.targetNumber}</td>
                      <td style={{ fontWeight: 600 }}>{t.name}</td>
                      <td>{t.age}</td>
                      <td>
                        <span className="status-pill status-pill-red" style={{ fontSize: '0.7rem' }}>
                          {t.bloodGroup}
                        </span>
                      </td>
                      <td>{t.commuteMode}</td>
                      <td>{t.birthMonth}</td>
                      <td>{t.city}</td>
                      <td>{t.hobby}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleSelectTarget(t.id)}
                          className={`cyber-btn ${selectedTargetId === t.id ? 'cyber-btn-primary' : ''}`}
                          style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem' }}
                        >
                          {selectedTargetId === t.id ? 'SELECTED' : 'SELECT'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Target Cards Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            {targets.map((target) => {
              const isSelected = selectedTargetId === target.id;

              return (
                <div
                  key={target.id}
                  className={`cyber-card corner-bracket ${isSelected ? 'cyber-card-active' : ''}`}
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(23, 20, 30, 0.95)' : 'rgba(14, 18, 26, 0.88)',
                    borderColor: isSelected ? 'var(--border-crimson-bright)' : undefined
                  }}
                  onClick={() => handleSelectTarget(target.id)}
                >
                  <div>
                    {/* Card Top Banner */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1rem',
                      paddingBottom: '0.75rem',
                      borderBottom: '1px solid var(--border-subtle)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          background: isSelected ? 'var(--accent-red)' : 'rgba(255,255,255,0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isSelected ? '#fff' : 'var(--text-secondary)'
                        }}>
                          <User size={18} />
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-red)', fontWeight: 700 }}>
                            {target.targetNumber}
                          </div>
                          <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#ffffff' }}>
                            {target.name}
                          </div>
                        </div>
                      </div>

                      {/* Select Radio Pill */}
                      <div className={`status-pill ${isSelected ? 'status-pill-red' : ''}`} style={{ fontSize: '0.7rem' }}>
                        {isSelected ? 'SELECTED TARGET' : 'CLICK TO SELECT'}
                      </div>
                    </div>

                    {/* Short Profile / Occupation */}
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>{target.occupation}</strong> ({target.age} yrs) • {target.city}
                    </div>

                    {/* Key Attribute Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      <span className="status-pill" style={{ background: 'rgba(230, 57, 70, 0.1)', color: '#ff8591' }}>
                        Blood: {target.bloodGroup}
                      </span>
                      <span className="status-pill" style={{ background: 'rgba(0, 240, 255, 0.1)', color: '#67e8f9' }}>
                        Commute: {target.commuteMode}
                      </span>
                      <span className="status-pill" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                        Birth: {target.birthMonth}
                      </span>
                      <span className="status-pill" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                        Hobby: {target.hobby}
                      </span>
                    </div>

                    {/* Recent Activity Excerpt */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.35)',
                      padding: '0.75rem 0.9rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '1rem',
                      borderLeft: '2px solid var(--border-medium)'
                    }}>
                      <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                        RECENT SURVEILLANCE LOG:
                      </div>
                      {target.recentActivity}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        audioService.playClick();
                        setActiveDossier(target);
                      }}
                      className="cyber-btn"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', background: 'transparent' }}
                    >
                      <Eye size={14} color="var(--accent-cyan)" />
                      <span>VIEW FULL PROFILE</span>
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: isSelected ? 'var(--accent-red)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {isSelected && <CheckCircle2 size={14} />}
                      <span>{isSelected ? 'ARMED FOR SUBMISSION' : 'SELECT'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Final Investigation Submission Panel */}
        <div className="cyber-card corner-bracket" style={{
          padding: '2.5rem',
          border: '1px solid var(--border-crimson)',
          background: 'rgba(12, 16, 24, 0.95)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              background: 'rgba(230, 57, 70, 0.18)',
              border: '1px solid var(--border-crimson)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-red)'
            }}>
              <Shield size={22} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', letterSpacing: '0.05em' }}>
                FINAL INVESTIGATION SUBMISSION
              </h2>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                IDENTIFY THE NEXT TARGET & FORMULATE YOUR FORENSIC JUSTIFICATION
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* Target Selector Dropdown */}
            <div>
              <label 
                htmlFor="target-select-dropdown"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  marginBottom: '0.6rem'
                }}
              >
                1. WHO IS MOST LIKELY TO BE THE NEXT VICTIM?
              </label>
              
              <select
                id="target-select-dropdown"
                value={selectedTargetId}
                onChange={(e) => handleSelectTarget(e.target.value)}
                className="cyber-input"
                style={{ cursor: 'pointer', fontSize: '0.95rem', padding: '0.9rem 1rem' }}
              >
                <option value="">-- SELECT IDENTIFIED TARGET --</option>
                {targets.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.targetNumber}: {t.name} ({t.occupation}, {t.age} yrs, Blood: {t.bloodGroup}, Commute: {t.commuteMode})
                  </option>
                ))}
              </select>
            </div>

            {/* Reasoning Textarea */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <label 
                  htmlFor="reasoning-textarea"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--text-primary)',
                    fontWeight: 600
                  }}
                >
                  2. EXPLAIN YOUR FORENSIC REASONING & PATTERN PROOF
                </label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {reasoning.length} characters
                </span>
              </div>

              <textarea
                id="reasoning-textarea"
                value={reasoning}
                onChange={(e) => {
                  setReasoning(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="Explain which characteristics match the killer's pattern and why this target is more likely than the others (detail the blood group, commute habit, schedule, and elimination of distractor targets)..."
                className="cyber-textarea"
                rows={6}
              />
            </div>

            {/* Validation Error Alert */}
            {validationError && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1rem',
                background: 'rgba(230, 57, 70, 0.15)',
                border: '1px solid var(--accent-red)',
                borderRadius: 'var(--radius-sm)',
                color: '#ff8591',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}>
                <AlertTriangle size={16} style={{ flexShrink: 0 }} />
                <span>{validationError}</span>
              </div>
            )}

            {/* Submission CTA */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                ⚠️ Submissions are final and recorded for forensic judging.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cyber-btn cyber-btn-primary"
                style={{ padding: '1rem 2.5rem', fontSize: '1rem', letterSpacing: '0.08em' }}
              >
                {isSubmitting ? (
                  <>
                    <Activity size={18} className="spin" />
                    <span>ENCRYPTING & SUBMITTING...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>SUBMIT FINAL INVESTIGATION</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* Target Full Profile Modal */}
      {activeDossier && (
        <div className="modal-backdrop" onClick={() => setActiveDossier(null)}>
          <div 
            className="modal-container cyber-card corner-bracket"
            onClick={(e) => e.stopPropagation()}
            style={{ padding: '2rem', maxWidth: '640px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <div>
                <div className="status-pill status-pill-red" style={{ marginBottom: '0.4rem' }}>
                  {activeDossier.targetNumber} // SURVEILLANCE DOSSIER
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>
                  {activeDossier.name}
                </h3>
              </div>
              <button
                onClick={() => {
                  audioService.playClick();
                  setActiveDossier(null);
                }}
                className="cyber-btn"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
              >
                CLOSE
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Age: </span>
                <strong>{activeDossier.age}</strong>
              </div>
              <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Occupation: </span>
                <strong>{activeDossier.occupation}</strong>
              </div>
              <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Blood Group: </span>
                <strong style={{ color: 'var(--accent-red)' }}>{activeDossier.bloodGroup}</strong>
              </div>
              <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Commute Mode: </span>
                <strong style={{ color: 'var(--accent-cyan)' }}>{activeDossier.commuteMode}</strong>
              </div>
              <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Birth Month: </span>
                <strong>{activeDossier.birthMonth}</strong>
              </div>
              <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Favorite Color: </span>
                <strong>{activeDossier.favoriteColor}</strong>
              </div>
              <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Education: </span>
                <strong>{activeDossier.education}</strong>
              </div>
              <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Hobby: </span>
                <strong>{activeDossier.hobby}</strong>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                SURVEILLANCE & ROUTINE INTELLIGENCE:
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                {activeDossier.recentActivity}
              </p>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              borderLeft: '3px solid var(--accent-amber)',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-amber)', marginBottom: '0.2rem' }}>
                CONFIDENTIAL INVESTIGATOR NOTES:
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {activeDossier.dossierNotes}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                handleSelectTarget(activeDossier.id);
                setActiveDossier(null);
              }}
              className="cyber-btn cyber-btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              SELECT {activeDossier.name.toUpperCase()} AS PREDICTED TARGET
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
