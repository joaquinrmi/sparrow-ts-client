import "./CheepEditor.scss";
import React, { useState, useEffect } from "react";
import CheepData from "../../../../data/cheep_data";
import { useAppDispatch, useAppSelector } from "../../../../store";
import apiRouter from "../../../../request/router";
import conditionalClass from "../../../../utils/conditional_class";
import UserPicture from "../../../../components/UserPicture";
import Gallery from "../../../../components/Gallery";
import Loading from "../../../../components/Loading";
import Cheep from "../../../../components/Cheep";
import Button, { ButtonStyle } from "../../../../components/Button";
import TextEditor, { TextEditorElement } from "./components/TextEditor";
import ButtonContainer from "../../../../components/ButtonContainer";
import CreateCheepData from "../../../../data/create_cheep_data";
import StatusCode from "../../../../request/status_code";
import { setStatusMessage } from "../../../../store/slices/status_message_slice";
import APIErrorType from "../../../../request/api_error_type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { CheepListName } from "../../../../store/state/cheep_lists_state";
import { addNewCheep } from "../../../../store/slices/cheep_lists_slice";
import processCheep from "../../../../utils/process_cheep";

export type Props = {
    id: string;
    cheepListTarget: CheepListName;
    responseTarget?: CheepData;
    targetCheep?: CheepData;
    inPage?: boolean;

    onCheep?(): void;
}

export interface CheepEditorElement extends HTMLDivElement
{
    hasContent(): boolean;
}

const CheepEditor: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();
    const userSession = useAppSelector(state => state.session);
    const profile = useAppSelector(state => state.cheepLists["profileCheeps"]);

    const [ buttonEnabled, setButtonEnabled ] = useState<boolean>(props.targetCheep !== undefined);
    const [ status, setStatus ] = useState<number>(0);
    const [ gallery, setGallery ] = useState<Array<string>>([]);
    const [ loadingPictures, setLoadingPictures ] = useState<boolean>(false);
    const [ loadingCheep, setLoadingCheep ] = useState<boolean>(false);
    const [ created, setCreated ] = useState<number>(0);

    useEffect(() =>
    {
        const pictureInput = document.getElementById(`${props.id}-gallery-input`) as HTMLInputElement;

        if(!pictureInput)
        {
            return;
        }

        pictureInput.onchange = async (ev) =>
        {
            if(loadingPictures)
            {
                return;
            }

            if(!pictureInput.files)
            {
                return;
            }

            if(pictureInput.files.length + gallery.length > 4)
            {
                return;
            }

            setLoadingPictures(true);

            let imageUrls = new Array<string>();
            for(let i = 0; i < pictureInput.files.length; ++i)
            {
                try
                {
                    imageUrls.push(await apiRouter.upload.gallery(pictureInput.files[i]));
                }
                catch(err)
                {
                    setLoadingPictures(false);
                    return;
                }
            }

            setLoadingPictures(false);
            setButtonEnabled(true);
            setGallery(
                (currentGallery) =>
                {
                    return [
                        ...currentGallery,
                        ...imageUrls
                    ];
                }
            );
        };
    });

    useEffect(() =>
    {
        const element = document.getElementById(props.id) as CheepEditorElement;
        if(element === null)
        {
            return;
        }

        element.hasContent = () =>
        {
            return status > 0 || gallery.length > 0;
        };
    });

    if(!userSession.user)
    {
        return <></>;
    }

    const sendCheep = async (ev: React.MouseEvent<HTMLButtonElement>) =>
    {
        ev.preventDefault();
        
        if(loadingCheep)
        {
            return;
        }

        setLoadingCheep(true);

        const editor = document.getElementById(`${props.id}-editor`) as TextEditorElement;

        const data: CreateCheepData = {};

        if(editor.getText().length > 0)
        {
            data.content = editor.getText();
        }

        if(gallery.length > 0)
        {
            data.gallery = gallery;
        }

        if(props.responseTarget !== undefined)
        {
            data.responseTarget = props.responseTarget.id;
        }

        if(props.targetCheep !== undefined)
        {
            data.quoteTarget = props.targetCheep.id;
        }

        try
        {
            const response = await apiRouter.cheep.create({
                form: data
            });

            if(response.status === StatusCode.Created && response.data)
            {
                setCreated((created) => created + 1);
                setStatus(0);
                dispatch(setStatusMessage("¡Se publicó el cheep!"));

                const newCheep = processCheep(response.data.cheep);

                switch(props.cheepListTarget)
                {
                case "comments":
                    dispatch(addNewCheep({
                        pool: "comments",
                        cheep: newCheep
                    }));
                    break;

                case "profileCheeps":
                    if(profile.query.userHandle === userSession.user?.handle)
                    {
                        dispatch(addNewCheep({
                            pool: "profileCheeps",
                            cheep: newCheep
                        }));
                    }
                    break;

                default:
                    break;
                }

                if(props.onCheep !== undefined)
                {
                    props.onCheep();
                }
            }
            else if(response.error)
            {
                switch(response.error.errors[0].code)
                {
                case APIErrorType.InternalServerError:
                    dispatch(setStatusMessage("Ocurrió un error en el servidor."));
                    break;

                default:
                    dispatch(setStatusMessage("Ocurrió un error en el servidor."));
                    break;
                }
            }
            else
            {
                dispatch(setStatusMessage("Ocurrió un error en el servidor."));
            }
        }
        catch(err: any)
        {
            dispatch(setStatusMessage("Ocurrió un error en el servidor."));
        }

        setLoadingCheep(false);
    };

    return <form
        key={created}
        id={props.id}
        className={conditionalClass(
            {
                "in-page": props.inPage
            },
            [ "cheep-editor" ]
        )}
    >
        {props.inPage && props.responseTarget ?
            <div className="response-message">
                En respuesta a <span className="user">@{props.responseTarget.author.handle}</span>
            </div> :
            null
        }

        <section className="editor-body">
            <div className="editor-columns">
                <div className="editor-left">
                    <UserPicture notClickeable userHandle={userSession.user.handle} userName={userSession.user.name} picture={userSession.user.picture} />
                </div>

                <div className="editor-right">
                    <div className="editor-elements">
                        <div className={`text-editor-container ${props.targetCheep || gallery.length > 0 ? "mini" : ""}`}>
                            <TextEditor
                                id={`${props.id}-editor`}
                                maxLength={280}
                                setStatus={(status) =>
                                {
                                    if(status > 0)
                                    {
                                        setButtonEnabled(true);
                                    }
                                    else
                                    {
                                        setGallery(
                                            (gallery) =>
                                            {
                                                if(gallery.length === 0)
                                                {
                                                    setButtonEnabled(false);
                                                }

                                                return gallery;
                                            }
                                        );
                                    }
                                    setStatus(status);
                                }}
                            />
                        </div>

                        {gallery.length > 0 || loadingPictures ?
                            <div className="gallery-container">
                                <Gallery pictures={gallery} disableClick />

                                {loadingPictures ?
                                    <div className="loading-pictures">
                                        <Loading />
                                    </div> :
                                    null
                                }
                            </div> :
                            null
                        }

                        {props.targetCheep ?
                            <div className="quote-container">
                                <Cheep
                                    id={`quote-${props.id}`}
                                    data={props.targetCheep}
                                    quote
                                />
                            </div> :
                            null
                        }
                    </div>

                    <footer className="editor-bottom">
                        <div className="options-container">
                            <div
                                className={conditionalClass(
                                    {
                                        "disabled": gallery.length === 4
                                    },
                                    [ "editor-button" ]
                                )}
                                onClick={() =>
                                {
                                    if(loadingPictures || gallery.length === 4)
                                    {
                                        return;
                                    }

                                    const input = document.getElementById(`${props.id}-gallery-input`) as HTMLInputElement;

                                    if(!input)
                                    {
                                        return;
                                    }

                                    input.click();
                                }}
                            >
                                <FontAwesomeIcon icon={faImage} />

                                <input id={`${props.id}-gallery-input`} type="file" multiple />
                            </div>

                            <div className="status-container">
                                <Loading static status={status} radius={10} thickness={2} />
                            </div>
                        </div>

                        <ButtonContainer className="cheep-button-container">
                            <Button
                                stylePreset={ButtonStyle.Blue}
                                disabled={!buttonEnabled}
                                onClick={sendCheep}
                            >
                                Cheepear
                            </Button>
                        </ButtonContainer>
                    </footer>
                </div>
            </div>
        </section>
    </form>
};

export default CheepEditor;