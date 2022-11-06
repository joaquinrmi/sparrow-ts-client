import "./Welcome.scss";
import React from "react";
import Button, { ButtonStyle } from "../../components/Button/";
import CustomLink from "../../components/CustomLink";

const Welcome: React.FunctionComponent = () =>
{
    return <div className="welcome">
        <section className="home-body">
            <div className="blue-section"></div>

            <div className="welcome-message">
                <div className="message-content">
                    <div className="welcome-title">
                        <h1>
                            Lo que no está pasando
                        </h1>

                        <h2>
                            Únete a Sparrow hoy mismo.
                        </h2>
                    </div>

                    <div className="button-list">
                        <div className="button-container">
                            <Button stylePreset={ButtonStyle.Blue} to="/signup">
                                Registrarse
                            </Button>
                        </div>
                        
                        <div className="button-container">
                            <Button stylePreset={ButtonStyle.BlueTransparent} to="/login">
                                Iniciar sesión
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="home-footer">
            <CustomLink
                to="https://www.linkedin.com/in/joaquin-ruaimi-3381a1201/"
                external
            >
                LinkeIn
            </CustomLink>

            <CustomLink
                to="https://joaquinrmi.github.io/porfolio/"
                external
            >
                Portfolio
            </CustomLink>

            <CustomLink
                to="https://github.com/joaquinrmi"
                external
            >
                Github
            </CustomLink>

            <CustomLink
                to="https://github.com/joaquinrmi/sparrow-ts"
                external
            >
                Repositorio
            </CustomLink>
        </section>
    </div>;
};

export default Welcome;