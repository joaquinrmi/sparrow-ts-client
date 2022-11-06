import { CheepListName } from "../store/state/cheep_lists_state";
import CheepData from "./cheep_data";

type UpdateCheepData = {
    listName: CheepListName;
    cheep: CheepData;
};

export default UpdateCheepData;