import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import LocationData from "../../data/location_data";
import LocationState, { initialLocationState } from "../state/location_state";

const locationSlice = createSlice({
    name: "location",
    initialState: initialLocationState,
    reducers: {
        navigateAction: (state: LocationState, action: PayloadAction<LocationData>) =>
        {
            state[action.payload.page] = action.payload.path;
        },
    }
});

export const { navigateAction } = locationSlice.actions;

export default locationSlice;