import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { Todo } from "@/lib/api";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
        <div className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center space-x-3">
                <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={() => onToggle(todo.id)}
                />
                <label
                htmlFor={`todo-${todo.id}`}
                className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}
                >
                {todo.title}
                </label>
            </div>
            <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(todo.id)}
            aria-label="Delete todo"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}