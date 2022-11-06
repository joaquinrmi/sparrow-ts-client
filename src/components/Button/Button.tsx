import React, { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import conditionalClass from "../../utils/conditional_class";

import "./Button.scss";

export interface Props
{
    children: React.ReactNode;
    className?: string;
    stylePreset: ButtonStyle;
    disabled?: boolean;

    id?: string;
    to?: string;

    onClick?: MouseEventHandler<HTMLButtonElement>;
    onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
    onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FunctionComponent<Props> = (props) =>
{
    let navigate = useNavigate();

    let onClick: MouseEventHandler<HTMLButtonElement>;
    if(props.to !== undefined)
    {
        onClick = (ev) =>
        {
            if((ev.target as HTMLButtonElement).classList.contains("disabled"))
            {
                return;
            }

            if(props.onClick !== undefined)
            {
                props.onClick(ev);
            }

            navigate(props.to as string);
        };
    }
    else if(props.onClick !== undefined)
    {
        onClick = (ev) =>
        {
            if((ev.target as HTMLButtonElement).classList.contains("disabled"))
            {
                return;
            }

            if(props.onClick)
            {
                props.onClick(ev);
            }
        };
    }
    else
    {
        onClick = () => {};
    }

    return <button
        onClick={onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        id={props.id}
        className={conditionalClass(
            {
                "disabled": props.disabled
            },
            [ "button-standar", props.className, props.stylePreset ]
        )}
    >
        <span className="button-text">
            {props.children}
        </span>
    </button>
};

export enum ButtonStyle
{
    White = "white",
    Black = "black",
    Blue = "blue",
    BlueTransparent = "blue-transparent",
    Red = "red",
    LightRed = "light-red",
}

export default Button;