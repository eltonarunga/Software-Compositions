import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Tag, Cpu, RefreshCw, X, Check } from 'lucide-react';
import { SortBy, SortOrder } from '../types';

interface FilterPanelProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  allCategories: string[];
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
  handleClearTags: () => void;
  allTags: string[];
  selectedAiTools: string[];
  handleAiToolClick: (tool: string) => void;
  handleClearAiTools: () => void;
  allAiTools: string[];
  sortBy: SortBy | null;
  setSortBy: (sort: SortBy | null) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  totalCompositionsCount: number;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  allCategories,
  selectedTags,
  handleTagClick,
  handleClearTags,
  allTags,
  selectedAiTools,
  handleAiToolClick,
  handleClearAiTools,
  allAiTools,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  totalCompositionsCount,
}) => {
  const [isDetailedFiltersOpen, setIsDetailedFiltersOpen] = useState(false);
  const [tagSearchTerm, setTagSearchTerm] = useState('');

  // Filter tags based on tagSearchTerm
  const filteredTags = useMemo(() => {
    if (!tagSearchTerm) return allTags;
    return allTags.filter(tag => tag.toLowerCase().includes(tagSearchTerm.toLowerCase()));
  }, [allTags, tagSearchTerm]);

  const hasActiveFilters = selectedCategory !== 'All' || selectedTags.length > 0 || selectedAiTools.length > 0 || searchTerm.trim() !== '';

  const handleResetAll = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    handleClearTags();
    handleClearAiTools();
  };

  return (
    <div id="filter-panel-container" className="w-full max-w-5xl mx-auto mb-10 p-5 bg-white border border-zinc-200 rounded-2xl shadow-sm relative">
      {/* Search Input and Collapsible Button */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute inset-y-0 left-3.5 my-auto w-5 h-5 text-zinc-400 pointer-events-none" />
          <input
            id="compositions-search-input"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search matching projects, frameworks, dentistry tech, or features..."
            className="w-full bg-zinc-50 hover:bg-zinc-100/50 focus:bg-white border border-zinc-200 rounded-xl pl-11 pr-10 py-3.5 text-sm text-zinc-950 placeholder-zinc-400 focus:ring-2 focus:ring-black/10 focus:border-black transition-all font-medium"
            aria-label="Search software compositions"
          />
          {searchTerm && (
            <button
               id="clear-search-btn"
               onClick={() => setSearchTerm('')}
               className="absolute inset-y-0 right-3 my-auto w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-black rounded-full transition-colors"
               aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Toggle controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            id="toggle-more-filters-btn"
            onClick={() => setIsDetailedFiltersOpen(!isDetailedFiltersOpen)}
            aria-expanded={isDetailedFiltersOpen}
            aria-controls="detailed-filters-section"
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold rounded-xl border transition-all duration-200 ${
              isDetailedFiltersOpen || selectedTags.length > 0 || selectedAiTools.length > 0
                ? 'bg-black text-white border-black shadow-sm'
                : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>More Filters</span>
            {(selectedTags.length > 0 || selectedAiTools.length > 0) && (
              <span className="flex items-center justify-center w-5 h-5 text-[10px] font-black bg-emerald-500 text-white rounded-full">
                {selectedTags.length + selectedAiTools.length}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              id="reset-all-filters-btn"
              onClick={handleResetAll}
              className="px-4 py-3.5 text-sm font-semibold rounded-xl border border-zinc-200 text-zinc-700 hover:text-black hover:border-zinc-400 bg-white hover:bg-zinc-50 transition-all flex items-center gap-1.5"
              title="Clear all search and filter conditions"
              aria-label="Reset all search and filter conditions"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary Category Switcher - Visual Grid of Pills */}
      <div id="category-pills-bar" className="mt-5 pt-5 border-t border-zinc-100">
        <div className="flex flex-wrap gap-2 justify-start sm:justify-start">
          {allCategories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                id={`category-filter-btn-${category.toLowerCase().replace(/\s+/g, '-')}`}
                key={category}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={isActive}
                className={`relative px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-tight transition-all duration-300 border ${
                  isActive
                    ? 'bg-black text-white border-black shadow-sm shadow-black/5 z-10 font-bold'
                    : 'bg-zinc-50 text-zinc-600 border-zinc-200/60 hover:bg-zinc-100 hover:text-zinc-900 font-medium'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tags / Tools Quick Removers Strip */}
      {(selectedTags.length > 0 || selectedAiTools.length > 0 || (selectedCategory !== 'All' && selectedCategory)) && (
        <div id="active-filters-chips-row" className="mt-4 pt-3 border-t border-zinc-100 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mr-1">Active:</span>
          
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-semibold">
              Category: {selectedCategory}
              <button
                onClick={() => setSelectedCategory('All')}
                className="hover:text-red-600 ml-1 text-zinc-400"
                aria-label={`Remove ${selectedCategory} category filter`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedTags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-900 text-white text-xs font-mono font-semibold">
              #{tag}
              <button
                onClick={() => handleTagClick(tag)}
                className="hover:text-red-400 ml-1 text-zinc-300"
                aria-label={`Remove tag ${tag}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {selectedAiTools.map(tool => (
            <span key={tool} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600 text-white text-xs font-mono font-semibold">
              <Cpu className="w-3 h-3" /> {tool}
              <button
                onClick={() => handleAiToolClick(tool)}
                className="hover:text-zinc-200 ml-1 text-white"
                aria-label={`Remove AI tool filter ${tool}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            onClick={handleResetAll}
            className="text-[11px] font-mono font-bold text-zinc-500 hover:text-red-500 underline ml-2 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Collapsible Filter Expansion (Tags & AI Tools) */}
      <AnimatePresence>
        {isDetailedFiltersOpen && (
          <motion.div
            id="detailed-filters-section"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-zinc-100">
              
              {/* Left Column: Interactive Tags Space */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-800 uppercase tracking-widest font-mono flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Filter by Tags
                  </span>
                  {selectedTags.length > 0 && (
                    <button 
                      id="clear-tags-btn"
                      onClick={handleClearTags} 
                      className="text-[10px] text-zinc-500 hover:text-red-500 font-bold transition-colors"
                    >
                      Clear Tags ({selectedTags.length})
                    </button>
                  )}
                </div>

                <div className="relative">
                  <Search className="absolute inset-y-0 left-2.5 my-auto w-4 h-4 text-zinc-400 pointer-events-none" />
                  <input
                    id="tag-search-input"
                    type="text"
                    value={tagSearchTerm}
                    onChange={(e) => setTagSearchTerm(e.target.value)}
                    placeholder="Search tags..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-950 placeholder-zinc-400 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  />
                </div>

                <div className="max-h-40 overflow-y-auto tags-scrollbar pr-1 flex flex-wrap gap-1.5">
                  {filteredTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        id={`filter-tag-chip-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        aria-pressed={isSelected}
                        className={`text-[10px] font-bold uppercase tracking-tight py-1 px-2.5 rounded-md border transition-all ${
                          isSelected
                            ? 'bg-black text-white border-black'
                            : 'bg-zinc-50 text-zinc-600 border-zinc-200/60 hover:bg-zinc-100 hover:border-zinc-300'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                  {filteredTags.length === 0 && (
                    <p className="text-xs text-zinc-400 italic font-medium">No tags matching search...</p>
                  )}
                </div>
              </div>

              {/* Right Column: AI Tools Space */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-800 uppercase tracking-widest font-mono flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> Filter by AI Assistant / Tool
                  </span>
                  {selectedAiTools.length > 0 && (
                    <button 
                      id="clear-ai-tools-btn"
                      onClick={handleClearAiTools} 
                      className="text-[10px] text-zinc-500 hover:text-red-500 font-bold transition-colors"
                    >
                      Clear Tools
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
                  {allAiTools.map((tool) => {
                    const isSelected = selectedAiTools.includes(tool);
                    return (
                      <button
                        id={`filter-ai-tool-chip-${tool.toLowerCase().replace(/\s+/g, '-')}`}
                        key={tool}
                        onClick={() => handleAiToolClick(tool)}
                        aria-pressed={isSelected}
                        className={`text-[10px] font-bold uppercase tracking-tight py-1.5 px-3 rounded-md border transition-all flex items-center gap-1 ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-zinc-50 text-zinc-700 border-zinc-200/60 hover:bg-zinc-100 hover:border-zinc-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        {tool}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sorting panel */}
      <div id="sorting-footer-bar" className="mt-5 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Dynamic Items Counter */}
        <div id="compositions-counter-display" className="text-xs text-zinc-500 font-mono text-center sm:text-left">
          Showing <span className="font-bold text-zinc-950 font-sans text-sm">{totalCompositionsCount}</span> of <span className="font-semibold text-zinc-700 font-sans">{totalCompositionsCount}</span> visual compositions
        </div>

        {/* Interactive Sorting Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-mono uppercase tracking-widest">Sort:</span>
            <div className="inline-flex rounded-lg border border-zinc-200 p-0.5 bg-zinc-50">
              <button
                id="sort-by-date-btn"
                onClick={() => setSortBy('id')}
                aria-pressed={sortBy === 'id' || sortBy === null}
                className={`px-3 py-1 text-xs font-bold rounded-md uppercase tracking-tighter transition-all ${
                  sortBy === 'id' || sortBy === null
                    ? 'bg-white text-zinc-950 shadow-sm font-semibold'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Date
              </button>
              <button
                id="sort-by-title-btn"
                onClick={() => setSortBy('title')}
                aria-pressed={sortBy === 'title'}
                className={`px-3 py-1 text-xs font-bold rounded-md uppercase tracking-tighter transition-all ${
                  sortBy === 'title'
                    ? 'bg-white text-zinc-950 shadow-sm font-semibold'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Title
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id="sort-order-toggle-btn"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all font-mono uppercase text-[10px] tracking-wider flex items-center gap-1"
              aria-label={`Toggle sort order, current is ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
            >
              <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
              <span className="text-zinc-400">⇅</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
