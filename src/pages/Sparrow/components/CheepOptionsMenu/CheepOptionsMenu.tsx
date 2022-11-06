import "./CheepOptionsMenu.scss";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { closeMoreOptionsMenu } from "../../../../store/slices/more_options_menu_slice";
import apiRouter from "../../../../request/router";
import StatusCode from "../../../../request/status_code";
import { setStatusMessage } from "../../../../store/slices/status_message_slice";
import { deleteCheep } from "../../../../store/slices/cheep_lists_slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const CheepOptionsMenu: React.FunctionComponent = () =>
{
    const dispatch = useAppDispatch();
    const moreOptionsMenu = useAppSelector(state => state.moreOptionsMenu);

    if(moreOptionsMenu !== undefined && moreOptionsMenu.data)
    {
        var menuData = moreOptionsMenu.data;
    }
    else
    {
        return <></>;
    }

    return <>
        <div
            className="cheep-options-menu-container"
            onClick={() =>
            {
                dispatch(closeMoreOptionsMenu());
            }}
        ></div>

        <div
            className="cheep-options-menu"
            style={
            {
                top: menuData.positionY + 10,
                left: menuData.positionX - 100
            }}
        >
            <div
                className="option erase"
                onClick={(ev) =>
                {
                    ev.stopPropagation();

                    dispatch(closeMoreOptionsMenu());

                    (async () =>
                    {
                        try
                        {
                            const response = await apiRouter.cheep.delete({ params: menuData.targetCheep.id });

                            if(response.status === StatusCode.OK)
                            {
                                dispatch(setStatusMessage("Se eliminó el cheep."));
                                dispatch(deleteCheep({
                                    pool: menuData.listName,
                                    index: menuData.cheepIndex
                                }));
                            }
                            else
                            {
                                dispatch(setStatusMessage("Ocurrió un error al eliminar el cheep."));
                            }
                        }
                        catch(err)
                        {
                            dispatch(setStatusMessage("Ocurrió un error al eliminar el cheep."));
                        }
                    })();
                }}
            >
                <div className="icon">
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>

                <span className="message">
                    Eliminar
                </span>
            </div>
        </div>
    </>;
};

export default CheepOptionsMenu;