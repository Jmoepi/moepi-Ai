import type { Project } from '@/lib/types';
import ProjectCard from './project-card';
import { Skeleton } from './ui/skeleton';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="w-full bg-secondary/50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">My Work</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-xl">
            Here are some of the projects I've been working on. Each one is a journey in learning and creating.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

ProjectsSection.Skeleton = function ProjectsSectionSkeleton() {
    return (
      <section id="projects" className="w-full bg-secondary/50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Skeleton className="mx-auto h-12 w-1/2" />
            <Skeleton className="mx-auto mt-4 h-6 w-3/4" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card p-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="mt-4 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
                <div className="mt-6">
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}
