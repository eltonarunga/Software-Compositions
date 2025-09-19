import React from 'react';
import { Project } from '../types';

interface LinkCardProps {
  project: Project;
}

const LinkCard: React.FC<LinkCardProps> = ({ project }) => {
  const { title, description, imageUrl, url, tags } = project;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/30 hover:border-cyan-500/50 overflow-hidden"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-100 group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
        <p className="text-sm text-gray-400 mt-2 flex-grow">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs font-medium text-gray-300 bg-gray-700/80 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default LinkCard;