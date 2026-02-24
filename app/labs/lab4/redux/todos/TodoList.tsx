import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ListGroup } from "react-bootstrap";
export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem
            todo={todo}
            deleteTodo={function (id: string): void {
              throw new Error("Function not implemented.");
            }}
            setTodo={function (todo: { id: string; title: string }): void {
              throw new Error("Function not implemented.");
            }}
          />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
