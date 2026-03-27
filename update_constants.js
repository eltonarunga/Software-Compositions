import fs from 'fs';

let content = fs.readFileSync('constants.ts', 'utf8');

// We'll use a regex to find each project object and inject aiModels if applicable.
// Since it's an array of objects, we can just parse it, modify it, and write it back, but it has function calls like getImageForIndex(1).
// So instead, we'll do string replacements.

const replacements = [
  { match: /url: 'https:\/\/kazira-io-clinical-intelligence-mvp\.vercel\.app\/',/g, add: "aiModels: ['Gemini']," },
  { match: /url: 'https:\/\/lugha-learner--eltonarunga\.replit\.app',/g, add: "aiModels: ['Replit']," },
  { match: /url: 'https:\/\/g\.co\/gemini\/share\/7ab77dc1156a',/g, add: "aiModels: ['Gemini']," },
  { match: /url: 'https:\/\/g\.co\/gemini\/share\/5b3a5214cb12',/g, add: "aiModels: ['Gemini']," },
  { match: /url: 'https:\/\/vibelanding-z9xjgdag\.manus\.space\/',/g, add: "aiModels: ['Manus']," },
  { match: /url: 'https:\/\/oral-biohacker-ai-v2\.vercel\.app\/',/g, add: "aiModels: ['Gemini']," },
  { match: /url: 'https:\/\/claude\.ai\/public\/artifacts\/7792809c-beef-495a-903e-f7ecee0983d9',/g, add: "aiModels: ['Claude']," },
  { match: /url: 'https:\/\/rebalancecalc-qiyampwr\.manus\.space\/',/g, add: "aiModels: ['Manus']," },
  { match: /url: 'https:\/\/lugha-learner-lovable-kenya\.lovable\.app\/',/g, add: "aiModels: ['Lovable']," },
  { match: /url: 'https:\/\/google-canvas-compos-rqcc\.bolt\.host\/',/g, add: "aiModels: ['Bolt']," },
  { match: /url: 'https:\/\/kazira-io-saas-landi-3e55\.bolt\.host\/',/g, add: "aiModels: ['Bolt']," },
  { match: /url: 'https:\/\/replit\.com\/@eltonarunga\/AgileLearningEcosystem',/g, add: "aiModels: ['Replit']," },
  { match: /url: 'https:\/\/vibecodes-wbkwyjej\.manus\.space',/g, add: "aiModels: ['Manus']," },
  { match: /url: 'https:\/\/aeejbufd\.manus\.space\/',/g, add: "aiModels: ['Manus']," },
  { match: /url: 'https:\/\/opal\.withgoogle\.com\/\?flow=drive:\/1g5EsPt18QZYsNAcaE1f9KgmCnWOQEvin&shared&mode=app',/g, add: "aiModels: ['Opal']," },
];

for (const rep of replacements) {
  content = content.replace(rep.match, (m) => `${m}\n    ${rep.add}`);
}

fs.writeFileSync('constants.ts', content);
console.log('Done');
