import "./Loading.scss";
import React from "react";
import conditionalClass from "../../utils/conditional_class";

export interface Props
{
    static?: boolean;
    status?: number;
    radius?: number;
    thickness?: number;
}

const RADIUS = 12;

const BLUE = "#00ACF4";
const LIGHT_BLUE = "#D2EBFC";

const Loading: React.FunctionComponent<Props> = (props) =>
{
    const radius = props.radius ? props.radius : RADIUS;
    const scale = radius / RADIUS;
    const thickness = (props.thickness ? props.thickness : 4) * (1 / scale);
    const size = (2 * RADIUS) + thickness + 2;
    const length = 2 * Math.PI * RADIUS;
    const offset = length - (props.status ? props.status * length / 100 : 0);

    return <svg
        className={conditionalClass(
            {
                "static": props.static,
                "animated": !props.static
            },
            [ "loading" ]
        )}
        width={size}
        height={size}
        style={{
            transform: `scale(${scale}, ${scale})`
        }}
    >
        <circle cx="50%" cy="50%" r={RADIUS} strokeWidth={thickness} stroke={LIGHT_BLUE} fill="none"></circle>

        <circle
            className="status-circle"
            cx="50%"
            cy="50%"
            r={RADIUS}
            strokeWidth={thickness}
            stroke={BLUE}
            fill="none"
            style={props.static ?
                {
                    strokeDashoffset: `${offset}px`
                } :
                {}}
            ></circle>
    </svg>;
};

export default Loading;