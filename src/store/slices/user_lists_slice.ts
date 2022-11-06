import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AnotherUserData from "../../data/another_user_data";
import SetUserListData from "../../data/set_user_list_data";
import UserListsState, { initialUserListsState, UserListName } from "../state/user_lists_state";

const userListsSlice = createSlice({
    name: "userLists",
    initialState: initialUserListsState,
    reducers: {
        setUserListAction: (state: UserListsState, action: PayloadAction<SetUserListData>) =>
        {
            state[action.payload.pool] = action.payload.data;
        },

        setUserListLoadMore: (state: UserListsState, action: PayloadAction<SetUserListLoadMoreData>) =>
        {
            state[action.payload.pool].loadMore = action.payload.loadMore;
        },

        setUserListLoadNoMore: (state: UserListsState, action: PayloadAction<SetUserListLoadNoMoreData>) =>
        {
            state[action.payload].noMore = true;
        },

        updateUserCard: (state: UserListsState, action: PayloadAction<UpdateUserCardData>) =>
        {
            const index = state[action.payload.pool].users.findIndex(u => u.handle === action.payload.user.handle);
            if(index === -1) return;

            state[action.payload.pool].users[index] = action.payload.user;
        },
    }
});

export type SetUserListLoadMoreData = {
    pool: UserListName;
    loadMore: boolean;
};

export type SetUserListLoadNoMoreData = UserListName;

export type UpdateUserCardData = {
    pool: UserListName;
    user: AnotherUserData;
};

export const { setUserListAction, setUserListLoadMore, setUserListLoadNoMore, updateUserCard } = userListsSlice.actions;

export default userListsSlice;