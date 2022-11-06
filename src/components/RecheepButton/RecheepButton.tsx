import React from "react";
import CheepData from "../../data/cheep_data";
import { useAppDispatch } from "../../store";
import { openRecheepMenu } from "../../store/slices/recheep_menu_slice";
import InteractionButton, { InteractionColor } from "../InteractionButton";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { CheepListName } from "../../store/state/cheep_lists_state";

export type Props = {
    id: string;
    listName?: CheepListName;
    index?: number;
    cheepData: CheepData;
    relevantCheepData: CheepData;
    counter?: number;
    active?: boolean;
}

const RecheepButton: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();
    
    return <InteractionButton
        id={props.id}
        className="recheep-button"
        color={InteractionColor.Green}
        icon={faRetweet}
        counter={props.counter}
        active={props.active}
        onClick={(event) =>
        {
            event.stopPropagation();

            const button = document.getElementById(props.id) as HTMLDivElement;

            const rect = button.getBoundingClientRect();
            const x = rect.x + window.scrollX;
            const y = rect.y + window.scrollY;

            dispatch(openRecheepMenu({
                listName: props.listName,
                index: props.index,
                cheepData: props.cheepData,
                relevantCheepData: props.relevantCheepData,
                positionX: x,
                positionY: y,
                active: props.active || false
            }));
        }}
    />;
};

export default RecheepButton;