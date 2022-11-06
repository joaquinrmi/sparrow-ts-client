import CheepData, { emptyCheep } from "../../data/cheep_data";

type CheepGalleryModalState = {
    data: CheepData;
    photoIndex: number;
};

export const initialCheepGalleryModalState: CheepGalleryModalState = {
    data: emptyCheep,
    photoIndex: 0
};

export default CheepGalleryModalState;