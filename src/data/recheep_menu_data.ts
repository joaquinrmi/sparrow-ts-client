import { CheepListName } from "../store/state/cheep_lists_state";
import CheepData from "./cheep_data";

type RecheepMenuData = {
    listName?: CheepListName;
    index?: number;
    cheepData: CheepData;
    relevantCheepData: CheepData;
    active: boolean;
    positionX: number;
    positionY: number;
}

export default RecheepMenuData;