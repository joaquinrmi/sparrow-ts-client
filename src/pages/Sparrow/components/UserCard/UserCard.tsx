import "./UserCard.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import AnotherUserData from "../../../../data/another_user_data";
import { UserListName } from "../../../../store/state/user_lists_state";
import UserPicture from "../../../../components/UserPicture";
import { useAppSelector } from "../../../../store";
import FollowButton from "../FollowButton";

export type Props = {
    id: string;
    listName: UserListName;
    data: AnotherUserData;
    index: number;
}

const UserCard: React.FunctionComponent<Props> = (props) =>
{
    const userSession = useAppSelector(state => state.session);
    const navigate = useNavigate();

    return <div
        id={props.id}
        className="user-card"
        onClick={(ev) =>
        {
            const element = document.getElementById(props.id) as HTMLDivElement;

            if(element !== null)
            {
                navigate(`/${props.data.handle}`);
            }
        }}
    >
        <div className="left-column">
            <UserPicture userHandle={props.data.handle} userName={props.data.name} picture={props.data.picture} />
        </div>

        <div className="uc-right-column">
            <div className="user-card-header">
                <div className="user-name-container">
                    <div className="name">
                        {props.data.name}
                    </div>

                    <div className="bottom-data">
                        <div className="handle">
                            @{props.data.handle}
                        </div>

                        {props.data.follower ?
                            <span className="follow-mark">Te sigue</span> :
                            null
                        }
                    </div>
                </div>

                <div className="interaction-container">
                    {userSession.user?.handle !== props.data.handle ?
                        <FollowButton
                            id={`${props.id}-follow`}
                            componentType="card"
                            user={props.data}
                            listName={props.listName}
                        /> :
                        null
                    }
                </div>
            </div>

            <div className="user-card-content">
                {props.data.description}
            </div>
        </div>
    </div>;
};

export default UserCard;