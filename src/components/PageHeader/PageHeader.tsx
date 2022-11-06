import "./PageHeader.scss";
import React from "react";

export type Props = {
    children?: React.ReactNode;
}

const PageHeader: React.FunctionComponent<Props> = (props) =>
{
    return <header className="page-header">
        {props.children}
    </header>;
};

export default PageHeader;