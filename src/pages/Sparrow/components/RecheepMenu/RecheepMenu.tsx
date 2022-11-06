import "./RecheepMenu.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { closeRecheepMenu } from "../../../../store/slices/recheep_menu_slice";
import { setEditorTargetCheep } from "../../../../store/slices/cheep_editor_slice";
import CreateCheepData from "../../../../data/create_cheep_data";
import apiRouter from "../../../../request/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faRetweet } from "@fortawesome/free-solid-svg-icons";
import CheepData from "../../../../data/cheep_data";
import { addNewCheep, discountRecheep, removeCheep, updateCheep } from "../../../../store/slices/cheep_lists_slice";
import CheepDataResponse from "../../../../request/response/cheep_data_response";
import { setStatusMessage } from "../../../../store/slices/status_message_slice";
import processCheep from "../../../../utils/process_cheep";
import StatusCode from "../../../../request/status_code";
import { setCheepPage } from "../../../../store/slices/cheep_page_slice";

const RecheepMenu: React.FunctionComponent = () =>
{
    const dispatch = useAppDispatch();
    const recheepMenu = useAppSelector(state => state.recheepMenu);
    const cheepLists = useAppSelector(state => state.cheepLists);
    const session = useAppSelector(state => state.session);
    const navigate = useNavigate();

    if(recheepMenu !== undefined && recheepMenu.data)
    {
        var menuData = recheepMenu.data;
    }
    else
    {
        return <></>;
    }

    const targetCheep = menuData.relevantCheepData;

    return <>
        <div
            className="recheep-menu-container"
            onClick={() =>
            {
                dispatch(closeRecheepMenu());
            }}
        ></div>

        <div
            className="recheep-menu"
            style={
            {
                top: menuData.positionY,
                left: menuData.positionX
            }}
        >
            <div
                className="option"
                onClick={async () =>
                {
                    const recheepData = recheepMenu.data;
                    if(!recheepData)
                    {
                        dispatch(closeRecheepMenu());
                        return;
                    }

                    let newCheep: CheepDataResponse | undefined;
                    if(recheepData.active)
                    {
                        try
                        {
                            await apiRouter.cheep.deleteRecheep({
                                params: targetCheep.id
                            });
                        }
                        catch(err)
                        {}
                    }
                    else
                    {
                        const data: CreateCheepData = {
                            quoteTarget: targetCheep.id
                        };
        
                        try
                        {
                            const response = await apiRouter.cheep.create({ form: data });
                            if(response.status === StatusCode.Created && response.data)
                            {
                                newCheep = response.data.cheep;
                            }
                            else
                            {
                                dispatch(setStatusMessage("Ocurrió un error al recheepear."));
                                dispatch(closeRecheepMenu());
                                return;
                            }
                        }
                        catch(err)
                        {
                            dispatch(setStatusMessage("Ocurrió un error al recheepear."));
                            dispatch(closeRecheepMenu());
                            return;
                        }
                    }

                    let targetCheepData = { ...recheepData.cheepData };
                    if(targetCheepData.quoteTarget && !targetCheepData.content && (!targetCheepData.gallery || targetCheepData.gallery.length === 0))
                    {
                        targetCheepData.quoteTarget =  { ...targetCheepData.quoteTarget };
                        updateRecheep(targetCheepData.quoteTarget, recheepData.active);
                    }
                    else
                    {
                        updateRecheep(targetCheepData, recheepData.active);
                    }

                    if(recheepData.listName && recheepData.index !== undefined)
                    {
                        dispatch(updateCheep({
                            listName: recheepData.listName,
                            cheep: targetCheepData
                        }));

                        if(targetCheepData.recheepped && newCheep && cheepLists["profileCheeps"].query.userHandle === session.user?.handle)
                        {
                            dispatch(addNewCheep({
                                pool: recheepData.listName,
                                cheep: processCheep(newCheep)
                            }));
                        }
                        else if(recheepData.cheepData !== recheepData.relevantCheepData)
                        {
                            dispatch(removeCheep({
                                pool: recheepData.listName,
                                id: recheepData.cheepData.id
                            }));

                            dispatch(discountRecheep({
                                pool: recheepData.listName,
                                id: recheepData.relevantCheepData.id
                            }));
                        }
                    }
                    else
                    {
                        dispatch(setCheepPage(targetCheepData));
                    }

                    dispatch(closeRecheepMenu());
                }}
            >
                <div className="icon">
                    <FontAwesomeIcon icon={faPencil} />
                </div>

                <span className="message">
                    {recheepMenu.data?.active ? "Deshacer Recheep" : "Recheepear"}
                </span>
            </div>

            <div className="option" onClick={() =>
            {
                dispatch(setEditorTargetCheep(targetCheep));
                dispatch(closeRecheepMenu());

                navigate("/compose/cheep");
            }}>
                <div className="icon">
                    <FontAwesomeIcon icon={faRetweet} />
                </div>

                <span className="message">
                    Citar Cheep
                </span>
            </div>
        </div>
    </>;
};

function updateRecheep(data: CheepData, recheep: boolean): void
{
    if(recheep)
    {
        data.recheepped = false;
        data.recheepCount -= 1;
    }
    else
    {
        data.recheepped = true;
        data.recheepCount += 1;
    }
}

export default RecheepMenu;