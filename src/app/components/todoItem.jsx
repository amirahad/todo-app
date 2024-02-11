import React from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';

export default function TodoItem({ todo, index, toggleDone, editTodo, deleteTodo }) {
    return (
        <div className="flex justify-between items-center p-2 border-b-2 border-gray-300 mt-2">
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
    );
}