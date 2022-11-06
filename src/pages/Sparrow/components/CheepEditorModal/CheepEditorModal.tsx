import "./CheepEditorModal.scss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../components/Modal";
import { useAppDispatch, useAppSelector } from "../../../../store";
import Cheep from "../../../../components/Cheep";
import CheepEditor, { CheepEditorElement } from "../CheepEditor/CheepEditor";
import { setEditorResponseTarget } from "../../../../store/slices/cheep_editor_slice";
import { closeCloseConfirmation, openCloseConfirmation } from "../../../../store/slices/close_confirmation_slice";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type Props = {
    onClose?(): void;
}

const CheepEditorModal: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();
    const cheepEditor = useAppSelector(state => state.cheepEditor);
    const navigate = useNavigate();

    useEffect(
        () =>
        {
            return () =>
            {
                if(props.onClose)
                {
                    props.onClose();
                }

                dispatch(setEditorResponseTarget(undefined));
                dispatch(setEditorResponseTarget(undefined));
            };
        },
        [ props.onClose ]
    );

    const closeRequest = () =>
    {
        const cheepEditor = document.getElementById("cheep-editor-modal") as CheepEditorElement;
        if(cheepEditor === null || cheepEditor.hasContent())
        {
            dispatch(openCloseConfirmation({
                discart: () =>
                {
                    dispatch(closeCloseConfirmation());
                    navigate(-1);
                }
            }));
        }
        else
        {
            navigate(-1);
        }
    };

    return <Modal id="compose-modal" className="cheep-editor-modal" changeBodyOverflow closeRequest={closeRequest}>
        <div className="modal-form editor-modal-form">
            <div className="modal-form-top">
                <span className="modal-form-close-button" onClick={closeRequest}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>

            <div className="modal-form-body">
                {cheepEditor.responseTarget ?
                    <Cheep
                        id={`cheep-editor-response`}
                        data={cheepEditor.responseTarget}
                        response
                    /> :
                    null
                }

                <CheepEditor
                    id="cheep-editor-modal"
                    cheepListTarget={cheepEditor.cheepListTarget}
                    responseTarget={cheepEditor.responseTarget ? cheepEditor.responseTarget : undefined}
                    targetCheep={cheepEditor.targetCheep}
                    onCheep={() =>
                    {
                        navigate(-1);
                    }} />
            </div>
        </div>
    </Modal>;
};

export default CheepEditorModal;