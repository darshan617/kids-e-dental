import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: 'Darshan'
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setName: (state, {payload}) => {
            state.name = payload
        }
    }
})

export const {  setName} = userSlice.actions;
export const selectName = (state) => state.user.name;

export default userSlice.reducer;