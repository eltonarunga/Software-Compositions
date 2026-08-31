import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from './constants';
import Header from './components/Header';
import AboutStatsBento from './components/AboutStatsBento';
import FilterPanel from './components/FilterPanel';
import LinkCard from './components/LinkCard';
import TermsModal from './components/TermsModal';
import PrivacyModal from './components/PrivacyModal';
import { Project, SortBy, SortOrder } from './types';
import { ShieldCheck, Info, ArrowUp } from 'lucide-react';

const PROFILE_PICTURE_URL = 'https://ugc.production.linktr.ee/89b33d54-41fc-4708-900c-83ceb1abd15e_1000393391.png?io=true&size=avatar-v3_0';
const avatarSvg = `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#000000" /><stop offset="100%" stop-color="#4b5563" /></linearGradient></defs><rect width="128" height="128" fill="#f3f4f6" /><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="Inter, sans-serif" font-size="64" font-weight="bold" fill="url(#avatarGrad)" dy=".1em">EA</text></svg>`;
const avatarFallback = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(avatarSvg)}`;
const activeProfileImage = PROFILE_PICTURE_URL || avatarFallback;

const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy | null>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAiTools, setSelectedAiTools] = useState<string[]>([]);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Debounce search input to improve performance
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 250);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Monitor scroll position for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const allAiTools = useMemo(() => {
    const tools = new Set<string>();
    PROJECTS.forEach(project => {
      if (project.aiTools) {
        project.aiTools.forEach(tool => tools.add(tool));
      }
    });
    return Array.from(tools).sort();
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };
  
  const handleClearTags = () => {
    setSelectedTags([]);
  };

  const handleAiToolClick = (tool: string) => {
    setSelectedAiTools(prev =>
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  };
  
  const handleClearAiTools = () => {
    setSelectedAiTools([]);
  };

  // Fuzzy search helper for flexible searching
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
    // 1. Initial filter by search term
    let result = debouncedSearchTerm.trim() === ''
      ? PROJECTS
      : PROJECTS.filter(project =>
          fuzzySearch(debouncedSearchTerm, project.title) ||
          fuzzySearch(debouncedSearchTerm, project.description) ||
          project.tags.some(tag => fuzzySearch(debouncedSearchTerm, tag))
        );
        
    // 2. Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(project => project.category === selectedCategory);
    }
        
    // 3. Filter by Tags
    if (selectedTags.length > 0) {
      result = result.filter(project => 
        project.tags.some(tag => selectedTags.includes(tag))
      );
    }

    // 4. Filter by AI Tools
    if (selectedAiTools.length > 0) {
      result = result.filter(project => 
        project.aiTools && project.aiTools.some(tool => selectedAiTools.includes(tool))
      );
    }

    // 5. Apply Sorting
    if (sortBy !== null) {
      result = [...result].sort((a, b) => {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        // Fallback to sort by date & ID
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        if (dateA !== dateB) return dateA - dateB;
        return a.id - b.id;
      });

      if (sortOrder === 'desc') {
        result.reverse();
      }
    }

    return result;
  }, [sortBy, sortOrder, selectedTags, selectedAiTools, debouncedSearchTerm, selectedCategory]);

  // Group projects by category ONLY if we are viewing 'All' and no other active tag/search filters exist
  const isBrowsingGeneralAll = selectedCategory === 'All' && selectedTags.length === 0 && selectedAiTools.length === 0 && debouncedSearchTerm === '';

  const groupedProjects = useMemo(() => {
    if (!isBrowsingGeneralAll) return null;
    return filteredAndSortedProjects.reduce((acc, project) => {
      const category = project.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(project);
      return acc;
    }, {} as Record<string, Project[]>);
  }, [filteredAndSortedProjects, isBrowsingGeneralAll]);

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-[#fafafa] text-zinc-900 selection:bg-black selection:text-white antialiased transition-colors duration-300">
      {/* Decorative Grid Wallpaper overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        aria-hidden="true"
      />
      
      {/* Main Container */}
      <main id="main-content" className="relative z-10 container mx-auto px-4 py-12 max-w-7xl flex flex-col items-center">
        {/* Render Header Component */}
        <Header activeProfileImage={activeProfileImage} totalCompositions={PROJECTS.length} />

        {/* Render Elegant Stats Bento Dashboard */}
        <AboutStatsBento activeProfileImage={activeProfileImage} projects={PROJECTS} />

        {/* Render Ultimate Filter panel */}
        <FilterPanel 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          allCategories={allCategories}
          selectedTags={selectedTags}
          handleTagClick={handleTagClick}
          handleClearTags={handleClearTags}
          allTags={allTags}
          selectedAiTools={selectedAiTools}
          handleAiToolClick={handleAiToolClick}
          handleClearAiTools={handleClearAiTools}
          allAiTools={allAiTools}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          totalCompositionsCount={filteredAndSortedProjects.length}
        />

        {/* Main Content Layout Container */}
        <div id="compositions-gallery-container" className="w-full max-w-5xl">
          {filteredAndSortedProjects.length > 0 ? (
            isBrowsingGeneralAll && groupedProjects ? (
              /* Custom Grouped Layout - Categorized Sections */
              <div className="space-y-16">
                {Object.keys(groupedProjects).sort().map(category => (
                  <motion.section 
                    key={category}
                    id={`section-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    {/* Visual Section dividing titles */}
                    <div className="flex items-center gap-4">
                      <h2 className="text-lg sm:text-xl font-extrabold font-display uppercase tracking-widest text-zinc-950 flex-shrink-0">
                        {category}
                      </h2>
                      <div className="h-[2px] bg-zinc-200 w-full rounded" aria-hidden="true" />
                      <span className="text-xs font-mono font-bold text-zinc-400 bg-white px-2.5 py-1 border border-zinc-200 rounded">
                        {groupedProjects[category].length}
                      </span>
                    </div>
                    {/* Bento Grid layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {groupedProjects[category].map((project, idx) => (
                        <LinkCard 
                          key={project.id} 
                          project={project} 
                          index={idx} 
                          onTagClick={handleTagClick}
                          onAiToolClick={handleAiToolClick}
                        />
                      ))}
                    </div>
                  </motion.section>
                ))}
              </div>
            ) : (
              /* Custom Flat Grid Layout - Useful for Filtering/Search */
              <motion.div 
                id="filtered-compositions-grid"
                layout 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedProjects.map((project, idx) => (
                    <LinkCard 
                      key={project.id} 
                      project={project} 
                      index={idx} 
                      onTagClick={handleTagClick}
                      onAiToolClick={handleAiToolClick}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )
          ) : (
            /* No Results fallback state screen */
            <motion.div 
              id="no-compositions-fallback"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 px-6 bg-white rounded-2xl border border-zinc-200 border-dashed"
            >
              <div className="mx-auto h-12 w-12 text-zinc-400 mb-4 flex items-center justify-center bg-zinc-50 rounded-full border border-zinc-100" aria-hidden="true">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 font-display">No compositions match your settings</h3>
              <p className="mt-1 text-sm text-zinc-500 max-w-xs mx-auto">Try resetting or broadening your filter criteria to discover more work.</p>
              <button 
                id="empty-state-reset-btn"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  handleClearTags();
                  handleClearAiTools();
                }}
                className="mt-5 px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Global Professional Footer */}
        <footer id="app-footer" className="mt-24 pb-12 text-center text-zinc-400 text-xs border-t border-zinc-200 pt-12 w-full max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-1">
            <div className="text-center sm:text-left space-y-1">
              <p className="font-bold uppercase tracking-wider text-[10px] text-zinc-500 font-mono">
                COMPOSITION PLATFORM • VERSION 2.5
              </p>
              <p className="text-zinc-500 font-medium">&copy; {new Date().getFullYear()} Elton Arunga. Designed with luxury aesthetics & professional standards.</p>
            </div>
            
            {/* Modal legal buttons */}
            <div className="flex items-center gap-3 font-mono text-[10px] font-bold">
              <button 
                id="footer-terms-btn"
                onClick={() => setIsTermsOpen(true)} 
                className="text-zinc-500 hover:text-black transition-colors flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200/80 rounded-md border border-zinc-200/60"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> TERMS OF SERVICE
              </button>
              <button 
                id="footer-privacy-btn"
                onClick={() => setIsPrivacyOpen(true)} 
                className="text-zinc-500 hover:text-black transition-colors flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200/80 rounded-md border border-zinc-200/60"
              >
                PRIVACY POLICY
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Back to Top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            id="back-to-top-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            title="Back to Top"
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-black text-white shadow-lg hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all border border-zinc-700 focus:ring-2 focus:ring-black"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Render Legal Modals */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
};

export default App;
