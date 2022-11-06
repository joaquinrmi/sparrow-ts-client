import "./SecondPage.scss";
import React, { useState, useEffect } from "react";
import SignupForm from "../../data/signup_form";
import SignupError from "../../data/signup_error";
import SignupFormSet from "../../data/signup_form_set";
import FormInput, { FormInputElement, FormInputType } from "../../../../components/FormInput";
import ModalForm from "../../../../components/ModalForm";
import Button, { ButtonStyle } from "../../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export type Props = {
    signupData: SignupForm;
    error: SignupError;

    changePage(page: number, data: SignupFormSet): void;
    sendForm(data: SignupFormSet): Promise<void>;
    setError(error: SignupError): void;
}

const HANDLE_ERROR_MESSAGE = `El nombre de usuario solo puede contener letras minúsculas, números y los signos "_" y "." y una longitud entre 4 y 15 caracteres.`;
const PASSWORD_ERROR_MESSAGE = "La contraseña debe tener entre 8 y 20 caracteres de longitud.";
const REPASSWORD_ERROR_MESSAGE = "Las contraseñas con coinciden.";

const HANDLE_REGEX = /^[A-Za-z\._0-9]*$/;

const checkEnableButton = (handleInput: FormInputElement, passwordInput: FormInputElement, repasswordInput: FormInputElement, setEnableButton: Function) =>
{
    if(passwordInput.getValue().length < 8 || passwordInput.getValue().length > 20)
    {
        setEnableButton(false);
        return;
    }

    if(passwordInput.getValue() !== repasswordInput.getValue())
    {
        setEnableButton(false);
        return;
    }

    if(handleInput.getValue().length < 4 || !handleInput.getValue().match(HANDLE_REGEX))
    {
        setEnableButton(false);
        return;
    }

    setEnableButton(true);
};

const SecondPage: React.FunctionComponent<Props> = (props) =>
{
    const [ enableButton, setEnableButton ] = useState(false);

    useEffect(
        () =>
        {
            const handleInput = document.getElementById("signup-handle") as FormInputElement;
            const passwordInput = document.getElementById("signup-password") as FormInputElement;
            const repasswordInput = document.getElementById("signup-repassword") as FormInputElement;

            checkEnableButton(handleInput, passwordInput, repasswordInput, setEnableButton);
        }
    );

    useEffect(() =>
    {
        const handleInput = document.getElementById("signup-handle") as FormInputElement;
        const passwordInput = document.getElementById("signup-password") as FormInputElement;
        const repasswordInput = document.getElementById("signup-repassword") as FormInputElement;

        handleInput.onchange = () =>
        {
            checkEnableButton(handleInput, passwordInput, repasswordInput, setEnableButton);

            if(handleInput.getValue().length > 0)
            {
                if(handleInput.getValue().length < 4 || !handleInput.getValue().match(HANDLE_REGEX))
                {
                    props.setError(
                        {
                            handle: HANDLE_ERROR_MESSAGE
                        }
                    );
                }
                else
                {
                    props.setError(
                        {
                            handle: undefined
                        }
                    );
                }
            }
            else
            {
                props.setError(
                    {
                        handle: undefined
                    }
                );
            }
        };

        passwordInput.onchange = () =>
        {
            checkEnableButton(handleInput, passwordInput, repasswordInput, setEnableButton);

            if(passwordInput.getValue().length < 8 || passwordInput.getValue().length > 20)
            {
                props.setError(
                    {
                        password: PASSWORD_ERROR_MESSAGE
                    }
                );
            }
            else
            {
                props.setError(
                    {
                        password: undefined
                    }
                );
            }

            if(repasswordInput.getValue().length > 0 && passwordInput.getValue() !== repasswordInput.getValue())
            {
                props.setError(
                        {
                            repassword: REPASSWORD_ERROR_MESSAGE
                        }
                    );
            }
            else
            {
                props.setError(
                        {
                            repassword: undefined
                        }
                    );
            }
        };

        repasswordInput.onchange = () =>
        {
            checkEnableButton(handleInput, passwordInput, repasswordInput, setEnableButton);

            if(repasswordInput.getValue().length > 0 && passwordInput.getValue() !== repasswordInput.getValue())
            {
                props.setError(
                        {
                            repassword: REPASSWORD_ERROR_MESSAGE
                        }
                    );
            }
            else
            {
                props.setError(
                        {
                            repassword: undefined
                        }
                    );
            }
        };

        const goBackButton = document.getElementById("signup-go-back-button") as HTMLDivElement;

        goBackButton.onclick = () =>
        {
            props.changePage(
                1,
                {
                    handle: handleInput.getValue(),
                    password: passwordInput.getValue(),
                    repassword: repasswordInput.getValue()
                }
            );
        };
    },
    []);

    const sendForm = async () =>
    {
        const handleInput = document.getElementById("signup-handle") as FormInputElement;
        const passwordInput = document.getElementById("signup-password") as FormInputElement;
        const repasswordInput = document.getElementById("signup-repassword") as FormInputElement;
        
        props.sendForm(
            {
                handle: handleInput.getValue(),
                password: passwordInput.getValue(),
                repassword: repasswordInput.getValue()
            }
        );
    };

    return <ModalForm
        id="signup-second-page"
        className="signup-form-modal"
        autoComplete={false}
        onSubmit={(ev) =>
        {
            ev.preventDefault();

            sendForm();
        }}
    >
        <header className="modal-form-top">
            <div id="signup-go-back-button" className="modal-form-close-button">
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>
        </header>

        <section className="modal-form-body">
            <h1>Termina el registro</h1>

            <div className="form-elements">
                <FormInput
                    id="signup-handle"
                    title="Nombre de usuario"
                    value={props.signupData.handle}
                    errorMessage={props.error.handle}
                    autoComplete={false}
                />

                <FormInput
                    id="signup-password"
                    type={FormInputType.Password}
                    title="Contraseña"
                    value={props.signupData.password}
                    errorMessage={props.error.password}
                    autoComplete={false}
                />

                <FormInput
                    id="signup-repassword"
                    type={FormInputType.Password}
                    title="Reingresa la contraseña"
                    value={props.signupData.repassword}
                    errorMessage={props.error.repassword}
                    autoComplete={false}
                />
            </div>
        </section>

        <footer className="modal-form-bottom">
            <div className="button-container">
                <Button stylePreset={ButtonStyle.Blue} disabled={!enableButton} onClick={sendForm}>
                    Crear cuenta
                </Button>
            </div>
        </footer>

        <input type="submit" className="invisible" />
    </ModalForm>;
};

export default SecondPage;