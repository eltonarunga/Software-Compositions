import React from 'react';
import { PROJECTS } from './constants';
import LinkCard from './components/LinkCard';

const avatarSvg = `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#06b6d4" /><stop offset="100%" stop-color="#8b5cf6" /></linearGradient></defs><rect width="128" height="128" fill="#1f2937" /><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="Inter, sans-serif" font-size="64" font-weight="bold" fill="url(#avatarGrad)" dy=".1em">EA</text></svg>`;
const avatarDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(avatarSvg)}`;

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white selection:bg-cyan-500 selection:text-black">
      <div 
        className="absolute inset-0 z-0 opacity-20" 
        style={{backgroundImage: 'radial-gradient(#4a5568 1px, transparent 1px)', backgroundSize: '20px 20px'}}
      ></div>
      <main className="relative z-10 container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        <header className="text-center mb-10">
          <img
            src={avatarDataUri}
            alt="Profile Avatar"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-4 border-4 border-gray-700 shadow-lg"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">Software Compositions by EArunga</h1>
          <p className="text-md sm:text-lg text-gray-400 mt-2">Curator of digital aesthetics & functional art.</p>
        </header>

        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <LinkCard key={project.id} project={project} />
          ))}
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} EArunga. All rights reserved.</p>
          <p className="mt-1">Built with React & Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
};

export default App;