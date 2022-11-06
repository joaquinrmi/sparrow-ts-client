import "./CustomLink.scss";
import React from "react";
import conditionalClass from "../../utils/conditional_class";
import { Link } from "react-router-dom";

export type Props = {
    to: string;
    external?: boolean;
    className?: string;
    children?: React.ReactNode;
};

const CustomLink: React.FunctionComponent<Props> = (props) =>
{
    const className = conditionalClass({}, [ props.className ]);
    
    if(props.external)
    {
        return <a
            className={className}
            href={props.to}
            target="_blank"
            rel="noreferrer"
        >
            {props.children}
        </a>;
    }
    else
    {
        return <Link
            className={className}
            to={props.to}
        >
            {props.children}
        </Link>
    }
};

export default CustomLink;