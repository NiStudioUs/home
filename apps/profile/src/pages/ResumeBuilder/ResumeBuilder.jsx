import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import resumesData from '../../content/resumes.json';
import profileData from '../../content/profile.json';
import skillsData from '../../content/skills.json';
import { generateResumeMarkdown } from '../../utils/markdownGenerator';
import { Copy, Download, Check, Printer, Edit2, Eye, UserCircle, Smartphone, Globe, MonitorPlay } from 'lucide-react';
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
  const [headerSize, setHeaderSize] = useState(2.2);
  const [headingWeight, setHeadingWeight] = useState(500);
  const [briefMode, setBriefMode] = useState(true);
  const [photoSize, setPhotoSize] = useState(100);
  const [photoShape, setPhotoShape] = useState('circle');
  
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    
    if (selectedResume && selectedResume.skillTypes) {
      const tableRegex = /\|.*\|\n\| [:\- ]+ \| [:\- ]+ \|\n(\| \*\*.*?\*\* \| .*? \|\n)+/g;
      if (tableRegex.test(content)) {
        let table = '| | |\n| --- | --- |\n';
        selectedResume.skillTypes.forEach(catName => {
          const cat = skillsData.categories.find(c => c.name === catName);
          if (cat) {
            table += `| **${cat.name}** | ${cat.skills.join(', ')} |\n`;
          }
        });
        content = content.replace(tableRegex, table);
      }
    }

    if (briefMode) {
      // 1. Universal Experience Summarization
      if (selectedResume?.id !== 'ats-styled') {
        const expSectionRegex = /(## Experience\s*\r?\n)([\s\S]*?)(?=\r?\n## |\r?\n---|$)/;
        content = content.replace(expSectionRegex, (match, header, body) => {
          let newBody = body.replace(/(### [\s\S]*?)(?=\r?\n### |\r?\n---|$)/g, (roleBlock) => {
            const splitPoint = roleBlock.indexOf('\n- ');
            if (splitPoint === -1) return roleBlock;
            const headerPart = roleBlock.substring(0, splitPoint + 1);
            
            if (roleBlock.includes('Present') || (roleBlock.includes('May 2023') && !roleBlock.includes('2021'))) {
               return headerPart + "*Architected and engineered enterprise-grade E2E test automation platforms using Mocha, Cypress, and Playwright. Spearheaded CI/CD pipeline optimizations that reduced test execution times by 60%, drove organizational GenAI adoption to boost engineering productivity, and delivered exhaustive automation for critical CDD and onboarding microservices.*\n";
            }
            if (roleBlock.includes('2021') && roleBlock.includes('2023')) {
               return headerPart + "*Architected and delivered end-to-end test automation frameworks across lending and deposits domains using Selenium, Cucumber BDD, and Docker Test Containers. Directed QA execution for Asset Finance projects while mentoring teams and optimizing automation infrastructure.*\n";
            }
            if (roleBlock.includes('2018') && roleBlock.includes('2020')) {
               return headerPart + "*Engineered comprehensive automation across Mobile (Android/iOS), Web, and API channels for retail banking modules including T24, payments, and commercial operations. Accelerated release cycles by establishing robust test data creation frameworks and executing rigorous compatibility testing via Sauce Labs.*\n";
            }
            return roleBlock;
          });
          return header + newBody;
        });
      }

      if (selectedResume?.id !== 'ats-styled') {
        // 2. Development Projects Summarization (1-2 lines each)
        const projectsMatch = /(## Development Projects\s*\r?\n)([\s\S]*?)(?=\r?\n---)/;
        content = content.replace(projectsMatch, (match, p1, p2) => {
          let cleanProjects = p2.replace(/\*\*Tech:\*\*.*?\r?\n+/g, '');
          cleanProjects = cleanProjects.replace(/^- /gm, '');
          return p1 + cleanProjects;
        });

        // 3. Professional Highlights Summarization
        const highlightsMatch = /(## Professional Highlights\s*\r?\n)([\s\S]*?)(?=\r?\n---|\r?\n## |$)/;
        content = content.replace(highlightsMatch, "$1*9+ years of hybrid QE/SDET and mobile development experience, featuring extensive banking domain expertise (lending, deposits, mobile channels) and a proven track record of deploying robust, cross-platform Android applications to the Google Play Store.*\n\n");

        // 4. Awards & Accomplishments Summarization
        const awardsMatch = /(## Awards & Accomplishments\s*\r?\n)([\s\S]*?)(?=\r?\n---|\r?\n## |$)/;
        content = content.replace(awardsMatch, "$1*Recognized with multiple industry awards including \"Best Performer,\" \"Extra-Miler,\" and \"Hackathon Winner\" for exceptional contributions to T24 UI automation, Asset Finance frameworks, and innovative integration test methodologies.*\n\n");

        // 5. Professional Summary Summarization
        const summaryMatch = /(## (?:Professional )?Summary\s*\r?\n)([\s\S]*?)(?=\r?\n---|\r?\n## |$)/;
        content = content.replace(summaryMatch, "$1Versatile Automation Lead and QE Architect with 9+ years of experience engineering high-performance automation platforms for enterprise banking. Proven track record of architecting scalable CI/CD pipelines, driving developer velocity, and leading organizational GenAI adoption.\n\n");
      }
    }

    // Preserve empty new lines by injecting non-breaking spaces
    content = content.replace(/\n{3,}/g, (match) => '\n\n' + '&nbsp;\n\n'.repeat(match.length - 2));
    
    return content;
  }, [resumeContent, userEmail, userPhone, selectedResume, briefMode]);

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

              <div style={{ marginTop: '0.2rem' }}>
                <label htmlFor="briefMode" className="checkbox-label">
                  <input 
                    type="checkbox" 
                    id="briefMode" 
                    checked={briefMode} 
                    onChange={e => setBriefMode(e.target.checked)} 
                    className="checkbox-input"
                  />
                  Brief ATS & Summary Mode
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
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Heading Weight</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input type="range" min="100" max="900" step="100" value={headingWeight} onChange={e => setHeadingWeight(Number(e.target.value))} style={{ flex: 1 }} />
                  <span style={{ fontSize: '0.9rem', width: '2rem', textAlign: 'right' }}>{headingWeight}</span>
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Profile Photo</label>
                {!croppedImage ? (
                  <input type="file" accept="image/*" onChange={onSelectFile} className="theme-input" />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <img src={croppedImage} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: photoShape === 'circle' ? '50%' : '4px', objectFit: 'cover' }} />
                      <button className="btn btn-outline" onClick={clearPhoto} style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>Clear Photo</button>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Photo Size (px)</label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button className="btn btn-outline" onClick={() => setPhotoSize(prev => Math.max(prev - 10, 60))} style={{ padding: '0.2rem 0.5rem' }}>-</button>
                        <span style={{ fontSize: '0.9rem', width: '2.5rem', textAlign: 'center' }}>{photoSize}</span>
                        <button className="btn btn-outline" onClick={() => setPhotoSize(prev => Math.min(prev + 10, 200))} style={{ padding: '0.2rem 0.5rem' }}>+</button>
                      </div>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>Photo Shape</label>
                      <select className="theme-input" value={photoShape} onChange={e => setPhotoShape(e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
                        <option value="circle">Circle</option>
                        <option value="square">Square</option>
                      </select>
                    </div>
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
                h1, h2, h3, h4, h5 {
                  page-break-after: avoid;
                  break-after: avoid;
                }
                p, li, div {
                  page-break-inside: avoid;
                  break-inside: avoid;
                }
                p + ul {
                  page-break-before: avoid;
                  break-before: avoid;
                  margin-top: 0 !important;
                }
                .resume-preview-content h2 {
                  margin-top: 1rem !important;
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
              .resume-preview-content h2,
              .resume-preview-content h3,
              .resume-preview-content h4,
              .resume-preview-content th {
                font-weight: ${headingWeight} !important;
              }
              ${selectedResume?.id === 'ats-styled' ? `
              .resume-preview-content,
              .resume-preview-content * {
                color: #000000 !important;
              }
              .resume-preview-content {
                font-size: 0.9rem !important;
                line-height: 1.35 !important;
              }
              .resume-preview-content hr {
                border-color: #aaaaaa !important;
                margin: 0.6rem 0 !important;
              }
              .resume-preview-content h2 {
                margin-top: 1rem !important;
                margin-bottom: 0.4rem !important;
              }
              .resume-preview-content h3 {
                margin-top: 0.8rem !important;
                margin-bottom: 0.1rem !important;
              }
              .resume-preview-content p {
                margin-bottom: 0.3rem !important;
              }
              .resume-preview-content ul {
                margin-top: 0.1rem !important;
                margin-bottom: 0.8rem !important;
              }
              ` : ''}
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
                    style={{
                      width: `${photoSize}px`,
                      height: `${photoSize}px`,
                      borderRadius: photoShape === 'circle' ? '50%' : '8px'
                    }}
                  />
                )}
                {getDisplayContent.split('{{SOCIAL_LINKS}}').map((part, index, arr) => (
                  <React.Fragment key={index}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{part}</ReactMarkdown>
                    {index === 0 && arr.length > 1 && (
                      <div className="resume-socials" style={{ display: 'flex', gap: '2rem', marginTop: '0.8rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        {profileData.socials.map((social, idx) => {
                          const IconComponent = { UserCircle, Smartphone, Globe, MonitorPlay }[social.icon];
                          return (
                            <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2563eb', textDecoration: 'none', fontSize: '0.9rem' }}>
                              {IconComponent && <IconComponent size={16} />}
                              <span style={{ fontWeight: 500 }}>{social.platform}</span>
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Full Screen Cropper Modal */}
      {imgSrc && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--bg-default)', padding: '1.5rem', borderRadius: '8px', maxWidth: '90vw', maxHeight: '90vh', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
            <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Crop Profile Photo</h3>
            <div style={{ overflow: 'hidden', borderRadius: '4px', background: '#000', display: 'flex', justifyContent: 'center' }}>
              <ReactCrop crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} onComplete={c => setCompletedCrop(c)} aspect={photoShape === 'circle' ? 1 : 1} circularCrop={photoShape === 'circle'}>
                <img ref={imgRef} src={imgSrc} alt="Crop me" onLoad={onImageLoad} style={{ maxHeight: '60vh', objectFit: 'contain' }} />
              </ReactCrop>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
              <button className="btn btn-outline" onClick={() => setImgSrc('')}>Cancel</button>
              <button className="btn btn-primary" onClick={generateCroppedImage}>
                <Check size={16}/> Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
