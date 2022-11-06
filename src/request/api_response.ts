import APIErrorResponse from "./api_error_response";

type APIResponse<T> = {
    status: number;
    data?: T,
    error?: APIErrorResponse,
};

export default APIResponse;