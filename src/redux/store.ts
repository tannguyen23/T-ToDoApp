import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// Slice
import { TaskSlice } from "./features/TaskSlice";
import { NotificationSlice } from "./features/NotificationSlice";
import { ActionSlice } from "./features/ActionSlice";
import { CategorySlice } from "./features/CategorySlice";
import { MemberSlice } from "./features/MemberSlice";
import { TeamSlice } from "./features/TeamSlice";
export const store = configureStore({
  reducer: {
    task: TaskSlice.reducer,
    notification: NotificationSlice.reducer,
    category: CategorySlice.reducer,
    member: MemberSlice.reducer,
    team: TeamSlice.reducer,
    action : ActionSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
