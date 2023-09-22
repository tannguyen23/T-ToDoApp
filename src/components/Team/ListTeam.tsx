import AddIcon from '@mui/icons-material/Add';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { loadListJoinedTeamsAsync, loadListMyTeamsAsync } from '../../redux/features/TeamSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ViewTeam } from '../../types/Team';
import { convertStrDateToMonthDayString } from '../../utils/convert';

const renderListTeam = (
	teams: ViewTeam[],
	handleOpenViewDialog: (id: string | undefined) => void,
	handleOpenAddDialog: () => void
) => {
	return (
		<Box
			sx={{
				height: "auto",
				width: "100%",
				backgroundColor: "#c6c4d4",
			}}
		>
			<Grid
				container
				spacing={4}
				sx={{
					marginY: "4px",
					marginX: "0",
					height: "auto",
					minHeight: "50vh",
					width: "100%",
				}}
				alignItems="stretch"
			>
				{teams.map((team, index) => (
					<Grid key={team.id} xs={6} sm={4} md={3} lg={2} sx={{ height: "50%" }}>
						<Box boxShadow={6}>
							<Card variant="outlined" sx={{ minHeight: "100%" }}>
								<CardActionArea
									sx={{ padding: "2px", overflow: "hidden" }}
									onClick={() => {
										console.log("Open view dialog..." + team?.id);
										handleOpenViewDialog(team?.id);
									}}
								>
									<CardMedia
										sx={{ borderRadius: "4px" }}
										component="img"
										height="120px"
										width="auto"
										image={process.env.PUBLIC_URL + "/img/group.png"}
										alt="team img"
									/>
									<CardContent sx={{ textAlign: "left" }}>
										<Grid
											container
											justifyContent="space-between"
											alignItems="center"
											direction={"row"}
										>
											<Grid>
												<Typography variant="h6" component="span">
													{team.name}
												</Typography>
											</Grid>
											<Grid>
												<Typography variant="body2" component="span">
													{convertStrDateToMonthDayString(team.createDate)}
												</Typography>
											</Grid>
										</Grid>
										<Typography
											variant="body2"
											component="span"
											color={"rgb(0,0,0,0.5)"}
										>
											{team.members.length} members
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Box>
					</Grid>
				))}
				<Grid xs={6} sm={4} md={3} lg={2} sx={{ height: "25vh" }}>
					<CardActionArea
						sx={{
							border: "2px dashed #1976d2",
							height: "100%",
							background: "#ffffff",
						}}
						onClick={() => {
							console.log("Open add dialog...");
							handleOpenAddDialog();
						}}
					>
						<Grid container justifyContent={"center"} alignItems={"center"}>
							<Grid>
								<Box fontSize={"large"} color="text.primary">
									Add New
								</Box>
							</Grid>
							<Grid>
								<AddIcon sx={{ fontSize: "5rem" }} color="primary"></AddIcon>
							</Grid>
						</Grid>
					</CardActionArea>
				</Grid>
			</Grid>
		</Box>
	);
};

interface ListTeamProps {
	handleOpenAddDialog: () => void;
	handleOpenViewDialog: (id: string | undefined) => void;
}

export default function ListTeam(props: ListTeamProps) {
	const { authUser } = useAuth();
	const dispatch = useAppDispatch();
	const myTeams = useAppSelector((state) => state.team.myTeams);
	const joinedTeams = useAppSelector((state) => state.team.joinedTeams);

	useEffect(() => {
		if (authUser?.id) {
			dispatch(loadListMyTeamsAsync(authUser?.id));
			dispatch(loadListJoinedTeamsAsync(authUser?.id));
		}
	}, []);

	return (
		<Grid container flexDirection={"column"} alignItems={"center"}>
			<Typography
				variant="h5"
				width={"100%"}
				textAlign={"left"}
				color={"secondary"}
				fontWeight={"bold"}
			>
				My team
			</Typography>

			{myTeams &&
				renderListTeam(
					myTeams,
					props.handleOpenViewDialog,
					props.handleOpenAddDialog
				)}
			<Typography
				variant="h5"
				width={"100%"}
				textAlign={"left"}
				color={"secondary"}
				fontWeight={"bold"}
			>
				Joined team
			</Typography>

			{joinedTeams &&
				renderListTeam(
					joinedTeams,
					props.handleOpenViewDialog,
					props.handleOpenAddDialog
				)}
		</Grid>
	);
}
