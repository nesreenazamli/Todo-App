import { configureStore } from "@reduxjs/toolkit";
import todo from "../feature/todoSlice";

const store = configureStore({
  reducer: {
    todo: todo.reducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export default store;