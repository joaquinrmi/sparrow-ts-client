import { createSlice } from "@reduxjs/toolkit";
import NavigationModalState, { initialNavigationModalState } from "../state/navigation_modal_state";

const navigationModalSlice = createSlice({
    name: "navigationModal",
    initialState: initialNavigationModalState,
    reducers: {
        openNavigationModal: (state: NavigationModalState) =>
        {
            state.open = true;
        },

        closeNavigationModal: (state: NavigationModalState) =>
        {
            state.open = false;
        }
    }
});

export const { openNavigationModal, closeNavigationModal } = navigationModalSlice.actions;

export default navigationModalSlice;