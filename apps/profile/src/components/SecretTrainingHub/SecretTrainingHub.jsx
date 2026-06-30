import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { 
  BookOpen, CheckCircle2, ArrowLeft, Terminal, 
  HelpCircle, Layers, Code, Hash, BookmarkCheck,
  ChevronDown, ChevronRight, FileText, FolderOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trainingChatsList, sdetTrainingHubData } from '../../content/training';
import './SecretTrainingHub.css';

export default function SecretTrainingHub() {
  const navigate = useNavigate();
  const [activeChatId, setActiveChatId] = useState('sdet_masterclass');
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const [isQuickJumpOpen, setIsQuickJumpOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('java');
  const [expandedModules, setExpandedModules] = useState({ 'sdet_masterclass': true });

  const toggleModule = (id) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeHubData = sdetTrainingHubData;
  const currentChapter = activeHubData.chapters[selectedChapterIdx] || activeHubData.chapters[0];

  const rawSolution = currentChapter?.codingChallenge?.solutionCode;
  const hasMultiLang = rawSolution && typeof rawSolution === 'object';
  const solutionContent = hasMultiLang ? (rawSolution[activeLang] || rawSolution.java) : rawSolution;

  const handleScrollToIndex = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="training-page-container">
      {/* Floating Expandable Quick-Jump Scrollbar Bar */}
      <div 
        className={`floating-quick-jump ${isQuickJumpOpen ? 'expanded' : ''}`}
        onMouseEnter={() => setIsQuickJumpOpen(true)}
        onMouseLeave={() => setIsQuickJumpOpen(false)}
        onClick={() => setIsQuickJumpOpen(!isQuickJumpOpen)}
      >
        <div className="quick-jump-trigger">
          <Layers size={18} />
          <span className="quick-jump-trigger-text">Skip to Section...</span>
        </div>
        {isQuickJumpOpen && (
          <div className="quick-jump-menu" onClick={(e) => e.stopPropagation()}>
            <div className="quick-jump-menu-title">⚡ Chapter Quick Jump</div>
            <div className="quick-jump-list">
              {currentChapter.indexTopics.map((topic) => (
                <button
                  key={topic.id}
                  className="quick-jump-item"
                  onClick={() => {
                    handleScrollToIndex(topic.id);
                    setIsQuickJumpOpen(false);
                  }}
                >
                  <Hash size={13} />
                  <span>{topic.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button className="training-back-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={16} /> Back to Portfolio Home
      </button>

      <div className="training-layout-grid">
        {/* Left Sidebar: Hierarchical Modules & Chapters */}
        <aside className="training-left-sidebar">
          <div className="sidebar-title-label">Training Modules &amp; Chapters</div>
          {trainingChatsList.map((entry) => {
            const isExpanded = expandedModules[entry.id] !== false;
            const isSelected = activeChatId === entry.id;
            return (
              <div
                key={entry.id}
                className={`chat-entry-card ${isSelected ? 'active' : ''}`}
                style={{ marginBottom: '1rem', cursor: 'pointer' }}
              >
                <div
                  onClick={() => {
                    setActiveChatId(entry.id);
                    toggleModule(entry.id);
                  }}
                >
                  <div className="entry-card-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {isExpanded ? <ChevronDown size={18} color="var(--primary-color, #2563eb)" /> : <ChevronRight size={18} />}
                      <FolderOpen size={16} color="var(--primary-color, #2563eb)" />
                      <h3 className="entry-card-title">{entry.title}</h3>
                    </div>
                    <span className="entry-card-tag">#{entry.tag}</span>
                  </div>
                  <p className="entry-card-desc" style={{ marginTop: '0.4rem' }}>{entry.summary}</p>
                </div>

                {/* Hierarchical Chapters inside LHS parent card */}
                {isExpanded && isSelected && activeHubData.chapters && (
                  <div className="lhs-chapter-tree" onClick={(e) => e.stopPropagation()}>
                    {activeHubData.chapters.map((chap, idx) => {
                      const isChapSelected = selectedChapterIdx === idx;
                      return (
                        <div key={chap.chapterId} className="lhs-chapter-tile">
                          <button
                            className={`lhs-chapter-item ${isChapSelected ? 'active' : ''}`}
                            onClick={() => setSelectedChapterIdx(idx)}
                          >
                            {isChapSelected ? <ChevronDown size={15} color="var(--primary-color, #2563eb)" /> : <ChevronRight size={15} />}
                            <FileText size={15} color={isChapSelected ? 'var(--primary-color, #2563eb)' : '#64748b'} />
                            <span>{chap.title.split(' (')[0]}</span>
                          </button>

                          {/* Clickable Topics to jump directly inside selected chapter */}
                          {isChapSelected && chap.indexTopics && (
                            <div className="lhs-subtopics-list">
                              {chap.indexTopics.map((topic) => (
                                <button
                                  key={topic.id}
                                  className="lhs-subtopic-btn"
                                  onClick={() => {
                                    setSelectedChapterIdx(idx);
                                    setTimeout(() => handleScrollToIndex(topic.id), 50);
                                  }}
                                >
                                  <Hash size={12} color="var(--primary-color, #2563eb)" />
                                  <span>{topic.title}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </aside>

        {/* Right Content Area: Multi-Chapter Scroll View */}
        <main className="training-right-content">
          {/* Main Title Banner */}
          <header className="content-main-header">
            <div className="content-title-row">
              <h1 className="content-h1">{activeHubData.title}</h1>
              <span className="entry-card-tag" style={{ fontSize: '0.85rem', padding: '0.3rem 0.75rem' }}>
                #{activeHubData.tag}
              </span>
            </div>
            <p className="content-summary-text">{activeHubData.summary}</p>
          </header>

          {/* Active Chapter Header Summary */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 0.4rem 0', color: 'var(--text-primary, #0f172a)' }}>
              {currentChapter.title}
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary, #64748b)', margin: 0, lineHeight: 1.5 }}>
              {currentChapter.summary}
            </p>
          </div>

          {/* Clickable Scroll-to-Index Topics */}
          <section className="scroll-index-container">
            <div className="scroll-index-heading">
              <Layers size={16} color="var(--primary-color, #2563eb)" />
              Chapter Topics Discovered (Click to Scroll Directly):
            </div>
            <div className="scroll-index-grid">
              {currentChapter.indexTopics.map((topic) => (
                <button
                  key={topic.id}
                  className="index-topic-pill"
                  onClick={() => handleScrollToIndex(topic.id)}
                >
                  <Hash size={13} color="var(--primary-color, #2563eb)" />
                  {topic.title}
                </button>
              ))}
            </div>
          </section>

          {/* Section 1: Combined Technical Q&A with Attached Deep-Dives */}
          <h2 className="section-divider-heading">
            <HelpCircle size={22} color="var(--primary-color, #2563eb)" />
            Technical Q&amp;A &amp; Attached Deep-Dives
          </h2>

          <div className="qa-cards-stack">
            {currentChapter.qaList.map((qa) => (
              <div key={qa.id} id={qa.id} className="qa-card-box">
                {/* Question Row */}
                <div className="qa-card-header">
                  <span className="qa-q-badge">{qa.questionNumber}</span>
                  <h3 className="qa-q-text">{qa.question}</h3>
                </div>

                {/* Options Grid */}
                <div className="qa-options-grid">
                  {qa.options.map((opt, i) => {
                    const isCorrect = opt.startsWith(qa.correctAnswer.split('.')[0]);
                    return (
                      <div key={i} className={`qa-option-item ${isCorrect ? 'correct' : ''}`}>
                        {opt}
                      </div>
                    );
                  })}
                </div>

                {/* Answer Explanation */}
                <div className="qa-answer-box">
                  <div className="answer-badge">
                    <CheckCircle2 size={16} /> Correct Answer: {qa.correctAnswer}
                  </div>
                  <div className="answer-explanation-text">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {qa.explanation}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Attached Deep-Dive Callout (If applicable) */}
                {qa.attachedDeepDive && (
                  <div className="attached-deep-dive-box">
                    <h4 className="deep-dive-title">
                      <Code size={18} /> {qa.attachedDeepDive.title}
                    </h4>
                    <div className="deep-dive-markdown">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {qa.attachedDeepDive.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Section 2: Coding Challenge */}
          {currentChapter?.codingChallenge && (
            <div className="coding-challenge-wrapper">
              <h2 className="section-divider-heading" style={{ marginTop: '4rem' }}>
                <Terminal size={22} color="var(--primary-color, #2563eb)" />
                {currentChapter.codingChallenge.title}
              </h2>

              <div id={currentChapter.codingChallenge.id} className="coding-challenge-container">
                <div className="challenge-problem-desc">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {currentChapter.codingChallenge.problemStatement}
                  </ReactMarkdown>
                </div>

                {/* Rationale Table */}
                {currentChapter.codingChallenge.examples && (
                  <table className="examples-table">
                    <thead>
                      <tr>
                        <th>Input</th>
                        <th>Output</th>
                        <th>Rationale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentChapter.codingChallenge.examples.map((ex, idx) => (
                        <tr key={idx}>
                          <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{ex.input}</td>
                          <td style={{ fontFamily: 'monospace', color: '#059669', fontWeight: 700 }}>{ex.output}</td>
                          <td><pre style={{ margin: 0, background: 'transparent', border: 'none', padding: 0, fontFamily: 'inherit' }}>{ex.rationale}</pre></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* Requirements */}
                {currentChapter.codingChallenge.requirements && (
                  <div style={{ margin: '1.5rem 0' }}>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-secondary, #64748b)' }}>
                      Assessment Requirements:
                    </strong>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                      {currentChapter.codingChallenge.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Solution Code in LeetCode Polished Dark Block with Tab Switcher */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 0 0.75rem 0', flexWrap: 'wrap', gap: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Code size={18} color="var(--primary-color, #2563eb)" />
                    LeetCode Production-Ready Solution{hasMultiLang ? ` (${activeLang.toUpperCase()})` : ' (JAVA)'}:
                  </h4>
                  {hasMultiLang && (
                    <div className="code-lang-tabs">
                      <button 
                        className={`code-lang-tab ${activeLang === 'java' ? 'active' : ''}`}
                        onClick={() => setActiveLang('java')}
                      >
                        Java
                      </button>
                      <button 
                        className={`code-lang-tab ${activeLang === 'typescript' ? 'active' : ''}`}
                        onClick={() => setActiveLang('typescript')}
                      >
                        TypeScript
                      </button>
                      <button 
                        className={`code-lang-tab ${activeLang === 'python' ? 'active' : ''}`}
                        onClick={() => setActiveLang('python')}
                      >
                        Python
                      </button>
                    </div>
                  )}
                </div>
                <pre className="leetcode-code-block">
                  <code>{solutionContent}</code>
                </pre>

                {/* Explanation & Complexity Walkthrough */}
                {currentChapter.codingChallenge.explanation && (
                  <div className="deep-dive-markdown" style={{ marginTop: '1.75rem' }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {currentChapter.codingChallenge.explanation}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
