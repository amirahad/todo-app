import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, toggleDone, editTodo, deleteTodo }) {
    return (
        <div>
            {todos
                .slice(0)
                .reverse()
                .map((todo, index) => {
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