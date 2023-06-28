import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { getTaskByIdAsync } from '../../redux/features/TaskSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Category } from '../../types/Category';
import { Member } from '../../types/Member';
import { StatusTask, Task } from '../../types/Task';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

const schema = yup.object({
	title: yup.string().required("Should not be empty"),
	imgUrl: yup.string(),
	description: yup.string(),
	timeStart: yup.string().required("Should not be empty"),
	timeEnd: yup.string().required("Should not be empty"),
	categories: yup
		.array()
		.of(yup.string())
		.min(1, "Please select at least 1 Category")
		.required("Should not be empty"),
	members: yup
		.array()
		.of(yup.string())
		.min(1, "Please select at least 1 Member")
		.required("Should not be empty"),
	status: yup.string(),
});

export interface EditTaskDialogProps {
	id: string | undefined;
	open: boolean;
	editTask: (id: string, task: Task) => void;
	onClose: () => void;
}

export default function EditTaskDialog(props: EditTaskDialogProps) {
	const theme = useTheme();
	const dispatch = useAppDispatch();

	const categories = useAppSelector((state) => state.category.categories);
	const members = useAppSelector((state) => state.member.members);
	const task = useAppSelector((state) => state.task.currentTask);

	const today = dayjs();

	const [categoryName, setCategoryName] = useState<string[]>([]);
	const [memberName, setMemberName] = useState<string[]>([]);
	const { id, open, editTask } = props;
	const [timeStartDate, setTimeStartDate] = useState<Dayjs | null>();
	const [timeEndDate, setTimeEndDate] = useState<Dayjs | null>();
	const [status, setStatus] = useState<StatusTask>("NOT_START");
	const handleClose = () => {
		props.onClose();
	};

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
		setError,
	} = useForm({
		resolver: yupResolver(schema),
		// defaultValues: initValueForm,
	});

	const onSubmit = handleSubmit((data) => {
		handleEditTask();
	});

	const handleEditTask = () => {
		if (timeStartDate && timeEndDate) {
			const currentCategories: Category[] = [];
			categoryName.map((category: string, index: number) => {
				currentCategories.push({
					name: category,
				});
			});
			const currentMembers: Member[] = [];
			memberName.map((member: string, index: number) => {
				currentMembers.push({
					name: member,
				});
			});
			const title = getValues("title").trim();
			const imgUrl = getValues("imgUrl").trim();
			const description = getValues("description").trim();

			if (timeStartDate < timeEndDate) {
				if (id !== undefined && title !== undefined) {
					editTask(id, {
						title,
						imgUrl,
						description,
						timeStart: timeStartDate?.format("YYYY-MM-DD"),
						timeEnd: timeEndDate?.format("YYYY-MM-DD"),
						categories: currentCategories,
						members: currentMembers,
						status,
					});
				}
			} else {
				console.log(`${timeStartDate} - ${timeEndDate}`);
				setError("timeStart", {
					message: "Time Start must be before Time End",
					type: "value",
				});
				setError("timeEnd", {
					message: "Time End must be after Time Start",
					type: "value",
				});
			}
		}
	};

	const handleChangeCategory = (
		event: SelectChangeEvent<typeof categoryName>
	) => {
		const {
			target: { value },
		} = event;
		setCategoryName(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	const handleChangeMember = (event: SelectChangeEvent<typeof memberName>) => {
		const {
			target: { value },
		} = event;
		setMemberName(
			// On autofille we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	useEffect(() => {
		if (id !== undefined) {
			dispatch(getTaskByIdAsync(id)).then(() => {
				if (task !== null) {
					const selectCate: string[] = [];
					task.categories.map((value) => {
						selectCate.push(value.name);
					});
					const selectMem: string[] = [];
					task.members.map((value) => {
						selectMem.push(value.name);
					});
					setTimeStartDate(dayjs(task.timeStart));
					setTimeEndDate(dayjs(task.timeEnd));
					setCategoryName(selectCate);
					setMemberName(selectMem);
					setStatus(task.status);
					setValue("title", task.title);
					setValue("description", task.description);
					setValue("imgUrl", task.imgUrl || "");
					setValue("timeStart", dayjs(task.timeStart).format("DD-MM-YYYY"));
					setValue("timeEnd", dayjs(task.timeEnd).format("DD-MM-YYYY"));
					setValue("categories", selectCate);
					setValue("members", selectMem);
					setValue("status", task.status);
				}
			});
		}
	}, []);

	return (
		<Dialog onClose={handleClose} open={open} fullWidth maxWidth={"md"}>
			<form
				onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
					onSubmit();
				}}
			>
				<DialogTitle>Edit task </DialogTitle>
				<DialogContent
					sx={{
						padding: "16px",
						borderTop: "1px solid blue",
						borderBottom: "1px solid blue",
					}}
				>
					<FormControl sx={{ marginY: "8px", paddingY: "8px" }} fullWidth>
						<TextField
							
							InputLabelProps={{ shrink: true }}
							{...register("title")}
							error={errors.title?.message !== undefined}
							helperText={<>{errors.title?.message}</>}
							label="Title"
							id="task-title"
							variant="outlined"
							placeholder="Input task title"
						/>
					</FormControl>
					<FormControl sx={{ marginY: "8px", paddingY: "8px" }} fullWidth>
						<TextField
						
							InputLabelProps={{ shrink: true }}
							{...register("imgUrl")}
							error={errors.imgUrl?.message !== undefined}
							helperText={<>{errors.imgUrl?.message}</>}
							label="Image url"
							id="task-img-url"
							variant="outlined"
							placeholder="Input image url"
						/>
					</FormControl>
					<FormControl sx={{ paddingY: "8px" }} fullWidth>
						<TextField
							
							InputLabelProps={{ shrink: true }}
							{...register("description")}
							error={errors.description?.message !== undefined}
							helperText={<>{errors.description?.message}</>}
							multiline
							id="task-description"
							variant="outlined"
							label="Description"
							minRows={3}
						></TextField>
					</FormControl>
					<FormControl sx={{ paddingY: "8px" }} fullWidth>
						<Grid container justifyContent={"space-between"}>
							<Grid>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
									
										sx={{ width: "100%" }}
										value={dayjs(getValues("timeStart"), "DD-MM-YYYY")}
										{...register("timeStart")}
										label="Time Start"
										onChange={(newValue: Dayjs | null) => {
											if (newValue) {
												setValue("timeStart", newValue?.format("DD-MM-YYYY"));
												setTimeStartDate(newValue);
												
											}
										}}
										format="DD/MM/YYYY"
										slotProps={{
											textField: {
												variant: "outlined",
												error: errors.timeStart?.message !== undefined,
												helperText: <>{errors.timeStart?.message}</>,
											},
										}}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DatePicker
									
										sx={{ width: "100%" }}
										value={dayjs(getValues("timeEnd"), "DD-MM-YYYY")}
										{...register("timeEnd")}
										label="Time end"
										onChange={(newValue: Dayjs | null) => {
											if (newValue) {
												setValue("timeEnd", newValue?.format("DD-MM-YYYY"));
												setTimeEndDate(newValue);
											}
										}}
										format="DD/MM/YYYY"
										slotProps={{
											textField: {
												variant: "outlined",
												error: errors.timeEnd?.message !== undefined,
												helperText: <>{errors.timeEnd?.message}</>,
											},
										}}
									/>
								</LocalizationProvider>
							</Grid>
						</Grid>
					</FormControl>
					{/* Select for categories */}
					<FormControl sx={{ marginY: "4px" }} fullWidth>
						<InputLabel id="label-category">Categories</InputLabel>
						<Select
							

							{...register("categories")}
							labelId="label-category"
							id="category-select"
							multiple
							value={categoryName}
							onChange={handleChangeCategory}
							input={<OutlinedInput label="Categories" />}
							renderValue={(selected) => (
								<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
									{selected.map((value) => (
										<Chip key={value} label={value} />
									))}
								</Box>
							)}
							error={errors.categories?.message !== undefined}
							MenuProps={MenuProps}
						>
							{categories.map((category: Category) => (
								<MenuItem
									key={category.name}
									value={category.name}
									style={getStyles(category.name, categoryName, theme)}
								>
									{category.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					{/* Select for member */}
					<FormControl sx={{ marginY: "4px" }} fullWidth>
						<InputLabel id="label-member">Members</InputLabel>
						<Select
							// labelId="label-member"
							// id="member-select"
							// multiple
							// value={memberName}
							// onChange={handleChangeMember}
							// input={<OutlinedInput label="Members" />}
							// renderValue={(selected) => (
							// 	<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
							// 		{selected.map((value) => (
							// 			<Chip key={value} label={value} />
							// 		))}
							// 	</Box>
							// )}
							// MenuProps={MenuProps}

							{...register("members")}
							labelId="label-member"
							id="member-select"
							multiple
							value={memberName}
							onChange={handleChangeMember}
							input={<OutlinedInput label="Members" />}
							renderValue={(selected) => (
								<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
									{selected.map((value) => (
										<Chip key={value} label={value} />
									))}
								</Box>
							)}
							error={errors.members?.message !== undefined}
							MenuProps={MenuProps}
						>
							{members.map((member) => (
								<MenuItem
									key={member.name}
									value={member.name}
									style={getStyles(member.name, memberName, theme)}
								>
									{member.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="success" type="submit">
						Save
					</Button>
					<Button variant="outlined" color="info" onClick={() => handleClose()}>
						Cancel
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
