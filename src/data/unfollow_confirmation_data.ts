import { UserListName } from "../store/state/user_lists_state";
import AnotherUserData from "./another_user_data";
import ProfileData from "./profile_data";

type UnfollowConfirmationData = {
    userHandle: string;
    componentType: "card" | "profile";
    listName?: UserListName;
    user?: AnotherUserData;
    profile?: ProfileData;
};

export default UnfollowConfirmationData;