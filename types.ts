
export type SortBy = 'id' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  tags: string[];
  category: string;
  createdAt: string;
  aiTools?: string[];
}

export interface FilterState {
  searchTerm: string;
  selectedCategory: string;
  selectedTags: string[];
  selectedAiTools: string[];
  sortBy: SortBy | null;
  sortOrder: SortOrder;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
}
