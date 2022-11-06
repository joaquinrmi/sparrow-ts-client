import CheepData, { emptyCheep } from "../../data/cheep_data";

type CheepPageState = {
    data: CheepData;
};

export const initialCheepPageState: CheepPageState = {
    data: emptyCheep
};

export default CheepPageState;