import CheepData from "../data/cheep_data";
import CheepDataResponse from "../request/response/cheep_data_response";

function processCheep(data: CheepDataResponse, processResponseTarget?: boolean): CheepData
{
    const result: CheepData = {
        id: data.id,
        author: data.author,
        dateCreated: data.dateCreated,
        content: data.content || undefined,
        gallery: data.gallery || [],
        quoteTarget: data.quoteTarget ? processCheep(data.quoteTarget) : undefined,
        commentCount: Number(data.comments),
        likeCount: Number(data.likes),
        recheepCount: Number(data.recheeps),
        withCommentsCount: Number(data.quotes),
        recheepped: data.userRecheepedIt,
        liked: data.userLikesIt
    };

    if(processResponseTarget)
    {
        if(data.responseOf)
        {
            result.responseOf = processCheep(data.responseOf, true);
            result.responseOf.existsJustBecauseItIsAResponseTarget = true;
        }
    }

    return result;
}

export default processCheep;