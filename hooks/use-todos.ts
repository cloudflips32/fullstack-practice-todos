import { useState, useEffect } from 'react';
import { Todo, TodoInput, fetchTodos, createTodo, updateTodo, deleteTodo } from '@/lib/api';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load todos on initial render
    useEffect(() => {
        const loadTodos = async () => {
            try {
                setLoading(true);
                const data = await fetchTodos();
                setTodos(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching todos:', err);
                setError('Failed to load todos. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        loadTodos();
    }, []);

    // Add a new todo
    const addTodo = async (title: string) => {
        try {
            const newTodo = await createTodo({ title, completed: false });
            setTodos([...todos, newTodo]);
            return newTodo;
        } catch (err) {
            console.error('Error adding todo:', err);
            setError('Failed to add todo. Please try again.');
            throw err;
        }
    };

    // Toggle todo completion status
    const toggleTodo = async (id: number) => {
        try {
            const todoToUpdate = todos.find(todo => todo.id === id);
            if (!todoToUpdate) return;

            const updatedTodo = await updateTodo(id, {
                title: todoToUpdate.title,
                completed: !todoToUpdate.completed
            });

            setTodos(todos.map(todo =>
                todo.id === id ? updatedTodo : todo
            ));
        } catch (err) {
            console.error('Error updating todo:', err);
            setError('Failed to update todo. Please try again.');
            throw err;
        }
    };

    // Remove a todo
    const removeTodo = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            console.error('Error deleting todo:', err);
            setError('Failed to delete todo. Please try again.');
            throw err;
        }
    };

    return {
        todos,
        loading,
        error,
        addTodo,
        toggleTodo,
        removeTodo
    };
}