import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { Cpu, LayoutGrid, Sparkles, ShieldCheck, Terminal, Heart } from 'lucide-react';

interface AboutStatsBentoProps {
  activeProfileImage: string;
  projects: Project[];
}

const AboutStatsBento: React.FC<AboutStatsBentoProps> = ({ activeProfileImage, projects }) => {
  // Compute Stats
  const totalProjects = projects.length;
  
  const aiToolsCount = React.useMemo(() => {
    const tools = new Set<string>();
    projects.forEach(p => {
      if (p.aiTools) {
        p.aiTools.forEach(t => tools.add(t));
      }
    });
    return tools.size;
  }, [projects]);

  const uniqueCategories = React.useMemo(() => {
    const cats = new Set<string>();
    projects.forEach(p => cats.add(p.category));
    return cats.size;
  }, [projects]);

  const aiAidedProjectsCount = React.useMemo(() => {
    return projects.filter(p => p.aiTools && p.aiTools.length > 0).length;
  }, [projects]);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full max-w-5xl mx-auto mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* Left Bento: About Me Deep Profile (Col 7) */}
      <div className="lg:col-span-7 bg-white/75 backdrop-blur-md border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
        {/* Subtle geometric line pattern inside card */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-50 to-transparent opacity-50 z-0 pointer-events-none" />
        
        <div className="relative group flex-shrink-0 z-10">
          <img 
            src={activeProfileImage} 
            alt="Elton Arunga Profile" 
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-zinc-200 object-cover shadow-sm transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="relative z-10 flex-grow text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 mb-2">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-zinc-950">Elton Arunga</h2>
            <span className="text-xs text-zinc-500 font-mono">@eltonarunga</span>
          </div>
          <p className="text-sm text-zinc-700 leading-relaxed font-sans mb-3">
            I'm a passionate Software Architect and AI Enthusiast, prototyping impactful applications and exploring how technology can solve real-world problems. I'm particularly excited about AI and community-driven projects.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4 text-[11px] font-semibold text-zinc-600 font-mono">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-50 border border-zinc-200 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Software Architecture
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-50 border border-zinc-200 rounded-md">
              <Terminal className="w-3.5 h-3.5 text-zinc-700" /> Clean Code & Systems
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-50 border border-zinc-200 rounded-md text-emerald-700 bg-emerald-50/50 border-emerald-100">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Community-Driven
            </span>
          </div>
        </div>
      </div>

      {/* Right Bento: Professional Stats Dashboard (Col 5) */}
      <div className="lg:col-span-5 grid grid-cols-2 gap-4">
        {/* Stat 1: Total projects */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-sm text-white flex flex-col justify-between hover:border-zinc-700 transition-all duration-300">
          <div>
            <LayoutGrid className="w-5 h-5 text-zinc-400 mb-3" />
            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest font-mono">Compositions</h3>
          </div>
          <div className="mt-4">
            <span className="text-3xl sm:text-4xl font-extrabold font-display leading-none">{totalProjects}</span>
            <p className="text-[10px] text-zinc-500 font-mono mt-1">Live Applications</p>
          </div>
        </div>

        {/* Stat 2: AI Enhanced */}
        <div className="bg-white/75 backdrop-blur-md border border-zinc-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-zinc-300 transition-all duration-300">
          <div>
            <Sparkles className="w-5 h-5 text-amber-500 mb-3" />
            <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest font-mono">AI Ecosystem</h3>
          </div>
          <div className="mt-4">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-zinc-950 leading-none">{aiAidedProjectsCount}</span>
            <p className="text-[10px] text-zinc-500 font-mono mt-1">AI Guided Labs</p>
          </div>
        </div>

        {/* Stat 3: Unique AI Tools */}
        <div className="bg-white/75 backdrop-blur-md border border-zinc-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-zinc-300 transition-all duration-300">
          <div>
            <Cpu className="w-5 h-5 text-indigo-500 mb-3" />
            <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest font-mono">Tools Mastery</h3>
          </div>
          <div className="mt-4">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-zinc-950 leading-none">{aiToolsCount}</span>
            <p className="text-[10px] text-zinc-500 font-mono mt-1">Different AI Engines</p>
          </div>
        </div>

        {/* Stat 4: Unique categories */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-zinc-300 transition-all duration-300">
          <div>
            <LayoutGrid className="w-5 h-5 text-zinc-700 mb-3" />
            <h3 className="text-zinc-600 text-xs font-bold uppercase tracking-widest font-mono">Categories</h3>
          </div>
          <div className="mt-4">
            <span className="text-3xl sm:text-4xl font-extrabold font-display text-zinc-950 leading-none">{uniqueCategories}</span>
            <p className="text-[10px] text-zinc-500 font-mono mt-1">Bespoke Domains</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutStatsBento;
