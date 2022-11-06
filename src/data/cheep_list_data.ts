import { CheepListName } from "../store/state/cheep_lists_state";
import CheepData from "./cheep_data";
import SearchCheepsQuery from "./search_cheeps_query";

interface CheepListData
{
    query: SearchCheepsQuery;
    nextTime: number;
    cheeps: Array<CheepData>;
    loadMore?: boolean;
    noMore?: boolean;
    pool?: CheepListName;
}

export default CheepListData;