import "./NavigationBar.scss";
import React from "react";
import { faHouse, faHashtag, faBell, faEnvelope, faUser, faGear, faFeather } from "@fortawesome/free-solid-svg-icons";
import NavigationItem from "../NavigationItem";

export type Props = {
    handle: string;
}

const NavigationBar: React.FunctionComponent<Props> = (props) =>
{
    return <>        
        <div className="navigation-bar">
            <NavigationItem to="/home" icon={faHouse} />

            <NavigationItem to="/explore" icon={faHashtag} />

            <NavigationItem to="/notifications" icon={faBell} />

            <NavigationItem to="/messages" icon={faEnvelope} />

            <NavigationItem to={`/${props.handle}`} subroutes icon={faUser} />

            <NavigationItem to="/settings" icon={faGear} />

            <NavigationItem to="/compose/cheep" icon={faFeather} containerClassName="feather" linkClassName="big-blue" />
        </div>
    </>;
};

export default NavigationBar;