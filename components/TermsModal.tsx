import React from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black">Terms of Service</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 text-gray-700 space-y-4">
          <p className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Last Updated: March 2026</p>
          
          <h3 className="text-lg font-bold text-black mt-6">1. Acceptance of Terms</h3>
          <p>By accessing and using this portfolio and its associated applications, you accept and agree to be bound by the terms and provision of this agreement.</p>

          <h3 className="text-lg font-bold text-black mt-6">2. Prohibited Activities</h3>
          <p>You are expressly prohibited from engaging in any of the following activities:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Unauthorized Scraping:</strong> Automated data collection, scraping, or extraction of any content from this site or linked applications without explicit written permission.</li>
            <li><strong>Vulnerability Testing:</strong> Conducting unauthorized security assessments, penetration testing, or scanning for vulnerabilities.</li>
            <li><strong>Security Circumvention:</strong> Attempting to bypass, exploit, or disable any security measures, authentication mechanisms, or rate limits.</li>
            <li><strong>Malicious Interference:</strong> Introducing viruses, trojans, worms, logic bombs, or other material that is malicious or technologically harmful.</li>
          </ul>

          <h3 className="text-lg font-bold text-black mt-6">3. Legal Repercussions</h3>
          <p className="font-medium text-red-600">Violation of these terms, particularly regarding unauthorized scraping, vulnerability testing, and security circumvention, will result in immediate termination of access and may lead to civil and criminal legal action. We actively monitor for such activities and will cooperate fully with law enforcement authorities to prosecute offenders to the fullest extent of the law.</p>

          <h3 className="text-lg font-bold text-black mt-6">4. Intellectual Property</h3>
          <p>All content, designs, code, and intellectual property presented on this site are the exclusive property of EArunga unless otherwise stated. Unauthorized reproduction or distribution is strictly prohibited.</p>

          <h3 className="text-lg font-bold text-black mt-6">5. Disclaimer of Warranties</h3>
          <p>The applications and content are provided "as is" without any representations or warranties, express or implied.</p>
        </div>
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
