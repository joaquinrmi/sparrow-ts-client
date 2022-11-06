import APIErrorType from "./api_error_type";

export type APIError = {
    code: APIErrorType;
    title: string;
    description: string;
};

type APIErrorResponse = {
    title: string;
    errors: Array<APIError>;
};

export default APIErrorResponse;