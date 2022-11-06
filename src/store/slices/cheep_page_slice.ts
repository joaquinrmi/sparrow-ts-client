import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CheepData from "../../data/cheep_data";
import CheepPageState, { initialCheepPageState } from "../state/cheep_page_state";

const cheepPageSlice = createSlice({
    name: "cheepPage",
    initialState: initialCheepPageState,
    reducers: {
        setCheepPage: (state: CheepPageState, action: PayloadAction<CheepData>) =>
        {
            state.data = action.payload;
        },
    }
});

export const { setCheepPage } = cheepPageSlice.actions;

export default cheepPageSlice;