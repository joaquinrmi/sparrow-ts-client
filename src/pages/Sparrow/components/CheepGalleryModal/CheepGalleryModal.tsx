import "./CheepGalleryModal.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheepData from "../../../../data/cheep_data";
import NavigateTo from "./components/NavigateTo";
import Slider from "./components/Slider";
import CheepPage from "../../../CheepPage";
import { useAppDispatch, useAppSelector } from "../../../../store";
import processCheep from "../../../../utils/process_cheep";
import { setStatusMessage } from "../../../../store/slices/status_message_slice";
import apiRouter from "../../../../request/router";
import { setCheepGalleryModal } from "../../../../store/slices/cheep_gallery_modal_slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faXmark } from "@fortawesome/free-solid-svg-icons";

export type Props = {
    userHandle: string;
    cheepId: number;
    photoIndex: number;
}

const CheepGalleryModal: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();
    const cheepGalleryModal = useAppSelector(state => state.cheepGalleryModal);

    const [ navigationCount, setNavigationCount ] = useState(1);

    const navigate = useNavigate();

    let cheepData: CheepData | undefined;
    let photoIndex: number | undefined;
    if(cheepGalleryModal)
    {
        cheepData = cheepGalleryModal.data;
        photoIndex = cheepGalleryModal.photoIndex;
    }

    useEffect(
        () =>
        {
            document.body.style.overflow = "hidden";

            if(cheepData !== undefined && (cheepData.id === props.cheepId))
            {
                return () =>
                {
                    document.body.style.overflow = "auto";
                };
            }

            (async () =>
            {
                try
                {
                    var response = await apiRouter.cheep.single({
                        params: props.cheepId
                    });

                    if(!response.data)
                    {
                        dispatch(setStatusMessage("Error al cargar el cheep."));
                        navigate(-1);
                        return;
                    }
                }
                catch(err)
                {
                    dispatch(setStatusMessage("Error al cargar el cheep."));
                    navigate(-1);
                    return;
                }

                const cheepData = processCheep(response.data.cheep, false);

                dispatch(setCheepGalleryModal({
                    data: cheepData,
                    photoIndex: props.photoIndex
                }));
            })();

            return () =>
            {
                document.body.style.overflow = "auto";
            };
        }
    );

    const prevPicture = () =>
    {
        if(cheepData !== undefined && props.photoIndex <= 1)
        {
            return;
        }

        navigate(`/${props.userHandle}/status/${props.cheepId}/photo/${props.photoIndex - 1}`);
        setNavigationCount((value) => value + 1);
    };

    const nextPicture = () =>
    {
        if(cheepData !== undefined && props.photoIndex >= cheepData.gallery.length)
        {
            return;
        }

        navigate(`/${props.userHandle}/status/${props.cheepId}/photo/${props.photoIndex + 1}`);
        setNavigationCount((value) => value + 1);
    };

    useEffect(
        () =>
        {
            let navigateOnGallery = (ev: KeyboardEvent) =>
            {
                switch(ev.key)
                {
                case "ArrowRight":
                    nextPicture();
                    break;

                case "ArrowLeft":
                    prevPicture();
                    break;

                case "Escape":
                    setNavigationCount((count) =>
                    {
                        navigate(-count);
                        return count;
                    });
                }
            };

            const asideElement = document.querySelector(".cheep-modal-container .cheep-container") as HTMLDivElement;
            const iElement = document.querySelector(".gallery-button.collapse i") as HTMLSpanElement;

            const onResize = () =>
            {
                if(asideElement !== null)
                {
                    if(iElement !== null)
                    {
                        if(asideElement.getBoundingClientRect().width === 0)
                        {
                            iElement.classList.remove("fa-angles-right");
                            iElement.classList.add("fa-angles-left");
                        }
                        else
                        {
                            iElement.classList.remove("fa-angles-left");
                            iElement.classList.add("fa-angles-right");
                        }
                    }
                }
            }

            window.addEventListener("resize", onResize);
            document.addEventListener("keydown", navigateOnGallery);

            return () =>
            {
                window.removeEventListener("resize", onResize);
                document.removeEventListener("keydown", navigateOnGallery);
            }
        }
    );

    let content: React.ReactNode;
    if(cheepData && photoIndex !== undefined && props.cheepId === cheepData.id)
    {
        if(props.photoIndex < 1)
        {
            content = <NavigateTo
                path={`/${props.userHandle}/status/${props.cheepId}/photo/1`}
                action={() =>
                {
                    if(cheepData !== undefined)
                    {
                        setNavigationCount((value) => value + 1);
                        dispatch(setCheepGalleryModal({
                            data: cheepData,
                            photoIndex: 1
                        }));
                    }
                }}
            />;
        }
        else if(props.photoIndex - 1 >= cheepData.gallery.length)
        {
            content = <NavigateTo
                path={`/${props.userHandle}/status/${props.cheepId}/photo/${cheepData.gallery.length}`}
                action={() =>
                {
                    if(cheepData !== undefined)
                    {
                        setNavigationCount((value) => value + 1);
                        dispatch(setCheepGalleryModal({
                            data: cheepData,
                            photoIndex: cheepData.gallery.length
                        }));
                    }
                }}
            />;
        }
        else
        {
            content = <>
                <section
                    className="gallery-container"
                    onClick={(ev) =>
                    {
                        if(((ev.target as HTMLDivElement).parentElement as HTMLDivElement).classList.contains("slider"))
                        {
                            navigate(-navigationCount);
                        }
                    }}
                >
                    <Slider gallery={cheepData.gallery} currentIndex={props.photoIndex - 1} />

                    <div
                        className="gallery-button close"
                        onClick={() =>
                        {
                            navigate(-navigationCount);
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </div>

                    <div
                        className="gallery-button collapse"
                        onClick={(ev) =>
                        {
                            const asideElement = document.querySelector(".cheep-modal-container .cheep-container") as HTMLDivElement;

                            if(asideElement === null)
                            {
                                return;
                            }

                            if(asideElement.classList.contains("hidden"))
                            {
                                asideElement.classList.remove("hidden");
                                if(window.innerWidth < 950)
                                {
                                    asideElement.classList.add("show");
                                }
                            }
                            else
                            {
                                asideElement.classList.remove("show");
                                asideElement.classList.add("hidden");
                            }

                            const iElement = document.querySelector(".gallery-button.collapse i") as HTMLSpanElement;

                            if(iElement === null)
                            {
                                return;
                            }

                            if(asideElement.getBoundingClientRect().width === 0)
                            {
                                iElement.classList.remove("fa-angles-right");
                                iElement.classList.add("fa-angles-left");
                            }
                            else
                            {
                                iElement.classList.remove("fa-angles-left");
                                iElement.classList.add("fa-angles-right");
                            }
                        }}
                    >
                        <i className="fa-solid fa-angles-right"></i>
                    </div>

                    {props.photoIndex > 1 ?
                        <div
                            className="gallery-button left"
                            onClick={() =>
                            {
                                prevPicture();
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div> :
                        null
                    }

                    {props.photoIndex < cheepData.gallery.length ?
                        <div
                            className="gallery-button right"
                            onClick={() =>
                            {
                                nextPicture();
                            }}
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div> :
                        null
                    }
                </section>

                <section className="cheep-container">
                    <CheepPage
                        id="cheep-modal-cheep"
                        cheepId={cheepData.id}
                        data={cheepData}
                        hideGallery
                        hideHeader
                    />
                </section>
            </>;
        }
    }
    else
    {
        content = <></>;
    }

    return <div className="cheep-gallery-modal">
        <div className="cheep-modal-container">
            {content}
        </div>
    </div>;
};

export default CheepGalleryModal;