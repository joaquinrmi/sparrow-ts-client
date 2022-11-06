import "./Sparrow.scss";
import React, { useState } from "react";
import { Routes, Route, Navigate, useParams, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import MainAside from "./components/MainAside";
import NavigationBar from "./components/NavigationBar";
import AccountMenuButton from "./components/AccountMenuButton";
import Router from "../../components/Router";
import MainSection from "./components/MainSection";
import RouteSetter from "../../components/RouteSetter";
import GetHandle from "./components/GetHandle";
import Home from "../Home";
import Explore from "../Explore";
import Notifications from "../Notifications";
import Messages from "../Messages";
import Settings from "../Settings";
import CheepEditorModal from "./components/CheepEditorModal";
import CheepPage from "../CheepPage";
import Profile from "../Profile";
import RecommendedList from "./components/RecommendedList";
import Search from "../Search";
import LikesList from "../LikesList";
import QuotesList from "../QuotesList";
import RecheepsList from "../RecheepsList";
import ProfileFormModal from "./components/ProfileFormModal";
import CheepGalleryModal from "./components/CheepGalleryModal";
import StatusModal from "./components/StatusModal";
import RecheepMenu from "./components/RecheepMenu";
import CheepOptionsMenu from "./components/CheepOptionsMenu";
import AccountMenu from "./components/AccountMenu";
import CloseConfirmation from "./components/CloseConfirmation";
import UnfollowConfirmation from "./components/UnfollowConfirmation";
import MobileNavigation from "./components/MobileNavigation";
import ComposeButton from "./components/ComposeButton";
import NavigationModal from "./components/NavigationModal";

const Sparrow: React.FunctionComponent = () =>
{
    const state = useAppSelector(state => state);
    const userSession = useAppSelector(state => state.session);

    const [ currentRoute, setCurrentRoute ] = useState<string>("");
    const [ userHandle, setUserHandle ] = useState<string>("");
    const [ cheepId, setCheepId ] = useState<number>(0);
    const [ searchParams, setSearchParams ] = useState<URLSearchParams>();

    const aside = <MainAside />;

    if(!userSession.user)
    {
        return <></>;
    }

    return <div className="sparrow">
        <div className="sparrow-content">
            <div className="sparrow-left">
                <div className="navigation-container">
                    <NavigationBar handle={userSession.user?.handle} />

                    <div className="account-menu-button-container">
                        <AccountMenuButton />
                    </div>
                </div>
            </div>

            <Router
                currentRoute={currentRoute}
                routes={
                {
                    home: <MainSection mainColumnChildren={<Home />} rightColumnChildren={aside} />,

                    explore: <MainSection mainColumnChildren={<Explore />} rightColumnChildren={aside} />,

                    notifications: <MainSection mainColumnChildren={<Notifications />} rightColumnChildren={aside} />,

                    messages: <MainSection mainColumnChildren={<Messages />} rightColumnChildren={aside} />,

                    settings: <MainSection mainColumnChildren={<Settings />} rightColumnChildren={aside} />,

                    compose: <CheepEditorModal />,

                    cheep: <MainSection mainColumnChildren={<CheepPage id="cheep-page" cheepId={cheepId} />} rightColumnChildren={aside} />,

                    profile: <MainSection mainColumnChildren={<Profile handle={userHandle} />} rightColumnChildren={aside} />,

                    recommended: <MainSection mainColumnChildren={<RecommendedList />} rightColumnChildren={aside} />,

                    search: <MainSection mainColumnChildren={<Search params={searchParams} />} rightColumnChildren={aside} />,

                    hashtag: <MainSection mainColumnChildren={<Search params={searchParams} />} rightColumnChildren={aside} />,

                    usersLike: <MainSection mainColumnChildren={<LikesList cheepId={cheepId} />} rightColumnChildren={aside} />,

                    withComments: <MainSection mainColumnChildren={<QuotesList cheepId={cheepId} />} rightColumnChildren={aside} />,

                    recheeps: <MainSection mainColumnChildren={<RecheepsList cheepId={cheepId} />} rightColumnChildren={aside} />,
                }}
            />

            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />

                <Route path="/home" element={
                    <RouteSetter
                        id="home"
                        onMatch={() =>
                        {
                            setCurrentRoute("home");
                        }}
                    />}
                />

                <Route path="/explore" element={
                    <RouteSetter
                        id="explore"
                        onMatch={() =>
                        {
                            setCurrentRoute("explore");
                        }}
                    />}
                />
                
                <Route path="/notifications" element={
                    <RouteSetter
                        id="notifications"
                        onMatch={() =>
                        {
                            setCurrentRoute("notifications");
                        }}
                    />}
                />
                
                <Route path="/messages" element={
                    <RouteSetter
                        id="messages"
                        onMatch={() =>
                        {
                            setCurrentRoute("messages");
                        }}
                    />}
                />
                
                <Route path="/settings/profile" element={<ProfileFormModal />} />
                
                <Route path="/settings" element={
                    <RouteSetter
                        id="settings"
                        onMatch={() =>
                        {
                            setCurrentRoute("settings");
                        }}
                    />}
                />

                <Route path="/recommended" element={
                    <RouteSetter
                        id="recommended"
                        onMatch={() =>
                        {
                            setCurrentRoute("recommended");
                        }}
                    />}
                />

                <Route path="/search" element={
                    <GetSearchParams>{
                        (searchParams) =>
                        {
                            return <RouteSetter
                                id={`search-${searchParams.get("q")}`}
                                onMatch={() =>
                                {
                                    setSearchParams(searchParams);
                                    setCurrentRoute("search");
                                }}
                            />;
                        }
                    }</GetSearchParams>}
                />

                <Route path="/hashtag/:tag" element={
                    <GetHashtag>{
                        (searchParams) =>
                        {
                            return <RouteSetter
                                id={`hashtag-${searchParams.get("q")}`}
                                onMatch={() =>
                                {
                                    setSearchParams(searchParams);
                                    setCurrentRoute("hashtag");
                                }}
                            />;
                        }
                    }</GetHashtag>}
                />

                <Route path="/compose/cheep/*" element={<CheepEditorModal />} />

                <Route path="/:userHandle/status/:cheepId/photo/:photoIndex/*" element={
                    <GetHandle>{
                        (userHandle) =>
                        {
                            return <GetCheepId>{
                                (cheepId) =>
                                {
                                    return <GetPhotoIndex>{
                                        (photoIndex) =>
                                        {
                                            return <CheepGalleryModal userHandle={userHandle} cheepId={cheepId} photoIndex={photoIndex} />;
                                        }
                                    }</GetPhotoIndex>
                                }
                            }</GetCheepId>;
                        }
                    }</GetHandle>}
                />

                <Route path="/:userHandle/status/:cheepId/likes" element={
                    <GetCheepId>{
                        (cheepId) =>
                        {
                            return <RouteSetter
                                id={`cheep-${cheepId}-likes`}
                                onMatch={() =>
                                {
                                    setCheepId(cheepId);
                                    setCurrentRoute("usersLike");
                                }}
                            />;
                        }
                    }</GetCheepId>}
                />

                <Route path="/:userHandle/status/:cheepId/with-comments" element={
                    <GetCheepId>{
                        (cheepId) =>
                        {
                            return <RouteSetter
                                id={`cheep-${cheepId}-with-comments`}
                                onMatch={() =>
                                {
                                    setCheepId(cheepId);
                                    setCurrentRoute("withComments");
                                }}
                            />;
                        }
                    }</GetCheepId>} 
                />
                
                <Route path="/:userHandle/status/:cheepId/recheeps" element={
                    <GetCheepId>{
                        (cheepId) =>
                        {
                            return <RouteSetter
                                id={`cheep-${cheepId}-recheeps`}
                                onMatch={() =>
                                {
                                    setCheepId(cheepId);
                                    setCurrentRoute("recheeps");
                                }}
                            />;
                        }
                    }</GetCheepId>}
                />
                
                <Route path="/:userHandle/status/:cheepId/*" element={
                    <GetCheepId>{
                        (cheepId) =>
                        {
                            return <RouteSetter
                                id={`cheep-${cheepId}`}
                                onMatch={() =>
                                {
                                    setCheepId(cheepId);
                                    setCurrentRoute("cheep");
                                }}
                            />;
                        }
                    }</GetCheepId>}
                />

                <Route path="/:userHandle/*" element={
                    <GetHandle>{
                        (userHandle) =>
                        {
                            return <RouteSetter
                                id={userHandle}
                                onMatch={() =>
                                {
                                    setUserHandle(userHandle);
                                    setCurrentRoute("profile");
                                }}
                            />
                        }
                    }</GetHandle>}
                />
            </Routes>
        </div>

        <StatusModal id="sparrow-status-modal" />

        {state.recheepMenu.active ?
            <RecheepMenu /> :
            null
        }

        {state.moreOptionsMenu.active ?
            <CheepOptionsMenu /> :
            null
        }

        {state.accountMenu.active ?
            <AccountMenu /> :
            null
        }

        {state.closeConfirmation.active ?
            <CloseConfirmation /> :
            null
        }

        {state.unfollowConfirmation.active ?
            <UnfollowConfirmation /> :
            null
        }

        <MobileNavigation handle={userSession.user?.handle} />

        <ComposeButton />

        <NavigationModal />
    </div>;
};

interface GetCheepIdProps
{
    children(cheepId: number): React.ReactNode;
}

const GetCheepId: React.FunctionComponent<GetCheepIdProps> = (props) =>
{
    const { cheepId } = useParams();

    return <>{props.children(Number(cheepId))}</>;
};

interface GetPhotoIndexProps
{
    children(photoIndex: number): React.ReactNode;
}

const GetPhotoIndex: React.FunctionComponent<GetPhotoIndexProps> = (props) =>
{
    const { photoIndex } = useParams();

    return <>{props.children(Number(photoIndex))}</>;
};

interface GetSearchParamsProps
{
    children(searchParams: URLSearchParams): React.ReactNode;
}

const GetSearchParams: React.FunctionComponent<GetSearchParamsProps> = (props) =>
{
    const [ searchParams ] = useSearchParams();

    return <>{props.children(searchParams)}</>;
}

interface GetHashtagProps
{
    children(searchParams: URLSearchParams): React.ReactNode;
}

const GetHashtag: React.FunctionComponent<GetHashtagProps> = (props) =>
{
    const { tag } = useParams();

    return <>{props.children(new URLSearchParams(`?q=${tag}`))}</>
};

export default Sparrow;