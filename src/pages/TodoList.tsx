import Todo from "../component/Todo";
import { useDispatch } from "react-redux";
import todoSlice from "../redux/modules/todo";
import React, { useState } from "react";

const TodoList = () => {
  const dispatch = useDispatch();

  const [todo, setTodo] = useState("");

  const getAddTotoFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleAddTodo = () => {
    dispatch(todoSlice.actions.addTodo(todo));
  };
  return (
    <div>
      <hr />
      <Todo />
      <hr />
      <input type="text" placeholder="Todo 입력" onChange={getAddTotoFrom} />
      <button
        className="text-orange-400 border-2 border-orange-500"
        onClick={handleAddTodo}
      >
        Todo추가
      </button>
    </div>
  );
};

export default TodoList;
