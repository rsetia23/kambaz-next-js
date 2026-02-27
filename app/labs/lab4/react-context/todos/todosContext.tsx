"use client";

import React, { createContext, useContext, useState } from "react";

export type Todo = {
  id: string;
  title: string;
};

type TodosContextType = {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: () => void;
  updateTodo: () => void;
  deleteTodo: (id: string) => void;
  editTodo: (todo: Todo) => void;
};

const TodosContext = createContext<TodosContextType | null>(null);

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) {
    throw new Error("useTodos must be used inside a TodosProvider");
  }
  return ctx;
}

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);

  const [todo, setTodo] = useState<Todo>({
    id: "-1",
    title: "Learn Mongo",
  });

  const addTodo = () => {
    setTodos([...todos, { ...todo, id: new Date().getTime().toString() }]);
    setTodo({ id: "-1", title: "" });
  };

  const updateTodo = () => {
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    setTodo({ id: "-1", title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const editTodo = (t: Todo) => {
    setTodo(t);
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        todo,
        setTodo,
        addTodo,
        updateTodo,
        deleteTodo,
        editTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}
