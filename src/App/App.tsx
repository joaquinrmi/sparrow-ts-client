import "./App.scss";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Welcome from "../pages/Welcome";
import { useAppDispatch, useAppSelector } from "../store";
import { restoreSession } from "../store/slices/session_slice";
import LoadingPage from "../pages/LoadingPage";
import Signup from "../pages/Signup";
import LoginPage from "../pages/LoginPage";
import Sparrow from "../pages/Sparrow";

const App: React.FunctionComponent = () =>
{
    const [ loading, setLoading ] = useState<boolean>(true);

    const session = useAppSelector(state => state.session);
    const dispatch = useAppDispatch();

    useEffect(() =>
    {
        if(loading)
        {
            (async () =>
            {
                await dispatch(restoreSession());
                setLoading(false);
            })();
        }
    });

    if(loading)
    {
        return <LoadingPage />;
    }

    let routes;
    if(session.logged)
    {
        routes = <>
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/*" element={<Sparrow />} />
        </>;
    }
    else
    {
        routes = <>
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </>;
    }

    return <Routes>
        {routes}
    </Routes>;
};

export default App;