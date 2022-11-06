import "./Home.scss";
import React from "react";
import CheepList, { CheepListType } from "../../components/CheepList";
import PageHeader from "../../components/PageHeader";
import UserPicture from "../../components/UserPicture";
import { useAppDispatch, useAppSelector } from "../../store";
import { closeNavigationModal, openNavigationModal } from "../../store/slices/navigation_modal_slice";

const Home: React.FunctionComponent = () =>
{
    const dispatch = useAppDispatch();
    const navigationModal = useAppSelector(state => state.navigationModal);
    const userSession = useAppSelector(state => state.session);

    if(!userSession.user)
    {
        return <></>;
    }

    return <div className="home-page">
        <PageHeader>
            <div className="home-page-header">
                <div
                    className="navigation-button"
                    onClick={() =>
                    {
                        if(navigationModal.open)
                        {
                            dispatch(closeNavigationModal());
                        }
                        else
                        {
                            dispatch(openNavigationModal());
                        }
                    }}
                >
                    <img
                        className="user-picture"
                        src={userSession.user.picture}
                    />
                </div>

                <span className="title">Inicio</span>
            </div>
        </PageHeader>

        <CheepList
            name="home"
            type={CheepListType.Timeline}
            arguments={{}}
        />
    </div>;
};

export default Home;