import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight, Cpu, Calendar, ShieldAlert } from 'lucide-react';

interface LinkCardProps {
  project: Project;
  index: number;
}

const isRecentProject = (createdAtDate: string): boolean => {
  if (!createdAtDate) return false;
  const [year, month, day] = createdAtDate.split('-').map(Number);
  const projectDate = new Date(year, month - 1, day);

  // Consider things within 60 days as recent/highlighted given the current timeline of portfolio releases
  const durationLimit = new Date(2026, 5, 4); // Current month is June 2026 (index 5)
  durationLimit.setDate(durationLimit.getDate() - 60);

  return projectDate >= durationLimit;
};

const LinkCard: React.FC<LinkCardProps> = ({ project, index }) => {
  const { title, description, imageUrl, url, tags, createdAt, aiTools } = project;
  const isNew = createdAt && isRecentProject(createdAt);

  // Format Date beautifully
  const formattedDate = React.useMemo(() => {
    if (!createdAt) return '';
    try {
      const [year, month, day] = createdAt.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
      return createdAt;
    }
  }, [createdAt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4), ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full bg-white border border-zinc-200/90 rounded-2xl shadow-sm hover:shadow-xl hover:border-black/50 overflow-hidden transition-all duration-300 relative flex flex-col"
      >
        {/* Dynamic Badges Container */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5 pointer-events-none">
          {isNew && (
            <span className="bg-black text-white text-[9px] font-black font-mono tracking-widest px-2.5 py-1 rounded-md shadow-md">
              NEW LAUNCH
            </span>
          )}
        </div>

        {/* Featured Image Canvas with Grayscale Animation */}
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-50 border-b border-zinc-100 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          <img
            src={imageUrl}
            alt={`${title} Preview Composition`}
            loading="lazy"
            className="w-full h-full object-cover grayscale opacity-[0.85] group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-in-out"
          />
          
          {/* Action icon revealing on group hover */}
          <div className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-white text-black shadow-md border border-zinc-100 flex items-center justify-center translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card Body content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Header row: date & category info */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[10px] font-extrabold text-zinc-400 font-mono tracking-widest uppercase flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {formattedDate}
            </span>
            <span className="text-[10px] font-bold text-zinc-500 bg-zinc-100 border border-zinc-200/50 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
              {project.category}
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-zinc-950 leading-tight tracking-tight group-hover:text-black font-display flex items-baseline gap-2">
            <span className="group-hover:underline decoration-2 underline-offset-2 decoration-black transition-all">
              {title}
            </span>
          </h3>
          
          <p className="text-sm text-zinc-600 mt-2.5 flex-grow font-sans font-normal leading-relaxed">
            {description}
          </p>

          {/* AI Tools line */}
          {aiTools && aiTools.length > 0 && (
            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-1.5 text-[11px] font-bold text-zinc-800 font-mono tracking-tight">
              <Cpu className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
              <span>Assisted by:</span>
              <div className="flex flex-wrap gap-1">
                {aiTools.map(tool => (
                  <span key={tool} className="px-1.5 py-0.5 rounded bg-zinc-50 border border-zinc-200 text-[10px] text-zinc-800 font-semibold font-mono">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags cloud within card */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span 
                key={tag} 
                className="text-[9px] font-bold text-zinc-500 bg-zinc-50 px-2 py-1 rounded border border-zinc-100 uppercase tracking-tight font-mono hover:bg-zinc-100 hover:text-zinc-800 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default LinkCard;
