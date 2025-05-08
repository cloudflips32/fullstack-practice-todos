// API base URL - would come from environment variables in production
const API_BASE_URL = 'http://localhost:8080/api/todos';

// Types
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export interface TodoInput {
    title: string;
    completed?: boolean;
}

// API functions
export async function fetchTodos(): Promise<Todo[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

export async function fetchTodosByStatus(completed: boolean): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/status?completed=${completed}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

export async function createTodo(todo: TodoInput): Promise<Todo> {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

export async function updateTodo(id: number, todo: TodoInput): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

export async function deleteTodo(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}