import CheepListsState from "../store/state/cheep_lists_state";
import CheepListData from "./cheep_list_data";

type SetCheepListData = {
    pool: keyof CheepListsState;
    listData: CheepListData;
};

export default SetCheepListData;