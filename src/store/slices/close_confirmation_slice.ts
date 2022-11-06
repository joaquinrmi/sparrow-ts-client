import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CloseConfirmationData from "../../data/close_confirmation_data";
import CloseConfirmationState, { initialCloseConfirmationState } from "../state/close_confirmation_state";

const closeConfirmationSlice = createSlice({
    name: "closeConfirmation",
    initialState: initialCloseConfirmationState,
    reducers: {
        openCloseConfirmation: (state: CloseConfirmationState, action: PayloadAction<CloseConfirmationData>) =>
        {
            state.data = action.payload;
            state.active = true;
        },

        closeCloseConfirmation: (state: CloseConfirmationState) =>
        {
            state.active = false;
            state.data = undefined;
        }
    }
});

export const { openCloseConfirmation, closeCloseConfirmation } = closeConfirmationSlice.actions;

export default closeConfirmationSlice;