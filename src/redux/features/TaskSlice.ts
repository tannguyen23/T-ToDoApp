import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StatusTask, Task } from "../../types/Task";

interface TaskState {
  tasks: Task[];
  resultTasks: Task[];
}

const initialState: TaskState = {
  tasks: [
    {
      title: "Login page UI",
      imgUrl:
        "https://cdn.dribbble.com/users/308682/screenshots/16316303/media/f9b4306971586e66bf77c5a63101e762.png?compress=1&resize=1000x750&vertical=top",
      description:
        "Design a login page ui in figma , and implement login with reactjs code.",
      timeStart: "01:05 PM",
      timeEnd: "04:20 PM",
      categories: [
        { id: 0, name: "Design" },
        { id: 1, name: "Implement" },
      ],
      assignMember: [
        { id: 0, name: "Tran Cong A", avatar: "/" },
        { id: 1, name: "Nguyen Van B", avatar: "/" },
      ],
      status: "NOT_START",
      id: 0,
    },
    {
      title: "Create sequence diagram for module TEAM",
      imgUrl:
        "https://cdn.dribbble.com/users/506/screenshots/17616941/media/989648550506aa3328152cdf1b971344.png?compress=1&resize=1000x750&vertical=top",
      description:
        "Create a sequence diagram , and description for MODULE TEAM ( CRUD)",
      timeStart: "01:45 PM",
      timeEnd: "01:45 PM",
      categories: [{ id: 0, name: "Document" }],
      assignMember: [
        { id: 0, name: "Tran Cong A", avatar: "/" },
        { id: 1, name: "Nguyen Van B", avatar: "/" },
      ],
      status: "NOT_START",
      id: 1,
    },
    {
      title: "Review code branch 'TEAM'",
      imgUrl:
        "https://www.bounteous.com/sites/default/files/insights/2019-06/previews/20190606_blog_code_review_limbo-_how_low_should_you_go_website.png",
      description: "Review code for dev team in branch 'TEAM'",
      timeStart: "12:46 PM",
      timeEnd: "04:46 PM",
      categories: [{ id: 0, name: "Review" }],
      assignMember: [{ id: 0, name: "Le Thi C", avatar: "/" }],
      status: "PROCESSING",
      id: 2,
    },
    {
      title: "Create radial chart for training",
      imgUrl:
        "https://cdn.dribbble.com/userupload/4386770/file/original-6923051a7132084780905245b5b42068.png?compress=1&resize=1024x768",
      description: "Create a mobile ui radial chart for training",
      timeStart: "03:50 PM",
      timeEnd: "11:50 PM",
      categories: [{ id: 0, name: "Design" }],
      assignMember: [{ id: 0, name: "Vo Minh D", avatar: "/" }],
      status: "DONE",
      id: 3,
    },
  ],
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
    deleteTask: (state, action: PayloadAction<{ deleteTaskId: number }>) => {
      console.log("Deleting task");
      const indexDeleteTask = state.tasks.findIndex(
        (task) => task.id === action.payload.deleteTaskId
      );
      state.tasks.splice(indexDeleteTask, 1);
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
      state.tasks.forEach((task: Task) => {
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
export const { addTask, deleteTask, updateStatus, searchTask } =
  TaskSlice.actions;
