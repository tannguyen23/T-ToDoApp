import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import teamApi from '../../apis/TeamApi';
import { AddTeam, ViewTeam } from '../../types/Team';

interface TeamState {
	myTeams : ViewTeam[];
	joinedTeams: ViewTeam[];
	isLoading: boolean;
}

const initialState: TeamState = {
	
	isLoading: false,
	myTeams: [],
	joinedTeams: [],
};

// Create thunks

export const addTeamAsync = createAsyncThunk(
	"team/addTeam",
	async (addTeam: AddTeam, { rejectWithValue }) => {
		const response = await teamApi
			.addTeam(addTeam)
			.then((value: AxiosResponse) => {
				return value.data;
			})
			.catch((error) => {
				console.log("Loi o day");
				console.log(error);
				return rejectWithValue(error);
			});
		return response;
	}
);

export const loadListMyTeamsAsync =  createAsyncThunk<ViewTeam[], string>(
	"team/getListMyTeams",
	async (id: string) => {
		const response = await teamApi
			.loadMyTeams(id)
			.then((value: AxiosResponse) => {
				return value.data;
			})
			.catch((error) => {
				console.log(error);
			});
		return response;
	}
);
export const loadListJoinedTeamsAsync =  createAsyncThunk<ViewTeam[], string>(
	"team/getListJoinedTeams",
	async (id: string) => {
		const response = await teamApi
			.loadJoinedTeam(id)
			.then((value: AxiosResponse) => {
				return value.data;
			})
			.catch((error) => {
				console.log(error);
			});
		return response;
	}
);

export const TeamSlice = createSlice({
	name: "team",
	initialState,
	reducers: {
		addTeam: (state, action: PayloadAction<{ addTeam: AddTeam }>) => {
			// console.log("Adding team");
			// action.payload.addTeam.id = state.teams.length;
			// state.teams.push(action.payload.addTeam);
		},
		deleteTeam: (state, action: PayloadAction<{ deleteTeamId: number }>) => {
			// console.log("Deleting team");
			// const indexDeleteTeamId = state.teams.findIndex(
			// 	(team) => team.id === action.payload.deleteTeamId
			// );
			// state.teams.splice(indexDeleteTeamId, 1);
		},
	},
	extraReducers: (builder: ActionReducerMapBuilder<TeamState>) => {
		builder
			.addCase(addTeamAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addTeamAsync.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(addTeamAsync.rejected, (state) => {
				state.isLoading = true;
			})
			.addCase(loadListMyTeamsAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loadListMyTeamsAsync.fulfilled, (state, action : PayloadAction<ViewTeam[]>) => {
				state.isLoading = false;
				const tmpTeamArr: ViewTeam[] = [];
					action.payload.map((team) => {
						tmpTeamArr.push({
							id: team._id,
							...team,
						});
					});

				state.myTeams = tmpTeamArr;
			})
			.addCase(loadListMyTeamsAsync.rejected, (state) => {
				state.isLoading = true;
			})
			.addCase(loadListJoinedTeamsAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loadListJoinedTeamsAsync.fulfilled, (state, action : PayloadAction<ViewTeam[]>) => {
				state.isLoading = false;
				const tmpTeamArr: ViewTeam[] = [];
					action.payload.map((team) => {
						tmpTeamArr.push({
							id: team._id,
							...team,
						});
					});
				state.joinedTeams = tmpTeamArr;
			})
			.addCase(loadListJoinedTeamsAsync.rejected, (state) => {
				state.isLoading = true;
			})
	},
});

export default TeamSlice.reducer;
export const { addTeam, deleteTeam } = TeamSlice.actions;
