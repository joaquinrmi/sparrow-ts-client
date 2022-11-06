import "./ButtonContainer.scss";
import React from "react";
import conditionalClass from "../../utils/conditional_class";

export type Props = {
    children?: React.ReactNode;
    className?: string;
}

const ButtonContainer: React.FunctionComponent<Props> = (props) =>
{
    return <div
        className={conditionalClass(
            {},
            [ "standar-button-container", props.className ]
        )}
    >
        {props.children}
    </div>;
};

export default ButtonContainer;