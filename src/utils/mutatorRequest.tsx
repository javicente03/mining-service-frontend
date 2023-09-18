import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getToken } from "./getAuthService";

const mutatorRequest = (url: string, method: string, data?: any) => {

    const mutator = useMutation(async () => {
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

export default mutatorRequest;