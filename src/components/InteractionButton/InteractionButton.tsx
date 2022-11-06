import "./InteractionButton.scss";
import React from "react";
import conditionalClass from "../../utils/conditional_class";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type Props = {
    id: string;
    color: InteractionColor;
    icon: IconProp;
    counter?: number;
    active?: boolean;
    className?: string;

    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

const InteractionButton: React.FunctionComponent<Props> = (props) =>
{
    return <div
        id={props.id}
        className={conditionalClass(
            {
                "active": props.active
            },
            [ "interaction-button", props.color, props.className ]
        )}
        onClick={props.onClick ? props.onClick : () => {}}
    >
        <div className="icon-container">
            <FontAwesomeIcon icon={props.icon} />
        </div>

        {props.counter ? <span className="counter">{props.counter}</span> : null}
    </div>;
};

export enum InteractionColor
{
    Blue = "blue",
    Green = "green",
    Pink = "pink"
}

export default InteractionButton;