import UserListData from "../../data/user_list_data";

type UserListsState = {
    following: UserListData;
    followers: UserListData;
    likes: UserListData;
    recheeps: UserListData;
    asideRecommended: UserListData;
    recommended: UserListData;
};

export const initialUserListsState: UserListsState = {
    following: { id: "", target: "", users: [] },
    followers: { id: "", target: "", users: [] },
    likes: { id: "", target: "", users: [] },
    recheeps: { id: "", target: "", users: [] },
    asideRecommended: { id: "", target: "", users: [] },
    recommended: { id: "", target: "", users: [] },
};

export type UserListName = keyof UserListsState;

export default UserListsState;