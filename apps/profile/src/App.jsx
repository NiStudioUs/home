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
import LinkedInGenerator from './pages/DevSettings/LinkedInGenerator';
import SecretChatsPage from './pages/SecretChats/SecretChatsPage';
import NotFound from './pages/NotFound/NotFound';

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
              <Route path="/dev" element={<LinkedInGenerator />} />
              <Route path="/chats" element={<SecretChatsPage />} />
              <Route path="/training" element={<SecretChatsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
