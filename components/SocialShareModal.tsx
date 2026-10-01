import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Share2, Copy, Check, ExternalLink, Globe, Sparkles } from 'lucide-react';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalCompositions: number;
}

const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  totalCompositions,
}) => {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  const shareTitle = 'Software Compositions by EArunga – Software Architect & AI Innovator';
  const shareText = `Explore Software Compositions by Elton Arunga (@E_Arunga) – A curated portfolio of ${totalCompositions} impactful full-stack applications, AI prototypes, and Web3 architectures.`;
  
  // Safe URL resolution for browser and dev environments
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://github.com/eltonarunga';

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setCanNativeShare(true);
    }
  }, []);

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or unsupported
      }
    }
  };

  // Social share destination links
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const shareOptions = [
    {
      id: 'share-x',
      name: 'X (Twitter)',
      color: 'bg-black text-white hover:bg-zinc-800',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      id: 'share-linkedin',
      name: 'LinkedIn',
      color: 'bg-[#0077b5] text-white hover:bg-[#006097]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764.784.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      id: 'share-whatsapp',
      name: 'WhatsApp',
      color: 'bg-[#25D366] text-white hover:bg-[#20ba5a]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.507 14.307l-.009.075c-.338.163-2.002.985-2.313 1.099-.31.114-.537.164-.764-.176-.226-.341-.884-1.1-1.082-1.326-.197-.227-.396-.254-.734-.09-.338.164-1.428.526-2.72-0.627-.998-.89-1.671-1.99-1.867-2.33-.198-.34-.022-.524.148-.687.153-.148.339-.386.508-.579.17-.193.226-.33.339-.55.113-.22.057-.413-.028-.584-.085-.17-.764-1.842-1.047-2.522-.275-.662-.556-.572-.765-.583-.198-.01-.424-.012-.65-.012-.226 0-.594.085-.905.424-.311.34-1.187 1.16-1.187 2.827 0 1.668 1.215 3.28 1.385 3.507.17.227 2.392 3.652 5.795 5.122.81.35 1.442.559 1.934.715.813.258 1.552.222 2.137.135.652-.098 2.002-.818 2.285-1.608.283-.79.283-1.468.198-1.608-.085-.14-.311-.227-.65-.39zm-5.467 7.693c-2.007 0-3.876-.56-5.474-1.528l-.392-.234-4.068 1.066 1.085-3.967-.257-.409a10.96 10.96 0 01-1.684-5.836c0-6.075 4.945-11.02 11.025-11.02 2.943 0 5.71 1.147 7.79 3.228 2.08 2.08 3.225 4.847 3.225 7.79 0 6.075-4.945 11.02-11.025 11.02z" />
        </svg>
      ),
      url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    },
    {
      id: 'share-telegram',
      name: 'Telegram',
      color: 'bg-[#229ED9] text-white hover:bg-[#1e8cc0]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.46c.536-.196 1.006.128.833.945z" />
        </svg>
      ),
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="social-share-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="social-share-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            id="social-share-modal-content"
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-zinc-200 z-10 flex flex-col"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-sm">
                  <Share2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 id="social-share-title" className="text-lg sm:text-xl font-bold font-display text-zinc-950">
                    Share Portfolio
                  </h2>
                  <p className="text-xs text-zinc-500 font-mono">SOCIAL SHARE CARD &amp; LINK</p>
                </div>
              </div>
              <button
                id="social-share-close-btn"
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors"
                aria-label="Close share dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[75vh]">
              {/* Live Preview Card */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    OpenGraph &amp; Twitter Card Preview
                  </span>
                  <span className="text-[10px] text-zinc-400">1200 × 630</span>
                </div>

                <div 
                  id="share-card-preview"
                  className="w-full rounded-2xl bg-zinc-950 border border-zinc-800 p-5 sm:p-6 text-white shadow-lg relative overflow-hidden group select-none"
                >
                  {/* Subtle Grid & Glow */}
                  <div className="absolute -top-10 -right-10 w-44 h-44 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Software Architect
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">@eltonarunga</span>
                    </div>

                    {/* Headline */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight leading-snug">
                        Software Compositions <span className="text-zinc-400 font-light">by</span> EArunga
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1.5 line-clamp-2">
                        A curated portfolio of {totalCompositions} impactful full-stack applications, AI prototypes, and Web3 architectures.
                      </p>
                    </div>

                    {/* Bottom Metadata Tags */}
                    <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-400">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                          Web3 • AI/ML • SaaS
                        </span>
                        <span className="text-emerald-400 font-semibold">
                          {totalCompositions} Compositions
                        </span>
                      </div>
                      <span className="text-zinc-500">github.com/eltonarunga</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Copy Section */}
              <div className="space-y-2">
                <label htmlFor="share-url-input" className="block text-xs font-bold text-zinc-700 font-mono uppercase tracking-wider">
                  Portfolio Link
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      id="share-url-input"
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-mono text-zinc-800 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <button
                    id="copy-share-url-btn"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-zinc-800 transition-all shadow-sm active:scale-95"
                    aria-label="Copy portfolio link to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Channels Strip */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-zinc-700 font-mono uppercase tracking-wider">
                  Share directly on social platforms
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {shareOptions.map(option => (
                    <a
                      key={option.id}
                      id={option.id}
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-medium text-xs shadow-sm transition-all active:scale-95 ${option.color}`}
                    >
                      {option.icon}
                      <span>{option.name}</span>
                    </a>
                  ))}
                </div>

                {canNativeShare && (
                  <button
                    id="native-share-btn"
                    onClick={handleNativeShare}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-800 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Share2 className="w-4 h-4 text-emerald-600" />
                    <span>More Share Options (System Dialog)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t border-zinc-100 bg-zinc-50/70 flex items-center justify-between">
              <a
                href="/og-image.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-500 hover:text-black font-mono inline-flex items-center gap-1.5 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>View Full-Res Social Banner (1200×630)</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>
              <button
                id="social-share-done-btn"
                onClick={onClose}
                className="px-4 py-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-semibold text-xs rounded-xl transition-all"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SocialShareModal;
