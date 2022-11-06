import MoreOptionsMenuData from "../../data/more_options_menu_data";

type MoreOptionsMenuState = {
    data?: MoreOptionsMenuData;
    active: boolean;
};

export const initialMoreOptionsMenuState: MoreOptionsMenuState = {
    active: false,
};

export default MoreOptionsMenuState;