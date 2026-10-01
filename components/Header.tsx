import React from 'react';
import { motion } from 'motion/react';
import { Mail, Sparkles, Share2 } from 'lucide-react';

interface HeaderProps {
  activeProfileImage: string;
  totalCompositions: number;
  onOpenShare?: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeProfileImage, totalCompositions, onOpenShare }) => {
  return (
    <motion.header 
      id="main-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-5xl mx-auto text-center mb-12 relative"
    >
      {/* Absolute Decorative Geometric Accents */}
      <div className="absolute top-0 left-5 w-72 h-72 bg-gradient-to-tr from-rose-50/40 to-indigo-50/40 rounded-full filter blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-5 w-72 h-72 bg-gradient-to-br from-emerald-50/40 to-amber-50/40 rounded-full filter blur-3xl -z-10 pointer-events-none" />

      {/* Specialty Badge */}
      <motion.div 
        id="architect-badge"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 shadow-sm text-xs font-semibold text-zinc-800 uppercase tracking-widest font-mono mb-6"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Software Architect • AI Innovator
      </motion.div>

      {/* Avatar Wrapper with Interactive Borders */}
      <div id="avatar-container" className="relative inline-block mb-6 group">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-zinc-400 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
        <img
          id="profile-avatar-img"
          src={activeProfileImage}
          alt="EArunga Profile Avatar"
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[3px] border-white ring-2 ring-black shadow-lg object-cover object-center transition-all duration-500 group-hover:rotate-1"
        />
        <div className="absolute -bottom-1 -right-1 bg-black text-white p-2 rounded-full shadow-lg border border-white">
          <Sparkles className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      {/* Typography Section */}
      <h1 id="portfolio-title" className="text-4xl sm:text-5xl font-extrabold text-black font-display tracking-tight leading-tight mb-3">
        Software Compositions <span className="text-zinc-500 font-light">by</span> EArunga
      </h1>
      
      <p id="portfolio-tagline" className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto font-medium leading-relaxed font-sans px-4">
        A curated portfolio of {totalCompositions} impactful applications, AI prototypes, and full-stack solutions exploring how technology solves real-world problems.
      </p>

      {/* Social and Communication Icons bar */}
      <nav id="social-nav" aria-label="Social and contact links" className="flex justify-center items-center gap-4 mt-6">
        <a 
          id="social-link-email"
          href="mailto:eltonarunga@gmail.com" 
          aria-label="Send direct email to Elton Arunga"
          title="Direct Email (eltonarunga@gmail.com)"
          className="p-2.5 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700 hover:text-black hover:bg-zinc-100 hover:border-zinc-400 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <Mail className="w-5 h-5" />
        </a>
        <a 
          id="social-link-github"
          href="https://github.com/eltonarunga" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="View Elton Arunga's GitHub profile"
          title="GitHub Profile"
          className="p-2.5 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700 hover:text-black hover:bg-zinc-100 hover:border-zinc-400 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
          </svg>
        </a>
        <a 
          id="social-link-linkedin"
          href="https://www.linkedin.com/in/elton-arunga-80405811b/" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="View Elton Arunga's LinkedIn profile"
          title="LinkedIn Profile"
          className="p-2.5 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700 hover:text-black hover:bg-zinc-100 hover:border-zinc-400 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764.784.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a 
          id="social-link-twitter"
          href="https://x.com/E_Arunga" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="View Elton Arunga on X / Twitter"
          title="X / Twitter (@E_Arunga)"
          className="p-2.5 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700 hover:text-black hover:bg-zinc-100 hover:border-zinc-400 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {onOpenShare && (
          <button
            id="social-link-share"
            onClick={onOpenShare}
            aria-label="Share Portfolio and Social Card"
            title="Share Portfolio & Social Card"
            className="p-2.5 rounded-full bg-black text-white hover:bg-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center group"
          >
            <Share2 className="w-4 h-4 text-emerald-400 group-hover:scale-115 transition-transform" />
          </button>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
