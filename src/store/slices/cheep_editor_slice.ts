import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CheepData from "../../data/cheep_data";
import CheepEditorState, { initialCheepEditorState } from "../state/cheep_editor_state";

const cheepEditorSlice = createSlice({
    name: "cheepEditor",
    initialState: initialCheepEditorState,
    reducers: {
        setEditorTargetCheep: (state: CheepEditorState, action: PayloadAction<CheepData | undefined>) =>
        {
            state.targetCheep = action.payload;
        },

        setEditorResponseTarget: (state: CheepEditorState, action: PayloadAction<CheepData | undefined>) =>
        {
            state.responseTarget = action.payload;
        }
    }
});

export const { setEditorTargetCheep, setEditorResponseTarget } = cheepEditorSlice.actions;

export default cheepEditorSlice;