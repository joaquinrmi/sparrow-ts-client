import React from "react";
import PageHeader from "../../../../components/PageHeader";
import UserList, { UserListType } from "../UserList";

const RecommendedList: React.FunctionComponent = () =>
{
    return <div className="recommended-list">
        <PageHeader>
            <span className="title">Quizás te guste</span>
        </PageHeader>

        <UserList
            id="recommended-list"
            name="recommended"
            type={UserListType.Recommended}
            target={0}
        />
    </div>;
};

export default RecommendedList;