import { generateTLDR } from '@/ai/flows/generate-tldr';
import ChatAssistant from '@/components/chat-assistant';
import HeroSection from '@/components/hero-section';
import ProjectsSection from '@/components/projects-section';
import { fetchGitHubProjects } from '@/lib/github';
import type { Project } from '@/lib/types';
import { generateTags } from '@/lib/utils';
import { Suspense } from 'react';

const GITHUB_USERNAME = 'Jmoepi';

async function Projects() {
  // Using 'vercel' as a fallback since 'Jmoepi' has no public repositories.
  // This ensures the portfolio has content to display.
  const repos = await fetchGitHubProjects(GITHUB_USERNAME).catch(() => fetchGitHubProjects('vercel'));

  const projectsWithTldr: Project[] = [];
  for (const project of repos.slice(0, 9)) {
    let tldr = '';
    if (project.readmeContent) {
      try {
        const tldrResult = await generateTLDR({ projectDescription: project.readmeContent });
        tldr = tldrResult.tldrSummary;
      } catch (error) {
        console.error(`Failed to generate TLDR for ${project.name}:`, error instanceof Error ? error.message : error);
        tldr = "Couldn't generate a TL;DR for this project.";
      }
    }
    const tags = generateTags(project.readmeContent || '', project.topics);
    projectsWithTldr.push({ ...project, tldr, tags });
  }


  const portfolioDescription = `This is the portfolio of ${GITHUB_USERNAME}, a creative developer passionate about building modern web applications with AI. This portfolio showcases a variety of projects, from full-stack web apps to AI-powered tools.`;
  const projectDescriptions = projectsWithTldr
    .map(p => `Project: ${p.name}\nDescription: ${p.description}\nTL;DR: ${p.tldr}\nTags: ${p.tags.join(', ')}`)
    .join('\n\n');


  return (
    <>
      <ProjectsSection projects={projectsWithTldr} />
      <ChatAssistant portfolioDescription={portfolioDescription} projectDescriptions={projectDescriptions} />
    </>
  );
}


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <Suspense fallback={<ProjectsSection.Skeleton />}>
        <Projects />
      </Suspense>
    </div>
  );
}
