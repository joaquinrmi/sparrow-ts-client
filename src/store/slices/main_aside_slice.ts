import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import MainAsideData from "../../data/main_aside_data";
import MainAsideState, { initialMainAsideState } from "../state/main_aside_state";

const mainAsideSlice = createSlice({
    name: "mainAside",
    initialState: initialMainAsideState,
    reducers: {
        setMainAsideData: (state: MainAsideState, action: PayloadAction<MainAsideData>) =>
        {
            state.data = action.payload;
        },
    }
});

export const { setMainAsideData } = mainAsideSlice.actions;

export default mainAsideSlice;