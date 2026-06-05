import profileData from '../content/profile.json';
import skillsData from '../content/skills.json';
import experienceData from '../content/experience.json';
import projectsData from '../content/projects.json';
import { CONTACT } from '../config/constants';

export function generateResumeMarkdown(resumeConfig) {
  let md = '';

  // 1. Header (Profile)
  md += `# ${profileData.name}\n\n`;
  const title = resumeConfig.profileTitle || profileData.title;
  md += `**${title}**\n\n`;
  md += `${profileData.location}  \n`;
  
  const email = CONTACT.EMAIL || profileData.email;
  const phone = CONTACT.PHONE || profileData.phone;
  md += `${email} | ${phone}  \n`;
  
  profileData.socials.forEach(social => {
    md += `${social.platform}: [${social.display || social.url}](${social.url})  \n`;
  });
  md += '\n---\n\n';

  const h = resumeConfig.headers || {};
  const hSummary = h.summary || 'Professional Summary';
  const hSkills = h.skills || 'Core Skills';
  const hExperience = h.experience || 'Professional Experience';
  const hProjects = h.projects || 'Selected Mobile & Web Development Projects';
  const hHighlights = h.highlights || 'Professional Highlights';
  const hEducation = h.education || 'Education';

  // Process requested sections in order
  resumeConfig.sections.forEach(section => {
    switch (section) {
      case 'summary':
        md += `## ${hSummary}\n\n`;
        md += `${resumeConfig.summary}\n\n`;
        md += `---\n\n`;
        break;

      case 'skills':
        md += `## ${hSkills}\n\n`;
        // Filter and order skills based on skillTypes
        const requestedSkills = resumeConfig.skillTypes || Object.keys(skillsData);
        requestedSkills.forEach(category => {
          if (skillsData[category]) {
            const joinedSkills = skillsData[category].join(', ');
            md += `**${category}:** ${joinedSkills}  \n`;
          }
        });
        md += '\n---\n\n';
        break;

      case 'experience':
        md += `## ${hExperience}\n\n`;
        
        // Group experiences by company and title
        // Group experiences by company
        const groupedExp = [];
        experienceData.forEach(exp => {
          // Tier 2 Filter
          if (exp.resumeTypes && !exp.resumeTypes.includes(resumeConfig.id)) return;

          const lastGroup = groupedExp[groupedExp.length - 1];
          if (lastGroup && lastGroup.company === exp.company && lastGroup.title === exp.title) {
            // Merge dates and bullets
            lastGroup.startDate = exp.startDate; // Overwrites to get the oldest date
            
            // Add bullets (filtered by Tier 2 if needed)
            const bulletsSource = exp.resumeBullets || exp.bullets;
            if (exp.resumeBullets) {
               // If this node explicitly provides resumeBullets, we overwrite the group's bullets entirely.
               // This prevents duplicate standard bullets from being appended when collapsing nodes.
               lastGroup.bullets = [];
            }
            // Only add bullets if the group isn't already "locked" by a previous resumeBullets, 
            // OR if this node itself is providing the resumeBullets.
            if (exp.resumeBullets || !lastGroup.hasResumeBullets) {
              bulletsSource.forEach(b => {
                if (typeof b === 'string') {
                  lastGroup.bullets.push(b);
                } else if (!b.resumeTypes || b.resumeTypes.includes(resumeConfig.id)) {
                  lastGroup.bullets.push(b.text);
                }
              });
              if (exp.resumeBullets) lastGroup.hasResumeBullets = true;
            }
          } else {
            // Create new group
            const newGroup = {
              company: exp.company,
              title: exp.title,
              client: exp.client,
              startDate: exp.startDate,
              endDate: exp.endDate,
              bullets: [],
              hasResumeBullets: !!exp.resumeBullets
            };
            const bulletsSource = exp.resumeBullets || exp.bullets;
            bulletsSource.forEach(b => {
              if (typeof b === 'string') {
                newGroup.bullets.push(b);
              } else if (!b.resumeTypes || b.resumeTypes.includes(resumeConfig.id)) {
                newGroup.bullets.push(b.text);
              }
            });
            groupedExp.push(newGroup);
          }
        });

        groupedExp.forEach(exp => {
          md += `### ${exp.title} — ${exp.company}  \n`;
          md += `**${exp.startDate} – ${exp.endDate}**\n`;
          if (exp.client) {
            md += `**Client: ${exp.client}**\n`;
          }
          md += `\n`;
          exp.bullets.forEach(b => {
            md += `- ${b}\n`;
          });
          md += `\n`;
        });
        md += `---\n\n`;
        break;

      case 'projects':
        md += `## ${hProjects}\n\n`;
        projectsData.forEach(project => {
          // Tier 2 Filter
          if (project.resumeTypes && !project.resumeTypes.includes(resumeConfig.id)) return;

          const pName = project.resumeName || project.name;
          md += `### ${pName}\n`;
          if (project.tags && project.tags.length > 0) {
            md += `**Tech:** ${project.tags.join(', ')}\n\n`;
          }
          if (project.resumeBullets && project.resumeBullets.length > 0) {
            project.resumeBullets.forEach(b => {
              if (typeof b === 'string') {
                md += `- ${b}\n`;
              } else if (!b.resumeTypes || b.resumeTypes.includes(resumeConfig.id)) {
                md += `- ${b.text}\n`;
              }
            });
          } else {
            md += `- ${project.description}\n`;
          }
          md += `\n`;
        });
        md += `---\n\n`;
        break;

      case 'highlights':
        md += `## ${hHighlights}\n\n`;
        profileData.highlights.forEach(h => {
          md += `- ${h}\n`;
        });
        md += `\n---\n\n`;
        break;

      case 'education':
        md += `## ${hEducation}\n\n`;
        md += `**Executive Post Graduate Program in Financial Services and IT Assurance**  \n`;
        md += `Loyola Institute of Business Administration, Chennai  \n`;
        md += `**2017 – 2019**\n\n`;
        md += `**Bachelor of Engineering in Computer Science and Engineering**  \n`;
        md += `Velalar College of Engineering and Technology, Erode  \n`;
        md += `**2013 – 2017**\n`;
        break;
    }
  });

  return md.trim();
}
