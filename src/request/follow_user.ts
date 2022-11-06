import apiRouter from "./router";

async function followUser(userHandle: string): Promise<void>
{
    try
    {
        await apiRouter.user.follow({ params: userHandle });
    }
    catch(err)
    {
        return;
    }
}

export default followUser;