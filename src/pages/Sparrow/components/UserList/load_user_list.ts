import AnotherUserData from "../../../../data/another_user_data";
import APIResponse from "../../../../request/api_response";
import UserListResponse from "../../../../request/response/user_list_response";
import apiRouter from "../../../../request/router";
import { UserListType } from "./UserList";

async function loadUserList(type: UserListType, target: string | number, nextTo?: number): Promise<Array<AnotherUserData>>
{
    let response: APIResponse<UserListResponse> | undefined;
    switch(type)
    {
    case UserListType.Followers:
        response = await apiRouter.user.followerList({
            params: {
                userHandle: target as string,
                nextTo
            }
        });
        break;

    case UserListType.Following:
        response = await apiRouter.user.followingList({
            params: {
                userHandle: target as string,
                nextTo
            }
        });
        break;

    case UserListType.Recommended:
        response = await apiRouter.user.recommendedList({
            params: { nextTo }
        });
        break;

    case UserListType.Like:
        response = await apiRouter.user.usersLikedList({
            params: {
                cheepId: target as number,
                nextTo
            }
        });
        break;

    case UserListType.Recheep:
        response = await apiRouter.user.usersRecheeppedList({
            params: {
                cheepId: target as number,
                nextTo
            }
        });
        break;
    }

    if(response.status === 200 && response.data)
    {
        return response.data.users;
    }
    else
    {
        return [];
    }
}

export default loadUserList;