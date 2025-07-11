'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden text-center">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--foreground)) 1px, hsl(var(--background)) 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>
       <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      <div className="relative z-10 mx-auto max-w-4xl animate-fade-in-up px-4">
        <h1 className="font-headline text-5xl font-bold tracking-tighter text-glow sm:text-6xl md:text-7xl lg:text-8xl">
          Moepi AI Portfolio<span className="animate-ping">_</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground md:text-xl">
          &gt; A developer exploring the intersection of web development and artificial intelligence.
          <br />
          &gt; Welcome to my digital playground.
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
          <span className="font-body tracking-widest">[ EXPLORE ]</span>
          <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
        </Button>
      </div>
    </section>
  );
}
