import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import styled from 'styled-components';

import { useAuth } from '../../contexts/AuthContext';
import { finishAction, startAction } from '../../redux/features/ActionSlice';
import { sendNotification } from '../../redux/features/NotificationSlice';
import { addTeam, addTeamAsync } from '../../redux/features/TeamSlice';
import { useAppDispatch } from '../../redux/store';
import { AddTeam } from '../../types/Team';
import AddTeamDialog from './AddTeamDialog';
import JoinTeamDialog from './JoinTeamDialog';
import ListTeam from './ListTeam';
import ViewTeamDialog from './ViewTeamDialog';

const Container = styled.div`
	padding: 6px;
	text-align: right;
	height: 92vh;
	overflow-y: auto;
	overflow-x: hidden;
`;
export default function Teams() {
	const dispatch = useAppDispatch();
	const { authUser } = useAuth();

	const [openAddTeamDialog, setOpenAddTeamDialog] = useState(false);
	const [openJoinTeamDialog, setOpenJoinTeamDialog] = useState(false);
	const [openViewTeamDialog, setOpenViewTeamDialog] = useState(false);
	const [idTeamView, setIdTeamView] = useState<string | undefined>();

	const handleClickOpenAddTeamDialog = () => {
		setOpenAddTeamDialog(true);
	};

	const handleCloseAddTeamDialog = () => {
		setOpenAddTeamDialog(false);
	};

	const handleClickOpenJoinTeamDialog = () => {
		setOpenJoinTeamDialog(true);
	};

	const handleCloseJointeamDialog = () => {
		setOpenJoinTeamDialog(false);
	};

	const handleClickOpenViewTeamDialog = () => {
		setOpenViewTeamDialog(true);
	};

	const handleCloseViewTeamDialog = () => {
		setOpenViewTeamDialog(false);
	};

	const handleAddTeam = (team: AddTeam) => {
		// dispatch(addTeam({ addTeam: team }));
		// console.log(JSON.stringify(team));
		// dispatch(sendNotification({ message: "Add team successfully " }));
		// handleCloseAddTeamDialog();

		dispatch(startAction());
		dispatch(addTeamAsync(team))
			.unwrap()
			.then(() => {
				// dispatch(getAllTeam(authUser ?.id || ""));
				dispatch(sendNotification({ message: "Add team successfully " }));
				handleCloseAddTeamDialog();
			})
			.catch(() => {
				dispatch(sendNotification({ message: "Add team failed " }));
			})
			.finally(() => {
				dispatch(finishAction());
			});
	};

	const handleRemoveTeam = (deleteTeamId: string) => {
		// dispatch(deleteTeam({ deleteTeamId }));
		// dispatch(sendNotification({ message: "Delete team successfully " }));
		// handleCloseViewTeamDialog();
	};

	return (
		<Container>
			<Grid container justifyContent={"flex-end"} gap={2}>
				<Button
					variant="contained"
					onClick={handleClickOpenJoinTeamDialog}
					color="info"
					size="small"
				>
					Join a team
				</Button>
				<Button
					variant="contained"
					onClick={handleClickOpenAddTeamDialog}
					color="info"
					size="small"
				>
					Create a new Team
				</Button>
			</Grid>

			<ListTeam
				handleOpenAddDialog={() => {
					handleClickOpenAddTeamDialog();
				}}
				handleOpenViewDialog={(id: string | undefined) => {
					setIdTeamView(id);
					handleClickOpenViewTeamDialog();
				}}
			/>
			{openAddTeamDialog ? (
				<AddTeamDialog
					addTeam={handleAddTeam}
					open={openAddTeamDialog}
					onClose={() => handleCloseAddTeamDialog()}
				/>
			) : (
				<></>
			)}
			{openJoinTeamDialog ? (
				<JoinTeamDialog
					open={openJoinTeamDialog}
					onClose={() => handleCloseJointeamDialog()}
				/>
			) : (
				<></>
			)}
			{openViewTeamDialog ? (
				<ViewTeamDialog
					id={idTeamView}
					open={openViewTeamDialog}
					onClose={() => {
						handleCloseViewTeamDialog();
					}}
					onDelete={(id) => {
						handleRemoveTeam(id);
					}}
				/>
			) : (
				<></>
			)}
		</Container>
	);
}
