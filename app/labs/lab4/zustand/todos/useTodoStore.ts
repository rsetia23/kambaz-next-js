import { create } from "zustand";

export interface Todo {
  id: string;
  title: string;
}

interface TodoState {
  todos: Todo[];
  todo: Todo;

  setTodo: (todo: Todo) => void;

  addTodo: () => void;
  updateTodo: () => void;
  deleteTodo: (id: string) => void;
  editTodo: (todo: Todo) => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({

  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],

  todo: {
    id: "-1",
    title: "Learn Mongo",
  },

  setTodo: (todo) => set({ todo }),

  addTodo: () => {
    const { todos, todo } = get();

    set({
      todos: [
        ...todos,
        {
          ...todo,
          id: new Date().getTime().toString(),
        },
      ],
      todo: { id: "-1", title: "" },
    });
  },

  updateTodo: () => {
    const { todos, todo } = get();

    set({
      todos: todos.map((t) =>
        t.id === todo.id ? todo : t
      ),
      todo: { id: "-1", title: "" },
    });
  },

  deleteTodo: (id) => {
    const { todos } = get();

    set({
      todos: todos.filter((t) => t.id !== id),
    });
  },

  editTodo: (todo) => set({ todo }),

}));