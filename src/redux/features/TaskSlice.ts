import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { StatusTask, Task } from "../../types/Task";
import taskApi from "../../apis/TaskApi";
import { AxiosResponse } from "axios";

interface TaskState {
  tasks: Task[];
  resultTasks: Task[];
  isLoading: boolean;
  currentTask: Task | null;
}

const initialState: TaskState = {
  tasks: [
    // {
    //   title: "Login page UI",
    //   imgUrl:
    //     "https://cdn.dribbble.com/users/308682/screenshots/16316303/media/f9b4306971586e66bf77c5a63101e762.png?compress=1&resize=1000x750&vertical=top",
    //   description:
    //     "Design a login page ui in figma , and implement login with reactjs code.",
    //   timeStart: "01:05 PM",
    //   timeEnd: "04:20 PM",
    //   categories: [
    //     { id: 0, name: "Design" },
    //     { id: 1, name: "Implement" },
    //   ],
    //   members: [
    //     { id: 0, name: "Tran Cong A", avatar: "/" },
    //     { id: 1, name: "Nguyen Van B", avatar: "/" },
    //   ],
    //   status: "NOT_START",
    //   id: "0",
    // },
    // {
    //   title: "Create sequence diagram for module TEAM",
    //   imgUrl:
    //     "https://cdn.dribbble.com/users/506/screenshots/17616941/media/989648550506aa3328152cdf1b971344.png?compress=1&resize=1000x750&vertical=top",
    //   description:
    //     "Create a sequence diagram , and description for MODULE TEAM ( CRUD)",
    //   timeStart: "01:45 PM",
    //   timeEnd: "01:45 PM",
    //   categories: [{ id: 0, name: "Document" }],
    //   members: [
    //     { id: 0, name: "Tran Cong A", avatar: "/" },
    //     { id: 1, name: "Nguyen Van B", avatar: "/" },
    //   ],
    //   status: "NOT_START",
    //   id: "1",
    // },
    // {
    //   title: "Review code branch 'TEAM'",
    //   imgUrl:
    //     "https://www.bounteous.com/sites/default/files/insights/2019-06/previews/20190606_blog_code_review_limbo-_how_low_should_you_go_website.png",
    //   description: "Review code for dev team in branch 'TEAM'",
    //   timeStart: "12:46 PM",
    //   timeEnd: "04:46 PM",
    //   categories: [{ id: 0, name: "Review" }],
    //   members: [{ id: 0, name: "Le Thi C", avatar: "/" }],
    //   status: "PROCESSING",
    //   id: "2",
    // },
    // {
    //   title: "Create radial chart for training",
    //   imgUrl:
    //     "https://cdn.dribbble.com/userupload/4386770/file/original-6923051a7132084780905245b5b42068.png?compress=1&resize=1024x768",
    //   description: "Create a mobile ui radial chart for training",
    //   timeStart: "03:50 PM",
    //   timeEnd: "11:50 PM",
    //   categories: [{ id: 0, name: "Design" }],
    //   members: [{ id: 0, name: "Vo Minh D", avatar: "/" }],
    //   status: "DONE",
    //   id: "3",
    // },
  ],
  resultTasks: [],
  isLoading: false,
  currentTask: null,
};

//  Create thunk

export const addTaskAsync = createAsyncThunk(
  "task/addTask",
  async (addTask: Task) => {
    const response = await taskApi
      .addTask(addTask)
      .then((value: AxiosResponse) => {
        return value.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }
);

export const getListTaskAsync = createAsyncThunk<Task[]>(
  "task/getListTask",
  async () => {
    const response = await taskApi
      .getTasks()
      .then((value: AxiosResponse) => {
        return value.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }
);

export const getTaskByIdAsync = createAsyncThunk<Task, string>(
  "task/getTaskById",
  async (id: string) => {
    const response = await taskApi
      .getTaskById(id)
      .then((value: AxiosResponse) => {
        return value.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }
);

type UpdateTaskAsyncArg = {
  id: string;
  newTask: Task;
};

export const updateTaskByIdAsync = createAsyncThunk<Task, UpdateTaskAsyncArg>(
  "task/updateTaskById",
  async (arg: UpdateTaskAsyncArg) => {
    const response = await taskApi
      .updateTask(arg.id, arg.newTask)
      .then((value: AxiosResponse) => {
        return value.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }
);

type UpdateStatusTaskAsyncArg = {
  id: string;
  newStatus: StatusTask;
};

export const updateStatusTaskAsync = createAsyncThunk<
  Task,
  UpdateStatusTaskAsyncArg
>("task/updateStatusTask", async (arg: UpdateStatusTaskAsyncArg) => {
  const response = await taskApi
    .updateNewStatus(arg.id, arg.newStatus)
    .then((value: AxiosResponse) => {
      return value.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
});

export const deleteTaskByIdAsync = createAsyncThunk<Task, string>(
  "task/deleteTaskById",
  async (id: string) => {
    const response = await taskApi
      .deletetask(id)
      .then((value: AxiosResponse) => {
        return value.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }
);

export const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    loadAllTask: (state, action: PayloadAction<{}>) => {
      console.log("Loading tasks");
      taskApi.getTasks().then((response: AxiosResponse<Task[]>) => {
        console.log(response.data);
        response.data.map((value: Task) => {
          state.tasks.push({
            id: value._id,
            title: value.title,
            members: value.members,
            categories: value.categories,
            description: value.description,
            status: value.status,
            timeStart: value.timeStart,
            timeEnd: value.timeEnd,
            imgUrl: value.imgUrl,
          });
        });
      });
    },
    addTask: (state, action: PayloadAction<{ addTask: Task }>) => {
      console.log("Adding task");
      // action.payload.addTask.id = state.tasks.length;
      // state.tasks.push(action.payload.addTask);
    },
    deleteTask: (state, action: PayloadAction<{ deleteTaskId: string }>) => {
      console.log("Deleting task");
      // const indexDeleteTask = state.tasks.findIndex(
      //   (task) => task.id === action.payload.deleteTaskId
      // );
      // state.tasks.splice(indexDeleteTask, 1);
    },
    updateStatus: (
      state,
      action: PayloadAction<{ id: string; newStatus: StatusTask }>
    ) => {
      console.log("Updating status");
      // console.log("Id Update : " + action.payload.id);
      // const indexUpdateTask = state.tasks.findIndex(
      //   (task: Task) => task.id === action.payload.id
      // );
      // state.tasks[indexUpdateTask].status = action.payload.newStatus;
    },
    searchTask: (state, action: PayloadAction<{ textSearch: string }>) => {
      console.log("Search task");
      // const searchTask: Task[] = [];
      // state.tasks.forEach((task: Task) => {
      //   if (
      //     task.title
      //       .toUpperCase()
      //       .includes(action.payload.textSearch.toUpperCase())
      //   ) {
      //     searchTask.push(task);
      //   }
      // });
      // state.tasks = searchTask;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<TaskState>) => {
    builder
      .addCase(addTaskAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
        state.isLoading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTaskAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getListTaskAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getListTaskAsync.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          const tmpTaskArr: Task[] = [];
          action.payload.map((task) => {
            tmpTaskArr.push({
              id: task._id,
              ...task,
            });
          });
          state.isLoading = false;
          state.tasks = tmpTaskArr;
        }
      )
      .addCase(getListTaskAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getTaskByIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getTaskByIdAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.currentTask = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getTaskByIdAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTaskByIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateTaskByIdAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.isLoading = false;
        }
      )
      .addCase(updateTaskByIdAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateStatusTaskAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateStatusTaskAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.isLoading = false;
        }
      )
      .addCase(updateStatusTaskAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTaskByIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteTaskByIdAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.isLoading = false;
        }
      )
      .addCase(deleteTaskByIdAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default TaskSlice.reducer;
export const { loadAllTask, addTask, deleteTask, updateStatus, searchTask } =
  TaskSlice.actions;
