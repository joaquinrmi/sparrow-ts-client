import "./Signup.scss";
import React, { useEffect, useState } from "react";
import SignupForm from "./data/signup_form";
import SignupFormSet from "./data/signup_form_set";
import SignupError from "./data/signup_error";
import Modal from "../../components/Modal";
import LoadingPage from "../LoadingPage";
import FirstPage from "./components/FirstPage";
import SecondPage from "./components/SecondPage";
import { useAppDispatch } from "../../store";
import { login } from "../../store/slices/session_slice";
import apiRouter from "../../request/router";
import SignupData from "../../form/signup_data";
import APIErrorType from "../../request/api_error_type";

type SignupState = {
    sendForm: boolean;
    currentPage: number;
    signupData: SignupForm;
    error: SignupError;
}

const Signup: React.FunctionComponent = () =>
{
    const dispatch = useAppDispatch();

    const [ state, setSate ] = useState<SignupState>(
        {
            sendForm: false,
            currentPage: 1,
            signupData:
            {
                name: "",
                email: "",
                birthdate: new Date(),
                handle: "",
                password: "",
                repassword: ""
            },
            error: {}
        }
    );

    const sendSignupForm = async (signupForm: SignupForm) =>
    {
        const form: SignupData =
        {
            handle: signupForm.handle,
            email: signupForm.email,
            password: signupForm.password,
            fullName: signupForm.name,
            birthdate: signupForm.birthdate.getTime(),
        };

        try
        {
            const signupResponse = await apiRouter.user.signup({ form });

            if(signupResponse.status === 201 && signupResponse.data)
            {
                await dispatch(login({
                    handleOrEmail: signupResponse.data.user.handle,
                    password: form.password
                }));
            }
            else
            {
                let error: SignupError = {};
                let currentPage = 2;

                const errors = signupResponse.error?.errors || [];
                for(let apiError of errors)
                {
                    switch(apiError.code)
                    {
                    case APIErrorType.InvalidHandle:
                        error.handle = "El nombre de usuario no está disponible.";
                        break;

                    case APIErrorType.InvalidEmail:
                        error.email = "El correo electrónico ya está en uso.";
                        currentPage = 1;
                        break;
                    }
                }

                setSate((state) =>
                {
                    return {
                        ...state,
                        sendForm: false,
                        currentPage: currentPage,
                        error:
                        {
                            ...state.error,
                            ...error
                        }
                    };
                });
            }
        }
        catch(err)
        {
            return;
        }
    }

    useEffect(
        () =>
        {
            if(state.sendForm)
            {
                sendSignupForm(state.signupData);
            }
        },
        [ state.sendForm ]
    );

    const changePage = (page: number, data: SignupFormSet) =>
    {
        if(page !== 1 && page !== 2)
        {
            page = 1;
        }

        setSate(
            (currentState) =>
            {
                return {
                    sendForm: false,
                    currentPage: page,
                    signupData:
                    {
                        ...currentState.signupData,
                        ...data
                    },
                    error:
                    {
                        ...currentState.error
                    }
                };
            }
        );
    };

    const setError = (error: SignupError) =>
    {
        setSate(
            (currentState) =>
            {
                return {
                    ...currentState,
                    error:
                    {
                        ...currentState.error,
                        ...error
                    }
                };
            }
        );
    }

    const sendForm = async (data: SignupFormSet) =>
    {
        setSate(
            (currentState) =>
            {
                return {
                    sendForm: true,
                    currentPage: currentState.currentPage,
                    signupData:
                    {
                        ...currentState.signupData,
                        ...data
                    },
                    error:
                    {
                        ...currentState.error
                    }
                };
            }
        );
    };

    let content: React.ReactNode;

    if(state.sendForm)
    {
        return <LoadingPage />;
    }
    else if(state.currentPage === 1)
    {
        content = <FirstPage signupData={state.signupData} error={state.error} changePage={changePage} setError={setError} />;
    }
    else
    {
        content = <SecondPage signupData={state.signupData} error={state.error} changePage={changePage} sendForm={sendForm} setError={setError} />;
    }

    return <Modal id="signup-modal" className="signup-modal" closeRequest={() =>
    {}}>
        {content}
    </Modal>;
};

export default Signup;