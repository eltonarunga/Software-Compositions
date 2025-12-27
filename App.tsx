import React, { useState, useMemo, useEffect } from 'react';
import { PROJECTS } from './constants';
import LinkCard from './components/LinkCard';
import { Project } from './types';

/** 
 * HOW TO ADD YOUR PROFILE PICTURE:
 * 1. Replace the empty string below with your image URL.
 * 2. Example: 'https://github.com/yourusername.png' or 'https://yourwebsite.com/profile.jpg'
 * 3. If left empty, the app will use the "EA" text avatar fallback.
 */
const PROFILE_PICTURE_URL = 'https://x.com/E_Arunga/photo';

const avatarSvg = `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#000000" /><stop offset="100%" stop-color="#4b5563" /></linearGradient></defs><rect width="128" height="128" fill="#f3f4f6" /><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="Inter, sans-serif" font-size="64" font-weight="bold" fill="url(#avatarGrad)" dy=".1em">EA</text></svg>`;
const avatarFallback = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(avatarSvg)}`;
const activeProfileImage = PROFILE_PICTURE_URL || avatarFallback;

type SortBy = 'id' | 'title';
type SortOrder = 'asc' | 'desc';

const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagFilterVisible, setIsTagFilterVisible] = useState(false);
  const [isCategoryFilterVisible, setIsCategoryFilterVisible] = useState(false);
  const [tagSearchTerm, setTagSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Debounce search input to improve performance
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    PROJECTS.forEach(project => project.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);
  
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    PROJECTS.forEach(project => categories.add(project.category));
    return ['All', ...Array.from(categories).sort()];
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

  // Fuzzy search function to allow for more forgiving searches
  const fuzzySearch = (query: string, text: string): boolean => {
    const searchQuery = query.toLowerCase().replace(/\s/g, '');
    if (!searchQuery) return true;
    const textToSearch = text.toLowerCase();
    let searchIndex = 0;
    for (let i = 0; i < textToSearch.length && searchIndex < searchQuery.length; i++) {
        if (textToSearch[i] === searchQuery[searchIndex]) {
            searchIndex++;
        }
    }
    return searchIndex === searchQuery.length;
  };

  const filteredAndSortedProjects = useMemo(() => {
    const searched = debouncedSearchTerm.trim() === ''
      ? PROJECTS
      : PROJECTS.filter(project =>
          fuzzySearch(debouncedSearchTerm, project.title) ||
          fuzzySearch(debouncedSearchTerm, project.description)
        );
        
    const filteredByCategory = selectedCategory === 'All'
      ? searched
      : searched.filter(project => project.category === selectedCategory);
        
    const filteredByTags = selectedTags.length === 0
      ? filteredByCategory
      : filteredByCategory.filter(project => project.tags.some(tag => selectedTags.includes(tag)));

    if (sortBy === null) {
      return filteredByTags;
    }

    const sorted = [...filteredByTags].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    if (sortOrder === 'desc') {
      return sorted.reverse();
    }

    return sorted;
  }, [sortBy, sortOrder, selectedTags, debouncedSearchTerm, selectedCategory]);
  
  const visibleTags = useMemo(() => {
    if (!tagSearchTerm) {
      return allTags;
    }
    return allTags.filter(tag =>
      tag.toLowerCase().includes(tagSearchTerm.toLowerCase())
    );
  }, [allTags, tagSearchTerm]);

  const groupedProjects = useMemo(() => {
    return filteredAndSortedProjects.reduce((acc, project) => {
        const category = project.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(project);
        return acc;
    }, {} as Record<string, Project[]>);
  }, [filteredAndSortedProjects]);

  const getTagButtonClass = (isActive: boolean) => 
    `px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ease-in-out border transform hover:scale-105 ${
      isActive
        ? 'bg-black text-white border-black'
        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
    }`;

  return (
    <div className="min-h-screen text-black selection:bg-black selection:text-white transition-colors duration-300">
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none" 
        style={{backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '24px 24px'}}
      ></div>
      <main className="relative z-10 container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        <header className="text-center mb-10">
          <img
            src={activeProfileImage}
            alt="Profile Avatar"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-4 border-2 border-black shadow-sm object-cover"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">Software Compositions by EArunga</h1>
          <p className="text-md sm:text-lg text-gray-600 mt-2 font-medium">Curator of digital aesthetics & functional art.</p>
        </header>
        
        <section className="w-full max-w-4xl mb-10 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <img 
              src={activeProfileImage} 
              alt="EArunga's profile picture" 
              className="w-32 h-32 rounded-full border-2 border-black flex-shrink-0 object-cover shadow-md"
            />
            <div>
              <h2 className="text-2xl font-bold text-black mb-3">About Me</h2>
              <p className="text-gray-700 leading-relaxed">
                I'm a software composer passionate about building intelligent, user-centric applications at the intersection of clean code, intuitive UI/UX, and the transformative power of AI.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                This collection represents my journey through various technologies and creative challenges. Feel free to explore the projects and connect with me.
              </p>
            </div>
          </div>
        </section>

        <div className="w-full max-w-7xl mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="w-full mb-6">
            <label htmlFor="project-search" className="sr-only">Search projects by title or description</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                id="project-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm text-black placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black transition-colors"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
            <div className="flex items-center gap-4">
              <span id="sort-by-label" className="font-bold text-gray-900 text-sm uppercase tracking-wider">Sort by:</span>
              <div className="flex space-x-1" role="radiogroup" aria-labelledby="sort-by-label">
                <label>
                  <input
                    type="radio"
                    name="sortBy"
                    value="id"
                    checked={sortBy === 'id'}
                    onChange={() => setSortBy('id')}
                    className="sr-only"
                  />
                  <span className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-md transition-all duration-200 uppercase tracking-tighter ${
                    sortBy === 'id'
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                    Date
                  </span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="sortBy"
                    value="title"
                    checked={sortBy === 'title'}
                    onChange={() => setSortBy('title')}
                    className="sr-only"
                  />
                  <span className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-md transition-all duration-200 uppercase tracking-tighter ${
                    sortBy === 'title'
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>
                    Title
                  </span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-900 text-sm uppercase tracking-wider">Order:</span>
              <button
                onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-md transition-all duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200 uppercase tracking-tighter"
                aria-live="polite"
                aria-label={`Current order: ${sortOrder}. Toggle to ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
              >
                <span>{sortOrder === 'asc' ? 'Asc' : 'Desc'}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-300 ${sortOrder === 'asc' ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5-5-5M12 18V6" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
             <button
              onClick={() => setIsCategoryFilterVisible(!isCategoryFilterVisible)}
              className="w-full flex justify-between items-center text-left font-bold text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm uppercase tracking-wider"
              aria-expanded={isCategoryFilterVisible}
              aria-controls="category-filter-panel"
            >
              <span id="category-filter-label">
                Category {selectedCategory !== 'All' && `— ${selectedCategory}`}
              </span>
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${isCategoryFilterVisible ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isCategoryFilterVisible && (
              <div id="category-filter-panel" className="pt-4">
                <div className="flex flex-wrap justify-center gap-2" role="radiogroup" aria-labelledby="category-filter-label">
                    {allCategories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 border uppercase tracking-tighter ${
                                selectedCategory === category
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                            }`}
                            aria-pressed={selectedCategory === category}
                        >
                            {category}
                        </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => setIsTagFilterVisible(!isTagFilterVisible)}
              className="w-full flex justify-between items-center text-left font-bold text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm uppercase tracking-wider"
              aria-expanded={isTagFilterVisible}
              aria-controls="tag-filter-panel"
            >
              <span>
                Tags {selectedTags.length > 0 && `— ${selectedTags.length} selected`}
              </span>
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${isTagFilterVisible ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {selectedTags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                {selectedTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-black text-white border border-black hover:bg-gray-800 transition-all"
                    aria-label={`Remove tag: ${tag}`}
                  >
                    {tag}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                ))}
                <button
                  onClick={handleClearTags}
                  className="ml-auto px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 border border-black text-black hover:bg-black hover:text-white"
                  aria-label="Clear all selected tags"
                >
                  Clear All
                </button>
              </div>
            )}
            
            {isTagFilterVisible && (
              <div id="tag-filter-panel" className="pt-4">
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
                    <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={tagSearchTerm}
                    onChange={(e) => setTagSearchTerm(e.target.value)}
                    placeholder="Search tags..."
                    className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm text-black placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    aria-label="Search for a tag"
                  />
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {visibleTags.map(tag => (
                    <button 
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={getTagButtonClass(selectedTags.includes(tag))}
                      aria-pressed={selectedTags.includes(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full max-w-7xl space-y-20">
          {filteredAndSortedProjects.length > 0 ? (
            Object.keys(groupedProjects).sort().map(category => (
              <section key={category}>
                <div className="relative mb-10">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t-2 border-black/10" />
                  </div>
                  <div className="relative flex justify-center">
                    <h2 className="bg-white px-8 text-2xl sm:text-3xl font-black text-black uppercase tracking-widest">{category}</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {groupedProjects[category].map(project => (
                    <LinkCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-20 px-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <h3 className="mt-4 text-2xl font-bold text-gray-900">No Projects Found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        <footer className="mt-24 pb-12 text-center text-gray-500 text-sm border-t border-gray-100 pt-12 w-full">
          <div className="flex justify-center space-x-10 mb-8">
            <a href="https://github.com/eltonarunga" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" className="text-black hover:text-gray-600 transition-colors duration-300">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
            </a>
            <a href="https://www.linkedin.com/in/elton-arunga-80405811b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className="text-black hover:text-gray-600 transition-colors duration-300">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            </a>
            <a href="https://x.com/E_Arunga" target="_blank" rel="noopener noreferrer" aria-label="Twitter" title="Twitter" className="text-black hover:text-gray-600 transition-colors duration-300">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.353.23-2.064.077.608 1.881 2.372 3.256 4.465 3.293-1.711 1.341-3.869 2.143-6.217 2.143-.404 0-.802-.023-1.195-.07 2.206 1.414 4.833 2.239 7.646 2.239 9.178 0 14.207-7.603 13.882-14.536 1.033-.745 1.91-1.685 2.62-2.74z" />
                </svg>
            </a>
          </div>
          <p className="mb-4 font-bold uppercase tracking-widest text-xs">
            Showing {filteredAndSortedProjects.length} of {PROJECTS.length} compositions
          </p>
          <p>&copy; {new Date().getFullYear()} EArunga. All rights reserved.</p>
          <p className="mt-1 font-medium italic">Built with React & Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
};

export default App;