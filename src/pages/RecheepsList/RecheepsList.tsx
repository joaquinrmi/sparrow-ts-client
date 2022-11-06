import React from "react";
import PageHeader from "../../components/PageHeader";
import UserList, { UserListType } from "../Sparrow/components/UserList";

export type Props = {
    cheepId: number;
}

const RecheepsList: React.FunctionComponent<Props> = (props) =>
{
    return <div className="recheeps-list">
        <PageHeader>
            <div className="title">
                Recheepeado por
            </div>
        </PageHeader>

        <UserList
            id="recheeps-list"
            name="recheeps"
            type={UserListType.Recheep}
            target={props.cheepId}
        />
    </div>;
};

export default RecheepsList;