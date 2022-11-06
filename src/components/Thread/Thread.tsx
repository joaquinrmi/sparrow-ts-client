import React from "react";
import { useAppSelector } from "../../store";
import { CheepListName } from "../../store/state/cheep_lists_state";
import Cheep from "../Cheep";

export type Props = {
    name: CheepListName;
}

const Thread: React.FunctionComponent<Props> = (props) =>
{
    const cheepList = useAppSelector(state => state.cheepLists[props.name]);

    return <>
        {cheepList.cheeps.map(
            (cheepData, index) =>
            {
                return <Cheep
                    key={`${index}-cheep`}
                    id={`${index}-cheep-${props.name}`}
                    data={cheepData}
                    index={index}
                    listName={props.name}
                />;
            }
        )}
    </>;
}

export default Thread;