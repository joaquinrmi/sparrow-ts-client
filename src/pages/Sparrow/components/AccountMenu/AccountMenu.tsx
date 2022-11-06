import "./AccountMenu.scss";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { closeAccountMenu } from "../../../../store/slices/account_menu_slice";
import { logout } from "../../../../store/slices/session_slice";
import { setStatusMessage } from "../../../../store/slices/status_message_slice";

const AccountMenu: React.FunctionComponent = () =>
{
    const dispatch = useAppDispatch();
    const userSession = useAppSelector(state => state.session);
    const accountMenu = useAppSelector(state => state.accountMenu);

    if(accountMenu !== undefined && accountMenu.data)
    {
        var menuData = accountMenu.data;
    }
    else
    {
        return <></>;
    }

    return <>
        <div
            className="account-menu-container"
            onClick={() =>
            {
                dispatch(closeAccountMenu());
            }}
        ></div>

        <div
            className="account-menu"
            style={
            {
                top: menuData.positionY - 20,
                left: menuData.positionX + 12
            }}
        >
            <div
                className="option"
                onClick={(ev) =>
                {
                    ev.stopPropagation();

                    dispatch(closeAccountMenu());
                    dispatch(logout());
                }}
            >
                <span className="message">
                    Cerrar la sesión de @{userSession.user?.handle}.
                </span>
            </div>
        </div>
    </>;
};

export default AccountMenu;