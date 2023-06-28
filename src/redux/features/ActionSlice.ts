import { createSlice } from '@reduxjs/toolkit';

interface ActionState {
  isLoadingAction: boolean;
}

const initialState: ActionState = {
  isLoadingAction: false,
};

export const ActionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    startAction: (state) => {
      state.isLoadingAction = true;
    },
    finishAction: (state) => {
      state.isLoadingAction =false;
    },
  },
});

export default ActionSlice.reducer;
export const { startAction,finishAction } = ActionSlice.actions;
