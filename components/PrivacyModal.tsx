import React from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black">Privacy Policy</h2>
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
          
          <h3 className="text-lg font-bold text-black mt-6">1. Information We Collect</h3>
          <p>We may collect basic analytics data, such as IP addresses, browser types, referring pages, and operating systems, to understand how visitors interact with our portfolio and improve user experience.</p>

          <h3 className="text-lg font-bold text-black mt-6">2. Use of Information</h3>
          <p>The information collected is used solely for internal analytics, monitoring site performance, and ensuring the security of our infrastructure.</p>

          <h3 className="text-lg font-bold text-black mt-6">3. Security Monitoring and Enforcement</h3>
          <p>We actively monitor traffic to detect and prevent unauthorized activities, including but not limited to scraping, vulnerability scanning, and security circumvention.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Data Logging:</strong> We log access attempts, including IP addresses, to identify malicious actors.</li>
            <li><strong>Enforcement:</strong> Information collected during security incidents may be shared with law enforcement, legal counsel, or third-party security services to pursue legal action against individuals or entities violating our Terms of Service.</li>
          </ul>

          <h3 className="text-lg font-bold text-black mt-6">4. Third-Party Links</h3>
          <p>This portfolio contains links to external applications and websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review their respective privacy policies.</p>

          <h3 className="text-lg font-bold text-black mt-6">5. Changes to This Policy</h3>
          <p>We reserve the right to update or modify this Privacy Policy at any time. Changes will be effective immediately upon posting to this site.</p>

          <h3 className="text-lg font-bold text-black mt-6">6. Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at eltonarunga@gmail.com.</p>
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

export default PrivacyModal;
