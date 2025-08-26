import React from 'react';
import { Project } from '../types';

interface LinkCardProps {
  project: Project;
  index: number;
  totalCount: number;
  onMove: (id: number, direction: 'up' | 'down') => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ project, index, totalCount, onMove }) => {
  const { id, title, description, imageUrl, url, tags } = project;

  const handleButtonClick = (e: React.MouseEvent, direction: 'up' | 'down') => {
    e.preventDefault();
    e.stopPropagation();
    onMove(id, direction);
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 ease-in-out hover:border-cyan-500/50 hover:scale-[1.02] transform overflow-hidden"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-100 group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
        <p className="text-sm text-gray-400 mt-2 flex-grow">{description}</p>
        <div className="mt-4 flex justify-between items-end gap-2">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="text-xs font-medium text-gray-300 bg-gray-700/80 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          
            <div className="flex flex-shrink-0 space-x-2">
                <button
                    onClick={(e) => handleButtonClick(e, 'up')}
                    disabled={index === 0}
                    aria-label={`Move ${title} up`}
                    title="Move up"
                    className="p-1.5 bg-gray-700/80 rounded-full text-gray-300 hover:bg-cyan-500/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
                <button
                    onClick={(e) => handleButtonClick(e, 'down')}
                    disabled={index === totalCount - 1}
                    aria-label={`Move ${title} down`}
                    title="Move down"
                    className="p-1.5 bg-gray-700/80 rounded-full text-gray-300 hover:bg-cyan-500/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </div>
      </div>
    </a>
  );
};

export default LinkCard;
