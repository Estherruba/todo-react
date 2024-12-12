import React, { useReducer, useState } from "react";

const initialState = [];

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), task: action.payload, completed: false }];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [task, setTask] = useState("");

  const addTodo = () => {
    if (task.trim()) {
      dispatch({ type: "ADD_TODO", payload: task });
      setTask("");
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.task}
            <button onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}>
              Edit
            </button>
            <button onClick={() => dispatch({ type: "DELETE_TODO", payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;