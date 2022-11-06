import React from "react";
import CheepList, { CheepListType } from "../../components/CheepList";
import PageHeader from "../../components/PageHeader";

export type Props = {
    cheepId: number;
}

const QuotesList: React.FunctionComponent<Props> = (props) =>
{
    return <div className="likes-list">
        <PageHeader>
            <div className="title">
                Cheeps citados
            </div>
        </PageHeader>

        <CheepList
            name="quotes"
            type={CheepListType.Search}
            arguments={{
                quoteTarget: props.cheepId
            }}
            hideResponseTarget
        />
    </div>;
};

export default QuotesList;