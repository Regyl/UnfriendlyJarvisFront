import {Card, Stack, TextField, Typography} from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import {useMemo, useState} from 'react';
import {KnowledgeNode} from '../../types';
import {SectionHeader} from '../widgets/SectionHeader';
import LanIcon from '@mui/icons-material/Lan';

interface KnowledgeDbViewerProps {
  root: KnowledgeNode;
}

const renderNode = (node: KnowledgeNode) => (
  <TreeItem
    key={node.id}
    nodeId={node.id}
    label={
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="subtitle2">{node.label}</Typography>
        <Typography variant="caption" color="text.secondary">
          {Math.round(node.heat * 100)}°
        </Typography>
      </Stack>
    }
  >
    {node.children?.map((child) => renderNode(child))}
  </TreeItem>
);

export const KnowledgeDbViewer = ({ root }: KnowledgeDbViewerProps) => {
  const [query, setQuery] = useState('');
  const filteredTree = useMemo(() => {
    if (!query) return root;

    const filterNode = (node: KnowledgeNode): KnowledgeNode | null => {
      const matches = node.label.toLowerCase().includes(query.toLowerCase());
      const filteredChildren = node.children?.map(filterNode).filter(Boolean) as KnowledgeNode[] | undefined;
      if (matches || (filteredChildren && filteredChildren.length)) {
        return {
          ...node,
          children: filteredChildren
        };
      }
      return null;
    };

    return filterNode(root) ?? { ...root, children: [] };
  }, [root, query]);

  return (
    <Stack spacing={3}>
      <SectionHeader title="Knowledge Graph" subtitle="живой репозиторий знаний" icon={<LanIcon color="secondary" />} />
      <TextField
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Поиск по KnowledgeDB"
        variant="outlined"
        fullWidth
      />
      <Card sx={{ p: 2 }}>
        <TreeView
          defaultExpandIcon={<Typography color="text.secondary">+</Typography>}
          defaultCollapseIcon={<Typography color="text.secondary">−</Typography>}
          defaultExpanded={['root', 'research', 'signals', 'delivery']}
        >
          {renderNode(filteredTree)}
        </TreeView>
      </Card>
    </Stack>
  );
};

