import "./ConfirmationModal.scss";
import React from "react";
import Modal from "../../../../components/Modal";
import Button, { ButtonStyle } from "../../../../components/Button";

export type Props = {
    id: string;
    title: string;
    message: string;
    styleType: ConfirmationStyle;

    confirmButtonMessage: string;
    cancelButtonMessage: string;

    confirm(): void;
    cancel(): void;
    closeRequest(): void;
}

const ConfirmationModal: React.FunctionComponent<Props> = (props) =>
{
    return <Modal id={props.id} className="confirmation-modal" closeRequest={props.closeRequest}>
        <div className="confirmation-message">
            <div className="title">
                {props.title}
            </div>

            <div className="message">
                {props.message}
            </div>
        </div>

        <div className="confirmation-buttons">
            <Button stylePreset={props.styleType === ConfirmationStyle.Important ? ButtonStyle.Red : ButtonStyle.Black} onClick={props.confirm}>
                {props.confirmButtonMessage}
            </Button>

            <Button stylePreset={ButtonStyle.White} onClick={props.cancel}>
                {props.cancelButtonMessage}
            </Button>
        </div>
    </Modal>;
};

export enum ConfirmationStyle
{
    Normal,
    Important
}

export default ConfirmationModal;