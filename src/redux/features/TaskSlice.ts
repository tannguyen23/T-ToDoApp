import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import taskApi from '../../apis/TaskApi';
import { AddTask, StatusTask, ViewTask } from '../../types/Task';

interface TaskState {
	tasks: ViewTask[];
	monthTasks: ViewTask[];
	weekTasks: ViewTask[];
	dayTasks: ViewTask[];
	resultTasks: ViewTask[];
	isLoading: boolean;
	currentTask: ViewTask | null;
}

const initialState: TaskState = {
	tasks: [],
	monthTasks: [],
	weekTasks: [],
	dayTasks: [],
	resultTasks: [],
	isLoading: false,
	currentTask: null,
};

//  Create thunks

export const addTaskAsync = createAsyncThunk(
	"task/addTask",
	async (addTask: AddTask, { rejectWithValue }) => {
		const response = await taskApi
			.addTask(addTask)
			.then((value: AxiosResponse) => {
				return value.data;
			})
			.catch((error) => {
				console.log(error);
				return rejectWithValue(error);
			});
		return response;
	}
);

export const getListTaskAsync = createAsyncThunk<ViewTask[], string>(
	"task/getListTask",
	async (id: string) => {
		console.log("call get all list api");
		const response = await taskApi
			.getTasksByOwnerId(id)
			.then((value: AxiosResponse) => {
				return value.data;
			})
			.catch((error) => {
				console.log(error);
			});
		return response;
	}
);

export const getListTaskOnMonthAsync = createAsyncThunk<ViewTask[], string>(
	"task/getListOnMonthTask",
	async (id: string) => {
		const response = await taskApi
			.getTasksByOwnerIdOnCurrentMonth(id)
			.then((value: AxiosResponse) => {
				return value.data;
			})
			.catch((error) => {
				console.log(error);
			});
		return response;
	}
);

export const getListTaskOnWeekAsync = createAsyncThunk<ViewTask[], string>(
	"task/getListOnWeekTask",
	async (id: string) => {
		const response = await taskApi
			.getTasksByOwnerIdOnCurrentWeek(id)
			.then((value: AxiosResponse) => {
				return value.data;
			})
			.catch((error) => {
				console.log(error);
			});
		return response;
	}
);

export const getListTaskOnDateAsync = createAsyncThunk<ViewTask[], string>(
	"task/getListOnDateTask",
	async (id: string) => {
		const response = await taskApi
			.getTasksByOwnerIdOnCurrentDate(id)
			.then((value: AxiosResponse) => {
				return value.data;
			})
			.catch((error) => {
				console.log(error);
			});
		return response;
	}
);

export const getAllTaskByTimeAsync = createAsyncThunk<
	{ date: ViewTask[]; week: ViewTask[]; month: ViewTask[] },
	string
>("task/getAllTaskByTime", async (id: string) => {
	const responseDate = await taskApi
		.getTasksByOwnerIdOnCurrentDate(id)
		.then((value: AxiosResponse) => {
			return value.data;
		})
		.catch((error) => {
			console.log(error);
		});

	const responseWeek = await taskApi
		.getTasksByOwnerIdOnCurrentWeek(id)
		.then((value: AxiosResponse) => {
			return value.data;
		})
		.catch((error) => {
			console.log(error);
		});

	const responseMonth = await taskApi
		.getTasksByOwnerIdOnCurrentMonth(id)
		.then((value: AxiosResponse) => {
			return value.data;
		})
		.catch((error) => {
			console.log(error);
		});

	return { date: responseDate, week: responseWeek, month: responseMonth };
});

export const getTaskByIdAsync = createAsyncThunk<ViewTask, string>(
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
	newTask: AddTask;
};

export const updateTaskByIdAsync = createAsyncThunk<
	AddTask,
	UpdateTaskAsyncArg
>("task/updateTaskById", async (arg: UpdateTaskAsyncArg) => {
	const response = await taskApi
		.updateTask(arg.id, arg.newTask)
		.then((value: AxiosResponse) => {
			return value.data;
		})
		.catch((error) => {
			console.log(error);
		});
	return response;
});

type UpdateStatusTaskAsyncArg = {
	id: string;
	newStatus: StatusTask;
};

export const updateStatusTaskAsync = createAsyncThunk<
	ViewTask,
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

export const deleteTaskByIdAsync = createAsyncThunk<ViewTask, string>(
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
			// taskApi.getTasksByOwnerId().then((response: AxiosResponse<Task[]>) => {
			//   console.log(response.data);
			//   response.data.map((value: Task) => {
			//     state.tasks.push({
			//       id: value._id,
			//       title: value.title,
			//       members: value.members,
			//       categories: value.categories,
			//       description: value.description,
			//       status: value.status,
			//       timeStart: value.timeStart,
			//       timeEnd: value.timeEnd,
			//       imgUrl: value.imgUrl,
			//     });
			//   });
			// });
		},
		addTask: (state, action: PayloadAction<{ addTask: AddTask }>) => {
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
			.addCase(addTaskAsync.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(addTaskAsync.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(getAllTaskByTimeAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getAllTaskByTimeAsync.fulfilled,
				(
					state,
					action: PayloadAction<{
						date: ViewTask[];
						week: ViewTask[];
						month: ViewTask[];
					}>
				) => {
					state.isLoading = false;
					state.monthTasks = action.payload.month;
					state.weekTasks = action.payload.week;
					state.dayTasks = action.payload.date;
				}
			)
			.addCase(getAllTaskByTimeAsync.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(getListTaskAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getListTaskAsync.fulfilled,
				(state, action: PayloadAction<ViewTask[]>) => {
					const tmpTaskArr: ViewTask[] = [];
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
			.addCase(getListTaskOnMonthAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getListTaskOnMonthAsync.fulfilled,
				(state, action: PayloadAction<ViewTask[]>) => {
					const tmpTaskArr: ViewTask[] = [];
					action.payload.map((task) => {
						tmpTaskArr.push({
							id: task._id,
							...task,
						});
					});
					state.isLoading = false;
					state.tasks = tmpTaskArr;
					state.monthTasks = tmpTaskArr;
				}
			)
			.addCase(getListTaskOnMonthAsync.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(getListTaskOnWeekAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getListTaskOnWeekAsync.fulfilled,
				(state, action: PayloadAction<ViewTask[]>) => {
					const tmpTaskArr: ViewTask[] = [];
					action.payload.map((task) => {
						tmpTaskArr.push({
							id: task._id,
							...task,
						});
					});
					state.isLoading = false;
					state.tasks = tmpTaskArr;
					state.weekTasks = tmpTaskArr;
				}
			)
			.addCase(getListTaskOnWeekAsync.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(getListTaskOnDateAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getListTaskOnDateAsync.fulfilled,
				(state, action: PayloadAction<ViewTask[]>) => {
					const tmpTaskArr: ViewTask[] = [];
					action.payload.map((task) => {
						tmpTaskArr.push({
							id: task._id,
							...task,
						});
					});
					state.isLoading = false;
					state.tasks = tmpTaskArr;
					state.dayTasks = tmpTaskArr;
				}
			)
			.addCase(getListTaskOnDateAsync.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(getTaskByIdAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getTaskByIdAsync.fulfilled,
				(state, action: PayloadAction<ViewTask>) => {
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
				(state, action: PayloadAction<AddTask>) => {
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
				(state, action: PayloadAction<ViewTask>) => {
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
				(state, action: PayloadAction<ViewTask>) => {
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
