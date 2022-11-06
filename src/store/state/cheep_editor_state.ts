import CheepData from "../../data/cheep_data";
import { CheepListName } from "./cheep_lists_state";

type CheepEditorState = {
    cheepListTarget: CheepListName;
    responseTarget?: CheepData;
    targetCheep?: CheepData;
};

export const initialCheepEditorState: CheepEditorState = {
    cheepListTarget: "profileCheeps"
};

export default CheepEditorState;