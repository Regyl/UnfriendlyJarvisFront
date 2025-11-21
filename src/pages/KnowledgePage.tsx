import {Stack} from '@mui/material';
import {useSelector} from 'react-redux';
import {PageContainer} from '../components/layout/PageContainer';
import {KnowledgeDbViewer} from '../components/knowledge/KnowledgeDbViewer';
import {selectKnowledgeTree} from '../store/selectors/profileSelectors';

export const KnowledgePage = () => {
  const tree = useSelector(selectKnowledgeTree);

  return (
    <PageContainer>
      <Stack spacing={4}>
        <KnowledgeDbViewer root={tree} />
      </Stack>
    </PageContainer>
  );
};

