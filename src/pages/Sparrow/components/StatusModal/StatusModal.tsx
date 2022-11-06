import "./StatusModal.scss";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { setStatusMessage } from "../../../../store/slices/status_message_slice";

export type Props = {
    children?: React.ReactNode;
    id: string;
}

const StatusModal: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();
    const statusMessage = useAppSelector(state => state.statusMessage);

    useEffect(
        () =>
        {
            if(statusMessage.message.length === 0)
            {
                return;
            }

            const modal = document.getElementById(props.id) as HTMLDivElement;

            modal.classList.remove("hide");
            modal.classList.add("show");

            setTimeout(
                () =>
                {
                    modal.classList.remove("show");
                    setTimeout(
                        () =>
                        {
                            modal.classList.add("hide");
                            dispatch(setStatusMessage(""));
                        },
                        300
                    );
                },
                6_000
            );
        },
        [ statusMessage.message ]
    );

    return <div id={props.id} className={`status-modal ${statusMessage.message.length > 0 ? "show" : "hide"}`}>
        <div className="modal-body">
            {statusMessage.message}
        </div>
    </div>;
};

export default StatusModal;