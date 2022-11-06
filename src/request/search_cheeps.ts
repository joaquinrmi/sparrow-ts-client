import CheepData from "../data/cheep_data";
import SearchCheepsParams from "../data/search_cheeps_params";
import processCheep from "../utils/process_cheep";
import CheepDataResponse from "./response/cheep_data_response";
import apiRouter from "./router";
import StatusCode from "./status_code";

type CheepListData = {
    cheeps: Array<CheepData>;
    next: number;
};

async function searchCheeps(query: SearchCheepsParams, hideResponseTarget?: boolean): Promise<CheepListData>
{
    try
    {
        var response = await apiRouter.cheep.search({
            params: query
        });
    }
    catch(err)
    {
        return {
            cheeps: [],
            next: 0
        };
    }

    if(response.status === StatusCode.OK && response.data)
    {
        const { cheeps, next } = response.data;

        const processedCheeps = processCheepList(cheeps, hideResponseTarget);

        return {
            cheeps: processedCheeps,
            next: next
        };
    }
    else
    {
        return {
            cheeps: [],
            next: 0
        };
    }
}

export async function getTimeline(nextTo?: number): Promise<CheepListData>
{
    try
    {
        var response = await apiRouter.cheep.timeline({
            params: { nextTo }
        });
    }
    catch(err)
    {
        return {
            cheeps: [],
            next: 0
        };
    }

    if(response.status === StatusCode.OK && response.data)
    {
        const { cheeps, next } = response.data;

        const processedCheeps = processCheepList(cheeps);

        return {
            cheeps: processedCheeps,
            next: next
        };
    }
    else
    {
        return {
            cheeps: [],
            next: 0
        };
    }
}

export async function exploreCheeps(nextTo?: number): Promise<CheepListData>
{
    try
    {
        var response = await apiRouter.cheep.explore({
            params: { nextTo }
        });
    }
    catch(err)
    {
        return {
            cheeps: [],
            next: 0
        };
    }

    if(response.status === StatusCode.OK && response.data)
    {
        const { cheeps, next } = response.data;

        const processedCheeps = processCheepList(cheeps);

        return {
            cheeps: processedCheeps,
            next: next
        };
    }
    else
    {
        return {
            cheeps: [],
            next: 0
        };
    }
}

export async function likedCheeps(userHandle: string, nextTo?: number): Promise<CheepListData>
{
    try
    {
        var response = await apiRouter.cheep.likedList({
            params: { userHandle, nextTo }
        });
    }
    catch(err)
    {
        return {
            cheeps: [],
            next: 0
        };
    }

    if(response.status === StatusCode.OK && response.data)
    {
        const { cheeps, next } = response.data;

        const processedCheeps = processCheepList(cheeps);

        return {
            cheeps: processedCheeps,
            next: next
        };
    }
    else
    {
        return {
            cheeps: [],
            next: 0
        };
    }
}

function processCheepList(cheeps: Array<CheepDataResponse>, hideResponseTarget?: boolean): Array<CheepData>
{
    let processedCheeps = new Array<CheepData>();
    for(const resposeCheep of cheeps)
    {
        const cheep = processCheep(resposeCheep);

        if(!hideResponseTarget && resposeCheep.responseOf !== undefined)
        {
            const responseTarget = processCheep(resposeCheep.responseOf);
            responseTarget.existsJustBecauseItIsAResponseTarget = true;
            cheep.responseOf = responseTarget;

            processedCheeps.push(responseTarget);
        }

        processedCheeps.push(cheep);
    }

    return processedCheeps;
}

export default searchCheeps;