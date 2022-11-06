import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProfileData from "../../data/profile_data";
import ProfileState, { initialProfileState } from "../state/profile_state";

const profileSlice = createSlice({
    name: "profile",
    initialState: initialProfileState,
    reducers: {
        setProfileAction: (state: ProfileState, action: PayloadAction<ProfileData>) =>
        {
            state.data = action.payload;
        },
    }
});

export const { setProfileAction } = profileSlice.actions;

export default profileSlice;