import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import StatusMessageState, { initialStatusMessageState } from "../state/status_message_state";

const statusMessageSlice = createSlice({
    name: "statusMessage",
    initialState: initialStatusMessageState,
    reducers: {
        setStatusMessage: (state: StatusMessageState, action: PayloadAction<string>) =>
        {
            state.message = action.payload;
        },
    }
});

export const { setStatusMessage } = statusMessageSlice.actions;

export default statusMessageSlice;