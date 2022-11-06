import "./UserGallery.scss";
import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import GalleryImage, { PhotoData } from "../GalleryImage";
import SearchCheepsParams from "../../../../data/search_cheeps_params";
import { setCheepListAction } from "../../../../store/slices/cheep_lists_slice";
import searchCheeps from "../../../../request/search_cheeps";

export type Props = {
    userHandle: string;
}

const UserGallery: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();
    const listState = useAppSelector(state => state.cheepLists.userGallery);

    const photos = useMemo(
        () =>
        {
            const photos = new Array<PhotoData>();

            if(listState.cheeps.length > 0 && listState.query.userHandle === props.userHandle)
            {
                for(let i = 0; i < listState.cheeps.length && photos.length < 7; ++i)
                {
                    const cheep = listState.cheeps[i];
                    
                    for(let j = 0; j < cheep.gallery.length; ++j)
                    {
                        photos.push(
                            {
                                url: cheep.gallery[j],
                                authorHandle: cheep.author.handle,
                                cheepId: cheep.id,
                                index: j + 1
                            }
                        );
                    }
                }
            }

            return photos;
        },
        [ listState.cheeps ]
    );

    const loadCheeps = async () =>
    {
        if(props.userHandle !== listState.query.userHandle)
        {
            const query: SearchCheepsParams = {
                userHandle: props.userHandle,
                onlyGallery: true
            };

            const { cheeps, next } = await searchCheeps(query, true);

            dispatch(setCheepListAction({
                pool: "userGallery",
                listData: {
                    cheeps: cheeps,
                    nextTime: next,
                    loadMore: false,
                    noMore: true,
                    query: query
                }
            }));
        }
    }

    useEffect(
        () =>
        {
            loadCheeps();
        }
    );

    if(photos.length > 1 && listState.query.userHandle === props.userHandle)
    {
        let firstDivision: React.ReactNode;
        let secondDivision: React.ReactNode;

        switch(photos.length)
        {
        case 2:
            firstDivision = <GalleryImage data={photos[0]} />;

            secondDivision = <GalleryImage data={photos[1]} />;
            break;

        case 3:
            firstDivision = <GalleryImage data={photos[0]} />;

            secondDivision = <>
                <GalleryImage data={photos[1]} />
                <GalleryImage data={photos[2]} />
            </>;
            break;

        case 4:
            firstDivision = <>
                <GalleryImage data={photos[0]} />
                <GalleryImage data={photos[2]} />
            </>;

            secondDivision = <>
                <GalleryImage data={photos[1]} />
                <GalleryImage data={photos[3]} />
            </>;
            break;

        case 5:
            firstDivision = <>
                <GalleryImage data={photos[0]} />
                <GalleryImage data={photos[1]} />
            </>;

            secondDivision = <>
                <GalleryImage data={photos[2]} />
                <GalleryImage data={photos[3]} />
                <GalleryImage data={photos[4]} />
            </>;
            break;

        case 6:
            firstDivision = <>
                <GalleryImage data={photos[0]} />
                <GalleryImage data={photos[1]} />
                <GalleryImage data={photos[2]} />
            </>;

            secondDivision = <>
                <GalleryImage data={photos[3]} />
                <GalleryImage data={photos[4]} />
                <GalleryImage data={photos[5]} />
            </>;
            break;
        }

        let divisions: React.ReactNode;
        if(photos.length < 5)
        {
            divisions = <div className="gallery-container row">
                <div className="gallery-column">
                    {firstDivision}
                </div>

                <div className="gallery-column">
                    {secondDivision}
                </div>
            </div>;
        }
        else
        {
            divisions = <div className="gallery-container column">
                <div className="gallery-row">
                    {firstDivision}
                </div>

                <div className="gallery-row">
                    {secondDivision}
                </div>
            </div>
        }

        return <div className="user-gallery">
            {divisions}
        </div>;
    }
    else
    {
        return <></>;
    }
};

export default UserGallery;