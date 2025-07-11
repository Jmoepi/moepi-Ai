'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const animationDelay = `${index * 100}ms`;

  return (
    <Card className="flex h-full transform-gpu flex-col overflow-hidden border-2 border-primary/20 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/80 hover:shadow-2xl hover:shadow-primary/20 animate-fade-in-up" style={{ animationDelay }}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-glow">{project.name}</CardTitle>
        <CardDescription>&gt; {project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {project.tldr && (
          <blockquote className="mb-4 border-l-4 border-accent pl-4 text-muted-foreground">
            <p className="font-code text-sm">TL;DR: {project.tldr}</p>
          </blockquote>
        )}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex-col items-start gap-4 pt-4 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <a href={project.html_url} target="_blank" rel="noopener noreferrer">
              <Github />
              <span>GitHub</span>
            </a>
          </Button>
          {project.homepage && (
            <Button asChild size="sm">
              <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                <span>Live Demo</span>
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
