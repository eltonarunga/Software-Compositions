import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight, Cpu, Calendar, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';

interface LinkCardProps {
  project: Project;
  index: number;
  onTagClick?: (tag: string) => void;
  onAiToolClick?: (tool: string) => void;
}

const isRecentProject = (createdAtDate: string): boolean => {
  if (!createdAtDate) return false;
  try {
    const [year, month, day] = createdAtDate.split('-').map(Number);
    const projectDate = new Date(year, month - 1, day);

    // Highlight projects created within the last 180 days (6 months) dynamically
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - projectDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays <= 180;
  } catch {
    return false;
  }
};

const LinkCard: React.FC<LinkCardProps> = ({ project, index, onTagClick, onAiToolClick }) => {
  const { id, title, description, imageUrl, url, tags, category, createdAt, aiTools } = project;
  const isNew = createdAt && isRecentProject(createdAt);
  const [imgError, setImgError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Format Date cleanly
  const formattedDate = useMemo(() => {
    if (!createdAt) return '';
    try {
      const [year, month, day] = createdAt.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
      return createdAt;
    }
  }, [createdAt]);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <motion.div
      id={`composition-card-${id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.35), ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group flex flex-col"
    >
      <div className="relative h-full bg-white border border-zinc-200/90 rounded-2xl shadow-sm hover:shadow-xl hover:border-black/40 overflow-hidden transition-all duration-300 flex flex-col">
        {/* Dynamic Badges Container */}
        <div className="absolute top-3.5 left-3.5 z-20 flex flex-wrap items-center gap-1.5 pointer-events-none">
          {isNew && (
            <span className="bg-black text-white text-[9px] font-black font-mono tracking-widest px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" /> NEW LAUNCH
            </span>
          )}
        </div>

        {/* Action Controls in Card Top Right */}
        <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5">
          <button
            id={`copy-btn-${id}`}
            onClick={handleCopyLink}
            aria-label={`Copy link for ${title}`}
            title={copied ? "Link Copied!" : "Copy Project URL"}
            className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-zinc-200 text-zinc-600 hover:text-black hover:bg-white shadow-sm transition-all text-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Featured Image Canvas with Grayscale Animation & Graceful Fallback */}
        <a
          id={`composition-thumb-link-${id}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Launch ${title} in new tab`}
          className="relative aspect-[16/10] overflow-hidden bg-zinc-100 border-b border-zinc-100 flex items-center justify-center cursor-pointer block"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
          
          {!imgError ? (
            <img
              src={imageUrl}
              alt={`${title} Preview`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover grayscale opacity-[0.9] group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-in-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-200 text-zinc-500 p-4 text-center">
              <ExternalLink className="w-8 h-8 text-zinc-400 mb-2" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600">{category}</span>
              <span className="text-sm font-bold font-display text-zinc-800 mt-1">{title}</span>
            </div>
          )}

          {/* Action icon revealing on group hover */}
          <div className="absolute bottom-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white text-black shadow-md border border-zinc-100 flex items-center justify-center translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </a>

        {/* Card Body content */}
        <div className="p-6 flex flex-col flex-grow justify-between">
          <div>
            {/* Header row: date & category info */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-extrabold text-zinc-400 font-mono tracking-widest uppercase flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {formattedDate}
              </span>
              <span className="text-[10px] font-bold text-zinc-600 bg-zinc-100 border border-zinc-200/50 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                {category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-extrabold text-zinc-950 leading-tight tracking-tight font-display">
              <a
                id={`composition-title-link-${id}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-800 transition-colors inline-flex items-center gap-1 group/title"
              >
                <span>{title}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-opacity flex-shrink-0" />
              </a>
            </h3>

            {/* Description */}
            <p className="text-sm text-zinc-600 mt-2.5 font-sans font-normal leading-relaxed">
              {description}
            </p>
          </div>

          <div>
            {/* AI Tools line */}
            {aiTools && aiTools.length > 0 && (
              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-1.5 text-[11px] font-bold text-zinc-800 font-mono tracking-tight">
                <Cpu className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                <span className="text-zinc-500">AI:</span>
                <div className="flex flex-wrap gap-1">
                  {aiTools.map(tool => (
                    <button
                      key={tool}
                      onClick={() => onAiToolClick && onAiToolClick(tool)}
                      className="px-1.5 py-0.5 rounded bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-[10px] text-zinc-800 font-semibold font-mono transition-colors"
                      title={`Filter by ${tool}`}
                    >
                      {tool}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tags cloud within card */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagClick && onTagClick(tag)}
                  className="text-[9px] font-bold text-zinc-500 bg-zinc-50 px-2 py-1 rounded border border-zinc-100 uppercase tracking-tight font-mono hover:bg-zinc-100 hover:text-zinc-950 transition-colors cursor-pointer"
                  title={`Filter by ${tag}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LinkCard;
