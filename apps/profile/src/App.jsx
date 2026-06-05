import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Timeline from './pages/Timeline/Timeline';
import Stack from './pages/Stack/Stack';
import Projects from './pages/Projects/Projects';
import ResumeBuilder from './pages/ResumeBuilder/ResumeBuilder';
import Narrative from './pages/Narrative/Narrative';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="page-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/story" element={<Narrative />} />
              <Route path="/stack" element={<Stack />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<ResumeBuilder />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
