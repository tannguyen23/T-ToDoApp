import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { getListDropdownMemberAsync } from '../../redux/features/MemberSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { AddTeam } from '../../types/Team';

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

export interface AddTeamDialogProps {
	open: boolean;
	addTeam: (team: AddTeam) => void;
	onClose: () => void;
}

export default function AddTeamDialog(props: AddTeamDialogProps) {
	const dispatch = useAppDispatch();
	const { authUser } = useAuth();
	const theme = useTheme();
	const members = useAppSelector((state) => state.member.members);
	const isLoadingDropdownMembers = useAppSelector(
		(state) => state.member.isLoading
	);

	const [memberName, setMemberName] = useState<string[]>([]);
	const { open, addTeam } = props;

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const handleClose = () => {
		props.onClose();
	};

	const handleAddTeam = () => {
		const timeCreate = dayjs();
		const selectMembersId : string[] = [];
		memberName.map((value: string) => {
			selectMembersId.push(value);
		});
		
		const authUserId = authUser?.id;
		if (authUserId) {
			addTeam({
				name,
				ownerId: authUserId,
				description,
				createDate: timeCreate.format("YYYY-MM-DD"),
				members: selectMembersId,
			});
		}
	};

	const handleChangeMember = (event: SelectChangeEvent<typeof memberName>) => {
		const {
			target: { value },
		} = event;
		console.log(value);
		setMemberName(
			// On autofille we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	const getNameByIdMember = (id : string) => {
		const result = members.find(member => member.id === id);
		return result?.fullname;
	}

	useEffect(() => {
		if (authUser?.id) {
			dispatch(getListDropdownMemberAsync(authUser?.id));
		}
	}, []);

	return (
		<Dialog onClose={handleClose} open={open} fullWidth maxWidth={"md"}>
			<DialogTitle>Create a new team</DialogTitle>
			<DialogContent
				sx={{
					padding: "16px",
					borderTop: "1px solid blue",
					borderBottom: "1px solid blue",
				}}
			>
				<FormControl sx={{ marginY: "8px", paddingY: "8px" }} fullWidth>
					<TextField
						label="Name"
						id="team-name"
						variant="outlined"
						placeholder="Input team name"
						value={name}
						onChange={(event) => {
							setName(event.target.value);
						}}
					/>
				</FormControl>
				<FormControl sx={{ paddingY: "8px" }} fullWidth>
					<TextField
						multiline
						id="team-description"
						variant="outlined"
						label="Description"
						minRows={3}
						value={description}
						onChange={(event) => {
							setDescription(event.target.value);
						}}
					></TextField>
				</FormControl>

				{/* Select for member */}
				<FormControl sx={{ marginY: "4px" }} fullWidth>
					<InputLabel id="label-member">Members</InputLabel>
					<Select
						labelId="label-member"
						id="member-select"
						multiple
						value={memberName}
						onChange={handleChangeMember}
						input={<OutlinedInput label="Members" />}
						renderValue={(selected) => (
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
								{selected.map((value) => (
									<Chip key={value} label={getNameByIdMember(value)} />
								))}
							</Box>
						)}
						MenuProps={MenuProps}
					>
						{members.map((member) => (
							<MenuItem
								key={member.id}
								value={member.id}
								style={getStyles(member.fullname, memberName, theme)}
							>
								{member.fullname}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="success"
					onClick={() => {
						handleAddTeam();
					}}
				>
					Add
				</Button>
				<Button variant="outlined" color="info" onClick={() => handleClose()}>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
}
