import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import resumesData from '../../content/resumes.json';
import { generateResumeMarkdown } from '../../utils/markdownGenerator';
import { Copy, Download, Check, Printer, Edit2, Eye } from 'lucide-react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
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
  const [headerSize, setHeaderSize] = useState(2.5);
  
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  
  const imgRef = useRef(null);
  const printRef = useRef();

  useEffect(() => {
    if (selectedResume) {
      if (USE_GENERATOR) {
        const generatedMd = generateResumeMarkdown(selectedResume);
        setResumeContent(generatedMd);
        setIsEditMode(false);
      } else {
        // Fetch hardcoded legacy markdown using relative path
        fetch(selectedResume.file)
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

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const newCrop = centerCrop(
      makeAspectCrop({ unit: '%', width: 90 }, 1, width, height),
      width,
      height
    );
    setCrop(newCrop);
  };

  const generateCroppedImage = async () => {
    if (!completedCrop || !imgRef.current) return;
    
    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );
    
    const base64Image = canvas.toDataURL('image/jpeg');
    setCroppedImage(base64Image);
    setImgSrc('');
  };

  const clearPhoto = () => {
    setCroppedImage(null);
    setImgSrc('');
    setCompletedCrop(null);
  };

  const getDisplayContent = useMemo(() => {
    let content = resumeContent;
    if (userEmail) content = content.replace(/\[Your Email Address\]/g, userEmail);
    if (userPhone) content = content.replace(/\[Your Phone Number\]/g, userPhone);
    
    // Preserve empty new lines by injecting non-breaking spaces
    content = content.replace(/\n{3,}/g, (match) => '\n\n' + '&nbsp;\n\n'.repeat(match.length - 2));
    
    return content;
  }, [resumeContent, userEmail, userPhone]);

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

          <div className="contact-injection card bento-card">
            <h4 className="print-settings-title">Print Settings</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Email Override</label>
                <input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="Injects into [Your Email Address]" className="theme-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Phone Override</label>
                <input type="text" value={userPhone} onChange={e => setUserPhone(e.target.value)} placeholder="Injects into [Your Phone Number]" className="theme-input" />
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <label htmlFor="printHeaders" className="checkbox-label">
                  <input 
                    type="checkbox" 
                    id="printHeaders" 
                    checked={printHeaders} 
                    onChange={e => setPrintHeaders(e.target.checked)} 
                    className="checkbox-input"
                  />
                  Print Browser Headers & Footers
                </label>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Header Size (rem)</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button className="btn btn-outline" onClick={() => setHeaderSize(prev => Math.max(prev - 0.1, 1.5))} style={{ padding: '0.2rem 0.5rem' }}>-</button>
                  <span style={{ fontSize: '0.9rem', width: '2rem', textAlign: 'center' }}>{headerSize.toFixed(1)}</span>
                  <button className="btn btn-outline" onClick={() => setHeaderSize(prev => Math.min(prev + 0.1, 4.0))} style={{ padding: '0.2rem 0.5rem' }}>+</button>
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Profile Photo</label>
                {!croppedImage ? (
                  <input type="file" accept="image/*" onChange={onSelectFile} className="theme-input" />
                ) : (
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <img src={croppedImage} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <button className="btn btn-outline" onClick={clearPhoto} style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>Clear Photo</button>
                  </div>
                )}
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
              .resume-preview-content h1 {
                font-size: ${headerSize}rem !important;
              }
              .resume-preview-content h2 {
                font-size: ${headerSize * 0.6}rem !important;
              }
              .resume-preview-content h3 {
                font-size: ${headerSize * 0.5}rem !important;
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
              <div className="resume-preview-content" ref={printRef} style={{ lineHeight: lineSpacing, position: 'relative' }}>
                {croppedImage && (
                  <img 
                    src={croppedImage} 
                    alt="Profile" 
                    className="resume-profile-photo"
                  />
                )}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{getDisplayContent}</ReactMarkdown>
              </div>
            )}
          </div>
          
          {imgSrc && (
            <div className="crop-modal">
              <div className="crop-modal-content card">
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Crop Profile Photo</h4>
                <div style={{ maxHeight: '60vh', overflow: 'auto', display: 'flex', justifyContent: 'center', background: '#000' }}>
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={1}
                    circularCrop
                  >
                    <img ref={imgRef} src={imgSrc} alt="Upload" onLoad={onImageLoad} style={{ maxHeight: '60vh' }} />
                  </ReactCrop>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                  <button className="btn btn-outline" onClick={() => setImgSrc('')}>Cancel</button>
                  <button className="btn btn-primary" onClick={generateCroppedImage}>Apply Crop</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
