import RecheepMenuData from "../../data/recheep_menu_data";

type RecheepMenuState = {
    data?: RecheepMenuData;
    active: boolean;
};

export const initialRecheepMenuState: RecheepMenuState = {
    active: false,
};

export default RecheepMenuState;