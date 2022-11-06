import UserListsState from "../store/state/user_lists_state";
import UserListData from "./user_list_data";

type SetUserListData = {
    pool: keyof UserListsState;
    data: UserListData;
};

export default SetUserListData;