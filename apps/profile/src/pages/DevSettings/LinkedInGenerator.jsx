import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, RefreshCw } from 'lucide-react';
import profileData from '../../content/profile.json';
import skillsData from '../../content/skills.json';
import projectsData from '../../content/projects.json';
import experienceData from '../../content/experience.json';
import './DevSettings.css';

const ROLE_MAPPINGS = {
  'SDET QE': ['SDET / QE / Automation', 'CI/CD / DevOps / Tooling', 'Domain Expertise'],
  'Flutter Developer': ['Mobile Development', 'Android Release Management'],
  'Front End Developer': ['Web Automation'], // Assuming frontend tech falls here or we just hardcode some
  'Back End Developer': ['Data / Backend / Platform', 'API / Service Testing', 'CI/CD / DevOps / Tooling'],
  'Hybrid': ['SDET / QE / Automation', 'Mobile Development', 'CI/CD / DevOps / Tooling']
};

export default function LinkedInGenerator() {
  const [activeTab, setActiveTab] = useState('classic');
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const [roles, setRoles] = useState({
    'SDET QE': true,
    'Flutter Developer': true,
    'Front End Developer': true,
    'Back End Developer': true,
    'Hybrid': true
  });

  const toggleRole = (role) => {
    setRoles(prev => ({ ...prev, [role]: !prev[role] }));
  };

  // Helper to filter skills based on selected roles
  const getFilteredCategories = () => {
    const allowedCategoryNames = new Set();
    Object.entries(roles).forEach(([role, isSelected]) => {
      if (isSelected && ROLE_MAPPINGS[role]) {
        ROLE_MAPPINGS[role].forEach(c => allowedCategoryNames.add(c));
      }
    });

    return skillsData.categories.filter(c => allowedCategoryNames.has(c.name));
  };

  const getFilteredSkillsList = (categoryName) => {
    const cats = getFilteredCategories();
    const cat = cats.find(c => c.name === categoryName);
    return cat ? cat.skills : [];
  };

  // Extracted core data points
  const portfolioUrl = profileData.socials.find(s => s.platform === 'Portfolio')?.url || 'https://nistudious.github.io/home/';
  
  const highlightMatch = profileData.highlights.join(' ').match(/(\d+\+?) years/);
  const yearsOfExperience = highlightMatch ? `${highlightMatch[1]} years` : '8+ years';
  
  const domainSkills = getFilteredSkillsList('Domain Expertise');
  const domains = domainSkills.length > 0 ? domainSkills.slice(0, 3).join(', ') : 'Retail Banking, Retail operation and Digital Mobile Channel';
  
  const mobileProject = projectsData.find(p => p.tags.includes('Mobile App') || p.tags.includes('Flutter'));
  const projectName = mobileProject?.name || 'Note Application with Google Drive Integration';

  // Generators
  const generateClassic = () => {
    const sdet = getFilteredSkillsList('SDET / QE / Automation');
    const mobile = getFilteredSkillsList('Mobile Development');
    const cicd = getFilteredSkillsList('CI/CD / DevOps / Tooling');
    
    // Build automation list dynamically
    let automationSection = '';
    if (sdet.length > 0) {
      automationSection += `\n✓ Expertise in Automation Platform\n`;
      const webSkills = sdet.filter(s => s.toLowerCase().includes('web') || s.toLowerCase().includes('selenium') || s.toLowerCase().includes('cypress'));
      const apiSkills = sdet.filter(s => s.toLowerCase().includes('api') || s.toLowerCase().includes('rest'));
      if (webSkills.length > 0) automationSection += `🌐 Web | ${webSkills.join(' | ')}\n`;
      if (apiSkills.length > 0) automationSection += `⚙️ API | ${apiSkills.join(' | ')}\n`;
    }

    if (mobile.length > 0) {
      automationSection += `📱 Mobile | ${mobile.slice(0, 3).join(' | ')}\n`;
    }

    let cicdSection = '';
    if (cicd.length > 0) {
      cicdSection = `\n✓ Continuous Integration & DevOps\n⚙️ ${cicd.slice(0, 5).join(' | ')}\n`;
    }

    return `✓ My development homepage: ${portfolioUrl}

✓ Having ${yearsOfExperience} of service in Software Engineering & Testing for Banking Projects (${domains})
🌐 Web | 📱 Mobile | 🔎 API

✓ Built and released Android Application in Google Play Store
🔎 ${roles['Flutter Developer'] ? 'Dart | Flutter | BLoC pattern' : 'Native Android | UI/UX'}

✓ Programming Languages
🧑‍💻 Java
🧑‍💻 JavaScript & TypeScript
🧑‍💻 Dart (Flutter)
🧑‍💻 Kotlin${automationSection}${cicdSection}
📲 Featured Project
©️ ${projectName}
${portfolioUrl}`;
  };

  const generateModern = () => {
    const sdet = roles['SDET QE'];
    const flutter = roles['Flutter Developer'];
    const backend = roles['Back End Developer'];

    let identity = "Software Engineer";
    if (sdet && flutter) identity = "Hybrid Quality Engineer & Mobile Developer";
    else if (sdet) identity = "Senior SDET";
    else if (flutter) identity = "Flutter & Mobile App Developer";

    let paragraphs = [];
    paragraphs.push(`I am a ${identity} with ${yearsOfExperience} of experience specializing in complex financial ecosystems (${domains}).`);

    if (sdet) {
      paragraphs.push(`I bridge the gap between rigorous enterprise testing and rapid product delivery. I specialize in building robust, shift-left automation frameworks using modern tooling like Cypress, Playwright, and REST Assured, fully integrated into Azure DevOps pipelines.`);
    }

    if (flutter || roles['Front End Developer']) {
      paragraphs.push(`Beyond automation, I am deeply passionate about front-end architecture and mobile development. I have independently designed, built, and published cross-platform Flutter applications on the Google Play Store (e.g., ${projectName}), utilizing BLoC architecture and local-first databases.`);
    }

    if (backend) {
      paragraphs.push(`I possess strong foundational experience with backend systems and API architectures, ensuring seamless data flow, secure API implementations, and robust microservices integrations.`);
    }

    paragraphs.push(`Core Competencies:\n🚀 Strategy & Architecture\n💻 Test Automation & Tooling\n📱 Cross-Platform Development\n⚙️ CI/CD & Cloud Infrastructure`);
    paragraphs.push(`Portfolio: ${portfolioUrl}`);

    return paragraphs.join('\n\n');
  };

  const generateTech = () => {
    const sdet = getFilteredSkillsList('SDET / QE / Automation');
    const mobile = getFilteredSkillsList('Mobile Development');
    const cicd = getFilteredSkillsList('CI/CD / DevOps / Tooling');
    const backend = getFilteredSkillsList('Data / Backend / Platform');

    const stack = [];
    stack.push(`🔸 Languages: TypeScript, Dart, Java, Kotlin`);
    if (sdet.length) stack.push(`🔸 Automation: ${sdet.slice(0, 5).join(', ')}`);
    if (mobile.length) stack.push(`🔸 Mobile: ${mobile.slice(0, 4).join(', ')}`);
    if (cicd.length) stack.push(`🔸 Infrastructure: ${cicd.slice(0, 5).join(', ')}`);
    if (backend.length) stack.push(`🔸 Backend: ${backend.slice(0, 4).join(', ')}`);

    return `💻 ${profileData.title}
🔗 ${portfolioUrl}

With ${yearsOfExperience} of experience, I specialize in scalable engineering.

TECH STACK & ARCHITECTURE:
${stack.join('\n')}
🔸 Domains: ${domains}

RECENT HIGHLIGHTS:
✅ Built and released ${projectName} in the Play Store.
✅ Automated complex data setups and decoupled microservices.
✅ Integrated modern tooling (GenAI, Copilot) into daily dev cycles.`;
  };

  const generateDynamic = () => {
    const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);
    
    const sdet = getFilteredSkillsList('SDET / QE / Automation');
    const cicd = getFilteredSkillsList('CI/CD / DevOps / Tooling');

    const randomLangs = shuffle(['TypeScript', 'Dart', 'Java', 'Kotlin', 'C++']).slice(0, 4);
    const randomAuto = shuffle(sdet).slice(0, 3);
    const randomCI = shuffle(cicd).slice(0, 3);
    
    const allBullets = experienceData.flatMap(e => e.bullets || []);
    const randomBullet1 = shuffle(allBullets)[0];
    const randomBullet2 = shuffle(allBullets)[1];

    return `🔥 Senior Engineer & Automation Specialist
💻 Portfolio: ${portfolioUrl}

Summary:
Delivering ${yearsOfExperience} of excellence in software engineering, primarily within complex ecosystems (${domains}). 

Technical Arsenal:
🛠️ Languages: ${randomLangs.join(', ')}
${randomAuto.length ? `🤖 Automation: ${randomAuto.join(' • ')}` : ''}
${randomCI.length ? `☁️ DevOps: ${randomCI.join(' • ')}` : ''}

Impact Highlights:
⭐ ${randomBullet1}
⭐ ${randomBullet2}
⭐ Built and published ${projectName} to the Google Play Store.

Let's connect if you're interested in scalable architecture or modern engineering!`;
  };

  const updateText = (tab) => {
    if (tab === 'classic') setGeneratedText(generateClassic());
    if (tab === 'modern') setGeneratedText(generateModern());
    if (tab === 'tech') setGeneratedText(generateTech());
    if (tab === 'dynamic') setGeneratedText(generateDynamic());
  };

  useEffect(() => {
    if (activeTab !== 'suggestions') {
      updateText(activeTab);
    }
  }, [activeTab, roles]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSuggestions = () => {
    const allBullets = experienceData.flatMap(e => e.resumeBullets || []);
    const topBullets = allBullets.slice(0, 4).map(b => b.text);

    return (
      <div className="suggestions-container">
        <div className="suggestion-box">
          <h3>📌 Headline Suggestions</h3>
          <p className="text-secondary" style={{marginBottom: '0.5rem', fontSize: '0.9rem'}}>Copy one of these high-impact headers to your LinkedIn Profile Headline:</p>
          <ul>
            <li>{profileData.title}</li>
            <li>Senior SDET | Cypress & Appium Expert | Flutter App Developer</li>
            <li>Quality Engineering Lead | Banking Domain | Mobile Product Developer</li>
            <li>Software Development Engineer in Test | {yearsOfExperience} | Azure DevOps</li>
          </ul>
        </div>

        <div className="suggestion-box">
          <h3>💡 Top Skills to Pin</h3>
          <p className="text-secondary" style={{marginBottom: '0.5rem', fontSize: '0.9rem'}}>Add these to the "Skills" section of your LinkedIn profile and pin the top 3:</p>
          <ul>
            <li><strong>Test Automation:</strong> Cypress, Appium, REST Assured</li>
            <li><strong>Mobile Development:</strong> Flutter, Dart, BLoC Pattern, Android</li>
            <li><strong>CI/CD & Tools:</strong> Azure DevOps, GitHub Actions, Docker</li>
            <li><strong>Languages:</strong> TypeScript, Java, Kotlin</li>
            <li><strong>Domain:</strong> Retail Banking, Customer Onboarding, Deposits</li>
          </ul>
        </div>

        <div className="suggestion-box">
          <h3>🏆 Featured Experience Bullets</h3>
          <p className="text-secondary" style={{marginBottom: '0.5rem', fontSize: '0.9rem'}}>Use these powerful highlights in your Job History descriptions:</p>
          <ul>
            {topBullets.map((bullet, i) => {
              const text = bullet || '';
              const parts = text.split(/\*\*(.*?)\*\*/g);
              return (
                <li key={i}>
                  {parts.map((part, index) => 
                    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="dev-settings-page container">
      <h1 className="page-title">Developer Settings</h1>
      <p className="resume-intro text-center">
        Enhance your LinkedIn profile directly from your portfolio data.
      </p>

      <div className="generator-card card">
        <div className="dev-tabs">
          <button className="dev-tab" onClick={() => navigate('/resume')}>Resume Engine 🚀</button>
          <button className={`dev-tab ${activeTab === 'classic' ? 'active' : ''}`} onClick={() => setActiveTab('classic')}>Classic Format</button>
          <button className={`dev-tab ${activeTab === 'modern' ? 'active' : ''}`} onClick={() => setActiveTab('modern')}>Modern Narrative</button>
          <button className={`dev-tab ${activeTab === 'tech' ? 'active' : ''}`} onClick={() => setActiveTab('tech')}>Tech-Focused</button>
          <button className={`dev-tab ${activeTab === 'dynamic' ? 'active' : ''}`} onClick={() => { setActiveTab('dynamic'); updateText('dynamic'); }}>Dynamic Mix</button>
          <button className={`dev-tab ${activeTab === 'suggestions' ? 'active' : ''}`} onClick={() => setActiveTab('suggestions')}>Profile Suggestions</button>
        </div>

        <div className="role-filters">
          {Object.keys(roles).map(role => (
            <label key={role} className="role-filter-label">
              <input 
                type="checkbox" 
                checked={roles[role]} 
                onChange={() => toggleRole(role)} 
              />
              {role}
            </label>
          ))}
        </div>

        {activeTab !== 'suggestions' && (
          <>
            <div className="generator-header">
              <h2>About Section Generator</h2>
              <div>
                {activeTab === 'dynamic' && (
                  <button className="btn generate-btn" onClick={() => updateText('dynamic')} style={{marginRight: '8px'}}>
                    <RefreshCw size={16} /> Shuffle
                  </button>
                )}
                <button className="btn btn-primary" onClick={handleCopy} title={copied ? 'Copied!' : 'Copy to Clipboard'}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
            
            <p className="text-secondary" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
              This template dynamically adjusts based on the roles checked above.
            </p>

            <textarea 
              className="linkedin-textarea"
              value={generatedText}
              onChange={(e) => setGeneratedText(e.target.value)}
              spellCheck="false"
            />
          </>
        )}

        {activeTab === 'suggestions' && renderSuggestions()}
      </div>
    </div>
  );
}
