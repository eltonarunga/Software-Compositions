import React from 'react';
import { Project } from '../types';

interface LinkCardProps {
  project: Project;
}

const isNewProject = (createdAtDate: string): boolean => {
  const [year, month, day] = createdAtDate.split('-').map(Number);
  const projectDate = new Date(year, month - 1, day);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setHours(0, 0, 0, 0);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  return projectDate >= sevenDaysAgo;
};

const LinkCard: React.FC<LinkCardProps> = ({ project }) => {
  const { title, description, imageUrl, url, tags, createdAt } = project;
  const isNew = createdAt && isNewProject(createdAt);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col h-full bg-white border-2 border-gray-100 rounded-xl shadow-sm transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:border-black overflow-hidden"
    >
      {isNew && (
        <span className="absolute top-4 right-4 z-10 bg-black text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md tracking-tighter">
          NEW
        </span>
      )}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 border-b border-gray-100">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-black leading-tight group-hover:underline decoration-2 underline-offset-4 transition-all duration-300">{title}</h3>
        <p className="text-sm text-gray-600 mt-3 flex-grow leading-relaxed font-medium">{description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold text-black bg-gray-100 px-3 py-1 rounded-full uppercase tracking-tight border border-gray-200">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default LinkCard;