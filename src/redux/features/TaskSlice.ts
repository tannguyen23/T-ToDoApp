import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StatusTask, Task } from "../../types/Task";

interface TaskState {
  tasks: Task[];
  resultTasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
  resultTasks: [],
};

export const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ addTask: Task }>) => {
      console.log("Adding task");
      action.payload.addTask.id = state.tasks.length;
      state.tasks.push(action.payload.addTask);
    },
    updateStatus: (
      state,
      action: PayloadAction<{ id: number; newStatus: StatusTask }>
    ) => {
      console.log("Updating status");
      console.log("Id Update : " + action.payload.id);
      const indexUpdateTask = state.tasks.findIndex(
        (task: Task) => task.id === action.payload.id
      );
      state.tasks[indexUpdateTask].status = action.payload.newStatus;
    },
    searchTask: (state, action: PayloadAction<{ textSearch: string }>) => {
      console.log("Search task");
      const searchTask: Task[] = [];
      state.tasks.map((task: Task) => {
        if (
          task.title
            .toUpperCase()
            .includes(action.payload.textSearch.toUpperCase())
        ) {
          searchTask.push(task);
        }
      });
      state.tasks = searchTask;
    },
  },
});

export default TaskSlice.reducer;
export const { addTask, updateStatus, searchTask } = TaskSlice.actions;
