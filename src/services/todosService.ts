import axios from 'axios';
import {CreateTodoRequest, Todo, UpdateTodoRequest} from '../types/todos';

const API_BASE_URL = 'http://localhost:8090/jarvis';

// Fetch all todos
export const fetchTodos = async (accessToken?: string | null): Promise<Todo[]> => {
    const response = await axios.get<Todo[]>(`${API_BASE_URL}/todo-tasks`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    return response.data;
};

// Create a new task
export const createTodo = async (
    todo: CreateTodoRequest,
    accessToken?: string | null
): Promise<Todo> => {
    const response = await axios.post<Todo>(
        `${API_BASE_URL}/todo-tasks`,
        todo,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    );

    return response.data;
};

// Update an existing todo
export const updateTodo = async (
    id: string,
    updates: UpdateTodoRequest,
    accessToken?: string | null
): Promise<Todo> => {
    const response = await axios.patch<Todo>(
        `${API_BASE_URL}/todo-tasks/${id}`,
        updates,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    );

    return response.data;
};

// Delete a todo
export const deleteTodo = async (
    id: string,
    accessToken?: string | null
): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/todo-tasks/${id}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
};

