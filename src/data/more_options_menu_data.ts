import { CheepListName } from "../store/state/cheep_lists_state";
import CheepData from "./cheep_data";

type MoreOptionsMenuData = {
    listName: CheepListName;
    cheepIndex: number;
    targetCheep: CheepData;
    positionX: number;
    positionY: number;
};

export default MoreOptionsMenuData;