import axios from "axios";
import APIEndpoint from "./api_requester";
import RequestContent from "./request_content";

export function createAPIRequester<ParamType, FormType, ResponseType>(
    baseURL: string,
    url: string,
    method: "get" | "post" | "patch" | "delete",
    credentials?: boolean
): APIEndpoint<ParamType, FormType, ResponseType>
{
    return async (content?: RequestContent<ParamType, FormType>) =>
    {
        try
        {
            const headers: any = {};
            if(credentials)
            {
                headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
            }

            let params: any | undefined;
            let newUrl = url;
            if(typeof content?.params === "string" || typeof content?.params === "number")
            {
                if(newUrl === "/") newUrl = `/${content.params}`;
                else newUrl += `/${content.params}`;
            }
            else
            {
                params = content?.params;
            }

            let form = content?.form;

            var data = await axios({
                baseURL: baseURL,
                url: newUrl,
                method: method,
                params: params,
                data: form,
                headers: headers
            });

            return {
                status: data.status,
                data: data.data,
                error: data.status < 200 || data.status > 299 ? data.data : undefined
            };
        }
        catch(error: any)
        {
            if(error.response)
            {
                return {
                    status: error.status,
                    error: error.data
                }
            }
            else
            {
                throw error;
            }
        }
    };
}

export default createAPIRequester;