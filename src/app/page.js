"use client"
import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';


export default function Home() {
  const [todos, setTodos] = useState(JSON.parse(localStorage?.getItem('todos')) || []);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);
  const [filter, setFilter] = useState('all');
  

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input === '') return;
    if (isEditing) {
      const newTodos = [...todos];
      newTodos[currentTodoIndex] = { text: input, done: todos[currentTodoIndex].done };
      setTodos(newTodos);
      setIsEditing(false);
      setCurrentTodoIndex(null);
    } else {
      setTodos([...todos, { text: input, done: false }]);
    }
    setInput('');
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTodo = (index) => {
    setInput(todos[index].text);
    setIsEditing(true);
    setCurrentTodoIndex(index);
  };

  const toggleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'done') return todo.done;
    if (filter === 'notDone') return !todo.done;
    return true;
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 ">
      <h1 className="text-4xl font-bold mb-8">Todo App</h1>
      <div className="flex flex-col w-full max-w-md  p-6 rounded-lg shadow-md">
        <div className="mb-3 grid grid-cols-2 gap-2" >
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded text-black "
          >
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="notDone">Not Done</option>
          </select>
        </div>
        <div
          className="flex justify-between items-center"
        >
          <input
            type="text"
            placeholder="Add Todo"
            className="p-2 border-2 border-gray-300 rounded text-black w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" onClick={addTodo}>{isEditing ? 'Update' : 'Add'}</button>
        </div>

        {filteredTodos.map((todo, index) => (
          <div className="flex justify-between items-center p-2 border-b-2 border-gray-300 mt-4" key={index}>
            <div className="flex items-center" >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleDone(index)}
              />
              <p className="ml-3" style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</p>
            </div>
            <div>
              <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ml-2" onClick={() => editTodo(index)}><FaEdit /></button>
              <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors ml-2" onClick={() => deleteTodo(index)}><FaTimes /></button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}