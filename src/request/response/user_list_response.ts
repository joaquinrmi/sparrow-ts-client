import AnotherUserData from "../../data/another_user_data";

type UserListResponse = {
    users: Array<AnotherUserData>;
    next: number;
};

export default UserListResponse;