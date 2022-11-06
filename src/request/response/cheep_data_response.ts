import UserData from "../../data/user_data";

type CheepDataResponse = {
    id: number;
    author: UserData,
    dateCreated: number;
    content: string;
    gallery: Array<string>;
    quoteId: number;
    responseId: number;
    quoteTarget?: CheepDataResponse;
    responseOf?: CheepDataResponse;
    comments: number;
    likes: number;
    recheeps: number;
    quotes: number;
    userLikesIt: boolean;
    userRecheepedIt: boolean;
};

export default CheepDataResponse;