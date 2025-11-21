import {knowledgeTree} from '../data/mockKnowledge';
import {KnowledgeNode} from '../types';

export const KnowledgeDbService = {
  async getTree(): Promise<KnowledgeNode> {
    return Promise.resolve(knowledgeTree);
  },
  async search(term: string): Promise<KnowledgeNode[]> {
    const hits: KnowledgeNode[] = [];

    const walk = (node: KnowledgeNode) => {
      if (node.label.toLowerCase().includes(term.toLowerCase())) {
        hits.push(node);
      }
      node.children?.forEach(walk);
    };
    walk(knowledgeTree);
    return Promise.resolve(hits);
  }
};

