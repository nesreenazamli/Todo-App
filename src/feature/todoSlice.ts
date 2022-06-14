import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  task: string;
}

const todo = createSlice({
  name: "todo",
  initialState: [] as any[],
  reducers: {
    addTodo: (state, action: PayloadAction<any>) => {
      state.push({ id: action.payload.id, task: action.payload.task });
      return state;
    },
    deleteTodo: (state, action: PayloadAction<string>) => state.filter((todo) => todo.id !== action.payload),
  },
});

export default todo;
