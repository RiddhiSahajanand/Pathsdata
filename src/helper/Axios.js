import axios from "axios";


export const authorizationHeaders = () => {
    const token = localStorage.getItem("jwt_token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
}

// export const AxiosAuth = axios.create({
//     baseURL: import.meta.env.VITE_APP_AUTHENTICATION_API
// });

// export const AxiosOther = axios.create({
//     baseURL: import.meta.env.VITE_APP_AUTHORIZATION_API
// });


export const Axios = axios.create({
    baseURL: import.meta.env.VITE_APP_ADMIN_API
});