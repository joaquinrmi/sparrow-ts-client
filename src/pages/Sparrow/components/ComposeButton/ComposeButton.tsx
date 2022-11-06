import "./ComposeButton.scss";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import NavigationItem from "../NavigationItem";

const ComposeButton: React.FunctionComponent = () =>
{
    return <div className="compose-button">
        <NavigationItem to="/compose/cheep" icon={faFeather} containerClassName="feather" linkClassName="big-blue" />
    </div>;
}

export default ComposeButton;