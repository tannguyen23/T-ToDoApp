import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NotificationState {
  message: string;
}

const initialState: NotificationState = {
  message: "",
};

export const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    sendNotification: (state, action: PayloadAction<{ message: string }>) => {
      console.log("Send notification : ", action.payload.message);
      state.message = action.payload.message;
    },
  },
});

export default NotificationSlice.reducer;
export const { sendNotification } = NotificationSlice.actions;
