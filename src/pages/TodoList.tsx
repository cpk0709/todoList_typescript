import Todo from "../component/Todo";
// import { useDispatch } from "react-redux";
// import todoSlice from "../redux/modules/todo";
import React, { useState } from "react";
// 미들웨어 import
import { fetchGetTodoList } from "../redux/modules/todo";
import { fetchAddTodoList } from "../redux/modules/todo";
// configureStore.ts 에서 만든 타입지정된 dispatch 를 import
import { useAppDispatch } from "../redux/configureStore";

const TodoList = () => {
  // const dispatch = useDispatch();

  const [todo, setTodo] = useState("");
  // api통신으로 서버에서 todo리스트 불러오기
  const appDispatch = useAppDispatch();
  appDispatch(fetchGetTodoList());

  // 수정내용 setTodo로 todo에 담아줌
  const getAddTotoFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  // api로 서버에서 todo리스트 불러오니까 필요없어짐.
  // const handleAddTodo = () => {
  //   dispatch(todoSlice.actions.addTodo(todo));
  // };

  // 서버에 todo 추가하기위해 미들웨어 fetchAddTodoList 를 dispatch 함.
  const handleAddTodoFetch = () => {
    // 여기서 todo의 id를 생성하고있음. 그닥 좋아보이지는 않은듯...
    appDispatch(fetchAddTodoList({ id: Math.random(), title: todo }));
  };

  return (
    <div>
      <hr />
      <Todo />
      <hr />
      <input type="text" placeholder="Todo 입력" onChange={getAddTotoFrom} />
      <button
        className="text-orange-400 border-2 border-orange-500"
        onClick={handleAddTodoFetch}
      >
        Todo추가
      </button>
    </div>
  );
};

export default TodoList;
