import React  from "react";
import apiRouter from "../../request/router";
import InteractionButton, { InteractionColor } from "../InteractionButton";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import CheepData from "../../data/cheep_data";
import { CheepListName } from "../../store/state/cheep_lists_state";
import { useAppDispatch } from "../../store";
import { updateCheep } from "../../store/slices/cheep_lists_slice";
import { setStatusMessage } from "../../store/slices/status_message_slice";
import { setCheepPage } from "../../store/slices/cheep_page_slice";

export interface Props
{
    id: string;
    componentType: "cheep" | "page";
    cheepData: CheepData;
    listName?: CheepListName;
    cheepId: number;
    counter?: number;
    active?: boolean;
}

const LikeButton: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();

    const like = props.active || false;

    return <InteractionButton
        id={props.id}
        className="like-button"
        color={InteractionColor.Pink}
        icon={faHeart}
        counter={props.counter}
        active={props.active}
        onClick={async (event) =>
        {
            event.stopPropagation();

            try
            {
                if(props.active)
                {
                    await apiRouter.cheep.undolike({ params: props.cheepId });
                }
                else
                {
                    await apiRouter.cheep.like({ params: props.cheepId });
                }
            }
            catch(err)
            {
                dispatch(setStatusMessage("Ha ocurrido un error inesperado."));
                return;
            }

            switch(props.componentType)
            {
            case "cheep":
            {
                let targetCheepData = { ...props.cheepData };
                if(targetCheepData.quoteTarget && !targetCheepData.content && (!targetCheepData.gallery || targetCheepData.gallery.length === 0))
                {
                    targetCheepData.quoteTarget = { ...targetCheepData.quoteTarget };
                    updateLike(targetCheepData.quoteTarget, like);
                }
                else
                {
                    updateLike(targetCheepData, like);
                }

                if(props.listName)
                {
                    dispatch(updateCheep({
                        listName: props.listName,
                        cheep: targetCheepData
                    }));

                    if(targetCheepData.quoteTarget)
                    {
                        dispatch(updateCheep({
                            listName: props.listName,
                            cheep: targetCheepData.quoteTarget
                        }));
                    }
                }
                break;
            }

            case "page":
                let targetCheepData = { ...props.cheepData };
                updateLike(targetCheepData, like);

                dispatch(setCheepPage(targetCheepData));
                break;
            }
        }}
    />;
};

function updateLike(data: CheepData, like: boolean): void
{
    if(like)
    {
        data.liked = false;
        data.likeCount -= 1;
    }
    else
    {
        data.liked = true;
        data.likeCount += 1;
    }
}

export default LikeButton;