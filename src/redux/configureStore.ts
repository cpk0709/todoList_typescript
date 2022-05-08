import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoSlice from "./modules/todo";

const rootReducer = combineReducers({
  todo: todoSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// export default store;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
