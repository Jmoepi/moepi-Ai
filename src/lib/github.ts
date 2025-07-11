import type { GitHubRepo } from './types';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: HeadersInit = {
  'Accept': 'application/vnd.github.v3+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

if (GITHUB_TOKEN) {
  headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
}

async function fetchFromGitHub<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${GITHUB_API_URL}${endpoint}`, {
    headers,
    next: { revalidate: 3600 } // Revalidate every hour
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch from GitHub: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchGitHubProjects(username: string): Promise<(GitHubRepo & { readmeContent?: string })[]> {
  const repos = await fetchFromGitHub<GitHubRepo[]>(`/users/${username}/repos?sort=pushed&per_page=100`);

  const projectsWithReadme = await Promise.all(
    repos.map(async (repo) => {
      try {
        const readme = await fetchFromGitHub<{ content: string }>(`/repos/${repo.full_name}/readme`);
        const readmeContent = Buffer.from(readme.content, 'base64').toString('utf-8');
        return { ...repo, readmeContent };
      } catch (error) {
        // README not found or other error, proceed without it
        return { ...repo, readmeContent: repo.description || '' };
      }
    })
  );

  return projectsWithReadme;
}
