import "./CheepPage.scss";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CheepData from "../../data/cheep_data";
import { useAppDispatch, useAppSelector } from "../../store";
import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";
import CheepList, { CheepListType } from "../../components/CheepList";
import CheepEditor from "../Sparrow/components/CheepEditor";
import LikeButton from "../../components/LikeButton";
import RecheepButton from "../../components/RecheepButton";
import CommentButton from "../../components/CommentButton";
import Cheep from "../../components/Cheep";
import Gallery from "../../components/Gallery";
import CheepContent from "../../components/Cheep/components/CheepContent";
import UserPicture from "../../components/UserPicture";
import MONTHS from "../../utils/months";
import processCheep from "../../utils/process_cheep";
import apiRouter from "../../request/router";
import { setCheepPage } from "../../store/slices/cheep_page_slice";
import { setCheepListAction } from "../../store/slices/cheep_lists_slice";
import Thread from "../../components/Thread";

export type Props = {
    id: string;
    cheepId: number;
    data?: CheepData;
    hideGallery?: boolean;
    hideHeader?: boolean;
}

const CheepPage: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();
    const cheepPage = useAppSelector(state => state.cheepPage);

    let cheepData: CheepData | undefined;
    if(props.data !== undefined)
    {
        cheepData = props.data
    }
    else if(cheepPage && cheepPage.data.id === props.cheepId)
    {
        cheepData = cheepPage.data;
    }

    useEffect(
        () =>
        {
            if(cheepData === undefined || cheepData.id !== props.cheepId)
            {
                (async () =>
                {
                    try
                    {
                        var response = await apiRouter.cheep.single({
                            params: props.cheepId
                        });

                        if(!response.data)
                        {
                            return;
                        }
                    }
                    catch(err)
                    {
                        return;
                    }

                    const cheepData = processCheep(response.data.cheep, true);

                    let upperCheeps = new Array<CheepData>();

                    let currentData = cheepData;
                    while(currentData.responseOf !== undefined)
                    {
                        upperCheeps = [ currentData.responseOf, ...upperCheeps ];
                        currentData = currentData.responseOf;
                    }

                    dispatch(setCheepPage(cheepData));
                    dispatch(setCheepListAction({
                        pool: "thread",
                        listData: {
                            cheeps: upperCheeps,
                            nextTime: 0,
                            query: {}
                        }
                    }));
                })();
            }
        }
    );

    let content: React.ReactNode;
    if(cheepData)
    {
        const date = new Date(cheepData.dateCreated);
        let formatedDate = "";

        const minutes = date.getMinutes();
        const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

        const hours = date.getHours();
        if(hours > 0 && hours < 12)
        {
            formatedDate = `${hours}:${minutesStr} a. m.`;
        }
        else if(hours > 12 && hours < 24)
        {
            formatedDate = `${hours - 12}:${minutesStr} p. m.`;
        }
        else if(hours === 0)
        {
            formatedDate = "12:00 a. m.";
        }
        else
        {
            formatedDate = "12:00 p. m.";
        }

        formatedDate += ` · ${date.getDate()} ${MONTHS[date.getMonth()].substring(0, 3).toLowerCase()}. ${date.getFullYear()}`;

        const profilePath = `/${cheepData.author.handle}`;

        const cheepPath = `/${cheepData.author.handle}/status/${cheepData.id}`;

        content = <>
            <Thread name="thread" />

            <section className="cheep-page-body">
                <div className="author-header">
                    <UserPicture userHandle={cheepData.author.handle} userName={cheepData.author.name} picture={cheepData.author.picture} />

                    <div className="author-info-container">
                        <Link to={profilePath} className="author-name">
                            {cheepData.author.name}
                        </Link>

                        <Link to={profilePath} className="author-handle">
                            @{cheepData.author.handle}
                        </Link>
                    </div>
                </div>
                
                {cheepData.content && cheepData.content.length > 0 ?
                    <div className="cheep-content">
                        <CheepContent content={cheepData.content} />
                    </div>:
                    null
                }

                {!props.hideGallery && cheepData.gallery && cheepData.gallery.length > 0 ?
                    <div className="sub-container">
                        <Gallery pictures={cheepData.gallery} userHandle={cheepData.author.handle} cheepId={cheepData.id} />
                    </div> :
                    null
                }

                {cheepData.quoteTarget ?
                    <div className="sub-container">
                        <Cheep id={`quote-${props.id}`} data={cheepData.quoteTarget} quote />
                    </div> :
                    null
                }

                <div className="date-container">
                    <Link to={profilePath} className="cheep-date">
                        {formatedDate}
                    </Link>
                </div>

                <div className="cheep-page-bottom">
                    <div className="counters-container">
                        <div className="counters-list">
                            <Link className="cheep-counter" to={`${cheepPath}/recheeps`}>
                                <span className="counter-value">
                                    {formatNumber(cheepData.recheepCount)}
                                </span>

                                <span className="counter-message">
                                    Recheeps
                                </span>
                            </Link>

                            <Link className="cheep-counter" to={`${cheepPath}/with-comments`}>
                                <span className="counter-value">
                                    {formatNumber(cheepData.withCommentsCount)}
                                </span>

                                <span className="counter-message">
                                    Cheeps citados
                                </span>
                            </Link>

                            <Link className="cheep-counter" to={`${cheepPath}/likes`}>
                                <span className="counter-value">
                                    {formatNumber(cheepData.likeCount)}
                                </span>

                                <span className="counter-message">
                                    Me gusta
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="buttons-container">
                        <div className="button-container">
                            <CommentButton id="comment-cheep-page" cheepData={cheepData} counter={false} />
                        </div>

                        <div className="button-container">
                            <RecheepButton
                                id={`recheep-${props.id}`}
                                cheepData={cheepData}
                                relevantCheepData={cheepData}
                                active={cheepData.recheepped}
                                counter={0}
                            />
                        </div>

                        <div className="button-container">
                            <LikeButton
                                id={`like-${props.id}`}
                                componentType={"page"}
                                cheepData={cheepData}
                                cheepId={cheepData.id}
                                active={cheepData.liked}
                                counter={0}
                            />
                        </div>
                    </div>

                    <div className="reply-container">
                        <CheepEditor
                            id="cheep-editor-page"
                            cheepListTarget="comments"
                            responseTarget={cheepData}
                            inPage
                        />
                    </div>
                </div>
            </section>

            <CheepList
                name="comments"
                type={CheepListType.Search}
                hideResponseTarget
                arguments={
                {
                    responses: true,
                    responseOf: cheepData.id
                }}
                hideNothingToShow
            />
        </>;
    }
    else
    {
        content = <div className="loading-container">
            <Loading />
        </div>;
    }

    return <div id={props.id} className="cheep-page">
        {!props.hideHeader ?
            <PageHeader>
                <span className="title">Cheep</span>
            </PageHeader> :
            null
        }

        {content}
    </div>;
};

function formatNumber(num: number): string
{
    if(num < 1000)
    {
        return `${num}`;
    }

    if(num < 10_000)
    {
        let a = num / 1000;
        let b = Math.floor(a);
        return `${b}.${(a - b) * 1000}`;
    }

    return `${Math.floor(num / 100) / 10} mil`;
}

function updateRecheep(data: CheepData, recheep: boolean): void
{
    if(recheep)
    {
        data.recheepped = false;
        data.recheepCount -= 1;
    }
    else
    {
        data.recheepped = true;
        data.recheepCount += 1;
    }
}

export default CheepPage;