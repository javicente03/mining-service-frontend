import axios from "axios";
import { AuthLogout } from "./AuthService";
import { getToken } from "./getAuthService";

export const requestGet = async (link: string, filters: any = null) => {
    try {
        const { data } = await axios.request({
            url: import.meta.env.VITE_HOST_BACKEND + link,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getToken()
            },
            params: filters
        })

        // Solo si hay un token en localStorage, se hace la petición para refrescar el token
        // if (getToken()) {
        //     try {
        //         const refresh_token = await axios.get(import.meta.env.VITE_HOST_BACKEND + '/auth/refresh-token', {
        //             headers: {
        //                 'Authorization': 'Bearer ' + getToken()
        //             }
        //         })

        //         if (refresh_token.data.refresh) localStorage.setItem('token', refresh_token.data.token);
        //     } catch (error) {
        //         console.log('error');   
        //     }
        // }

        return data;
    } catch (e: any) {
        if (e.response.status === 401) {
            AuthLogout();
            window.location.reload();
        }
    }
    
}