import CheepListData from "../../data/cheep_list_data";

type CheepListsState = {
    home: CheepListData;
    explore: CheepListData;
    profileCheeps: CheepListData;
    profileWithReplies: CheepListData;
    profileMedia: CheepListData;
    profileLikes: CheepListData;
    thread: CheepListData;
    comments: CheepListData;
    search: CheepListData;
    quotes: CheepListData;
    userGallery: CheepListData;
};

export type CheepListName = keyof CheepListsState;

export const initialCheepListsState: CheepListsState = {
    home: { query: {}, nextTime: 0, cheeps: [] },
    explore: { query: {}, nextTime: 0, cheeps: [] },
    profileCheeps: { query: {}, nextTime: 0, cheeps: [] },
    profileWithReplies: { query: {}, nextTime: 0, cheeps: [] },
    profileMedia: { query: {}, nextTime: 0, cheeps: [] },
    profileLikes: { query: {}, nextTime: 0, cheeps: [] },
    thread: { query: {}, nextTime: 0, cheeps: [] },
    comments: { query: {}, nextTime: 0, cheeps: [] },
    search: { query: {}, nextTime: 0, cheeps: [] },
    quotes: { query: {}, nextTime: 0, cheeps: [] },
    userGallery: { query: {}, nextTime: 0, cheeps: [] },
}

export default CheepListsState;