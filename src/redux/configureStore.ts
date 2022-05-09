import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoSlice from "./modules/todo";
// dispatch 타입을 정해주기 위해
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  todo: todoSlice.reducer,
});
// 9번째 줄 export 지워도 될듯?
export const store = configureStore({
  reducer: rootReducer,
});

// store의 타입을 지정하고 RootState라는 type을 만들어서 export
export type RootState = ReturnType<typeof store.getState>;
// store(리덕스)의 dispatch (내장함수인듯) 로 타입을 생성
export type AppDispatch = typeof store.dispatch;
// useDispatch에 타입 지정 후, useAppDispatch(구분하려고 이렇게 작명함)에 담아서 export해주고있음.
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
