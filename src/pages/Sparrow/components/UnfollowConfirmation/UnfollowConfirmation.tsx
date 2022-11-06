import React from "react";
import AnotherUserData from "../../../../data/another_user_data";
import ProfileData from "../../../../data/profile_data";
import unfollowUser from "../../../../request/unfollow_user";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { setProfileAction } from "../../../../store/slices/profile_slice";
import { closeUnfollowConfirmation } from "../../../../store/slices/unfollow_confirmation_slice";
import { updateUserCard } from "../../../../store/slices/user_lists_slice";
import { UserListName } from "../../../../store/state/user_lists_state";
import ConfirmationModal, { ConfirmationStyle } from "../ConfirmationModal";

const UnfollowConfirmation: React.FunctionComponent = () =>
{
    const dispatch = useAppDispatch();
    const unfollowConfirmation = useAppSelector(state => state.unfollowConfirmation);

    const data = unfollowConfirmation.data;
    if(!data) return <></>;

    const unfollowCardUser = async (listName: UserListName, user: AnotherUserData) =>
    {
        await unfollowUser(data.userHandle);
        dispatch(updateUserCard({
            pool: listName,
            user: {
                ...user,
                following: false
            }
        }));
    };

    const unfollowPageUser = async (profile: ProfileData) =>
    {
        await unfollowUser(data.userHandle);
        dispatch(setProfileAction({
            ...profile,
            following: false,
            followerCount: profile.followerCount - 1
        }));
    };

    return <ConfirmationModal
        id="close-confirmation-modal"
        title={`¿Quieres dejar de seguir a @${unfollowConfirmation.data?.userHandle}?`}
        message="Sus Tweets ya no aparecerán en tu cronología de inicio. Podrás seguir viendo su perfil, a menos que sus Tweets estén protegidos."
        styleType={ConfirmationStyle.Normal}
        confirmButtonMessage="Dejar de seguir"
        cancelButtonMessage="Cancelar"
        confirm={() =>
        {
            switch(data.componentType)
            {
            case "card":
                if(data.listName && data.user)
                {
                    unfollowCardUser(data.listName, data.user);
                }
                break;

            case "profile":
                if(data.profile)
                {
                    unfollowPageUser(data.profile);
                }
                break;
            }

            dispatch(closeUnfollowConfirmation());
        }}
        cancel={() =>
        {
            dispatch(closeUnfollowConfirmation());
        }}
        closeRequest={() =>
        {
            dispatch(closeUnfollowConfirmation());
        }}
    />;
};

export default UnfollowConfirmation;