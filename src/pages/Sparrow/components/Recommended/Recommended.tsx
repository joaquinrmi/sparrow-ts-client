import "./Recommended.scss";
import React from "react";
import { Link } from "react-router-dom";
import AsideSection from "../AsideSection";
import UserList, { UserListType } from "../UserList";

export type Props = {}

const Recommended: React.FunctionComponent<Props> = (props) =>
{
    return <AsideSection title="Quizás te guste" className="aside-recommended">
        <UserList
            id="aside-recommended"
            name="asideRecommended"
            type={UserListType.Recommended}
            target={0}
            limit={3}
            little
        />

        <Link to="/recommended" className="show-more">
            Mostrar más
        </Link>
    </AsideSection>;
};

export default Recommended;