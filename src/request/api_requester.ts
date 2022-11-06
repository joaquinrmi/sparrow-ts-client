import APIResponse from "./api_response";
import RequestContent from "./request_content";

type APIRequester<ParamType, FormType, ResponseType> = (content?: RequestContent<ParamType, FormType>) => Promise<APIResponse<ResponseType>>;

export default APIRequester;