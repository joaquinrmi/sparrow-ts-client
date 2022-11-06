import React, { ReactNode, useEffect } from "react";
import Loading from "../../../../components/Loading";
import NothingToShow from "../../../../components/NothingToShow";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { setUserListAction, setUserListLoadMore, setUserListLoadNoMore } from "../../../../store/slices/user_lists_slice";
import { UserListName } from "../../../../store/state/user_lists_state";
import UserCard from "../UserCard";
import loadUserList from "./load_user_list";

export type Props = {
    id: string;
    name: UserListName;
    type: UserListType;
    target: string | number;
    limit?: number;
    little?: boolean;
}

const UserList: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();
    const listState = useAppSelector(state => state.userLists[props.name]);

    const loadUsers = async () =>
    {
        if(listState.loadMore && !listState.noMore)
        {
            const userList = await loadUserList(props.type, props.target, listState.users[listState.users.length - 1].id);

            dispatch(setUserListAction({
                pool: props.name,
                data: {
                    id: props.id,
                    target: props.target,
                    users: [ ...listState.users, ...userList ]
                }
            }));

            dispatch(setUserListLoadMore({
                pool: props.name,
                loadMore: false
            }));

            if(userList.length < 20)
            {
                dispatch(setUserListLoadNoMore(props.name));
            }
        }
    }

    useEffect(
        () =>
        {
            loadUsers();
        },
        [ listState.loadMore ]
    );

    useEffect(
        () =>
        {
            if(props.id === listState.id && listState.target === props.target)
            {
                return;
            }

            (async () =>
            {
                try
                {
                    const userList = await loadUserList(props.type, props.target);

                    dispatch(setUserListAction({
                        pool: props.name,
                        data: {
                            id: props.id,
                            target: props.target,
                            users: userList
                        }
                    }));
                }
                catch(err)
                {
                    dispatch(setUserListAction({
                        pool: props.name,
                        data: {
                            id: props.id,
                            target: props.target,
                            users: []
                        }
                    }));
                }
            })();
        },
        [ props.target, props.name ]
    );

    useEffect(
        () =>
        {
            if(!props.little)
            {
                const userList = document.getElementById(props.id) as HTMLDivElement;
                if(userList === null)
                {
                    return;
                }

                const onScroll = () =>
                {
                    const box = userList.getBoundingClientRect();

                    if((box.height + box.top - window.innerHeight < 1000) && listState.users.length >= 20)
                    {
                        dispatch(setUserListLoadMore({
                            pool: props.name,
                            loadMore: true
                        }));
                    }
                };

                document.addEventListener("scroll", onScroll);

                const onResize = () =>
                {
                    const lastChild = userList.lastChild as HTMLDivElement;
                    if(lastChild === null || lastChild === undefined)
                    {
                        return;
                    }

                    const box = lastChild.getBoundingClientRect();

                    userList.style.paddingBottom = `${window.innerHeight - box.height}px`;
                }

                window.addEventListener("resize", onResize);

                onResize();

                return () =>
                {
                    document.removeEventListener("scroll", onScroll);
                    window.removeEventListener("resize", onResize);
                }
            }
        }
    );

    if(listState.noMore && listState.users.length === 0)
    {
        return <NothingToShow />;
    }

    let content: React.ReactNode;
    if(listState.target === props.target)
    {
        let cards = new Array<ReactNode>();

        let limit = props.limit || listState.users.length;
        for(let i = 0; i < limit && i < listState.users.length; ++i)
        {
            const userData = listState.users[i];

            cards.push(<UserCard
                id={`ucard-${i}-${props.id}`}
                listName={props.name}
                key={`${i}-card`}
                data={userData}
                index={i}
            />);
        }

        content = <>{cards}</>;
    }
    else
    {
        content = <div className="loading-container">
            <Loading />
        </div>;
    }

    return <div id={props.id} className="user-list">
        {content}

        {listState.loadMore && !listState.noMore ?
            <div className="loading-container">
                <Loading />
            </div> :
            null
        }
    </div>;
};

export enum UserListType
{
    Following,
    Followers,
    Recommended,
    Like,
    Recheep
}

export default UserList;