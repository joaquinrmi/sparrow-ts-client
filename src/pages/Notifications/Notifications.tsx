import React from "react";
import NothingToShow from "../../components/NothingToShow";
import PageHeader from "../../components/PageHeader";

const Notifications: React.FunctionComponent = () =>
{
    return <div className="notifications-page">
        <PageHeader>
            <span className="title">Notificaciones</span>
        </PageHeader>

        <NothingToShow />
    </div>;
};

export default Notifications;