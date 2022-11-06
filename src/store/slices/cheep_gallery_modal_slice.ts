import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CheepGalleryModalState, { initialCheepGalleryModalState } from "../state/cheep_gallery_modal_state";

const cheepGalleryModalSlice = createSlice({
    name: "cheepGalleryModal",
    initialState: initialCheepGalleryModalState,
    reducers: {
        setCheepGalleryModal: (state: CheepGalleryModalState, action: PayloadAction<CheepGalleryModalState>) =>
        {
            state.data = action.payload.data;
            state.photoIndex = action.payload.photoIndex;
        },
    }
});

export const { setCheepGalleryModal } = cheepGalleryModalSlice.actions;

export default cheepGalleryModalSlice;