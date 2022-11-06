import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LoginData from "../../data/login_data";
import UserData from "../../data/user_data";
import LoginResponse from "../../request/response/login_response";
import apiRouter from "../../request/router";
import StatusCode from "../../request/status_code";
import SessionState, { initialSessionState } from "../state/session_state";

export const login = createAsyncThunk<LoginResponse | null, LoginData>(
    "session/login",
    async (loginData) =>
    {
        try
        {
            const response = await apiRouter.user.login({ form: loginData });
            if(response.status === StatusCode.OK && response.data)
            {
                return response.data;
            }
            else return null;
        }
        catch(err)
        {
            return null;
        }
    }
);

export const restoreSession = createAsyncThunk<UserData | null, void>(
    "session/restoreSession",
    async () =>
    {
        try
        {
            const response = await apiRouter.user.current();
            if(response.status === StatusCode.OK && response.data)
            {
                return response.data.user;
            }
            else return null;
        }
        catch(err)
        {
            return null;
        }
    }
);

const sessionSlice = createSlice({
    name: "session",
    initialState: initialSessionState,
    reducers: {
        logout: (state: SessionState) =>
        {
            state.logged = false;
            state.user = undefined;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) =>
    {
        builder.addCase(login.fulfilled, (state, action) =>
        {
            if(action.payload)
            {
                localStorage.setItem("token", action.payload.token);
                state.user = action.payload.user;
                state.logged = true;
            }
        });

        builder.addCase(restoreSession.fulfilled, (state, action) =>
        {
            if(action.payload)
            {
                state.user = action.payload;
                state.logged = true;
            }
        });
    }
});

export const { logout } = sessionSlice.actions;

export default sessionSlice;