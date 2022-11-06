import MainAsideData from "../../data/main_aside_data";

type MainAsideState = {
    data: MainAsideData;
};

export const initialMainAsideState: MainAsideState = {
    data: {
        userHandle: ""
    }
};

export default MainAsideState;