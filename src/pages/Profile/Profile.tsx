import "./Profile.scss";
import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import Loading from "../../components/Loading";
import ButtonContainer from "../../components/ButtonContainer";
import Button, { ButtonStyle } from "../../components/Button";
import FollowButton from "../Sparrow/components/FollowButton";
import LinkParser from "../../components/LinkParser";
import MONTHS from "../../utils/months";
import Router from "../../components/Router";
import CheepList, { CheepListType } from "../../components/CheepList";
import RouteSetter from "../../components/RouteSetter";
import PageHeader from "../../components/PageHeader";
import apiRouter from "../../request/router";
import { setProfileAction } from "../../store/slices/profile_slice";
import { emptyProfileData } from "../../data/profile_data";
import { navigateAction } from "../../store/slices/location_slice";
import Relations from "./components/Relations";
import ProfileNavigation from "../../components/ProfileNavigation";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCakeCandles, faCalendarDay, faLocationDot } from "@fortawesome/free-solid-svg-icons";

export type Props = {
    handle: string;
}

const Profile: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();
    const userSession = useAppSelector(state => state.session);
    const profile = useAppSelector(state => state.profile);
    const location = useAppSelector(state => state.location);
    const navigate = useNavigate();

    const loadProfile = async () =>
    {
        try
        {
            var response = await apiRouter.profile.get({ params: props.handle });

            if(response.status === 200 && response.data)
            {
                let profile = response.data.profile;
                profile.cheepCount = Number(profile.cheepCount);
                profile.followerCount = Number(profile.followerCount);
                profile.followingCount = Number(profile.followingCount);

                dispatch(setProfileAction(profile));
            }
            else
            {
                dispatch(setProfileAction(emptyProfileData));
            }
        }
        catch(err)
        {
            dispatch(setProfileAction(emptyProfileData));
        }
    };

    useEffect(
        () =>
        {
            loadProfile();
        },
        [ props.handle ]
    );

    if(!profile.data || !userSession.user)
    {
        return <div className="loading-container">
            <Loading />
        </div>;
    }

    let content: React.ReactNode;
    if(profile.data.handle !== undefined && (profile.data.handle.length === 0 || props.handle !== profile.data.handle))
    {
        content = <div className="loading-container">
            <Loading />
        </div>;
    }
    else if(profile.data.handle === undefined)
    {
        content = <>
            <header className="profile-header">
                <div className="banner-container">
                    <div className="banner"></div>
                </div>

                <div className="picture-container">
                    <div className="picture"></div>
                </div>

                <div className="options-container"></div>
            </header>

            <section className="user-information">
                <div className="user-id">
                    <span className="user-name">
                        @{props.handle}
                    </span>
                </div>
            </section>

            <section className="not-found">
                <div className="message-container">
                    <span className="message">
                        Esta cuenta no existe
                    </span>

                    <span className="extra">
                        Prueba intentando con otra.
                    </span>
                </div>
            </section>
        </>;
    }
    else
    {
        const birthdate = new Date(profile.data.birthdate || 0);
        const joinDate = new Date(profile.data.joinDate || 0);

        content = <>
            <header className="profile-header">
                <div className="banner-container">
                    <div className="banner">
                        {profile.data.banner ? <img src={profile.data.banner} alt="Imagen de portada" /> : null}
                    </div>
                </div>

                <div className="picture-container">
                    <div className="picture">
                        <img src={profile.data.picture} alt="" />
                    </div>
                </div>

                <div className="options-container">
                    <ButtonContainer>
                        {userSession.user.handle === props.handle ?
                            <Button
                                className="follow-button"
                                stylePreset={ButtonStyle.White}
                                onClick={() =>
                                {
                                    navigate("/settings/profile");
                                }}
                            >
                                Editar perfil
                            </Button> :

                            <FollowButton
                                id="profile-follow-button"
                                componentType="profile"
                                profile={profile.data}
                            />
                        }
                    </ButtonContainer>
                </div>
            </header>

            <section className="user-information">
                <div className="user-id">
                    <span className="user-name">
                        {profile.data.name}
                    </span>

                    <span className="user-handle">
                        @{profile.data.handle}
                    </span>
                </div>

                {profile.data.description ? <div className="description">
                    {profile.data.description}
                </div> : null}

                <div className="bottom-information">
                    <div className="extra-information">
                        {profile.data.location ?
                            <ShortInfo icon={faLocationDot}>
                                {profile.data.location}
                            </ShortInfo> :
                            null
                        }

                        {profile.data.website ?
                            <ShortInfo icon={faLink}>
                                <LinkParser className="sparrow-link" href={profile.data.website} />
                            </ShortInfo> :
                            null
                        }

                        {profile.data.birthdate !== null ?
                            <ShortInfo icon={faCakeCandles}>
                                Fecha de nacimiento: {birthdate.getDate()} de {MONTHS[birthdate.getMonth()]} de {birthdate.getFullYear()}
                            </ShortInfo> :
                            null
                        }

                        {profile.data.joinDate !== null ?
                            <ShortInfo icon={faCalendarDay}>
                                Se unió en {MONTHS[joinDate.getMonth()]} de {joinDate.getFullYear()}
                            </ShortInfo> :
                            null
                        }
                    </div>

                    <div className="counters">
                        <Link to={`/${profile.data.handle}/following`} className="counter-container">
                            <span className="ammount">
                                {profile.data.followingCount}
                            </span>

                            <span className="label">
                                &nbsp;Siguiendo
                            </span>
                        </Link>

                        <Link to={`/${profile.data.handle}/followers`} className="counter-container">
                            <span className="ammount">
                                {profile.data.followerCount}
                            </span>

                            <span className="label">
                                &nbsp;{profile.data.followerCount === 1 ? "Seguidor" : "Seguidores"}
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <ProfileNavigation userHandle={profile.data.handle} />

            <Router currentRoute={location["innerProfile"]} routes={{
                cheeps: <CheepList
                    name="profileCheeps"
                    type={CheepListType.Search}
                    arguments={
                    {
                        userHandle: profile.data.handle,
                        responses: false
                    }}
                />,

                withReplies: <CheepList
                    name="profileWithReplies"
                    type={CheepListType.Search}
                    arguments={
                    {
                        userHandle: profile.data.handle,
                        responses: true
                    }}
                />,

                media: <CheepList
                    name="profileMedia"
                    type={CheepListType.Search}
                    arguments={
                    {
                        userHandle: profile.data.handle,
                        onlyGallery: true
                    }}
                />,

                likes: <CheepList
                    name="profileLikes"
                    type={CheepListType.Likes}
                    arguments={
                    {
                        userHandle: profile.data.handle,
                    }}
                />,
            }} />

            <Routes>
                <Route
                    path="/:userHandle"
                    element={<RouteSetter
                        id="cheeps"
                        onMatch={() =>
                        {
                            dispatch(navigateAction({
                                page: "innerProfile",
                                path: "cheeps"
                            }));
                        }}
                    />}
                />

                <Route
                    path="/:userHandle/with-replies"
                    element={<RouteSetter
                        id="withReplies"
                        onMatch={() =>
                        {
                            dispatch(navigateAction({
                                page: "innerProfile",
                                path: "withReplies"
                            }));
                        }}
                    />}
                />

                <Route
                    path="/:userHandle/media"
                    element={<RouteSetter
                        id="media"
                        onMatch={() =>
                        {
                            dispatch(navigateAction({
                                page: "innerProfile",
                                path: "media"
                            }));
                        }}
                    />}
                />

                <Route
                    path="/:userHandle/likes"
                    element={<RouteSetter
                        id="likes"
                        onMatch={() =>
                        {
                            dispatch(navigateAction({
                                page: "innerProfile",
                                path: "likes"
                            }));
                        }}
                    />}
                />
            </Routes>
        </>;
    }

    return <>
        <Router
            currentRoute={location["profile"]}
            routes={
            {
                main: <>
                    <PageHeader>{
                        profile.data.handle === undefined || (profile.data.handle !== undefined && profile.data.handle.length === 0) ?
                        <>
                            <span className="title">
                                Perfil
                            </span>
                        </> :
                        <>
                            <span className="user-name">
                                {profile.data.name}
                            </span>

                            <span className="cheep-count">
                                {profile.data.cheepCount} Cheeps
                            </span>
                        </>
                    }</PageHeader>

                    {content}
                </>,

                relations: <Relations handle={profile.data.handle || ""} name={profile.data.name} />
            }}
        />

        <Routes>
            <Route path="/compose/cheep" element={<></>} />

            <Route
                path="/:userHandle/following"
                element={<RouteSetter
                    id="following"
                    onMatch={() =>
                    {
                        dispatch(navigateAction({
                            page: "profile",
                            path: "relations"
                        }));
                    }}
                />}
            />

            <Route
                path="/:userHandle/followers"
                element={<RouteSetter
                    id="followers"
                    onMatch={() =>
                    {
                        dispatch(navigateAction({
                            page: "profile",
                            path: "relations"
                        }));
                    }}
                />}
            />

            <Route
                path="/:userHandle/*"
                element={<RouteSetter
                    id="main"
                    onMatch={() =>
                    {
                        dispatch(navigateAction({
                            page: "profile",
                            path: "main"
                        }));
                    }}
                />}
            />
        </Routes>
    </>;
};

interface ShortInfoProps
{
    children?: React.ReactNode;
    icon: IconProp;
}

const ShortInfo: React.FunctionComponent<ShortInfoProps> = (props) =>
{
    return <span className="short-info">
        <FontAwesomeIcon icon={props.icon} />
        <span>{props.children}</span>
    </span>;
};

export default Profile;