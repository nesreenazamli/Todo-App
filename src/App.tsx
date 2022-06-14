import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Button, CssBaseline, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { AppDispatch, AppState } from "./app/store";
import todoSlice from "./feature/todoSlice";
import axios from "axios";
import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const dispatch: AppDispatch = useDispatch();
  const [newTask, setNewTask] = useState({ id: uuidv4(), task:""});
  const [error, setError] = useState("");
  const todos = useSelector((state: AppState) => state.todo);

  const submitTask = useCallback(async (taskID: string, taskDetails: string) => {
    const bodyData = {
      taskID,
      taskDetails,
    };
    console.log(bodyData)
    
    const config = {
      headers: { Accept: "application/json", "Content-Type": "application/json" },
    };

    try {
      await axios.post(`http://localhost:8000/tasks`, bodyData, config);
    } catch (e: any) {
      console.log(e);
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <h1> To Do List</h1>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            alignItems: "center",
            width: "40%",
          }}
          component="form"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            submitTask(newTask.id, newTask.task);
            if (newTask.task.length === 0) {
              setError("Please Enter a Task");
            } else {
              setError("");
              dispatch(todoSlice.actions.addTodo(newTask));
              setNewTask({ id: uuidv4(), task: "" });
            }
          }}
        >
          <CssBaseline />
          <TextField
            label="Enter a Task"
            value={newTask.task}
            sx={{ width: "100%" }}
            onChange={(e) => setNewTask({ ...newTask, task: e.currentTarget.value })}
          />
          <Button variant="contained" type="submit" sx={{ padding: "16px 30px" }} onClick={() => {}}>
            Add
          </Button>
        </Box>
        {error ? <span style={{ color: "red" }}>{error}</span> : null}
        {todos.map((el) => (
          <Box sx={{ display: "flex", margin: "30px 0 5px 0", width: "40%" }} key={el.id}>
            <Box component="div" sx={{ width: "100%", background: "#fff9", color: "#000" }}>
              {el.task}
            </Box>
            <Button
              color="error"
              variant="contained"
              type="button"
              onClick={() => dispatch(todoSlice.actions.deleteTodo(el.id))}
            >
              X
            </Button>
          </Box>
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default App;
