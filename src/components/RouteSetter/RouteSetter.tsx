import React, { useEffect } from "react";

export type Props = {
    id: string;
    onMatch(): void;
}

const RouteSetter: React.FunctionComponent<Props> = (props) =>
{
    useEffect(
        () =>
        {
            props.onMatch();
        },
        [ props.id ]
    );

    return <></>;
};

export default RouteSetter;