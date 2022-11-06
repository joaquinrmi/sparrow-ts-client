import React from "react";
import CheepList, { CheepListType } from "../../components/CheepList";
import PageHeader from "../../components/PageHeader";

const Explore: React.FunctionComponent = () =>
{
    return <div className="explore-page">
        <PageHeader>
            <span className="title">Explorar</span>
        </PageHeader>

        <CheepList
            name="explore"
            type={CheepListType.Explore}
            arguments={{}}
        />
    </div>;
};

export default Explore;