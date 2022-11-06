import React, { useEffect } from "react";
import SearchCheepsParams from "../../data/search_cheeps_params";
import searchCheeps, { exploreCheeps, getTimeline, likedCheeps } from "../../request/search_cheeps";
import { useAppDispatch, useAppSelector } from "../../store";
import { setCheepListAction, setCheepListLoadMore, setCheepListLoadNoMore } from "../../store/slices/cheep_lists_slice";
import { CheepListName } from "../../store/state/cheep_lists_state";
import Cheep from "../Cheep/Cheep";
import Loading from "../Loading";
import NothingToShow from "../NothingToShow";

export type Props = {
    name: CheepListName;
    type: CheepListType;
    arguments: SearchCheepsParams;
    hideResponseTarget?: boolean;
    hideNothingToShow?: boolean;
}

export enum CheepListType
{
    Search,
    Timeline,
    Explore,
    Likes
};

const CheepList: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();
    const listState = useAppSelector(state => state.cheepLists[props.name]);

    const loadMoreCheeps = async () =>
    {
        if(listState.loadMore && !listState.noMore)
        {
            switch(props.type)
            {
            case CheepListType.Search:
                let args: SearchCheepsParams = {
                    ...props.arguments,
                    nextTo: listState.nextTime
                };
                var { cheeps, next } = await searchCheeps(args, props.hideResponseTarget);
                break;

            case CheepListType.Timeline:
                var { cheeps, next } = await getTimeline(listState.nextTime);
                break;

            case CheepListType.Explore:
                var { cheeps, next } = await exploreCheeps(listState.nextTime);
                break;

            case CheepListType.Likes:
                var { cheeps, next } = await likedCheeps(props.arguments.userHandle || "",listState.nextTime);
                break;
            }

            dispatch(setCheepListAction({
                pool: props.name,
                listData: {
                    cheeps: [ ...listState.cheeps, ...cheeps ],
                    nextTime: next,
                    query: props.arguments,
                    loadMore: false,
                    pool: props.name
                }
            }));

            if(cheeps.length < 20)
            {
                dispatch(setCheepListLoadNoMore(props.name));
            }
        }
    }

    useEffect(
        () =>
        {
            loadMoreCheeps();
        },
        [ listState.loadMore ]
    );

    useEffect(
        () =>
        {
            switch(props.name)
            {
            case "explore":
                if(listState.pool === props.name) return;
                break;

            case "home":
                if(listState.pool === props.name) return;
                break;

            case "thread":
                if(listState.pool === props.name) return;
                break;

            default:
                if(compareQuery(props.arguments, listState.query)) return;
                break;
            }

            (async () =>
            {
                switch(props.type)
                {
                case CheepListType.Search:
                    let args: SearchCheepsParams = {
                        ...props.arguments
                    };
                    var { cheeps, next } = await searchCheeps(args, props.hideResponseTarget);
                    break;

                case CheepListType.Timeline:
                    var { cheeps, next } = await getTimeline(props.arguments.nextTo);
                    break;

                case CheepListType.Explore:
                    var { cheeps, next } = await exploreCheeps(props.arguments.nextTo);
                    break;

                case CheepListType.Likes:
                    var { cheeps, next } = await likedCheeps(props.arguments.userHandle || "", props.arguments.nextTo);
                    break;
                }

                dispatch(setCheepListAction({
                    pool: props.name,
                    listData: {
                        cheeps: cheeps,
                        nextTime: next,
                        query: props.arguments,
                        loadMore: false,
                        pool: props.name
                    }
                }));

                if(cheeps.length < 20)
                {
                    dispatch(setCheepListLoadNoMore(props.name));
                }
            })();
        },
        [ props.arguments ]
    );

    useEffect(
        () =>
        {
            const cheepList = document.querySelector(".cheep-list") as HTMLDivElement;

            const onScroll = () =>
            {
                const box = cheepList.getBoundingClientRect();

                if((box.height + box.top - window.innerHeight < 1000) && listState.cheeps.length >= 20)
                {
                    dispatch(setCheepListLoadMore({
                        pool: props.name,
                        loadMore: true
                    }));
                }
            };

            document.addEventListener("scroll", onScroll);

            const onResize = () =>
            {
                const lastChild = cheepList.lastChild as HTMLDivElement;
                if(lastChild === null || lastChild === undefined)
                {
                    return;
                }

                const box = lastChild.getBoundingClientRect();

                cheepList.style.paddingBottom = `${window.innerHeight - box.height}px`;
            }

            window.addEventListener("resize", onResize);

            onResize();

            return () =>
            {
                document.removeEventListener("scroll", onScroll);
                window.removeEventListener("resize", onResize);
            }
        }
    );

    let content: React.ReactNode;
    if(compareQuery(props.arguments, listState.query))
    {
        let count = 0;
        content = <>
            {listState.cheeps.map(
                (data, index) =>
                {
                    if(data.deleted)
                    {
                        return <div key={`${index}-cheep`} className="cheep-deleted"></div>;
                    }

                    ++count;

                    return <Cheep
                        id={`${index}-cheep-${props.name}`}
                        index={index}
                        listName={props.name}
                        key={`${index}-cheep`}
                        data={data}
                    />;
                }
            )}
        </>;
        if(count === 0)
        {
            if(props.hideNothingToShow)
            {
                content = <></>;
            }
            else content = <NothingToShow />;
        }
    }
    else
    {
        content = <div className="loading-container">
            <Loading />
        </div>;
    }

    return <div className="cheep-list">
        {content}

        {listState.loadMore && !listState.noMore ?
            <div className="loading-container">
                <Loading />
            </div> :
            null
        }
    </div>;
};

function compareQuery(first: SearchCheepsParams, second: SearchCheepsParams): boolean
{
    for(let key in first)
    {
        if(first[key as keyof SearchCheepsParams] !== second[key as keyof SearchCheepsParams])
        {
            return false;
        }
    }

    for(let key in second)
    {
        if(first[key as keyof SearchCheepsParams] !== second[key as keyof SearchCheepsParams])
        {
            return false;
        }
    }

    return true;
}

export default CheepList;