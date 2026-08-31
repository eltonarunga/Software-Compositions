import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
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
          id="terms-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="terms-modal-title"
          aria-describedby="terms-modal-desc"
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
            id="terms-modal-content"
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
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 id="terms-modal-title" className="text-xl font-bold font-display text-zinc-950">Terms of Service</h2>
                  <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest mt-0.5">COMPLIANCE & PROTOCOLS</p>
                </div>
              </div>
              <button 
                id="terms-modal-close-btn"
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-black hover:bg-zinc-100 transition-all"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div id="terms-modal-desc" className="p-6 sm:p-8 overflow-y-auto flex-1 text-sm text-zinc-600 space-y-5 tags-scrollbar">
              <p className="font-semibold text-xs text-zinc-400 font-mono uppercase tracking-wider">Last Updated: March 2026</p>
              
              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-950 font-display">1. Acceptance of Terms</h3>
                <p className="leading-relaxed">
                  By accessing and using this portfolio and its associated applications, you accept and agree to be bound by the terms and provisions of this agreement. Any participation in these services will constitute acceptance of this agreement.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-950 font-display">2. Prohibited Activities</h3>
                <p className="leading-relaxed">
                  You are expressly prohibited from engaging in any of the following activities on this site or linked applications:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-600">
                  <li><strong>Unauthorized Scraping:</strong> Automated data collection, scraping, or extraction of any content or metadata without explicit written permission.</li>
                  <li><strong>Vulnerability Testing:</strong> Conducting unauthorized security assessments, penetration testing, fuzzing, or vulnerability scanning.</li>
                  <li><strong>Security Circumvention:</strong> Attempting to bypass, exploit, or disable any security measures, authentication mechanisms, or rate limit headers.</li>
                  <li><strong>Malicious Interference:</strong> Introducing viruses, trojans, worms, logic bombs, or other materials which are malicious or technologically harmful.</li>
                </ul>
              </div>

              <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl space-y-2">
                <h3 className="text-sm font-bold text-rose-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  ⚠️ SECURITY NOTICE & LEGAL REPERCUSSIONS
                </h3>
                <p className="text-rose-700 leading-relaxed text-xs">
                  Violation of these terms, particularly regarding unauthorized scraping, vulnerability testing, and security circumvention, will result in immediate termination of access and may lead to civil and criminal legal action. We actively monitor traffic logs and will cooperate fully with law enforcement authorities and enterprise security teams to prosecute offenders to the fullest extent of the law.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-950 font-display">3. Intellectual Property</h3>
                <p className="leading-relaxed">
                  All designs, layout structures, visual themes, custom UI compositions, code segments, and custom assets presented here are the exclusive property of EArunga unless stated otherwise. Unauthorized reproduction, modification, or redistribution is strictly prohibited.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-zinc-950 font-display">4. Disclaimer of Warranties</h3>
                <p className="leading-relaxed">
                  These applications and contents are provided on an "as is" and "as available" basis without any representations or warranties, express or implied. The author disclaims all liability for temporary platform downtime or client-side device incompatibility.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
              <button 
                id="terms-modal-confirm-btn"
                onClick={onClose}
                className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm"
              >
                Acknowledge & Accept
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
