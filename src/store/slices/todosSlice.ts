import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CreateTodoRequest, Todo, UpdateTodoRequest} from '../../types/todos';
import {createTodo, deleteTodo, fetchTodos, updateTodo} from '../../services/todosService';

interface TodosState {
    todos: Todo[];
    loading: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
    error: string | null;
}

const initialState: TodosState = {
    todos: [],
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    error: null
};

// Async thunk for fetching todos
export const fetchTodosAsync = createAsyncThunk(
    'todos/fetchTodos',
    async (_, {rejectWithValue, getState}) => {
        try {
            const state = getState() as { auth: { accessToken: string | null } };
            const accessToken = state.auth.accessToken;
            return await fetchTodos(accessToken);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Ошибка при загрузке задач');
        }
    }
);

// Async thunk for creating todo
export const createTodoAsync = createAsyncThunk(
    'todos/createTodo',
    async (todoData: CreateTodoRequest, {rejectWithValue, getState}) => {
        try {
            const state = getState() as { auth: { accessToken: string | null } };
            const accessToken = state.auth.accessToken;
            return await createTodo(todoData, accessToken);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Ошибка при создании задачи');
        }
    }
);

// Async thunk for updating todo
export const updateTodoAsync = createAsyncThunk(
    'todos/updateTodo',
    async ({id, updates}: { id: string; updates: UpdateTodoRequest }, {rejectWithValue, getState}) => {
        try {
            const state = getState() as { auth: { accessToken: string | null } };
            const accessToken = state.auth.accessToken;
            return await updateTodo(id, updates, accessToken);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Ошибка при обновлении задачи');
        }
    }
);

// Async thunk for deleting todo
export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodo',
    async (id: string, {rejectWithValue, getState}) => {
        try {
            const state = getState() as { auth: { accessToken: string | null } };
            const accessToken = state.auth.accessToken;
            await deleteTodo(id, accessToken);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Ошибка при удалении задачи');
        }
    }
);

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Fetch todos
        builder
            .addCase(fetchTodosAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodosAsync.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodosAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Create todo
        builder
            .addCase(createTodoAsync.pending, (state) => {
                state.creating = true;
                state.error = null;
            })
            .addCase(createTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.creating = false;
                state.todos = [action.payload, ...state.todos];
            })
            .addCase(createTodoAsync.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload as string;
            });

        // Update todo
        builder
            .addCase(updateTodoAsync.pending, (state) => {
                state.updating = true;
                state.error = null;
            })
            .addCase(updateTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.updating = false;
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(updateTodoAsync.rejected, (state, action) => {
                state.updating = false;
                state.error = action.payload as string;
            });

        // Delete todo
        builder
            .addCase(deleteTodoAsync.pending, (state) => {
                state.deleting = true;
                state.error = null;
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action: PayloadAction<string>) => {
                state.deleting = false;
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            })
            .addCase(deleteTodoAsync.rejected, (state, action) => {
                state.deleting = false;
                state.error = action.payload as string;
            });
    }
});

export const {clearError, setError} = todosSlice.actions;
export const todosReducer = todosSlice.reducer;

