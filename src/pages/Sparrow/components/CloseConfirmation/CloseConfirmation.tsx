import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { closeCloseConfirmation } from "../../../../store/slices/close_confirmation_slice";
import ConfirmationModal, { ConfirmationStyle } from "../ConfirmationModal";

const CloseConfirmation: React.FunctionComponent = () =>
{
    const dispatch = useAppDispatch();
    const closeConfirmation = useAppSelector(state => state.closeConfirmation);

    return <ConfirmationModal
        id="close-confirmation-modal"
        title="¿Quieres descartar los cambios?"
        message="Esta acción no se puede revertir, y perderás tus cambios."
        styleType={ConfirmationStyle.Important}
        confirmButtonMessage="Descartar"
        cancelButtonMessage="Cancelar"
        confirm={() =>
        {
            closeConfirmation.data?.discart();
        }}
        cancel={() =>
        {
            dispatch(closeCloseConfirmation());
        }}
        closeRequest={() =>
        {
            dispatch(closeCloseConfirmation());
        }}
    />;
};

export default CloseConfirmation;