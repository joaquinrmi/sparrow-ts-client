import React from "react";
import { useNavigate } from "react-router-dom";
import CheepData from "../../data/cheep_data";
import { useAppDispatch } from "../../store";
import { setEditorResponseTarget } from "../../store/slices/cheep_editor_slice";
import InteractionButton, { InteractionColor } from "../InteractionButton";
import { faComment } from "@fortawesome/free-solid-svg-icons";

export type Props = {
    id: string;
    cheepData: CheepData;
    counter?: boolean;
}

const CommentButton: React.FunctionComponent<Props> = (props) =>
{
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return <InteractionButton
        id={props.id}
        className="comment-button"
        color={InteractionColor.Blue}
        icon={faComment}
        counter={props.counter ? props.cheepData.commentCount : undefined}
        onClick={(event) =>
        {
            event.stopPropagation();
            dispatch(setEditorResponseTarget(props.cheepData));
            navigate("/compose/cheep");
        }}
    />;
};

export default CommentButton;