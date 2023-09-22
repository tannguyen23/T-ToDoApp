import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import memberApi from '../../apis/UserApi';
import { Member } from '../../types/Member';

interface MemberState {
	members: Member[];
	isLoading: boolean;
}

const initialState: MemberState = {
	members: [],
	isLoading: false,
};

// Create thunks
export const getListDropdownMemberAsync = createAsyncThunk<Member[], string>(
	"task/getListTask",
	async (id: string) => {
		const response = await memberApi
			.getListDropdownMember(id)
			.then((value: AxiosResponse) => {
				return value.data;
			})
			.catch((error) => {
				console.log(error);
			});
		return response;
	}
);

export const MemberSlice = createSlice({
	name: "member",
	initialState,
	reducers: {},
	extraReducers: (builder: ActionReducerMapBuilder<MemberState>) => {
		builder
			.addCase(getListDropdownMemberAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getListDropdownMemberAsync.fulfilled,
				(state, action: PayloadAction<Member[]>) => {
					state.isLoading = false;
					const tmpMemberArr: Member[] = [];
					action.payload.map((member: any) => {
						tmpMemberArr.push({
							id: member._id,
							fullname: member.fullname,
						});
					});
					state.members = tmpMemberArr;
				}
			)
			.addCase(getListDropdownMemberAsync.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export default MemberSlice.reducer;
export const {} = MemberSlice.actions;
