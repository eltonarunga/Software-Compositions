import { Project } from './types';

const svgToDataUri = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const svgDesigns = [
  // Design 1: Cosmic Waves
  `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0891b2"/><stop offset="100%" stop-color="#67e8f9"/></linearGradient></defs><rect width="400" height="400" fill="#111827"/><path d="M0 200 C 100 100, 300 300, 400 200" stroke="url(#g1)" stroke-width="3" fill="none" opacity="0.6"/><path d="M0 250 C 150 180, 250 320, 400 250" stroke="url(#g1)" stroke-width="2" fill="none" opacity="0.4"/></svg>`,
  // Design 2: Geo Prism
  `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g2" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#5b21b6"/><stop offset="100%" stop-color="#c084fc"/></linearGradient></defs><rect width="400" height="400" fill="#111827"/><g transform="rotate(45 200 200)" opacity="0.5"><rect x="100" y="100" width="200" height="200" fill="none" stroke="url(#g2)" stroke-width="4" rx="10"/></g><g transform="rotate(-30 200 200)" opacity="0.3"><rect x="125" y="125" width="150" height="150" fill="none" stroke="url(#g2)" stroke-width="2" rx="5"/></g></svg>`,
  // Design 3: Nebula Cloud
  `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><defs><filter id="f1"><feGaussianBlur in="SourceGraphic" stdDeviation="50" /></filter><radialGradient id="g3" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#0d9488" stop-opacity="0.8"/><stop offset="100%" stop-color="#0d9488" stop-opacity="0"/></radialGradient></defs><rect width="400" height="400" fill="#111827"/><circle cx="200" cy="200" r="200" fill="url(#g3)" filter="url(#f1)"/></svg>`,
  // Design 4: Circuit Board
  `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="p1" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 10 h20 v20 h-20 z M20 0 v10 h20 v-10 z" stroke="#047857" stroke-width="1" fill="none" opacity="0.3"/></pattern></defs><rect width="400" height="400" fill="#111827"/><rect width="400" height="400" fill="url(#p1)"/></svg>`,
];

const getImageForIndex = (index: number) => {
  return svgToDataUri(svgDesigns[index % svgDesigns.length]);
};


export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'AI Video Prompt Enhancer',
    description: 'Enhance your video prompts with the power of generative AI.',
    imageUrl: getImageForIndex(0),
    url: 'https://gemini.google.com/share/6a3c09ed6a3f?hl=en-GB',
    tags: ['AI', 'Gemini', 'Video']
  },
  {
    id: 2,
    title: 'LughaLearner',
    description: 'An interactive platform for learning new languages.',
    imageUrl: getImageForIndex(1),
    url: 'https://replit.com/@eltonarunga/LughaLearner?s=app#replit.md',
    tags: ['Education', 'React', 'Language']
  },
  {
    id: 3,
    title: 'OralBiohack',
    description: 'A decentralized platform for oral health data and research.',
    imageUrl: getImageForIndex(2),
    url: 'https://replit.com/@eltonarunga1/OralBiohack?s=app',
    tags: ['Health', 'Web3', 'Biohacking']
  },
  {
    id: 4,
    title: 'LandChain Africa',
    description: 'A blockchain-based solution for secure land registry in Africa.',
    imageUrl: getImageForIndex(3),
    url: 'https://replit.com/@eltonarunga1/LandChainAfrica?s=app',
    tags: ['Blockchain', 'Real Estate', 'Web3']
  },
  {
    id: 5,
    title: 'Agile Learning Ecosystem',
    description: 'A platform to facilitate agile and collaborative learning environments.',
    imageUrl: getImageForIndex(0),
    url: 'https://replit.com/@eltonarunga/AgileLearningEcosystem',
    tags: ['Education', 'Agile', 'Collaboration']
  },
  {
    id: 6,
    title: 'Kenya Language Learner',
    description: 'Learn Kenyan languages with this interactive and cultural learning tool.',
    imageUrl: getImageForIndex(1),
    url: 'https://replit.com/@eltonarunga/KenyaLanguageLearner',
    tags: ['Language', 'Kenya', 'Education']
  },
  {
    id: 7,
    title: 'MedComplianceHub',
    description: 'A centralized platform to manage and track medical compliance documentation and reporting.',
    imageUrl: getImageForIndex(2),
    url: 'https://replit.com/@eltonarunga1/MedComplianceHub',
    tags: ['Health', 'Compliance', 'SaaS']
  },
  {
    id: 8,
    title: 'Digital Art Market',
    description: 'A vibrant marketplace for buying, selling, and discovering unique digital art and collectibles.',
    imageUrl: getImageForIndex(3),
    url: 'https://replit.com/@eltonarunga1/DigitalArtMarket',
    tags: ['Art', 'Marketplace', 'Web3']
  },
  {
    id: 9,
    title: 'Vibe codes',
    description: 'A collection of creative and aesthetically pleasing coding projects.',
    imageUrl: getImageForIndex(0),
    url: 'https://irdoujhu.manus.space/',
    tags: ['Creative Coding', 'Portfolio', 'Art']
  },
  {
    id: 10,
    title: 'LughaLearner Live Prototype',
    description: 'An intelligent language learning assistant for Kenyan languages, powered by AI.',
    imageUrl: getImageForIndex(1),
    url: 'https://lugha-smart-kenya.lovable.app',
    tags: ['AI', 'Language', 'Kenya', 'Education']
  },
  {
    id: 11,
    title: 'Mining Dashboard',
    description: 'A real-time dashboard to monitor and manage industrial mining operations.',
    imageUrl: getImageForIndex(2),
    url: 'https://aeejbufd.manus.space/',
    tags: ['Industrial', 'Dashboard', 'Operations', 'Real-time']
  },
  {
    id: 12,
    title: 'Kazira,io opal agent',
    description: 'An innovative agent built on the Opal platform, designed for intelligent task automation and assistance.',
    imageUrl: getImageForIndex(3),
    url: 'https://opal.withgoogle.com/?flow=drive:/1g5EsPt18QZYsNAcaE1f9KgmCnWOQEvin&shared&mode=app',
    tags: ['AI', 'Agent', 'Opal', 'Automation']
  },
  {
    id: 13,
    title: 'AgriProof X',
    description: 'A comprehensive agricultural platform that combines AI, blockchain, and DeFi to empower farmers with asset verification, intelligent farming assistance, microfinance access, supply chain tracking, and a community marketplace.',
    imageUrl: getImageForIndex(0),
    url: 'https://app--agri-proof-x-1936b50a.base44.app',
    tags: ['AI', 'Blockchain', 'DeFi', 'Agriculture', 'Fintech']
  },
  {
    id: 14,
    title: 'Food Ordering AI Agent',
    description: 'An AI-powered agent to streamline your food ordering experience, making it faster and more intuitive.',
    imageUrl: getImageForIndex(1),
    url: 'https://cqybrkrg.manus.space/',
    tags: ['AI', 'Agent', 'Food', 'Automation']
  },
  {
    id: 15,
    title: 'Suno Compositions',
    description: 'AI-powered music and audio compositions exploring the frontiers of generative art.',
    imageUrl: getImageForIndex(2),
    url: 'https://suno.com/@earunga',
    tags: ['AI', 'Music', 'Audio', 'Generative']
  }
];