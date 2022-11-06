import "./ProfileForm.scss";
import React, { useState, useEffect } from "react";
import ProfileData, { emptyProfileData } from "../../../../data/profile_data";
import { useAppDispatch, useAppSelector } from "../../../../store";
import Loading from "../../../../components/Loading";
import ModalForm from "../../../../components/ModalForm";
import Button, { ButtonStyle } from "../../../../components/Button";
import ImageButton from "./components/ImageButton";
import FormInput from "../../../../components/FormInput";
import { setStatusMessage } from "../../../../store/slices/status_message_slice";
import apiRouter from "../../../../request/router";
import EditProfileForm from "../../../../request/params/edit_profile_form";
import StatusCode from "../../../../request/status_code";
import ProfileDataResponse from "../../../../request/response/profile_data_response";
import { setProfileAction } from "../../../../store/slices/profile_slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export type Props = {
    somethingHasBeenTouched(): void;
    closeRequest(): void;
    success(): void;
}

interface ProfileFormElement extends HTMLFormElement
{
    banner: HTMLInputElement;
    picture: HTMLInputElement;
    userName: HTMLInputElement;
    description: HTMLInputElement;
    location: HTMLInputElement;
    website: HTMLInputElement;
}

const ProfileForm: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();
    const profile = useAppSelector(state => state.profile);
    const navigate = useNavigate();

    const [ data, setData ] = useState<ProfileData>(
        profile.data ? { ...profile.data } : emptyProfileData
    );
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(
        () =>
        {
            const bannerInput = document.getElementById("profile-form-banner") as HTMLInputElement;
            const pictureInput = document.getElementById("profile-form-picture") as HTMLInputElement;

            bannerInput.onchange = () =>
            {
                props.somethingHasBeenTouched();

                setData(
                    (currentData) =>
                    {
                        let files = bannerInput.files;
                        if(files === null)
                        {
                            return currentData;
                        }

                        return {
                            ...currentData,
                            banner: URL.createObjectURL(files[0])
                        };
                    }
                );
            };

            pictureInput.onchange = () =>
            {
                props.somethingHasBeenTouched();
                
                setData(
                    (currentData) =>
                    {
                        let files = pictureInput.files;
                        if(files === null)
                        {
                            return currentData;
                        }

                        return {
                            ...currentData,
                            picture: URL.createObjectURL(files[0])
                        };
                    }
                );
            };
        },
        [ props ]
    );

    const sendForm = async (formElement: ProfileFormElement) =>
    {
        setLoading(true);

        let form: SendProfileFormData = {};

        const bannerInput = formElement.banner;
        const pictureInput = formElement.picture;
        const nameInput = formElement.userName;
        const descriptionInput = formElement.description;
        const locationInput = formElement.location;
        const websiteInput = formElement.website;

        if(!bannerInput || !pictureInput || !nameInput || !descriptionInput || !locationInput || !websiteInput) 
        {
            return;
        }

        if(bannerInput.files !== null && bannerInput.files.length > 0)
        {
            form.banner = bannerInput.files[0];
        }

        if(pictureInput.files !== null && pictureInput.files.length > 0)
        {
            form.picture = pictureInput.files[0];
        }

        if(nameInput.value.length > 0)
        {
            form.name = nameInput.value;
        }

        if(descriptionInput.value.length > 0)
        {
            form.description = descriptionInput.value;
        }

        if(locationInput.value.length > 0)
        {
            form.location = locationInput.value;
        }

        if(websiteInput.value.length > 0)
        {
            form.website = websiteInput.value;
        }

        try
        {
            var newData = await sendProfileForm(form);

            dispatch(setProfileAction(newData));
            dispatch(setStatusMessage("Información actualizada."));

            props.success();
        }
        catch(err)
        {
            dispatch(setStatusMessage("Ocurrió un error inesperado."));
        }
    };

    return <ModalForm
        id="edit-profile-form"
        className="profile-form"
        onSubmit={(ev) =>
        {
            ev.preventDefault();

            sendForm(ev.target as ProfileFormElement);
        }}
    >
        <div className="modal-form-top">
            <div className="modal-form-close-button" onClick={props.closeRequest}>
                <FontAwesomeIcon icon={faXmark} />
            </div>

            <div className="profile-form-title">
                Editar perfil
            </div>

            <div className="save-button-container">
                <Button
                    stylePreset={ButtonStyle.Black}
                    onClick={(ev) =>
                    {
                        ev.stopPropagation();

                        const form = document.getElementById("edit-profile-form") as ProfileFormElement;

                        if(form !== null)
                        {
                            sendForm(form);
                        }
                    }}
                >
                    Guardar
                </Button>
            </div>
        </div>

        <div className="modal-form-body">
            <div className="profile-form-header">
                <div className="banner-container">
                    <div className="banner">
                        {data.banner ?
                            <div className="banner-img" title="Imagen de portada" style={{
                                backgroundImage: `url(${data.banner})`
                            }}></div> :
                            null
                        }

                        <div className="veil">
                            <div className="buttons-container">
                                <ImageButton
                                    title="Agregar foto"
                                    onClick={(ev) =>
                                    {
                                        const input = document.getElementById("profile-form-banner") as HTMLInputElement;

                                        input.click();
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCamera} />
                                </ImageButton>

                                <ImageButton
                                    title="Eliminar foto"
                                    onClick={(ev) =>
                                    {
                                        setData(
                                            (currentData) =>
                                            {
                                                return {
                                                    ...currentData,
                                                    banner: ""
                                                };
                                            }
                                        );
                                    }}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </ImageButton>

                                <input name="banner" type="file" id="profile-form-banner" className="hidden" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="picture-container">
                    <div className="picture">
                        {data.picture ?
                            <div className="picture-img" title="Imagen de perfil" style={{
                                backgroundImage: `url(${data.picture})`
                            }}></div> :
                            null
                        }

                        <div className="veil">
                            <ImageButton
                                title="Agregar foto"
                                onClick={(ev) =>
                                {
                                    const input = document.getElementById("profile-form-picture") as HTMLInputElement;

                                    input.click();
                                }}
                            >
                                <FontAwesomeIcon icon={faCamera} />
                            </ImageButton>

                            <input name="picture" type="file" id="profile-form-picture" className="hidden" />
                        </div>
                    </div>

                    <div className="picture-separator"></div>
                </div>
            </div>

            <div className="profile-form-inputs">
                <FormInput
                    id="profile-name"
                    name="userName"
                    title="Nombre"
                    value={data.name || ""}
                    limit={50}
                    onChange={() =>
                    {
                        props.somethingHasBeenTouched();
                    }}
                />
            
                <FormInput
                    id="profile-description"
                    name="description"
                    title="Biografía"
                    value={data.description || ""}
                    textarea
                    limit={160}
                    onChange={() =>
                    {
                        props.somethingHasBeenTouched();
                    }}
                />
                
                <FormInput
                    id="profile-location"
                    name="location"
                    title="Ubicación"
                    value={data.location || ""}
                    limit={30}
                    onChange={() =>
                    {
                        props.somethingHasBeenTouched();
                    }}
                />

                <FormInput
                    id="profile-website"
                    name="website"
                    title="Sitio web"
                    value={data.website || ""}
                    limit={100}
                    onChange={() =>
                    {
                        props.somethingHasBeenTouched();
                    }}
                />
            </div>
        </div>

        {loading ?
            <div className="loading-veil">
                <Loading />
            </div> :
            null
        }
    </ModalForm>;
};

async function sendProfileForm(form: SendProfileFormData): Promise<ProfileDataResponse>
{
    let bannerURL: string | undefined;
    if(form.banner)
    {
        try
        {
            bannerURL = await apiRouter.upload.banner(form.banner);
        }
        catch(err)
        {
            throw err;
        }
    }

    let pictureURL: string | undefined;
    if(form.picture)
    {
        try
        {
            pictureURL = await apiRouter.upload.profile(form.picture);
        }
        catch(err)
        {
            throw err;
        }
    }

    let data: EditProfileForm = {};

    if(bannerURL)
    {
        data.banner = bannerURL;
    }

    if(pictureURL)
    {
        data.picture = pictureURL;
    }

    if(form.name)
    {
        data.name = form.name;
    }

    if(form.description)
    {
        data.description = form.description;
    }

    if(form.location)
    {
        data.location = form.location;
    }

    if(form.website)
    {
        data.website = form.website;
    }

    try
    {
        var response = await apiRouter.profile.update({
            form: data
        });

        if(response.status === StatusCode.OK && response.data)
        {
            return response.data.profile;
        }
        else
        {
            throw new Error();
        }
    }
    catch(err)
    {
        throw err;
    }
}

type SendProfileFormData = {
    banner?: File;
    picture?: File;
    name?: string;
    description?: string;
    location?: string;
    website?: string;
};

export default ProfileForm;