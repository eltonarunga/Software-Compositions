import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  // Prevent body scroll and handle Escape key when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="privacy-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          aria-describedby="privacy-modal-desc"
        >
          {/* Animated Backdrop with close-on-click */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Animated Modal Dialog Box */}
          <motion.div 
            id="privacy-modal-content"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden border border-zinc-200 z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-black text-white rounded-lg">
                  <ShieldAlert className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 id="privacy-modal-title" className="text-xl font-bold font-display text-zinc-950">Privacy Policy</h2>
                  <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest mt-0.5">TELEMETRY & PRIVACY CHARTER</p>
                </div>
              </div>
              <button 
                id="privacy-modal-close-btn"
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-black hover:bg-zinc-100 transition-all"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div id="privacy-modal-desc" className="p-6 sm:p-8 overflow-y-auto flex-1 text-sm text-zinc-600 space-y-5 tags-scrollbar">
              <p className="font-semibold text-xs text-zinc-400 font-mono uppercase tracking-wider">Last Updated: March 2026</p>
              
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-950 font-display">1. Information We Collect</h3>
                <p className="leading-relaxed">
                  We collect basic anonymous analytical parameters, including but not limited to IP addresses, browser agents, referring pages, and host system indicators. These details are used to understand how visitors engage with our custom dental platforms and SaaS dashboards.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-950 font-display">2. Use of Collected Data</h3>
                <p className="leading-relaxed">
                  All logged telemetry parameters are used strictly for telemetry diagnostics, verifying site load times, measuring user flow efficiency, and bolstering overall structural security.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-950 font-display">3. Security Auditing & Threat Prevention</h3>
                <p className="leading-relaxed">
                  We monitor inbound connection channels persistently to preempt cyber threats, malicious scraping, API flooding, and probe vectors:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
                  <li><strong>Activity Monitoring:</strong> IP ranges making abnormal connection patterns are automatically rate-limited or blocked.</li>
                  <li><strong>Security Auditing:</strong> Incident records detailing unauthorized requests may be retained and utilized to pursue necessary defensive actions.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-950 font-display">4. Third-Party Redirection</h3>
                <p className="leading-relaxed">
                  This portfolio highlights external live deployments, SaaS platforms, and podcasts on Spotify or Vercel. We do not manage the security structures or user policies of external sites. We suggest reviewing their respective privacy frameworks when navigating off-site.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-950 font-display">5. Updates & Compliance</h3>
                <p className="leading-relaxed">
                  This Privacy Charter is reviewed periodically. Any amendments will go live immediately upon updating this portal. Continued use of this site marks your consent to these safety terms.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
              <button 
                id="privacy-modal-confirm-btn"
                onClick={onClose}
                className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
              >
                Acknowledge & Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyModal;
