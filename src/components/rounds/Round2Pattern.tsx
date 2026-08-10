import React, { useState, useMemo } from 'react';
import { eventConfig, VictimRecord } from '../../config/gameConfig';
import { downloadCsvFile } from '../../services/csvService';
import { audioService } from '../../services/audioService';
import { Download, Table, Search, KeyRound, AlertCircle, CheckCircle2, ArrowUpDown, ChevronDown, ChevronUp, Database, FileSpreadsheet } from 'lucide-react';

interface Round2PatternProps {
  onSuccess: () => void;
}

export const Round2Pattern: React.FC<Round2PatternProps> = ({ onSuccess }) => {
  const [showPreview, setShowPreview] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof VictimRecord>('Victim_ID');
  const [sortAsc, setSortAsc] = useState(true);
  
  const [keyInput, setKeyInput] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const dataset = eventConfig.round2.dataset;

  // Filter and sort dataset for interactive preview
  const filteredRecords = useMemo(() => {
    return dataset.filter(row => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        row.Victim_ID.toLowerCase().includes(term) ||
        row.Name.toLowerCase().includes(term) ||
        row.Occupation.toLowerCase().includes(term) ||
        row.City.toLowerCase().includes(term) ||
        row.Blood_Group.toLowerCase().includes(term) ||
        row.Commute_Mode.toLowerCase().includes(term) ||
        row.Hobby.toLowerCase().includes(term) ||
        row.Birth_Month.toLowerCase().includes(term) ||
        row.Day_of_Week.toLowerCase().includes(term)
      );
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [dataset, searchTerm, sortField, sortAsc]);

  const handleSort = (field: keyof VictimRecord) => {
    audioService.playClick();
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleDownload = () => {
    audioService.playClick();
    downloadCsvFile(dataset, eventConfig.round2.csvFileName);
  };

  const handleVerifyKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim()) return;

    const normalizedInput = keyInput.trim().toUpperCase().replace(/\s+/g, '_');
    const targetKey = eventConfig.round2.accessKey.trim().toUpperCase().replace(/\s+/g, '_');

    if (normalizedInput === targetKey) {
      audioService.playAccessGranted();
      setIsSuccess(true);
      setErrorStatus(null);

      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      audioService.playError();
      setIsShaking(true);
      setErrorStatus('INCORRECT KEY. The pattern has not been identified correctly. Re-examine the evidence.');
      setKeyInput('');
      setAttemptCount(prev => prev + 1);

      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  return (
    <div className="page-wrapper fade-in">
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="status-pill status-pill-cyan" style={{ marginBottom: '0.75rem' }}>
            <Database size={13} />
            <span>PHASE 2 OF 3 // DATA PATTERN RECOGNITION</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            letterSpacing: '0.08em',
            marginBottom: '0.5rem'
          }}>
            {eventConfig.round2.title}
          </h1>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.15rem',
            color: 'var(--accent-red)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            {eventConfig.round2.subtitle}
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
            {eventConfig.round2.story}
          </p>
        </div>

        {/* Instructions & Task Guidance Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Task Guidance Card */}
          <div className="cyber-card corner-bracket" style={{ padding: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--accent-red)',
              marginBottom: '1rem',
              letterSpacing: '0.05em'
            }}>
              <Search size={16} />
              <span>YOUR TASK // INVESTIGATION OBJECTIVES</span>
            </div>
            <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {eventConfig.round2.instructions.map((inst, i) => (
                <li key={i} style={{ lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{inst}</strong>
                </li>
              ))}
            </ul>
          </div>

          {/* Dataset Action Card */}
          <div className="cyber-card corner-bracket" style={{
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'rgba(15, 20, 30, 0.9)'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--accent-cyan)',
                marginBottom: '0.75rem',
                letterSpacing: '0.05em'
              }}>
                <FileSpreadsheet size={16} />
                <span>VICTIM RECORDS DATASET (.CSV)</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Download the complete dataset of <strong>{dataset.length} previous victim records</strong> to perform advanced cross-filtering in Excel, LibreOffice Calc, or Python.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleDownload}
                className="cyber-btn cyber-btn-primary"
                style={{ flex: 1, padding: '0.85rem 1.25rem' }}
              >
                <Download size={18} />
                <span>DOWNLOAD CASE DATA (.CSV)</span>
              </button>

              <button
                onClick={() => {
                  audioService.playClick();
                  setShowPreview(!showPreview);
                }}
                className="cyber-btn"
                style={{ padding: '0.85rem 1.25rem' }}
              >
                <Table size={18} />
                <span>{showPreview ? 'HIDE PREVIEW' : 'VIEW DATA PREVIEW'}</span>
                {showPreview ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* In-App Interactive Data Preview Table */}
        {showPreview && (
          <div className="cyber-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Table size={18} color="var(--accent-red)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem' }}>
                  FORENSIC DATASET PREVIEW ({filteredRecords.length} / {dataset.length} RECORDS)
                </span>
              </div>

              {/* Quick Search */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter records (City, Blood, Commute...)"
                  className="cyber-input"
                  style={{ paddingLeft: '2.4rem', fontSize: '0.8rem', padding: '0.55rem 0.75rem 0.55rem 2.2rem' }}
                />
                <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* Table */}
            <div className="table-container" style={{ maxHeight: '420px', overflowY: 'auto' }}>
              <table className="cyber-table">
                <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                  <tr>
                    <th onClick={() => handleSort('Victim_ID')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        ID <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th onClick={() => handleSort('Name')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        Name <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th onClick={() => handleSort('Age')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        Age <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th onClick={() => handleSort('Occupation')}>Occupation</th>
                    <th onClick={() => handleSort('City')}>City</th>
                    <th onClick={() => handleSort('Blood_Group')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        Blood <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th onClick={() => handleSort('Birth_Month')}>Birth Month</th>
                    <th onClick={() => handleSort('Commute_Mode')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        Commute <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th onClick={() => handleSort('Day_of_Week')}>Incident Day</th>
                    <th onClick={() => handleSort('Hobby')}>Hobby</th>
                    <th onClick={() => handleSort('Status')}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((row) => (
                    <tr key={row.Victim_ID} className={row.Status === 'Confirmed Incident' ? 'highlight-row' : ''}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent-red)' }}>{row.Victim_ID}</td>
                      <td>{row.Name}</td>
                      <td>{row.Age}</td>
                      <td>{row.Occupation}</td>
                      <td>{row.City}</td>
                      <td>
                        <span className="status-pill status-pill-red" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                          {row.Blood_Group}
                        </span>
                      </td>
                      <td>{row.Birth_Month}</td>
                      <td>{row.Commute_Mode}</td>
                      <td>{row.Day_of_Week}</td>
                      <td>{row.Hobby}</td>
                      <td>
                        <span className={`status-pill ${row.Status === 'Confirmed Incident' ? 'status-pill-red' : 'status-pill-cyan'}`} style={{ fontSize: '0.65rem' }}>
                          {row.Status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan={11} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                        No records matched your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Tip: Click column headers to sort. Filter confirmed incidents vs background noise.
            </div>
          </div>
        )}

        {/* Round 3 Key / Access Verification Panel */}
        <div className={`cyber-card corner-bracket ${isShaking ? 'shake-animation' : ''} ${isSuccess ? 'pulse-success' : ''}`} style={{
          padding: '2.25rem',
          border: isSuccess ? '1px solid var(--accent-emerald)' : '1px solid var(--border-medium)',
          background: 'rgba(12, 16, 24, 0.92)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
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
              <KeyRound size={20} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>
                ROUND 3 CLEARANCE VERIFICATION
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Once you have identified the pattern, derive the investigation key.
              </p>
            </div>
          </div>

          <form onSubmit={handleVerifyKey} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label
                htmlFor="round2-key-input"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em'
                }}
              >
                ENTER ROUND 3 ACCESS KEY
              </label>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  id="round2-key-input"
                  type="text"
                  value={keyInput}
                  onChange={(e) => {
                    setKeyInput(e.target.value);
                    if (errorStatus) setErrorStatus(null);
                  }}
                  placeholder="Enter derived investigation key (e.g. PATTERN_AB_SUBWAY)"
                  className="cyber-input"
                  style={{ flex: 1, minWidth: '240px' }}
                  disabled={isSuccess}
                  autoComplete="off"
                />

                <button
                  type="submit"
                  disabled={!keyInput.trim() || isSuccess}
                  className={`cyber-btn ${isSuccess ? 'cyber-btn-emerald' : 'cyber-btn-primary'}`}
                  style={{ padding: '0.85rem 1.75rem', flexShrink: 0 }}
                >
                  {isSuccess ? (
                    <>
                      <CheckCircle2 size={18} />
                      <span>PATTERN CONFIRMED</span>
                    </>
                  ) : (
                    <>
                      <KeyRound size={18} />
                      <span>VERIFY KEY</span>
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
                <span>PATTERN CONFIRMED — Round 3 access granted. Transitioning to Target Surveillance...</span>
              </div>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <span>UNLIMITED ATTEMPTS PERMITTED</span>
              {attemptCount > 0 && <span>VERIFICATIONS ATTEMPTED: {attemptCount}</span>}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
