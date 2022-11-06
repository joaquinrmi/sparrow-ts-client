import { configureStore } from "@reduxjs/toolkit";
import accountMenuSlice from "./slices/account_menu_slice";
import cheepEditorSlice from "./slices/cheep_editor_slice";
import cheepGalleryModalSlice from "./slices/cheep_gallery_modal_slice";
import cheepListsSlice from "./slices/cheep_lists_slice";
import cheepPageSlice from "./slices/cheep_page_slice";
import closeConfirmationSlice from "./slices/close_confirmation_slice";
import locationSlice from "./slices/location_slice";
import mainAsideSlice from "./slices/main_aside_slice";
import moreOptionsMenuSlice from "./slices/more_options_menu_slice";
import navigationModalSlice from "./slices/navigation_modal_slice";
import profileSlice from "./slices/profile_slice";
import recheepMenuSlice from "./slices/recheep_menu_slice";
import sessionSlice from "./slices/session_slice";
import statusMessageSlice from "./slices/status_message_slice";
import unfollowConfirmationSlice from "./slices/unfollow_confirmation_slice";
import userListsSlice from "./slices/user_lists_slice";
import { initialAccountMenuState } from "./state/account_menu_state";
import { initialCheepEditorState } from "./state/cheep_editor_state";
import { initialCheepGalleryModalState } from "./state/cheep_gallery_modal_state";
import { initialCheepListsState } from "./state/cheep_lists_state";
import { initialCheepPageState } from "./state/cheep_page_state";
import { initialCloseConfirmationState } from "./state/close_confirmation_state";
import { initialLocationState } from "./state/location_state";
import { initialMainAsideState } from "./state/main_aside_state";
import { initialMoreOptionsMenuState } from "./state/more_options_menu_state";
import { initialNavigationModalState } from "./state/navigation_modal_state";
import { initialProfileState } from "./state/profile_state";
import { initialRecheepMenuState } from "./state/recheep_menu_state";
import { initialSessionState } from "./state/session_state";
import { initialStatusMessageState } from "./state/status_message_state";
import { initialUnfollowConfirmationState } from "./state/unfollow_confirmation_state";
import { initialUserListsState } from "./state/user_lists_state";

const store = configureStore({
    reducer: {
        session: sessionSlice.reducer,
        location: locationSlice.reducer,
        profile: profileSlice.reducer,
        cheepLists: cheepListsSlice.reducer,
        userLists: userListsSlice.reducer,
        cheepPage: cheepPageSlice.reducer,
        cheepGalleryModal: cheepGalleryModalSlice.reducer,
        cheepEditor: cheepEditorSlice.reducer,
        recheepMenu: recheepMenuSlice.reducer,
        moreOptionsMenu: moreOptionsMenuSlice.reducer,
        accountMenu: accountMenuSlice.reducer,
        closeConfirmation: closeConfirmationSlice.reducer,
        unfollowConfirmation: unfollowConfirmationSlice.reducer,
        mainAside: mainAsideSlice.reducer,
        statusMessage: statusMessageSlice.reducer,
        navigationModal: navigationModalSlice.reducer,
    },
    preloadedState: {
        session: initialSessionState,
        location: initialLocationState,
        profile: initialProfileState,
        cheepLists: initialCheepListsState,
        userLists: initialUserListsState,
        cheepPage: initialCheepPageState,
        cheepGalleryModal: initialCheepGalleryModalState,
        cheepEditor: initialCheepEditorState,
        recheepMenu: initialRecheepMenuState,
        moreOptionsMenu: initialMoreOptionsMenuState,
        accountMenu: initialAccountMenuState,
        closeConfirmation: initialCloseConfirmationState,
        unfollowConfirmation: initialUnfollowConfirmationState,
        mainAside: initialMainAsideState,
        statusMessage: initialStatusMessageState,
        navigationModal: initialNavigationModalState,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;