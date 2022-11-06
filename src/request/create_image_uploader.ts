import axios from "axios";

function createImageUploader(baseURL: string, url: string): ImageUploader
{
    return async (file: File) =>
    {
        const data = new FormData();
        data.append("image", file);

        try
        {
            const response = await axios({
                baseURL,
                url,
                data,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if(response.status === 200)
            {
                return response.data.imageUrl;
            }
            else
            {
                throw new Error();
            }
        }
        catch(err)
        {
            throw new Error();
        }
    };
}

export type ImageUploader = (file: File) => Promise<string>;

export default createImageUploader;