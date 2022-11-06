import AccountMenuData from "../../data/account_menu_data";

type AccountMenuState = {
    data?: AccountMenuData;
    active: boolean;
};

export const initialAccountMenuState: AccountMenuState = {
    active: false,
};

export default AccountMenuState;