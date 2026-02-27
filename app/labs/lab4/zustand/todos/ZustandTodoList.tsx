"use client";

import { Button, FormControl, ListGroup } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoList() {

  const {
    todos,
    todo,
    setTodo,
    addTodo,
    updateTodo,
    deleteTodo,
    editTodo,
  } = useTodoStore((state) => state);


  return (

    <div className="m-2">

      <h1>Zustand Todo List</h1>

      <ListGroup>

        <ListGroup.Item>

          <Button
            onClick={addTodo}
            id="wd-add-todo-click"
            className="me-2"
          >
            Add
          </Button>


          <Button
            onClick={updateTodo}
            id="wd-update-todo-click"
            className="me-2"
          >
            Update
          </Button>


          <FormControl
            value={todo.title}
            onChange={(e) =>
              setTodo({
                ...todo,
                title: e.target.value,
              })
            }
          />

        </ListGroup.Item>



        {todos.map((t) => (

          <ListGroup.Item key={t.id}>

            <Button
              onClick={() => deleteTodo(t.id)}
              id="wd-delete-todo-click"
              className="me-2"
            >
              Delete
            </Button>


            <Button
              onClick={() => editTodo(t)}
              id="wd-set-todo-click"
              className="me-2"
            >
              Edit
            </Button>


            {t.title}

          </ListGroup.Item>

        ))}


      </ListGroup>

      <hr />

    </div>

  );
}