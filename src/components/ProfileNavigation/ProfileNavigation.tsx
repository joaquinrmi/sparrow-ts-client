import React from "react";
import PageNavigation from "../PageNavigation";

export type Props = {
    userHandle: string;
}

const ProfileNavigation: React.FunctionComponent<Props> = (props) =>
{
    return <PageNavigation items={[
        {
            to: `/${props.userHandle}`,
            content: "Cheeps"
        },
        {
            to: `/${props.userHandle}/with-replies`,
            content: "Cheeps y respuestas"
        },
        {
            to: `/${props.userHandle}/media`,
            content: "Fotos y videos"
        },
        {
            to: `/${props.userHandle}/likes`,
            content: "Me gusta"
        }
    ]} />
};

export default ProfileNavigation;