import "./LoginPage.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormInput, { FormInputElement, FormInputType } from "../../components/FormInput";
import LoadingPage from "../LoadingPage";
import Modal from "../../components/Modal";
import ModalForm from "../../components/ModalForm";
import Button, { ButtonStyle } from "../../components/Button";
import { useAppDispatch } from "../../store";
import LoginData from "../../data/login_data";
import { login } from "../../store/slices/session_slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const LoginPage: React.FunctionComponent = () =>
{
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ enableButton, setEnableButton ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    const [ handleOrEmail, setHandleOrEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");

    const [ handleError, setHandleError ] = useState<string>("");
    const [ passwordError, setPasswordError ] = useState<string>("");

    const dispatch = useAppDispatch();

    useEffect(
        () =>
        {
            const handleOrEmailInput = document.getElementById("login-handle-or-email") as FormInputElement;
            const passwordInput = document.getElementById("login-password") as FormInputElement;

            const checkEnableButton = () =>
            {
                if(handleOrEmailInput.getValue().length > 0 && passwordInput.getValue().length > 0)
                {
                    setEnableButton(true);
                }
                else
                {
                    setEnableButton(false);
                }
            };

            handleOrEmailInput.onchange = () =>
            {
                checkEnableButton();

                setHandleOrEmail(handleOrEmailInput.getValue());
            };

            passwordInput.onchange = () =>
            {
                checkEnableButton();

                setPassword(passwordInput.getValue());
            };
        },
        []
    );

    const handleButtonClick = async () =>
    {
        setLoading(true);

        const handleOrEmailInput = document.getElementById("login-handle-or-email") as FormInputElement;
        const passwordInput = document.getElementById("login-password") as FormInputElement;

        if(!handleOrEmailInput || !passwordInput)
        {
            return;
        }

        let form: LoginData = {
            handleOrEmail: handleOrEmailInput.getValue(),
            password: passwordInput.getValue()
        };

        await dispatch(login(form));

        setErrorMessage("Combinación usuario-contraseña incorrecta.");
        setHandleError("Revisa el nombre de usuario.");
        setPasswordError("Revisa la contraseña.");
        setLoading(false);
    };

    if(loading)
    {
        return <LoadingPage />;
    }

    return <Modal id="login-modal" className="login-modal" closeRequest={() => {}}>
        <ModalForm className="login-form-modal">
            <div className="modal-form-top">
                <Link to="/" className="modal-form-close-button">
                    <FontAwesomeIcon icon={faXmark} />
                </Link>
            </div>

            <section className="modal-form-body">
                <h1>Inicio de sesión</h1>

                {errorMessage.length > 0 ?
                    <span className="error-message">
                        {errorMessage}
                    </span> :
                    null
                }

                <div className="form-elements">
                    <FormInput
                        id="login-handle-or-email"
                        title="Nombre de usuario o email"
                        value={handleOrEmail}
                        errorMessage={handleError}
                    />

                    <FormInput
                        id="login-password"
                        type={FormInputType.Password}
                        title="Contraseña"
                        value={password}
                        errorMessage={passwordError}
                    />
                </div>
            </section>

            <footer className="modal-form-bottom">
                <div className="button-container">
                    <Button
                        stylePreset={ButtonStyle.Blue}
                        disabled={!enableButton}
                        onClick={handleButtonClick}
                    >
                        Iniciar sesión
                    </Button>
                </div>
            </footer>
        </ModalForm>
    </Modal>;
};

export default LoginPage;