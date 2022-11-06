import "./AccountMenuButton.scss";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { openAccountMenu } from "../../../../store/slices/account_menu_slice";

const AccountMenuButton: React.FunctionComponent = () =>
{
    const dispatch = useAppDispatch();
    const userSession = useAppSelector(state => state.session);

    return <div
        className="account-menu-button"
        onClick={() =>
        {
            const button = document.querySelector(".account-menu-button") as HTMLDivElement;

            if (button === null)
            {
                return;
            }

            const rect = button.getBoundingClientRect();
            const x = rect.x + window.scrollX;
            const y = rect.y + window.scrollY;

            dispatch(openAccountMenu({
                positionX: x,
                positionY: y
            }));
        }}
    >
        <div className="button-image">
            <img
                src={userSession.user?.picture}
                alt={`Foto de perfil de @${userSession.user?.handle}`}
            />
        </div>
    </div>;
};

export default AccountMenuButton;