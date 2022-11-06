import "./ImageButton.scss";
import React from "react";

export type Props = {
    children?: React.ReactNode;
    title: string;

    onClick(ev: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const ImageButton: React.FunctionComponent<Props> = (props) =>
{
    return <div
        className="image-button"
        onClick={props.onClick}
        title={props.title}
    >
        {props.children}
    </div>;
};

export default ImageButton;