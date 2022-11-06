import "./FollowButton.scss";
import React from "react";
import Button, { ButtonStyle } from "../../../../components/Button";
import { useAppDispatch } from "../../../../store";
import { openUnfollowConfirmation } from "../../../../store/slices/unfollow_confirmation_slice";
import { UserListName } from "../../../../store/state/user_lists_state";
import AnotherUserData from "../../../../data/another_user_data";
import ProfileData from "../../../../data/profile_data";
import { setProfileAction } from "../../../../store/slices/profile_slice";
import { updateUserCard } from "../../../../store/slices/user_lists_slice";
import followUser from "../../../../request/follow_user";

export type Props = {
    id: string;
    componentType: "card" | "profile";
    listName?: UserListName;
    user?: AnotherUserData;
    profile?: ProfileData;
}

const FollowButton: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();

    let content: React.ReactNode;
    if(props.user?.following || props.profile?.following)
    {
        content = <Button
            id={props.id}
            stylePreset={ButtonStyle.White}
            className="follow-button"
            onClick={(ev) =>
            {
                ev.stopPropagation();

                if(props.componentType === "card" && props.user)
                {
                    dispatch(openUnfollowConfirmation({
                        userHandle: props.user.handle,
                        componentType: props.componentType,
                        listName: props.listName,
                        user: props.user
                    }));
                }
                else if(props.componentType === "profile" && props.profile)
                {
                    dispatch(openUnfollowConfirmation({
                        userHandle: props.profile.handle || "",
                        componentType: props.componentType,
                        profile: props.profile
                    }));
                }
            }}
            onMouseEnter={() =>
            {
                const button = document.getElementById(props.id) as HTMLButtonElement;
                if(button === null)
                {
                    return;
                }

                button.classList.remove(ButtonStyle.White);
                button.classList.add(ButtonStyle.LightRed);
            }}
            onMouseLeave={() =>
            {
                const button = document.getElementById(props.id) as HTMLButtonElement;
                if(button === null)
                {
                    return;
                }

                button.classList.remove(ButtonStyle.LightRed);
                button.classList.add(ButtonStyle.White);
            }}
        >
            <span className="following-message">Siguiendo</span>
            <span className="unfollow-message">Dejar de seguir</span>
        </Button>;
    }
    else
    {
        content = <Button
            id={props.id}
            stylePreset={ButtonStyle.Black}
            onClick={(ev) =>
            {
                ev.stopPropagation();

                if(props.componentType === "card" && props.user && props.listName)
                {
                    followUser(props.user.handle);
                    dispatch(updateUserCard({
                        pool: props.listName,
                        user: {
                            ...props.user,
                            following: true
                        }
                    }));
                }
                else if(props.componentType === "profile" && props.profile)
                {
                    followUser(props.profile.handle || "");
                    dispatch(setProfileAction({
                        ...props.profile,
                        following: true,
                        followerCount: props.profile.followerCount + 1
                    }));
                }
            }}
        >
            Seguir
        </Button>
    }

    return <>{content}</>;
};

export default FollowButton;