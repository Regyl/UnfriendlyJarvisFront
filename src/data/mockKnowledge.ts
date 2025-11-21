import {KnowledgeNode} from '../types';

export const knowledgeTree: KnowledgeNode = {
  id: 'root',
  label: 'KnowledgeDB',
  category: 'project',
  heat: 0.92,
  children: [
    {
      id: 'research',
      label: 'Research Streams',
      category: 'research',
      heat: 0.8,
      children: [
        {
          id: 'rs-creative-ai',
          label: 'Creative AI',
          category: 'idea',
          heat: 0.86
        },
        {
          id: 'rs-immersive-media',
          label: 'Immersive Media',
          category: 'idea',
          heat: 0.74
        }
      ]
    },
    {
      id: 'signals',
      label: 'Signals & Benchmarks',
      category: 'research',
      heat: 0.68,
      children: [
        {
          id: 'sig-feed',
          label: 'Contextual Feed AI',
          category: 'bookmark',
          heat: 0.63
        },
        {
          id: 'sig-identity',
          label: 'Identity Graphs',
          category: 'bookmark',
          heat: 0.71
        }
      ]
    },
    {
      id: 'delivery',
      label: 'Delivery',
      category: 'project',
      heat: 0.77,
      children: [
        {
          id: 'del-mono',
          label: 'Monorepo setup',
          category: 'project',
          heat: 0.59
        },
        {
          id: 'del-ux',
          label: 'UX System',
          category: 'project',
          heat: 0.82
        }
      ]
    }
  ]
};

