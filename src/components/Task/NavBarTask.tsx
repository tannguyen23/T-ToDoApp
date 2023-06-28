import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { Box, Checkbox, Divider, FormControlLabel, Slide, Switch, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useRef, useState } from 'react';

import { useAppSelector } from '../../redux/store';
import { Task } from '../../types/Task';

export default function NavBarTask() {
	const monthTasks = useAppSelector((state) => state.task.monthTasks);
	const weekTasks = useAppSelector((state) => state.task.weekTasks);
	const dayTasks = useAppSelector((state) => state.task.dayTasks);
	const [checkedToday, setCheckedToday] = useState(true);
	const [checkedThisWeek, setCheckedThisWeek] = useState(true);
	const [checkedThisMonth, setCheckedThisMonth] = useState(true);

	const containerTodayRef = useRef(null);
	const containerThisWeekRef = useRef(null);
	const containerThisMonthRef = useRef(null);

	const handleChangeCheckedToday = () => {
		setCheckedToday((prev) => !prev);
	};
	const handleChangeCheckedThisMonth = () => {
		setCheckedThisMonth((prev) => !prev);
	};
	const handleChangeCheckedThisWeek = () => {
		setCheckedThisWeek((prev) => !prev);
	};

	const renderTaskByTime = (task: Task[]) => {
		{
			return task.map((task, index) => {
				return (
					<div key={index}>
						<FormControlLabel
							control={
								<Checkbox
									// checkedIcon={<ClearIcon></ClearIcon>}
									checkedIcon={
										task.status === "FAILED" ? (
											<ClearIcon></ClearIcon>
										) : (
											<DoneIcon></DoneIcon>
										)
									}
									checked={task.status === "DONE" || task.status === "FAILED"}
									onChange={() => {}}
									name={task.title}
									sx={{
										color: "white",
									}}
									color={task.status === "DONE" ? "success" : "default"}
								/>
							}
							label={
								<Typography
									variant={"subtitle2"}
									color={"main.success"}
									sx={{
										textDecoration:
											`${task.status}` === "FAILED" ? "line-through" : "none",
									}}
								>
									{task.title}
								</Typography>
							}
						/>
						{index !== dayTasks.length - 1 && <Divider />}
					</div>
				);
			});
		}
	};

	return (
		<Grid sx={{ height: "100%" }}>
			<Typography
				variant={"h6"}
				sx={{ paddingY: 2, textAlign: "center" }}
				color={"secondary.light"}
			>
				To - Do Tasks
			</Typography>
			<Box component={"div"} sx={{}} ref={containerTodayRef}>
				<Box
					sx={{ padding: 1, marginY: 1, backgroundColor: "primary.dark" }}
					borderRadius={1}
				>
					<FormControlLabel
						control={
							<Switch
								color="info"
								checked={checkedToday}
								onChange={() => {
									handleChangeCheckedToday();
								}}
							/>
						}
						label={
							<Typography
								variant={"body1"}
								color={"primary.contrastText"}
								fontWeight={"bold"}
							>
								Today
							</Typography>
						}
					/>
					{checkedToday && (
						<>
							<Divider sx={{ borderColor: "rgba(0, 0, 0, 0.5)" }} />
							<Slide
								direction="right"
								in={checkedToday}
								container={containerTodayRef.current}
							>
								<Grid container flexDirection={"column"}>
									{renderTaskByTime(dayTasks)}
								</Grid>
							</Slide>
						</>
					)}
				</Box>
				{/*  */}

				{/*  */}
				<Box
					sx={{ padding: 1, marginY: 1, backgroundColor: "primary.dark" }}
					borderRadius={2}
				>
					<FormControlLabel
						control={
							<Switch
								checked={checkedThisMonth}
								onChange={() => {
									handleChangeCheckedThisMonth();
								}}
							/>
						}
						label={
							<Typography
								variant={"body1"}
								color={"primary.contrastText"}
								fontWeight={"bold"}
							>
								This month
							</Typography>
						}
					/>
					{checkedThisMonth && (
						<>
							<Divider sx={{ borderColor: "rgba(0, 0, 0, 0.5)" }} />
							<Slide
								direction="right"
								in={checkedThisMonth}
								container={containerThisMonthRef.current}
							>
								<Grid container flexDirection={"column"}>
									{renderTaskByTime(monthTasks)}
								</Grid>
							</Slide>
						</>
					)}
				</Box>
				{/*  */}

				{/*  */}
				<Box
					sx={{ padding: 1, marginY: 1, backgroundColor: "primary.dark" }}
					borderRadius={2}
				>
					<FormControlLabel
						control={
							<Switch
								checked={checkedThisWeek}
								onChange={() => {
									handleChangeCheckedThisWeek();
								}}
							/>
						}
						label={
							<Typography
								variant={"body1"}
								color={"primary.contrastText"}
								fontWeight={"bold"}
							>
								This week
							</Typography>
						}
					/>
					{checkedThisWeek && (
						<>
							<Divider sx={{ borderColor: "rgba(0,0,0,0.5)" }} />
							<Slide
								direction="right"
								in={checkedThisWeek}
								container={containerThisWeekRef.current}
							>
								<Grid container flexDirection={"column"}>
									{renderTaskByTime(weekTasks)}
								</Grid>
							</Slide>
						</>
					)}
				</Box>
			</Box>
		</Grid>
	);
}
