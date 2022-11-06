import "./Cheep.scss";
import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheepData from "../../data/cheep_data";
import { CheepListName } from "../../store/state/cheep_lists_state";
import { useAppDispatch, useAppSelector } from "../../store";
import getRelevantCheepData from "./get_relevant_cheep_data";
import Unavailable from "./components/Unavailable";
import conditionalClass from "../../utils/conditional_class";
import { openMoreOptionsMenu } from "../../store/slices/more_options_menu_slice";
import UserPicture from "../UserPicture";
import CheepContent from "./components/CheepContent";
import Gallery from "../Gallery";
import CommentButton from "../CommentButton";
import RecheepButton from "../RecheepButton";
import LikeButton from "../LikeButton";
import MONTHS from "../../utils/months";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faRetweet } from "@fortawesome/free-solid-svg-icons";

export type Props = {
    id: string;
    data: CheepData;
    index?: number;
    listName?: CheepListName;
    quote?: boolean;
    response?: boolean;
}

const Cheep: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();
    const userSession = useAppSelector(store => store.session);
    const cheepLists = useAppSelector(store => store.cheepLists);

    const [ , refresh ] = useState<boolean>(false);

    const cheepData = getRelevantCheepData(props.data);
    const dateCreated = useMemo(() => new Date(cheepData.dateCreated), []);

    const cheepDate = formatDate(new Date(dateCreated));

    const like = cheepData.liked;
    const recheep = cheepData.recheepped;

    const navigate = useNavigate();

    useEffect(
        () =>
        {
            let interval = setInterval(() =>
            {
                refresh((r) => !r);
            },
            2 * 60 * 1000);

            return () =>
            {
                clearInterval(interval);
            };
        },
        []
    );

    if(dateCreated.getTime() === new Date(-1).getTime())
    {
        if(props.quote)
        {
            return <Unavailable quote={props.quote} />;
        }
        else
        {
            return <div className="unavailable-cheep-container">
                <Unavailable />
            </div>;
        }
    }

    const cheepLink = `/${cheepData.author.handle}/status/${cheepData.id}`;
    const authorPicture = <>
        <div
            className="cheep-picture"
            style={{
                backgroundImage: `url(${cheepData.author.picture})`
            }}
            title={`Foto de perfil de @${cheepData.author.name}`}
        />

        <div className="veil"></div>
    </>;

    return <div
        className={conditionalClass(
            {
                "quote-form": props.quote,
                "response-form": props.response,
                "response-target": props.data.existsJustBecauseItIsAResponseTarget
            },
            [ "cheep" ]
        )}
        onClick={(ev) =>
        {
            if(props.response)
            {
                return;
            }

            ev.stopPropagation();
            navigate(cheepLink);
        }}
    >
        {cheepData !== props.data ?
            <div className="recheep-info">
                <div className="icon">
                    <FontAwesomeIcon icon={faRetweet} />
                </div>

                <Link
                    className="message"
                    to={`/${props.data.author.handle}`}
                    onClick={(ev) =>
                    {
                        ev.stopPropagation();
                    }}
                >
                    {props.data.author.name === userSession.user?.name ? "Recheepeaste" : `${props.data.author.name} lo recheepeó`}
                </Link>
            </div> :
            null
        }

        <div className="cheep-cheep">
            {!props.quote && userSession.user?.handle === cheepData.author.handle ?
                <div
                    id={`${props.id}-more-options`}
                    className="more-options"
                    onClick={(ev) =>
                    {
                        ev.stopPropagation();

                        const button = document.getElementById(`${props.id}-more-options`) as HTMLDivElement;

                        if(button === null)
                        {
                            return;
                        }

                        const rect = button.getBoundingClientRect();
                        const x = rect.left + window.scrollX;
                        const y = rect.top + window.scrollY;

                        if(props.listName !== undefined && props.index !== undefined)
                        {
                            dispatch(openMoreOptionsMenu({
                                listName: props.listName,
                                cheepIndex: props.index,
                                positionX: x,
                                positionY: y,
                                targetCheep: cheepLists[props.listName].cheeps[props.index]
                            }));
                        }                    
                    }}
                >
                    <FontAwesomeIcon icon={faEllipsis} />
                </div> :
                null
            }

            {!props.quote ?
                <div className="left-cheep-column">
                    <UserPicture
                        userHandle={cheepData.author.handle}
                        userName={cheepData.author.name}
                        picture={cheepData.author.picture}
                        notClickeable={props.response ? true : false}
                    />

                    {props.response || props.data.existsJustBecauseItIsAResponseTarget ?
                        <div className="silver-line-container">
                            <div className="silver-line">
                                {!props.response ?
                                    <div className="silver-line-continue"></div> :
                                    null
                                }
                            </div>
                        </div> :
                        null
                    }
                </div> :
                null
            }

            <div className="cheep-body">
                <div className="cheep-header">
                    {props.quote ?
                        <div className="header-picture-container">
                            {authorPicture}
                        </div> :
                        null
                    }

                    {props.response ?
                        <>
                            <span className="author-name">{cheepData.author.name}</span>
                            <span className="author-handle">@{cheepData.author.handle}</span>
                            <span className="separator">·</span>
                            <span className="cheep-date">{cheepDate}</span>
                        </> :
                        <>
                            <Link
                                className="author-name"
                                to={`/${cheepData.author.handle}`}
                                onClick={(ev) =>
                                {
                                    ev.stopPropagation();
                                }}
                            >
                                {cheepData.author.name}
                            </Link>

                            <Link
                                className="author-handle"
                                to={`/${cheepData.author.handle}`}
                                onClick={(ev) =>
                                {
                                    ev.stopPropagation();
                                }}
                            >
                                @{cheepData.author.handle}
                            </Link>

                            <span className="separator">·</span>

                            <Link
                                className="cheep-date"
                                to={cheepLink}
                                onClick={(ev) =>
                                {
                                    ev.stopPropagation();
                                }}
                            >
                                {cheepDate}
                            </Link>
                        </>
                    }
                </div>

                <div className="cheep-content">
                    <span className="content-text">
                        {cheepData.content ?
                            <CheepContent
                                content={cheepData.content}
                                response={props.response}
                            /> :
                            null
                        }
                    </span>

                    {props.quote && cheepData.quoteTarget ?
                        <span className="show-thread">
                            Mostrar este hilo
                        </span> :
                        null
                    }

                    {!props.quote && cheepData.gallery && cheepData.gallery.length > 0 ?
                        <div className="sub-container">
                            <Gallery
                                pictures={cheepData.gallery}
                                userHandle={cheepData.author.handle}
                                cheepId={cheepData.id}
                            />
                        </div> :
                        null
                    }

                    {!props.quote && cheepData.quoteTarget ?
                        <div className="sub-container">
                            <Cheep id={`quote-${props.id}`} data={cheepData.quoteTarget} quote />
                        </div> :
                        null
                    }

                    {!props.quote ?
                        <div className="interaction-container">
                            <div className="interaction-button-container">
                                <CommentButton
                                    id={`comment-${props.id}`}
                                    cheepData={cheepData}
                                    counter={true}
                                />
                            </div>

                            <div className="interaction-button-container">
                                <RecheepButton
                                    id={`recheep-${props.id}`}
                                    listName={props.listName}
                                    index={props.index}
                                    cheepData={props.data}
                                    relevantCheepData={cheepData}
                                    active={recheep}
                                    counter={cheepData.recheepCount + cheepData.withCommentsCount}
                                />
                            </div>

                            <div className="interaction-button-container">
                                <LikeButton
                                    id={`like-${props.id}`}
                                    componentType={"cheep"}
                                    cheepData={props.data}
                                    listName={props.listName}
                                    cheepId={cheepData.id}
                                    active={like}
                                    counter={cheepData.likeCount}
                                />
                            </div>
                        </div> :
                        null
                    }

                    {props.response ?
                        <div className="response-message">
                            <span>Respondiendo a </span>

                            <span className="response-author">
                                @{props.data.author.handle}
                            </span>
                        </div> :
                        null
                    }
                </div>

                {props.quote && cheepData.gallery && cheepData.gallery.length > 0 ?
                    <div className="sub-container">
                        <Gallery pictures={cheepData.gallery} />
                    </div> :
                    null
                }
            </div>
        </div>
    </div>;
};

const MINUTE_TIME = 1000 * 60;
const HOUR_TIME = MINUTE_TIME * 60;
const DAY_TIME = HOUR_TIME * 24;

function formatDate(date: Date): string
{
    const deltaTime = new Date().getTime() - date.getTime();

    if(deltaTime < 1000)
    {
        return "ahora";
    }

    if(deltaTime < MINUTE_TIME)
    {
        return `${Math.round(deltaTime / 1000)}s`;
    }
    
    if(deltaTime < HOUR_TIME)
    {
        return `${Math.round(deltaTime / (1000 * 60))}min`;
    }

    if(deltaTime < DAY_TIME)
    {
        return `${Math.round(deltaTime / (1000 * 60 * 60))}h`;
    }

    let result = `${date.getDate()} ${MONTHS[date.getMonth()].substring(0, 3).toLowerCase()}.`;

    if(new Date().getFullYear() !== date.getFullYear())
    {
        result += ` ${date.getFullYear()}`;
    }

    return result;
}

export default Cheep;