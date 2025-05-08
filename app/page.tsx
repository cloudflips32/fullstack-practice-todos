"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomCheckbox } from "@/components/ui/custom-checkbox"
import { Trash2, Plus } from "lucide-react"

// Todo interface
interface Todo {
  id: number
  title: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  // Simulate fetching todos from API
  useEffect(() => {
    // In a real app, this would be a fetch call to your Spring Boot API
    const initialTodos = [
      { id: 1, title: "Learn Spring Boot", completed: false },
      { id: 2, title: "Build REST API", completed: false },
      { id: 3, title: "Connect with React frontend", completed: false },
    ]
    setTodos(initialTodos)
  }, [])

  const addTodo = () => {
    if (newTodo.trim() === "") return

    const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1
    setTodos([...todos, { id: newId, title: newTodo, completed: false }])
    setNewTodo("")
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  return (
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Todo List</h1>

        <div className="flex mb-4">
          <Input
              type="text"
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              className="flex-1 mr-2"
          />
          <Button onClick={addTodo}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">
            All
          </Button>
          <Button variant={filter === "active" ? "default" : "outline"} onClick={() => setFilter("active")} size="sm">
            Active
          </Button>
          <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              size="sm"
          >
            Completed
          </Button>
        </div>

        <div className="space-y-2">
          {filteredTodos.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No todos found</p>
          ) : (
              filteredTodos.map((todo) => (
                  <div key={todo.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <CustomCheckbox
                          id={`todo-${todo.id}`}
                          checked={todo.completed}
                          onCheckedChange={() => toggleTodo(todo.id)}
                      />
                      <label
                          htmlFor={`todo-${todo.id}`}
                          className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {todo.title}
                      </label>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)} aria-label="Delete todo">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
              ))
          )}
        </div>
      </div>
  )
}
