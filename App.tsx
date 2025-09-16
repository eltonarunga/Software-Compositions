import React, { useState, useMemo } from 'react';
import { PROJECTS } from './constants';
import LinkCard from './components/LinkCard';
import { Project } from './types';

const avatarSvg = `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#06b6d4" /><stop offset="100%" stop-color="#8b5cf6" /></linearGradient></defs><rect width="128" height="128" fill="#1f2937" /><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="Inter, sans-serif" font-size="64" font-weight="bold" fill="url(#avatarGrad)" dy=".1em">EA</text></svg>`;
const avatarDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(avatarSvg)}`;

type SortBy = 'id' | 'title';
type SortOrder = 'asc' | 'desc';

const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagFilterVisible, setIsTagFilterVisible] = useState(false);
  const [tagSearchTerm, setTagSearchTerm] = useState('');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    PROJECTS.forEach(project => project.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  const handleClearTags = () => {
    setSelectedTags([]);
    setTagSearchTerm('');
  };

  const filteredAndSortedProjects = useMemo(() => {
    // 1. Filter by tags
    const filtered = selectedTags.length === 0
      ? PROJECTS
      : PROJECTS.filter(project => project.tags.some(tag => selectedTags.includes(tag)));

    // 2. Sort the filtered results
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return a.id - b.id;
    });

    if (sortOrder === 'desc') {
      return sorted.reverse();
    }

    return sorted;
  }, [sortBy, sortOrder, selectedTags]);
  
  const visibleTags = useMemo(() => {
    if (!tagSearchTerm) {
      return allTags;
    }
    return allTags.filter(tag =>
      tag.toLowerCase().includes(tagSearchTerm.toLowerCase())
    );
  }, [allTags, tagSearchTerm]);

  const getButtonClass = (isActive: boolean) => 
    `px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
      isActive
        ? 'bg-cyan-500 text-white shadow'
        : 'bg-gray-700/80 text-gray-300 hover:bg-gray-600/80'
    }`;
    
  const getTagButtonClass = (isActive: boolean) => 
    `px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 border ${
      isActive
        ? 'bg-cyan-500 text-white border-cyan-500 shadow'
        : 'bg-gray-700/80 text-gray-300 border-gray-600 hover:bg-gray-600/80 hover:border-gray-500'
    }`;

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

        <div className="w-full max-w-7xl mb-8 p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-300">Sort by:</span>
              <div className="flex space-x-2">
                <button onClick={() => setSortBy('id')} className={getButtonClass(sortBy === 'id')}>Date Added</button>
                <button onClick={() => setSortBy('title')} className={getButtonClass(sortBy === 'title')}>Title</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-300">Order:</span>
              <div className="flex space-x-2">
                  <button onClick={() => setSortOrder('asc')} className={getButtonClass(sortOrder === 'asc')} aria-label="Ascending order">
                      Ascending
                  </button>
                  <button onClick={() => setSortOrder('desc')} className={getButtonClass(sortOrder === 'desc')} aria-label="Descending order">
                      Descending
                  </button>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <button
              onClick={() => setIsTagFilterVisible(!isTagFilterVisible)}
              className="w-full flex justify-between items-center text-left font-semibold text-gray-300 p-2 rounded-md hover:bg-gray-700/50 transition-colors duration-200"
              aria-expanded={isTagFilterVisible}
              aria-controls="tag-filter-panel"
            >
              <span>
                Filter by Tag {selectedTags.length > 0 && `(${selectedTags.length})`}
              </span>
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${isTagFilterVisible ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isTagFilterVisible && (
              <div id="tag-filter-panel" className="pt-4">
                <div className="mb-4">
                  <input
                    type="text"
                    value={tagSearchTerm}
                    onChange={(e) => setTagSearchTerm(e.target.value)}
                    placeholder="Search tags..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 placeholder-gray-400 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                    aria-label="Search for a tag"
                  />
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {visibleTags.map(tag => (
                    <button 
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={getTagButtonClass(selectedTags.includes(tag))}
                    >
                      {tag}
                    </button>
                  ))}
                  {selectedTags.length > 0 && (
                    <button
                      onClick={handleClearTags}
                      className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 border border-red-500/50 text-red-400 hover:bg-red-500/20"
                      aria-label="Clear selected tags"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProjects.map((project) => (
            <LinkCard 
              key={project.id} 
              project={project}
            />
          ))}
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://github.com/earunga" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
            </a>
            <a href="https://www.linkedin.com/in/eltonarunga/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            </a>
            <a href="https://twitter.com/earunga" target="_blank" rel="noopener noreferrer" aria-label="Twitter" title="Twitter" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.353.23-2.064.077.608 1.881 2.372 3.256 4.465 3.293-1.711 1.341-3.869 2.143-6.217 2.143-.404 0-.802-.023-1.195-.07 2.206 1.414 4.833 2.239 7.646 2.239 9.178 0 14.207-7.603 13.882-14.536 1.033-.745 1.91-1.685 2.62-2.74z" />
                </svg>
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} EArunga. All rights reserved.</p>
          <p className="mt-1">Built with React & Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
