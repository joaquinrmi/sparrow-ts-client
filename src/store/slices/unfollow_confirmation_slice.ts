import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UnfollowConfirmationData from "../../data/unfollow_confirmation_data";
import UnfollowConfirmationState, { initialUnfollowConfirmationState } from "../state/unfollow_confirmation_state";

const unfollowConfirmationSlice = createSlice({
    name: "unfollowConfirmation",
    initialState: initialUnfollowConfirmationState,
    reducers: {
        openUnfollowConfirmation: (state: UnfollowConfirmationState, action: PayloadAction<UnfollowConfirmationData>) =>
        {
            state.data = action.payload;
            state.active = true;
        },

        closeUnfollowConfirmation: (state: UnfollowConfirmationState) =>
        {
            state.active = false;
            state.data = undefined;
        }
    }
});

export const { openUnfollowConfirmation, closeUnfollowConfirmation } = unfollowConfirmationSlice.actions;

export default unfollowConfirmationSlice;