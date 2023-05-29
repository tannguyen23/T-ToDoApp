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
  tasks: [],
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
