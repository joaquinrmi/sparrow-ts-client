import "./NavigationModal.scss";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import conditionalClass from "../../../../utils/conditional_class";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { closeNavigationModal, openNavigationModal } from "../../../../store/slices/navigation_modal_slice";

const NavigationModal: React.FunctionComponent = () =>
{
    const dispatch = useAppDispatch();
    const navigationModal = useAppSelector(state => state.navigationModal);
    const userSession = useAppSelector(state => state.session);

    useEffect(
        () =>
        {
            if(navigationModal.open)
            {
                document.body.style.overflow = "hidden";
            }
            else
            {
                document.body.style.overflow = "auto";
            }
        },
        [ navigationModal.open ]
    );

    const handleNavigationClick = () =>
    {
        dispatch(closeNavigationModal());
    }

    return <div className={conditionalClass(
        {
            "open": navigationModal.open
        },
        [ "navigation-modal" ]
    )}>
        <div className="flap">
            <div className="close-container">
                <button
                    className="close-button"
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
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>

            <div className="navigation-container">
                <ul>
                    <li>
                        <Link
                            to={`/${userSession.user?.handle}`}
                            onClick={handleNavigationClick}
                        >
                            <FontAwesomeIcon icon={faUser} />
                            <span>Perfil</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>;
};

export default NavigationModal;