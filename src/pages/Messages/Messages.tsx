import React from "react";
import NothingToShow from "../../components/NothingToShow";
import PageHeader from "../../components/PageHeader";

const Messages: React.FunctionComponent = () =>
{
    return <div className="messages-page">
        <PageHeader>
            <span className="title">Mensajes</span>
        </PageHeader>

        <NothingToShow />
    </div>;
};

export default Messages;