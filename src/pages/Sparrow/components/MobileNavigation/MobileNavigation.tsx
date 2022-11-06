import "./MobileNavigation.scss";
import React from "react";
import { faHouse, faMagnifyingGlass, faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import NavigationItem from "../NavigationItem";

export type Props = {
    handle: string;
};

const MobileNavigation: React.FunctionComponent<Props> = (props) =>
{
    return <div className="mobile-navigation">
        <NavigationItem to="/home" icon={faHouse} />

        <NavigationItem to="/search" icon={faMagnifyingGlass} />

        <NavigationItem to="/notifications" icon={faBell} />

        <NavigationItem to="/messages" icon={faEnvelope} />
    </div>;
};

export default MobileNavigation;