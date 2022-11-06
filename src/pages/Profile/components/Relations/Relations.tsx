import "./Relations.scss";
import React from "react";
import PageHeader from "../../../../components/PageHeader";
import PageNavigation from "../../../../components/PageNavigation";
import Router from "../../../../components/Router";
import UserList, { UserListType } from "../../../Sparrow/components/UserList";
import { Route, Routes } from "react-router-dom";
import RouteSetter from "../../../../components/RouteSetter";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { navigateAction } from "../../../../store/slices/location_slice";

export type Props = {
    name: string;
    handle: string;
}

const Relations: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();
    const location = useAppSelector(state => state.location);

    return <div className="relations">
        <PageHeader>
            <div className="relations-user-title">
                <span className="name">
                    {props.name}
                </span>

                <span className="handle">
                    {props.handle}
                </span>
            </div>
        </PageHeader>

        <PageNavigation items={[
            {
                to: `${props.handle}/followers`,
                content: "Seguidores"
            },
            {
                to: `${props.handle}/following`,
                content: "Siguiendo"
            }
        ]} />

        <Router
            currentRoute={location.relations}
            routes={
            {
                following: <UserList
                    id="following-user-list"
                    name="following"
                    type={UserListType.Following}
                    target={props.handle}
                />,

                followers: <UserList
                    id="follower-user-list"
                    name="followers"
                    type={UserListType.Followers}
                    target={props.handle}
                />
            }}
        />

        <Routes>
            <Route
                path={`/:userHandle/following`}
                element={<RouteSetter
                    id="following-relations"
                    onMatch={() =>
                    {
                        dispatch(navigateAction({
                            page: "relations",
                            path: "following"
                        }));
                    }}
                />}
            />

            <Route
                path={`/:userHandle/followers`}
                element={<RouteSetter
                    id="followers-relations"
                    onMatch={() =>
                    {
                        dispatch(navigateAction({
                            page: "relations",
                            path: "followers"
                        }));
                    }}
                />}
            />
        </Routes>
    </div>;
};

export default Relations;