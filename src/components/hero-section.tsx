'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 1px), radial-gradient(hsl(var(--primary)) 1px, hsl(var(--background)) 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      ></div>
      <div className="relative z-10 mx-auto max-w-4xl animate-fade-in-up px-4">
        <h1 className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
          Moepi AI Portfolio
        </h1>
        <p className="mt-6 text-lg text-muted-foreground md:text-xl">
          A Gen Z developer exploring the intersection of web development and artificial intelligence.
          Welcome to my digital playground of projects, experiments, and AI-powered tools.
        </p>
      </div>
      <div className="absolute bottom-10 z-10 animate-fade-in-up animation-delay-400">
        <Button
          variant="ghost"
          size="lg"
          onClick={scrollToProjects}
          className="group flex flex-col items-center gap-1 text-muted-foreground"
          aria-label="Scroll to projects"
        >
          <span className="font-body">Explore Projects</span>
          <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
        </Button>
      </div>
    </section>
  );
}
