import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AccountMenuData from "../../data/account_menu_data";
import AccountMenuState, { initialAccountMenuState } from "../state/account_menu_state";

const accountMenuSlice = createSlice({
    name: "accountMenu",
    initialState: initialAccountMenuState,
    reducers: {
        openAccountMenu: (state: AccountMenuState, action: PayloadAction<AccountMenuData>) =>
        {
            state.data = action.payload;
            state.active = true;
        },

        closeAccountMenu: (state: AccountMenuState) =>
        {
            state.active = false;
            state.data = undefined;
        }
    }
});

export const { openAccountMenu, closeAccountMenu } = accountMenuSlice.actions;

export default accountMenuSlice;