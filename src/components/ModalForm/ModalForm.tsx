import "./ModalForm.scss";
import React, { FormEventHandler } from "react";

export type Props = {
    children?: React.ReactNode;
    id?: string;
    className?: string;
    autoComplete?: boolean;
    onSubmit?: FormEventHandler<HTMLFormElement>;
}

const ModalForm: React.FunctionComponent<Props> = (props) =>
{
    return <form
        id={props.id}
        className={`modal-form ${props.className ? props.className : ""}`}
        onSubmit={props.onSubmit}
        autoComplete={props.autoComplete ? "on" : "off"}
    >
        {props.children}
    </form>;
};

export default ModalForm;