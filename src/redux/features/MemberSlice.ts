import { createSlice } from '@reduxjs/toolkit';

import { Member } from '../../types/Member';

interface MemberState {
  members: Member[];
}

const initialState: MemberState = {
  members: [
    { id: 0, name: "Tran Cong A", avatar : "/" },
    { id: 1, name: "Nguyen Van B" , avatar : "/" },
    { id: 2, name: "Le Thi C", avatar : "/"  },
    { id: 3, name: "Vo Minh D", avatar : "/"  },
  ],
};

export const MemberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
});

export default MemberSlice.reducer;
export const {} = MemberSlice.actions;
