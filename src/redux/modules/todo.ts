import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoItemDataParams {
  id: number;
  title: string;
}

export interface TodoState {
  list: Array<TodoItemDataParams>;
}

// 수정 파라미터 타입
interface TodoEdit {
  todoId: number;
  title: string;
}

const initialState: TodoState = {
  list: [
    {
      id: Math.random(),
      title: "운동하기",
    },
    {
      id: Math.random(),
      title: "리액트 마스터하기",
    },
    {
      id: Math.random(),
      title: "타입스크립트 마스터하기",
    },
  ],
};

export const todoSlice = createSlice({
  name: "todoReducer",
  initialState,
  reducers: {
    addTodo: (state: TodoState, action: PayloadAction<string>) => {
      // console.log(state);
      // console.log(action.payload);
      const new_todoList = [
        ...state.list,
        { id: Math.random(), title: action.payload },
      ];
      return { list: new_todoList };
    },
    deleteTodo: (state: TodoState, action: PayloadAction<number>) => {
      const new_todoList = state.list.filter((todo) => {
        return todo.id !== action.payload;
      });
      return { list: new_todoList };
    },
    editTodo: (state: TodoState, action: PayloadAction<TodoEdit>) => {
      const new_todoList = state.list.map((todo) => {
        return todo.id === action.payload.todoId
          ? { ...todo, title: action.payload.title }
          : todo;
      });
      return { list: new_todoList };
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice;
