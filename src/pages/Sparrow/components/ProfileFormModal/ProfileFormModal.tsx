import "./ProfileFormModal.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../components/Modal";
import ProfileForm from "../ProfileForm/ProfileForm";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { closeCloseConfirmation, openCloseConfirmation } from "../../../../store/slices/close_confirmation_slice";

const ProfileFormModal: React.FunctionComponent = () =>
{
    const dispatch = useAppDispatch();

    const [ hasChanged, setHasChanged ] = useState<boolean>(false);
    const userSession = useAppSelector(state => state.session);

    const navigate = useNavigate();

    const closeRequest = () =>
    {
        setHasChanged(
            (hasChanged) =>
            {
                if(hasChanged)
                {
                    dispatch(openCloseConfirmation({ discart: () =>
                    {
                        dispatch(closeCloseConfirmation());
                        navigate(-1);
                    }}))
                }
                else
                {
                    navigate(-1);
                }

                return hasChanged;
            }
        );
    };

    return <Modal id="profile-form-modal" className="profile-form-modal" changeBodyOverflow closeRequest={closeRequest}>
        <ProfileForm
            closeRequest={closeRequest}
            somethingHasBeenTouched={() =>
            {
                setHasChanged(true);
            }}
            success={() =>
            {
                navigate(`/${userSession.user?.handle}`);
            }}
        />
    </Modal>;
};

export default ProfileFormModal;