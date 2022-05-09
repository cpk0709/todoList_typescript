import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useDispatch } from "react-redux";

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
    // {
    //   id: Math.random(),
    //   title: "운동하기",
    // },
    // {
    //   id: Math.random(),
    //   title: "리액트 마스터하기",
    // },
    // {
    //   id: Math.random(),
    //   title: "타입스크립트 마스터하기",
    // },
  ],
};

// todo리스트를 get 으로 불러오는 미들웨어
export const fetchGetTodoList = createAsyncThunk(
  "todoReducer/fetchGetTodoList",
  async () => {
    return axios
      .get("http://localhost:3001/list")
      .then((res) => {
        // todo리스트를 리턴
        return res.data;
      })
      .catch((error) => console.log(error));
  }
);

// todo 추가 미들웨어
export const fetchAddTodoList = createAsyncThunk(
  "todoReducer/fetchGetTodoList",
  // 컴포넌트에서 받아올 data의 타입을 TodoItemDataParams 로 해줌. thunkAPI를 통해서 dispatch를 사용할 수 있음.
  async (data: TodoItemDataParams, thunkAPI) => {
    return axios
      .post("http://localhost:3001/list", { id: data.id, title: data.title })
      .then((res) => {
        // post로 데이터가 추가되면 dispatch로 addTodo 액션함수를 실행시켜서 리덕스 state에도 추가하는 todo 값을 넣어줌
        thunkAPI.dispatch(addTodo({ id: data.id, title: data.title }));
      })
      .catch((error) => console.log(error));
  }
);

export const todoSlice = createSlice({
  name: "todoReducer",
  initialState,
  reducers: {
    // 미들웨어 API 연결하면서 미들웨어에서 서버에 todo{id:number,title:string}를 넣어주고, 이 todo{id:number,title:string}를 리덕스 state에도 넣어줘야해서 타입을 바꿔줘야할 필요성이 생김.  action 타입을 PayloadAction<string> 에서 PayloadAction<TodoItemDataParams> 으로 변경
    addTodo: (state: TodoState, action: PayloadAction<TodoItemDataParams>) => {
      const new_todoList = [
        ...state.list,
        { id: action.payload.id, title: action.payload.title },
      ];
      return { list: new_todoList };
    },
    // 미들웨어 API 연결 안 되어있음. 삭제버튼 누르면 view에서는 지워지는데 db.json은 그대로임. 새로고침하면 원래대로 돌아옴.
    deleteTodo: (state: TodoState, action: PayloadAction<number>) => {
      const new_todoList = state.list.filter((todo) => {
        return todo.id !== action.payload;
      });
      return { list: new_todoList };
    },
    // 미들웨어 API 연결 안 되어있음. 수정내용 작성하고 수정버튼 누르면 view에서는 수정되는데 db.json은 그대로임. 새로고침하면 원래대로 돌아옴.
    editTodo: (state: TodoState, action: PayloadAction<TodoEdit>) => {
      const new_todoList = state.list.map((todo) => {
        return todo.id === action.payload.todoId
          ? { ...todo, title: action.payload.title }
          : todo;
      });
      return { list: new_todoList };
    },
  },
  // fetch 또는 axios에서 response가 여기로 들어옴
  extraReducers: (builder) => {
    // pending(대기중), fulfilled(통신이 이행됐을 때), rejected(거절됨) 가 있는데 우선 fulfilled 만 작성함.
    builder.addCase(fetchGetTodoList.fulfilled, (state: TodoState, action) => {
      // action 안 에는 todo리스트 들어있음. 리덕스 initialState(state)에 넣어줌
      return { list: [...action.payload] };
    });
  },
});

// 액션 함수 addTodo를 export 하고있다. (근데 아래에서 todoSlice를 export해서 별 의미는 없는듯... 'todoSlice.actions.addTodo' 이렇게 사용할 수 있어서..)
export const { addTodo } = todoSlice.actions;

export default todoSlice;
