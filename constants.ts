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
    id: 27,
    title: 'BTC-MPesa',
    description: 'A web application that allows users to spend Bitcoin via M-Pesa by converting BTC to KES and sending it to a specified M-Pesa recipient (Phone Number, Paybill, or Till Number).',
    imageUrl: getImageForIndex(2),
    url: 'https://btc-mpesa.vercel.app/',
    tags: ['Bitcoin', 'M-Pesa', 'Fintech', 'Kenya', 'Crypto']
  },
  {
    id: 26,
    title: 'Stylo - AI wardrobe transformer',
    description: 'An AI-powered application that transforms your wardrobe by suggesting new outfits, cataloging your clothes, and helping you discover your personal style.',
    imageUrl: getImageForIndex(1),
    url: 'https://ai.studio/apps/drive/1JEh7KNQUlgDMOGc4heJTBoqQC7kcX6bV',
    tags: ['AI', 'Fashion', 'Style', 'Wardrobe', 'Assistant']
  },
  {
    id: 25,
    title: 'nanoStrategyKE AI Accelerator Challenge',
    description: 'A web application to display the 28-Day AI Accelerator course, designed to help users master productivity and creativity with AI tools. The app presents the course structure, modules, daily lessons, and learning objectives in an engaging format.',
    imageUrl: getImageForIndex(0),
    url: 'https://nanostrategy.netlify.app/',
    tags: ['AI', 'Education', 'Productivity', 'Course']
  },
  {
    id: 24,
    title: 'Kazira.io',
    description: 'A modern SaaS platform by Kazira.io providing AI-powered automation (Kazira Automate) and future-skills learning (Kazira Learn).',
    imageUrl: getImageForIndex(3),
    url: 'https://kazira-io-669567718651.us-west1.run.app/',
    tags: ['SaaS', 'AI', 'Automation', 'EdTech']
  },
  {
    id: 23,
    title: 'Crave Cam',
    description: 'An AI-powered Restaurant Reels app that creates stunning short videos for your culinary creations, perfect for social media marketing.',
    imageUrl: getImageForIndex(2),
    url: 'https://ai.studio/apps/drive/1OkS1MZJIuetbXjjD3yTSAvtg-ASgIUfV',
    tags: ['AI', 'Video', 'Food', 'Marketing']
  },
  {
    id: 22,
    title: 'Lugha Learner Kenya (Version 2.0)',
    description: 'The next generation AI-powered assistant for learning Kenyan languages, featuring new lessons and an improved user experience.',
    imageUrl: getImageForIndex(0),
    url: 'https://lugha-learner-kenya.vercel.app/',
    tags: ['AI', 'Language', 'Kenya', 'Education', 'V2.0']
  },
  {
    id: 21,
    title: 'Safari Mate - AI Travel Agent',
    description: 'An AI-powered travel assistant that helps travelers prepare for trips by providing a personalized checklist of requirements to avoid any hiccups.',
    imageUrl: getImageForIndex(1),
    url: 'https://ai.studio/apps/drive/1aPrKRXZPWumhaFw7J5rPO4Z-2bRR7yQD',
    tags: ['AI', 'Travel', 'Assistant', 'Planning']
  },
  {
    id: 20,
    title: 'KRA Tax Tools - Annual Calculator & WHT Tracker',
    description: 'Includes a Kenyan Individual Annual Income Tax Calculator and a Withholding Tax (WHT) Tracker with an option to upload WHT certificates for information extraction (experimental).',
    imageUrl: getImageForIndex(0),
    url: 'https://ai.studio/apps/drive/1gcEA__WvNHy_GiYlPYNVRkA9Hw13lTJc',
    tags: ['Fintech', 'Tax', 'Kenya', 'Calculator']
  },
  {
    id: 19,
    title: 'KaziraX Automate - Future of Work',
    description: 'KaziraX Automate offers intelligent AI solutions to augment and replace declining job roles, boosting efficiency and innovation for businesses.',
    imageUrl: getImageForIndex(1),
    url: 'https://ai.studio/apps/drive/1kTlmKKOv-ZpHzpxplXo7fb30wzzDM0eF',
    tags: ['AI', 'Automation', 'Future of Work', 'SaaS']
  },
  {
    id: 10,
    title: 'Lugha Learner',
    description: 'An intelligent language learning assistant for Kenyan languages, powered by AI.',
    imageUrl: getImageForIndex(2),
    url: 'https://lugha-learner.vercel.app/',
    tags: ['AI', 'Language', 'Kenya', 'Education']
  },
  {
    id: 7,
    title: 'Kenya MedReg Compliance Assistant',
    description: 'A centralized platform to manage and track medical compliance documentation and reporting.',
    imageUrl: getImageForIndex(3),
    url: 'https://kenya-medreg-compliance-assistant-893722584695.us-west1.run.app',
    tags: ['Health', 'Compliance', 'SaaS']
  },
  {
    id: 16,
    title: 'Networth Portfolio Tracker',
    description: 'A comprehensive tool to track and manage your net worth and investment portfolios in real-time.',
    imageUrl: getImageForIndex(1),
    url: 'https://net-worth-portfolio-tracker.vercel.app/',
    tags: ['Fintech', 'Portfolio', 'Tracker', 'Investment']
  },
  {
    id: 17,
    title: 'KenyaBase Company Explorer',
    description: 'An interactive tool to explore and analyze comprehensive data on Kenyan companies.',
    imageUrl: getImageForIndex(0),
    url: 'https://kenyabase.netlify.app/',
    tags: ['Kenya', 'Business', 'Data', 'Analytics']
  },
  {
    id: 18,
    title: 'Mwakilishi Wangu',
    description: 'A platform connecting Kenyan citizens with their elected representatives for enhanced civic engagement.',
    imageUrl: getImageForIndex(3),
    url: 'https://mwakilishi-wangu.netlify.app/',
    tags: ['Civic Tech', 'Kenya', 'Governance']
  },
  {
    id: 3,
    title: 'OralBiohack',
    description: 'A decentralized platform for oral health data and research.',
    imageUrl: getImageForIndex(2),
    url: 'https://ai.studio/apps/drive/1mq0wYYSTaB8yFSBS-2PGpEryNmImymDN',
    tags: ['Health', 'Web3', 'Biohacking']
  },
  {
    id: 4,
    title: 'LandChain Africa',
    description: 'A blockchain-based solution for secure land registry in Africa.',
    imageUrl: getImageForIndex(3),
    url: 'https://ai.studio/apps/drive/1pfy6_Xj3Oa4GTVsyYBilAUMGSvg-oUWm',
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
    id: 11,
    title: 'Mining Dashboard',
    description: 'A real-time dashboard to monitor and manage industrial mining operations.',
    imageUrl: getImageForIndex(2),
    url: 'https://aeejbufd.manus.space/',
    tags: ['Industrial', 'Dashboard', 'Operations', 'Real-time']
  },
  {
    id: 12,
    title: 'Kazira.io Job Disruption Scanner (Opal)',
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
    title: 'Cheffie Ai',
    description: 'An AI-powered agent to streamline your food ordering experience, making it faster and more intuitive.',
    imageUrl: getImageForIndex(1),
    url: 'https://cheffie-ai.netlify.app/',
    tags: ['AI', 'Agent', 'Food', 'Automation']
  },
  {
    id: 15,
    title: 'Suno Compositions',
    description: 'AI-powered music and audio compositions exploring the frontiers of generative art.',
    imageUrl: getImageForIndex(2),
    url: 'https://suno.com/@earunga',
    tags: ['AI', 'Music', 'Audio', 'Generative']
  },
  {
    id: 1,
    title: 'AI Video Prompt Enhancer',
    description: 'Enhance your video prompts with the power of generative AI.',
    imageUrl: getImageForIndex(0),
    url: 'https://gemini.google.com/share/6a3c09ed6a3f?hl=en-GB',
    tags: ['AI', 'Gemini', 'Video']
  }
];