import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c87f64be-34bb-477c-9ba2-acbe0a47378b"
    },
})

enum resultCodesEnum  {
    success = 0,
    error = 1,
    captchaIsRequired = 10
}


export type responseType<D ={}, RC = resultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}