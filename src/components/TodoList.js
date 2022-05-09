import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { db } from "../TodoFirebase";
// import ThemeApp from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    db.collection("react-todo").add(todo);
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    // if (!newValue.text || /^\s*$/.test(newValue.text)) {
    //   return;
    // }
    db.collection('react-todo').doc(todoId).update({text: newValue.text});
    // setTodos((prev) =>
    //   prev.map((item) => (item.id === todoId ? newValue : item))
    // );
  };

  const removeTodo = (id) => {
    //   console.log(id);
      db.collection('react-todo').doc(id).delete();
    // const removeArr = [...todos].filter((todo) => todo.id !== id);

    // setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const unsubscribe = db.collection("react-todo").onSnapshot((snapshot) => {
      const myDocs = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTodos(myDocs);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1> What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      {/* <ThemeApp /> */}
    </div>
  );
}

export default TodoList;
