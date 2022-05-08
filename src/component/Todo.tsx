import { useSelector } from "react-redux";
import { RootState } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import todoSlice from "../redux/modules/todo";
import React, { useState } from "react";

const Todo = () => {
  const dispatch = useDispatch();
  const [editTitle, setEditTitle] = useState("");
  // 수정 input 태그에 작성한 value를 useState에 넣어줌
  const getEditTodoFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };
  // 리덕스의 todo 불러오기
  const todoList = useSelector((store: RootState) => store.todo.list);
  // todo삭제
  const handleDeleteTodo = (todoId: number) => {
    dispatch(todoSlice.actions.deleteTodo(todoId));
  };
  // todo수정
  const handleEditTodo = (todoId: number) => {
    dispatch(todoSlice.actions.editTodo({ todoId, title: editTitle }));
  };

  return (
    <div>
      {todoList.map((td) => {
        return (
          <div key={td.id} className="flex justify-between pl-2 pr-2 mb-1">
            <h1 className="text-xs">{td.title}</h1>
            <div className="edit_box flex">
              <div className="mr-1">
                <input
                  type="text"
                  className="border-2 w-40"
                  onChange={getEditTodoFrom}
                />
                <button
                  className="text-orange-400 border-2 border-orange-500 text-xs"
                  onClick={() => {
                    handleEditTodo(td.id);
                  }}
                >
                  EDIT
                </button>
              </div>

              <button
                className="text-orange-400 border-2 border-orange-500 text-xs"
                onClick={() => {
                  handleDeleteTodo(td.id);
                }}
              >
                DELETE
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Todo;
