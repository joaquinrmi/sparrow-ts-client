import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CheepData from "../../data/cheep_data";
import SetCheepListData from "../../data/set_cheep_list_data";
import UpdateCheepData from "../../data/update_cheep_data";
import CheepListsState, { CheepListName, initialCheepListsState } from "../state/cheep_lists_state";

const cheepListsSlice = createSlice({
    name: "cheepLists",
    initialState: initialCheepListsState,
    reducers: {
        setCheepListAction: (state: CheepListsState, action: PayloadAction<SetCheepListData>) =>
        {
            state[action.payload.pool] = action.payload.listData;
        },

        updateCheep: (state: CheepListsState, action: PayloadAction<UpdateCheepData>) =>
        {
            const index = state[action.payload.listName].cheeps.findIndex((c) => c.id === action.payload.cheep.id);
            if(index === -1) return;

            state[action.payload.listName].cheeps[index] = action.payload.cheep;
        },

        deleteCheep: (state: CheepListsState, action: PayloadAction<DeleteCheepData>) =>
        {
            state[action.payload.pool].cheeps[action.payload.index].deleted = true;
        },

        setCheepListLoadMore: (state: CheepListsState, action: PayloadAction<SetCheepListLoadMoreData>) =>
        {
            state[action.payload.pool].loadMore = action.payload.loadMore;
        },

        setCheepListLoadNoMore: (state: CheepListsState, action: PayloadAction<SetCheepListLoadNoMoreData>) =>
        {
            state[action.payload].noMore = true;
        },

        addNewCheep: (state: CheepListsState, action: PayloadAction<AddNewCheepData>) =>
        {
            state[action.payload.pool].cheeps.splice(0, 0, action.payload.cheep);
        },

        removeCheep: (state: CheepListsState, action: PayloadAction<RemoveCheepData>) =>
        {
            const index = state[action.payload.pool].cheeps.findIndex((c) => c.id === action.payload.id);
            if(index === -1) return;

            state[action.payload.pool].cheeps.splice(index, 1);
        },

        discountRecheep: (state: CheepListsState, action: PayloadAction<RemoveRecheepData>) =>
        {
            const index = state[action.payload.pool].cheeps.findIndex((c) => c.id === action.payload.id);
            if(index === -1) return;

            state[action.payload.pool].cheeps[index].recheepped = false;
            state[action.payload.pool].cheeps[index].recheepCount -= 1;
        },

        discountLike: (state: CheepListsState, action: PayloadAction<DiscountLikeData>) =>
        {
            const index = state[action.payload.pool].cheeps.findIndex((c) => c.id === action.payload.id);
            if(index === -1) return;

            state[action.payload.pool].cheeps[index].liked = false;
            state[action.payload.pool].cheeps[index].likeCount -= 1;
        }
    }
});

export type DeleteCheepData = {
    pool: CheepListName;
    index: number;
};

export type SetCheepListLoadMoreData = {
    pool: CheepListName;
    loadMore: boolean;
};

export type SetCheepListLoadNoMoreData = CheepListName;

export type AddNewCheepData = {
    pool: CheepListName;
    cheep: CheepData;
};

export type RemoveCheepData = {
    pool: CheepListName;
    id: number;
};

export type RemoveRecheepData = {
    pool: CheepListName;
    id: number;
};

export type DiscountLikeData = {
    pool: CheepListName;
    id: number;
};

export const { setCheepListAction, updateCheep, deleteCheep, setCheepListLoadMore, setCheepListLoadNoMore, addNewCheep, removeCheep, discountRecheep, discountLike } = cheepListsSlice.actions;

export default cheepListsSlice;