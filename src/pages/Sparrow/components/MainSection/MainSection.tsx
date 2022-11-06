import "./MainSection.scss";
import React from "react";

export interface Props
{
    children?: React.ReactNode;
    mainColumnChildren: React.ReactNode;
    rightColumnChildren: React.ReactNode;
}

const MainSection: React.FunctionComponent<Props> = (props) =>
{
    return <section className="main-section">
        <section className="main-column">
            {props.mainColumnChildren}
        </section>
        
        <aside className="right-column">
            {props.rightColumnChildren}
        </aside>
    </section>;
};

export default MainSection;