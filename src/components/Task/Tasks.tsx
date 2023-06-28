import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, Chip, Dialog, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { finishAction, startAction } from '../../redux/features/ActionSlice';
import { sendNotification } from '../../redux/features/NotificationSlice';
import {
  addTask,
  addTaskAsync,
  deleteTaskByIdAsync,
  getAllTaskByTimeAsync,
  getListTaskAsync,
  getListTaskOnDateAsync,
  getListTaskOnMonthAsync,
  getListTaskOnWeekAsync,
  getTaskByIdAsync,
  updateStatusTaskAsync,
  updateTaskByIdAsync,
} from '../../redux/features/TaskSlice';
import { useAppDispatch } from '../../redux/store';
import { StatusTask, Task } from '../../types/Task';
import AddTaskDialog from './AddTaskDialog';
import EditTaskDialog from './EditTaskDialog';
import NavBarTask from './NavBarTask';
import ProgressLayout from './ProgressLayout';
import ViewTaskDialog from './ViewTaskDialog';

export default function Tasks() {
	const dispatch = useAppDispatch();
	const { authUser } = useAuth();
	const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
	const [openViewTaskDialog, setOpenViewTaskDialog] = useState(false);
	const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false);
	const [openTodoTaskDialog, setOpenTodoTaskDialog] = useState(false);
	const [idTaskView, setIdTaskView] = useState<string | undefined>();

	type TimeFilter = "All" | "Today" | "This week" | "This month";

	const [selectedTimeFilter, setSelectedTimeFilter] =
		useState<TimeFilter>("All");
	const timeFilterArr: TimeFilter[] = [
		"All",
		"Today",
		"This week",
		"This month",
	];

	const handleClickOpenAddTaskDialog = () => {
		setOpenAddTaskDialog(true);
	};

	const handleCloseAddTaskDialog = () => {
		setOpenAddTaskDialog(false);
	};

	const handleClickOpenViewTaskDialog = () => {
		setOpenViewTaskDialog(true);
	};

	const handleCloseViewTaskDialog = () => {
		setOpenViewTaskDialog(false);
	};

	const handleClickOpenEditTaskDialog = () => {
		handleCloseViewTaskDialog();
		if (idTaskView !== undefined) {
			dispatch(startAction());
			dispatch(getTaskByIdAsync(idTaskView)).then(() => {
				setOpenEditTaskDialog(true);
				dispatch(finishAction());
			});
		}
	};

	const handleCloseEditTaskDialog = () => {
		setOpenEditTaskDialog(false);
	};

	const handleClickOpenTodoTaskDialog = () => {
		setOpenTodoTaskDialog(true);
	};

	const handleCloseTodoTaskDialog = () => {
		setOpenTodoTaskDialog(false);
	};

	const handleAddTask = (task: Task) => {
		dispatch(startAction());
		dispatch(addTaskAsync(task))
			.unwrap()
			.then(() => {
				dispatch(getAllTaskByTimeAsync(authUser?.id || ""));
				dispatch(sendNotification({ message: "Add task successfully " }));
				handleCloseAddTaskDialog();
			})
			.catch(() => {
				dispatch(sendNotification({ message: "Add task failed " }));
			})
			.finally(() => {
				dispatch(finishAction());
			});
	};

	const handleEditTask = (id: string, task: Task) => {
		dispatch(startAction());
		dispatch(updateTaskByIdAsync({ id, newTask: task })).then(() => {
			dispatch(getAllTaskByTimeAsync(authUser?.id || ""));
			dispatch(sendNotification({ message: "Update task successfully " }));
			dispatch(finishAction());
			handleCloseEditTaskDialog();
		});
	};

	const handleUpdateStatus = (id: string, newStatus: StatusTask) => {
		dispatch(startAction());
		console.log("start");

		dispatch(updateStatusTaskAsync({ id, newStatus })).then(() => {
			dispatch(getAllTaskByTimeAsync(authUser?.id || ""));
			dispatch(sendNotification({ message: "Update status successfully " }));
			dispatch(finishAction());
			console.log("end");
		});
	};

	const handleRemoveTask = (deleteTaskId: string) => {
		dispatch(startAction());
		dispatch(deleteTaskByIdAsync(deleteTaskId)).then(() => {
			dispatch(getAllTaskByTimeAsync(authUser?.id || ""));
			dispatch(sendNotification({ message: "Delete task successfully " }));
			dispatch(finishAction());
			handleCloseViewTaskDialog();
		});
	};

	useEffect(() => {
		switch (selectedTimeFilter) {
			case "All":
				dispatch(getListTaskAsync(authUser?.id || ""));
				break;
			case "This month":
				dispatch(getListTaskOnMonthAsync(authUser?.id || ""));
				break;
			case "This week":
				dispatch(getListTaskOnWeekAsync(authUser?.id || ""));
				break;
			case "Today":
				dispatch(getListTaskOnDateAsync(authUser?.id || ""));
				break;
		}
	}, [
		selectedTimeFilter,
		handleAddTask,
		handleEditTask,
		handleUpdateStatus,
		handleRemoveTask,
	]);

	useEffect(() => {
		dispatch(getAllTaskByTimeAsync(authUser?.id || ""));
	}, []);

	return (
		<Grid
			container
			sx={{
				height: "100%",
				width: "100vw",
				overflow: "auto",
			}}
		>
			<Grid
				md={4}
				lg={3}
				xl={2}
				sx={{
					display: { xs: "none", md: "flex", lg: "flex", xl: "flex" },
					position: "fixed",
					backgroundColor: "secondary.dark",
					padding: 1,
					height: "100%",
				}}
				flexDirection={"column"}
				gap={1}
			>
				<NavBarTask />
			</Grid>
			<Grid
				md={4}
				lg={3}
				xl={2}
				sx={{
					display: { xs: "none", md: "flex", lg: "flex", xl: "flex" },
					padding: 1,
					height: "100%",
				}}
				flexDirection={"column"}
				gap={1}
			></Grid>
			<Grid
				xs={12}
				md={8}
				lg={9}
				xl={10}
				container
				sx={{
					padding: "6px",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Grid
					container
					sx={{ width: "100%", paddingY: 1, margin: 0 }}
					justifyContent={"space-between"}
				>
					<Grid
						justifySelf={"flex-start"}
						sx={{
							display: {
								xs: "flex",
								sm: "flex",
								md: "none",
								lg: "none",
							},
							paddingBottom: 1,
						}}
						xs={12}
					>
						<IconButton
							aria-label="Show Todo Task"
							onClick={() => {
								handleClickOpenTodoTaskDialog();
							}}
						>
							<MenuOpenIcon />
						</IconButton>
						<Dialog
							sx={{
								display: {
									xs: "block",
									sm: "block",
									md: "none",
									lg: "none",
								},
							}}
							open={openTodoTaskDialog}
							onClose={handleCloseTodoTaskDialog}
							fullScreen
						>
							<Box
								sx={{
									backgroundColor: "#1D267D",
									padding: 1,
									height: "100%",
								}}
								flexDirection={"column"}
							>
								<Grid container justifyContent={"flex-end"}>
									<IconButton
										edge="start"
										color="inherit"
										onClick={handleCloseTodoTaskDialog}
										aria-label="close"
										sx={{ color: "white" }}
									>
										<CloseIcon />
									</IconButton>
								</Grid>
								<NavBarTask />
							</Box>
						</Dialog>
					</Grid>
					<Grid
						container
						xs={12}
						alignItems={"center"}
						justifyContent={"space-around"}
						display={"flex"}
						rowSpacing={2}
					>
						<Grid container gap={2}>
							{timeFilterArr.map((item) => {
								return (
									<Chip
									 key={item}
										label={item}
										variant={
											item === selectedTimeFilter ? "filled" : "outlined"
										}
										color="primary"
										onClick={() => {
											setSelectedTimeFilter(item);
										}}
									></Chip>
								);
							})}
						</Grid>

						<Grid>
							<Button
								variant="contained"
								onClick={handleClickOpenAddTaskDialog}
								color="info"
								size="small"
							>
								Add more task
							</Button>
						</Grid>
					</Grid>
				</Grid>

				<ProgressLayout
					handleOpenAddDialog={() => {
						handleClickOpenAddTaskDialog();
					}}
					handleOpenViewDialog={(id: string | undefined) => {
						console.log("id :" + id);
						setIdTaskView(id);
						handleClickOpenViewTaskDialog();
					}}
					onUpdateStatus={(id: string, newStatus: StatusTask) => {
						handleUpdateStatus(id, newStatus);
					}}
				/>
				{openAddTaskDialog ? (
					<AddTaskDialog
						addTask={handleAddTask}
						open={openAddTaskDialog}
						onClose={() => handleCloseAddTaskDialog()}
					/>
				) : (
					<></>
				)}
				{openViewTaskDialog ? (
					<ViewTaskDialog
						id={idTaskView}
						open={openViewTaskDialog}
						onClose={() => {
							handleCloseViewTaskDialog();
						}}
						onClickUpdate={() => {
							handleClickOpenEditTaskDialog();
						}}
						onUpdateStatus={(id: string, newStatus: StatusTask) => {
							handleUpdateStatus(id, newStatus);
						}}
						onDelete={(id) => handleRemoveTask(id)}
					/>
				) : (
					<></>
				)}

				{openEditTaskDialog ? (
					<EditTaskDialog
						id={idTaskView}
						open={openEditTaskDialog}
						onClose={() => {
							handleCloseEditTaskDialog();
						}}
						editTask={(id: string, task: Task) => {
							handleEditTask(id, task);
						}}
					/>
				) : (
					<></>
				)}
			</Grid>
		</Grid>
	);
}
function endAction(): any {
	throw new Error("Function not implemented.");
}
