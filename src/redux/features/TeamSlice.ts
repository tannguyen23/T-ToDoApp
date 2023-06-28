import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Team } from '../../types/Team';

interface TeamState {
  teams: Team[];
}

const initialState: TeamState = {
  teams: [
    {
      id: 0,
      name: "Design ABC",
      createTime: "23-12-2022",
      description: "Lorem ipsum dolor sit amet, consectetur adip",
      ownerId: 1,
      members: [],
    },
    {
      name: "Front end",
      ownerId: 0,
      description:
        "Focus on the design and implementation of the interface for the project",
      createTime: "15-05-2023",
      members: [
        { id: 0, name: "Nguyen Van B", avatar: "/" },
        { id: 1, name: "Tran Cong A", avatar: "/" },
      ],
      id: 1,
    },
    {
      name: "Back end",
      ownerId: 0,
      description:
        "Focus on API design and implementation, project architecture",
      createTime: "15-05-2023",
      members: [
        { id: 0, name: "Le Thi C", avatar: "/" },
        { id: 1, name: "Vo Minh D", avatar: "/" },
      ],
      id: 2,
    },
  ],
};

export const TeamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addTeam: (state, action: PayloadAction<{ addTeam: Team }>) => {
      console.log("Adding team");
      action.payload.addTeam.id = state.teams.length;
      state.teams.push(action.payload.addTeam);
    },
    deleteTeam: (state, action: PayloadAction<{ deleteTeamId: number }>) => {
      console.log("Deleting team");
      const indexDeleteTeamId = state.teams.findIndex(
        (team) => team.id === action.payload.deleteTeamId
      );
      state.teams.splice(indexDeleteTeamId, 1);
    },
  },
});

export default TeamSlice.reducer;
export const { addTeam, deleteTeam } = TeamSlice.actions;
