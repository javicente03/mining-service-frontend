import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getToken } from "./getAuthService";

const mutatorRequestParam = (url: string, method: string) => {

    const mutator = useMutation(async (data: any) => {
        const response = await axios.request({
            url: import.meta.env.VITE_HOST_BACKEND +url,
            method: method,
            data: data,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        });
        return response
    })

    return mutator
}

export default mutatorRequestParam;