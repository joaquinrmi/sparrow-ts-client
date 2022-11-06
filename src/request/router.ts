import CreateCheepData from "../data/create_cheep_data";
import FollowingListParams from "../data/following_list_params";
import LoginData from "../data/login_data";
import RecommendedListParams from "../data/recommended_list_params";
import SearchCheepsParams from "../data/search_cheeps_params";
import UsersLikedListParams from "../data/users_liked_list_params";
import SignupData from "../form/signup_data";
import APIRequester from "./api_requester";
import createAPIRequester from "./create_api_requester";
import createImageUploader, { ImageUploader } from "./create_image_uploader";
import EditProfileForm from "./params/edit_profile_form";
import GetLikedListParams from "./params/get_liked_list_params";
import GetTimelineParams from "./params/get_timeline_paramst";
import CreateCheepResponse from "./response/create_cheep_response";
import CurrentResponse from "./response/current_response";
import EditProfileResponse from "./response/edit_profile_response";
import GetProfileResponse from "./response/get_profile_response";
import LoginResponse from "./response/login_response";
import SearchCheepsResponse from "./response/search_cheeps_response";
import SignupResponse from "./response/signup_response";
import SingleCheepResponse from "./response/single_cheep_response";
import UserListResponse from "./response/user_list_response";

type APIRouter = {
    user: UserRoutes;
    cheep: CheepRoutes;
    profile: ProfileRoutes;
    upload: UploadRoutes;
};

type UserRoutes = {
    current: APIRequester<void, void, CurrentResponse>;
    login: APIRequester<void, LoginData, LoginResponse>;
    signup: APIRequester<void, SignupData, SignupResponse>;
    follow: APIRequester<string, void, void>;
    unfollow: APIRequester<string, void, void>;
    followerList: APIRequester<FollowingListParams, void, UserListResponse>;
    followingList: APIRequester<FollowingListParams, void, UserListResponse>;
    recommendedList: APIRequester<RecommendedListParams, void, UserListResponse>;
    usersLikedList: APIRequester<UsersLikedListParams, void, UserListResponse>;
    usersRecheeppedList: APIRequester<UsersLikedListParams, void, UserListResponse>;
};

type CheepRoutes = {
    search: APIRequester<SearchCheepsParams, void, SearchCheepsResponse>;
    single: APIRequester<number, void, SingleCheepResponse>;
    timeline: APIRequester<GetTimelineParams, void, SearchCheepsResponse>;
    explore: APIRequester<GetTimelineParams, void, SearchCheepsResponse>;
    likedList: APIRequester<GetLikedListParams, void, SearchCheepsResponse>;
    like: APIRequester<number, void, void>;
    undolike: APIRequester<number, void, void>;
    create: APIRequester<void, CreateCheepData, CreateCheepResponse>;
    delete: APIRequester<number, void, void>;
    deleteRecheep: APIRequester<number, void, void>;
};

type ProfileRoutes = {
    get: APIRequester<string, void, GetProfileResponse>;
    update: APIRequester<void, EditProfileForm, EditProfileResponse>;
};

type UploadRoutes = {
    gallery: ImageUploader;
    profile: ImageUploader;
    banner: ImageUploader;
};

const baseURL = `${process.env.REACT_APP_SERVER}/api`;
const userBaseURL = `${baseURL}/user`;
const cheepBaseURL = `${baseURL}/cheep`;
const profileBaseURL = `${baseURL}/profile`;
const uploadBaseURL = `${baseURL}/upload`;

const apiRouter: APIRouter = {
    user: {
        current: createAPIRequester<void, void, CurrentResponse>(
            userBaseURL, "/current", "get", true
        ),
        login: createAPIRequester<void, LoginData, LoginResponse>(
            userBaseURL, "/auth", "post", false
        ),
        signup: createAPIRequester<void, SignupData, SignupResponse>(
            userBaseURL, "/", "post", false
        ),
        follow: createAPIRequester<string, void, void>(
            userBaseURL, "/follow", "post", true
        ),
        unfollow: createAPIRequester<string, void, void>(
            userBaseURL, "/unfollow", "delete", true
        ),
        followerList: createAPIRequester<FollowingListParams, void, UserListResponse>(
            userBaseURL, "/follower-list", "get", true
        ),
        followingList: createAPIRequester<FollowingListParams, void, UserListResponse>(
            userBaseURL, "/following-list", "get", true
        ),
        recommendedList: createAPIRequester<RecommendedListParams, void, UserListResponse>(
            userBaseURL, "/recommended-list", "get", true
        ),
        usersLikedList: createAPIRequester<UsersLikedListParams, void, UserListResponse>(
            userBaseURL, "/users-liked-list", "get", true
        ),
        usersRecheeppedList: createAPIRequester<UsersLikedListParams, void, UserListResponse>(
            userBaseURL, "/users-recheeped-list", "get", true
        ),
    },
    cheep: {
        search: createAPIRequester<SearchCheepsParams, void, SearchCheepsResponse>(
            cheepBaseURL, "/", "get", true
        ),
        single: createAPIRequester<number, void, SingleCheepResponse>(
            cheepBaseURL, "/", "get", true
        ),
        timeline: createAPIRequester<GetTimelineParams, void, SearchCheepsResponse>(
            cheepBaseURL, "/timeline", "get", true
        ),
        explore: createAPIRequester<GetTimelineParams, void, SearchCheepsResponse>(
            cheepBaseURL, "/explore", "get", true
        ),
        likedList: createAPIRequester<GetLikedListParams, void, SearchCheepsResponse>(
            cheepBaseURL, "/liked-list", "get", true
        ),
        like: createAPIRequester<number, void, void>(
            cheepBaseURL, "/like", "post", true
        ),
        undolike: createAPIRequester<number, void, void>(
            cheepBaseURL, "/like", "delete", true
        ),
        create: createAPIRequester<void, CreateCheepData, CreateCheepResponse>(
            cheepBaseURL, "/", "post", true
        ),
        delete: createAPIRequester<number, void, void>(
            cheepBaseURL, "/", "delete", true
        ),
        deleteRecheep: createAPIRequester<number, void, void>(
            cheepBaseURL, "/recheep", "delete", true
        ),
    },
    profile: {
        get: createAPIRequester<string, void, GetProfileResponse>(
            profileBaseURL, "/", "get", true
        ),
        update: createAPIRequester<void, EditProfileForm, EditProfileResponse>(
            profileBaseURL, "/", "patch", true
        ),
    },
    upload: {
        gallery: createImageUploader(uploadBaseURL, "/gallery"),
        profile: createImageUploader(uploadBaseURL, "/profile"),
        banner: createImageUploader(uploadBaseURL, "/banner"),
    }
};

export default apiRouter;