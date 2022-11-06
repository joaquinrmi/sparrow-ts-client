import "./AsideSection.scss";
import React from "react";
import conditionalClass from "../../../../utils/conditional_class";

export type Props = {
    children?: React.ReactNode;
    title: string;
    className?: string;
}

const AsideSection: React.FunctionComponent<Props> = (props) =>
{
    return <div
        className={conditionalClass(
            {},
            [ "aside-section", props.className ]
        )}
    >
        <header className="section-title">
            {props.title}
        </header>

        <section className="section-body">
            {props.children}
        </section>
    </div>;
};

export default AsideSection;