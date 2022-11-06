import UserData from "../../data/user_data";

type SessionState = {
    logged: boolean;
    user?: UserData;
};

export const initialSessionState: SessionState = {
    logged: false,
};

export default SessionState;