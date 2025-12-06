import {Stack} from '@mui/material';
import {PageContainer} from '../components/layout/PageContainer';
import {TodoForm} from '../components/todos/TodoForm';
import {TodoList} from '../components/todos/TodoList';

export const TodosPage = () => {
    return (
        <PageContainer>
            <Stack spacing={4}>
                <TodoForm/>
                <TodoList/>
            </Stack>
        </PageContainer>
    );
};

