export interface KnowledgeNode {
  id: string;
  label: string;
  category: 'research' | 'project' | 'idea' | 'bookmark';
  heat: number;
  children?: KnowledgeNode[];
}

export interface KnowledgeRelation {
  from: string;
  to: string;
  strength: number;
}

