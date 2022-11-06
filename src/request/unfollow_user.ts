import apiRouter from "./router";

async function unfollowUser(userHandle: string): Promise<void>
{
    try
    {
        await apiRouter.user.unfollow({ params: userHandle });
    }
    catch(err)
    {
        return;
    }
}

export default unfollowUser;