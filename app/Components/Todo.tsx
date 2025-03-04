'use client'

import  { useState, useEffect } from "react";
import { FaGithub } from 'react-icons/fa'


export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [todoName, setTodoName] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Adding a new todo
  const addTodo = () => {
    if (!todoName.trim()) return;
    const newTodo: TodoItem = {
      id: Math.random(),
      title: todoName,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodoName("");
  };

  // Toggle completion status
  const checkTodo = (id: number) => {
    const newTodos = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(newTodos);
  };

  // Delete a todo
  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  //  editing todo
  const startEditing = (id: number, title: string) => {
    setEditingId(id);
    setEditText(title);
  };

  // Save  todo
  const saveEdit = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editText } : todo
    );
    setTodos(updatedTodos);
    setEditingId(null);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-5">Todo List</h1>
      <a  href='https://github.com/Faith-600'
      target='_blank'
      rel='noopener noreferrer'>
        <FaGithub className="m-auto mb-5"/>
    </a>
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="Enter a task..."
          className="border p-2 flex-1 rounded-md"
          onChange={(e) => setTodoName(e.target.value)}
          value={todoName}
        />
        <button
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between border p-3 rounded-md"
          >
            {editingId === todo.id ? (
              <input
                type="text"
                className="border p-2 rounded-md"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <div className={`flex-1 ${todo.completed ? "line-through" : ""}`}>
                {todo.title}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => checkTodo(todo.id)}
                className="mr-2"
              />
              {editingId === todo.id ? (
                <button
                  onClick={() => saveEdit(todo.id)}
               
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditing(todo.id, todo.title)}
               
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteTodo(todo.id)}
                
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
