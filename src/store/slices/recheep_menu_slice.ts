import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import RecheepMenuData from "../../data/recheep_menu_data";
import RecheepMenuState, { initialRecheepMenuState } from "../state/recheep_menu_state";

const recheepMenuSlice = createSlice({
    name: "recheepMenu",
    initialState: initialRecheepMenuState,
    reducers: {
        openRecheepMenu: (state: RecheepMenuState, action: PayloadAction<RecheepMenuData>) =>
        {
            state.data = action.payload;
            state.active = true;
        },

        closeRecheepMenu: (state: RecheepMenuState) =>
        {
            state.active = false;
            state.data = undefined;
        }
    }
});

export const { openRecheepMenu, closeRecheepMenu } = recheepMenuSlice.actions;

export default recheepMenuSlice;