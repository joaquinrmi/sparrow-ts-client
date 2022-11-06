import UserData from "../../data/user_data";

type LoginResponse = {
    user: UserData;
    token: string;
};

export default LoginResponse;