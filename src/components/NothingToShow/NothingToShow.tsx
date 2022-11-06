import "./NothingToShow.scss";
import React from "react";

const NothingToShow: React.FunctionComponent = () =>
{
    return <div className="nothing-to-show">
        <div className="message-container">
            <span className="nothing-title">
                Nada para mostrar
            </span>

            <span className="nothing-description">
                Aún no hay nada para mostrar en esta página.
            </span>
        </div>
    </div>;
};

export default NothingToShow;