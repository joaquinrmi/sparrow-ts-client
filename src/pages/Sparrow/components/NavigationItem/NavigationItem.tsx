import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useMatch, useResolvedPath } from "react-router-dom";
import conditionalClass from "../../../../utils/conditional_class";

export type Props = {
    to: string;
    icon: IconProp;
    subroutes?: boolean;
    containerClassName?: string;
    linkClassName?: string;
};

const NavigationItem: React.FunctionComponent<Props> = (props) =>
{
    let path = `${props.to}${props.subroutes ? "/*" : ""}`

    let resolved = useResolvedPath(path);
    let match = useMatch({ path: resolved.pathname, end: true });

    return <div
        className={conditionalClass(
            {},
            [ "nav-button-container", props.containerClassName ]
        )}
    >
        <Link
            to={props.to}
            className={conditionalClass(
                {
                    "active": match !== null
                },
                [ "nav-button", props.linkClassName ]
            )}
        >
            <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
        </Link>
    </div>;
};

export default NavigationItem;