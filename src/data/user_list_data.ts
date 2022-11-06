import AnotherUserData from "./another_user_data";

interface UserListData
{
    id: string;
    target: string | number;
    users: Array<AnotherUserData>;
    loadMore?: boolean;
    noMore?: boolean;
}

export default UserListData;