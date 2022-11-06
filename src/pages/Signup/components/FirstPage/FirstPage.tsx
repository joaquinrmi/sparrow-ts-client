import "./FirstPage.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SignupForm from "../../data/signup_form";
import SignupError from "../../data/signup_error";
import SignupFormSet from "../../data/signup_form_set";
import FormInput, { FormInputElement, FormInputType } from "../../../../components/FormInput";
import DateInput, { DateInputElement } from "../../../../components/DateInput";
import ModalForm from "../../../../components/ModalForm";
import Button, { ButtonStyle } from "../../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export type Props = {
    signupData: SignupForm;
    error: SignupError;

    changePage(page: number, data: SignupFormSet): void;
    setError(error: SignupError): void;
}

const EMAIL_ERROR_MESSAGE = "Dirección de correo electrónico inválida.";

const EMAIL_REGEX = /^[a-zA-Z\-_0-9]*@[a-zA-Z\-_0-9]*\.com$/;

const FirstPage: React.FunctionComponent<Props> = (props) =>
{
    const [ enableNext, setEnableNext ] = useState(false);

    useEffect(
        () =>
        {
            const nameInput = document.getElementById("signup-name") as FormInputElement;
            const emailInput = document.getElementById("signup-email") as FormInputElement;

            const checkEnableNext = () =>
            {
                if(nameInput.getValue().trim().length === 0)
                {
                    setEnableNext(false);
                    return;
                }

                const email = emailInput.getValue();
                const match = email.match(EMAIL_REGEX);

                if(match === null || match.length !== 1)
                {
                    setEnableNext(false);
                    return;
                }

                setEnableNext(true);
            };

            checkEnableNext();

            nameInput.addEventListener(
                "change",
                () =>
                {
                    checkEnableNext();
                }
            );

            emailInput.addEventListener(
                "change",
                () =>
                {
                    checkEnableNext();

                    const email = emailInput.getValue();
                    const match = email.match(EMAIL_REGEX);

                    if(email.length > 0 && (match === null || match.length !== 1))
                    {
                        props.setError(
                            {
                                ...props.error,
                                email: EMAIL_ERROR_MESSAGE
                            }
                        );
                    }
                    else
                    {
                        props.setError(
                            {
                                ...props.error,
                                email: undefined
                            }
                        );
                    }
                }
            );
        }
    );

    const nextPage = () =>
    {
        const nameInput = document.getElementById("signup-name") as FormInputElement;
        const emailInput = document.getElementById("signup-email") as FormInputElement;
        const dateInput = document.getElementById("signup-date-input") as DateInputElement;

        props.changePage(
            2,
            {
                name: nameInput.getValue(),
                email: emailInput.getValue(),
                birthdate: new Date(dateInput.getYear(), dateInput.getMonth(), dateInput.getDay())
            }
        );
    };

    return <ModalForm
        id="signup-first-page"
        className="signup-form-modal"
        onSubmit={(ev) =>
        {
            ev.preventDefault();

            nextPage();
        }}
    >
        <header className="modal-form-top">
            <Link to="/" id="signup-close-button" className="modal-form-close-button">
                <FontAwesomeIcon icon={faXmark} />
            </Link>
        </header>

        <section className="modal-form-body">
            <h1>Crea tu cuenta</h1>

            <div className="form-elements">
                <FormInput id="signup-name" title="Nombre" value={props.signupData.name} errorMessage={props.error.name} />

                <FormInput id="signup-email" title="Correo electrónico" value={props.signupData.email} type={FormInputType.Email} errorMessage={props.error.email} />

                <div className="birthdate-text">
                    <span className="birthdate-title">Fecha de nacimiento</span>

                    <span>Esta información no se mostrará públicamente y, de hecho, no sirve para nada más que alargar el formulario.</span>
                </div>
                
                <DateInput id="signup-date-input" className="modal-form-date" value={props.signupData.birthdate} />
            </div>
        </section>

        <footer className="modal-form-bottom">
            <div className="button-container">
                <Button
                    stylePreset={ButtonStyle.Blue}
                    disabled={!enableNext}
                    onClick={() =>
                    {
                        nextPage();
                    }}
                >
                    Siguiente
                </Button>
            </div>
        </footer>

        <input type="submit" className="invisible" disabled={!enableNext} />
    </ModalForm>;
};

export default FirstPage;