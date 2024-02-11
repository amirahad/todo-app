import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, toggleDone, editTodo, deleteTodo }) {
    return (
        <div>
            {todos
                // Create a copy of the todos array
                .slice(0)
                // Reverse the array to show the most recently added todos first
                .reverse()
                // Map over the reversed todos array
                .map((todo, index) => {
                    // Calculate the original index in the todos array for each todo in the reversed array
                    const originalIndex = todos.length - 1 - index;
                    return (
                        <TodoItem
                            key={originalIndex}
                            index={originalIndex}
                            todo={todo}
                            toggleDone={toggleDone}
                            editTodo={editTodo}
                            deleteTodo={deleteTodo}
                        />
                    );
                })}
        </div>
    );
}