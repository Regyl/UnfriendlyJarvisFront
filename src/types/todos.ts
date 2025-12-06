export enum TodoPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL'
}

export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: TodoPriority;
}

export interface CreateTodoRequest {
    title: string;
    description: string;
    priority: TodoPriority;
}

export interface UpdateTodoRequest {
    title?: string;
    description?: string;
    completed?: boolean;
    priority?: TodoPriority;
}

