import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import MoreOptionsMenuData from "../../data/more_options_menu_data";
import MoreOptionsMenuState, { initialMoreOptionsMenuState } from "../state/more_options_menu_state";

const moreOptionsMenuSlice = createSlice({
    name: "moreOptionsMenu",
    initialState: initialMoreOptionsMenuState,
    reducers: {
        openMoreOptionsMenu: (state: MoreOptionsMenuState, action: PayloadAction<MoreOptionsMenuData>) =>
        {
            state.data = action.payload;
            state.active = true;
        },

        closeMoreOptionsMenu: (state: MoreOptionsMenuState) =>
        {
            state.active = false;
            state.data = undefined;
        }
    }
});

export const { openMoreOptionsMenu, closeMoreOptionsMenu } = moreOptionsMenuSlice.actions;

export default moreOptionsMenuSlice;