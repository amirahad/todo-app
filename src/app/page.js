"use client"
import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import TodoList from './components/todoList';


export default function Home() {
  const [todos, setTodos] = useState(JSON.parse(localStorage?.getItem('todos')) || []);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [priorityInput, setPriorityInput] = useState('low'); // new state for priority input



  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input === '') return;
    if (isEditing) {
      const newTodos = [...todos];
      newTodos[currentTodoIndex] = { text: input, done: todos[currentTodoIndex].done, priority: priorityInput };
      setTodos(newTodos);
      setIsEditing(false);
      setCurrentTodoIndex(null);
    } else {
      setTodos([...todos, { text: input, done: false, priority: priorityInput }]);
    }
    setInput('');
    setPriorityInput('low'); // reset priority input
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTodo = (index) => {
    const selectedTodo = todos[index];
    setInput(selectedTodo.text);
    setPriorityInput(selectedTodo.priority);
    setIsEditing(true);
    setCurrentTodoIndex(index);
  };

  const toggleDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'done' && priorityFilter !== 'all') return todo.done && todo.priority === priorityFilter;
    if (filter === 'notDone' && priorityFilter !== 'all') return !todo.done && todo.priority === priorityFilter;
    if (filter === 'done') return todo.done;
    if (filter === 'notDone') return !todo.done;
    if (priorityFilter !== 'all') return todo.priority === priorityFilter;
    return true;
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-16">
      <div className="flex flex-col w-full max-w-lg sm:max-w-sm md:max-w-lg p-4 sm:p-6 rounded-lg shadow-md bg-white bg-opacity-25 backdrop-blur-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Todo App</h1>
        <div className="flex flex-col md:flex-row justify-between items-center my-5">
          <input
            type="text"
            placeholder="Add Todo"
            className="p-2 border-2 border-gray-300 rounded  w-full md:w-auto sm:flex-grow mb-2 "
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            value={priorityInput}
            onChange={(e) => setPriorityInput(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded w-full md:w-auto md:flex-grow mb-2 mx-0 md:mx-1"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors w-full md:w-auto mb-2" onClick={addTodo}>{isEditing ? 'Update' : 'Add'}</button>
        </div>
        <div className="my-2 sm:mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex flex-col" >
            <label>Filter by Status:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border-2 border-gray-300 rounded "
            >
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="notDone">Not Done</option>
            </select>
          </div>
          <div className="flex flex-col" >
            <label>Filter by Priority:</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="p-2 border-2 border-gray-300 rounded "
            >
              <option value="all">All Priorities</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>


        <TodoList
          todos={filteredTodos}
          toggleDone={toggleDone}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </main>
  );
}