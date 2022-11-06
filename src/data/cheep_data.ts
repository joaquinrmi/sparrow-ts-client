interface CheepData
{
    deleted?: boolean;
    id: number;
    author:
    {
        id: number;
        handle: string;
        name: string;
        picture: string;
    };
    dateCreated: number;
    content?: string;
    gallery: Array<string>;
    quoteId?: number;
    responseId?: number;
    quoteTarget?: CheepData;
    commentCount: number;
    likeCount: number;
    recheepCount: number;
    withCommentsCount: number;
    responseOf?: CheepData;
    recheepped: boolean;
    liked: boolean;
    existsJustBecauseItIsAResponseTarget?: boolean;
}

export const emptyCheep: CheepData = {
    deleted: true,
    id: 0,
    author: {
        id: 0,
        handle: "",
        name: "",
        picture: "",
    },
    dateCreated: 0,
    gallery: [],
    commentCount: 0,
    likeCount: 0,
    recheepCount: 0,
    withCommentsCount: 0,
    recheepped: false,
    liked: false
};

export default CheepData;