import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Team } from "../../types/Team";

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
      members : [],
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
  },
});

export default TeamSlice.reducer;
export const { addTeam } = TeamSlice.actions;
