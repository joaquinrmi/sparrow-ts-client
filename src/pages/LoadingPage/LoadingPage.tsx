import "./LoadingPage.scss";
import React from "react";
import Loading from "../../components/Loading";

const LoadingPage: React.FunctionComponent = () =>
{
    return <div className="loading-page">
        <Loading />
    </div>;
};

export default LoadingPage;