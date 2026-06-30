import { questionnaireChapter } from './questionnaireDomain';
import { programsChapter } from './programsDomain';
import { javaOopsChapter } from './javaOopsDomain';
import { seleniumChapter } from './seleniumDomain';
import { cypressChapter } from './cypressDomain';
import { playwrightChapter } from './playwrightDomain';
import { frameworksChapter } from './frameworksDomain';
import { agenticAiChapter } from './agenticAiDomain';

export const trainingChatsList = [
  {
    id: 'sdet_masterclass',
    title: 'SDET & Automation Engineering Masterclass',
    tag: 'engineering_masterclass',
    summary: 'Exhaustive engineering training hub organized into expandable domain chapters covering interview Q&As, algorithmic problem solving, Java OOPS, Selenium, Cypress, Playwright, Frameworks, and Agentic AI.',
    date: '2026-06-29'
  }
];

export const sdetTrainingHubData = {
  id: 'sdet_masterclass',
  title: 'SDET & Automation Engineering Masterclass',
  tag: 'engineering_masterclass',
  summary: 'Exhaustive engineering training hub structured into expandable modular domain Chapters with unified Q&A cards, attached deep-dives, real-world framework examples, and multi-language LeetCode solutions.',
  chapters: [
    questionnaireChapter,
    programsChapter,
    javaOopsChapter,
    seleniumChapter,
    cypressChapter,
    playwrightChapter,
    frameworksChapter,
    agenticAiChapter
  ]
};
