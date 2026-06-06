import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import resumesData from '../../content/resumes.json';
import { generateResumeMarkdown } from '../../utils/markdownGenerator';
import { Copy, Download, Check, Printer, Edit2, Eye } from 'lucide-react';
import './ResumeBuilder.css';

// Feature Flag: Toggle between dynamic generation and hardcoded legacy markdown
const USE_GENERATOR = false;

export default function ResumeBuilder() {
  const [selectedResume, setSelectedResume] = useState(resumesData[0]);
  const [resumeContent, setResumeContent] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [copiedPlain, setCopiedPlain] = useState(false);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [printHeaders, setPrintHeaders] = useState(false);
  
  const printRef = useRef();

  useEffect(() => {
    if (selectedResume) {
      if (USE_GENERATOR) {
        const generatedMd = generateResumeMarkdown(selectedResume);
        setResumeContent(generatedMd);
        setIsEditMode(false);
      } else {
        // Fetch hardcoded legacy markdown using relative path
        const relativePath = selectedResume.file.startsWith('/') 
          ? `.${selectedResume.file}` 
          : selectedResume.file;
          
        fetch(relativePath)
          .then(res => res.text())
          .then(text => {
            setResumeContent(text);
            setIsEditMode(false);
          })
          .catch(err => {
            console.error("Failed to load hardcoded resume:", err);
            setResumeContent("# Error loading resume\n\nCould not load the static resume file.");
          });
      }
    }
  }, [selectedResume]);

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(resumeContent);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  const handleCopyPlain = () => {
    if (printRef.current) {
      const text = printRef.current.innerText;
      navigator.clipboard.writeText(text);
      setCopiedPlain(true);
      setTimeout(() => setCopiedPlain(false), 2000);
    }
  };

  const handlePrint = () => {
    if (isEditMode) {
      setIsEditMode(false);
      // Wait for state to update and React to re-render the UI view
      setTimeout(() => {
        window.print();
      }, 100);
    } else {
      window.print();
    }
  };

  const getDisplayContent = () => {
    let content = resumeContent;
    if (userEmail) content = content.replace(/\[Your Email Address\]/g, userEmail);
    if (userPhone) content = content.replace(/\[Your Phone Number\]/g, userPhone);
    
    // Preserve empty new lines by injecting non-breaking spaces
    content = content.replace(/\n{3,}/g, (match) => '\n\n' + '&nbsp;\n\n'.repeat(match.length - 2));
    
    return content;
  };

  return (
    <div className="resume-page container">
      <h1 className="page-title">Resume Builder</h1>
      <p className="resume-intro text-center">
        Select a variant, preview the formatted resume, generate a PDF, or edit the raw markdown.
      </p>

      <div className="resume-layout">
        <aside className="resume-sidebar">
          <h3>Variants</h3>
          <div className="variant-list">
            {resumesData.map((resume) => (
              <button
                key={resume.id}
                className={`variant-btn ${selectedResume.id === resume.id ? 'active' : ''}`}
                onClick={() => setSelectedResume(resume)}
              >
                <div className="variant-name">{resume.name}</div>
                <div className="variant-desc">{resume.description}</div>
              </button>
            ))}
          </div>

          <div className="contact-injection" style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'var(--text-primary)' }}>Print Settings</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Email Override</label>
                <input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="Injects into [Your Email Address]" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-default)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Phone Override</label>
                <input type="text" value={userPhone} onChange={e => setUserPhone(e.target.value)} placeholder="Injects into [Your Phone Number]" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-default)', color: 'var(--text-primary)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input 
                  type="checkbox" 
                  id="printHeaders" 
                  checked={printHeaders} 
                  onChange={e => setPrintHeaders(e.target.checked)} 
                />
                <label htmlFor="printHeaders" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Print Browser Headers & Footers
                </label>
              </div>
            </div>
          </div>
        </aside>

        <main className="resume-content-area card">
          <style>
            {`
              @media print {
                @page {
                  margin: ${printHeaders ? '1cm' : '0'};
                }
                body {
                  margin: ${printHeaders ? '0' : '1cm'} !important;
                }
              }
            `}
          </style>
          <div className="resume-actions">
            <button className="btn btn-primary" onClick={handlePrint}>
              <Printer size={16} /> Print / PDF
            </button>
            
            <button className="btn btn-outline" onClick={() => setIsEditMode(!isEditMode)}>
              {isEditMode ? <><Eye size={16} /> View UI</> : <><Edit2 size={16} /> Edit Markdown</>}
            </button>
            
            <button className="btn btn-outline" onClick={handleCopyPlain} disabled={isEditMode}>
              {copiedPlain ? <Check size={16} /> : <Copy size={16} />}
              {copiedPlain ? 'Copied Plain Text' : 'Copy UI Text'}
            </button>
            
            {isEditMode && (
              <button className="btn btn-outline" onClick={handleCopyRaw}>
                {copiedRaw ? <Check size={16} /> : <Copy size={16} />}
                {copiedRaw ? 'Copied Markdown' : 'Copy Markdown'}
              </button>
            )}

            {!isEditMode && (
              <div className="spacing-control" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Spacing: {lineSpacing.toFixed(1)}</label>
                <button 
                  className="btn btn-outline" 
                  onClick={() => setLineSpacing(prev => Math.max(prev - 0.1, 1.0))}
                  style={{ padding: '2px 8px' }}
                >
                  -
                </button>
                <button 
                  className="btn btn-outline" 
                  onClick={() => setLineSpacing(prev => Math.min(prev + 0.1, 3.0))}
                  style={{ padding: '2px 8px' }}
                >
                  +
                </button>
              </div>
            )}
          </div>

          <div className="resume-preview">
            {isEditMode ? (
              <textarea 
                className="markdown-editor"
                value={resumeContent}
                onChange={(e) => setResumeContent(e.target.value)}
                placeholder="Markdown content... any [Your Email Address] placeholders will be replaced in UI view."
              />
            ) : (
              <div className="resume-preview-content" ref={printRef} style={{ lineHeight: lineSpacing }}>
                <ReactMarkdown>{getDisplayContent()}</ReactMarkdown>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
