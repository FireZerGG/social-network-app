import { instance } from './api'
import { responseType } from './api'

type getAuthUserDataType = {
        id: number
        email: string
        login: string
}
type loginDataType = {
        userId: number
}

export const authApi = {
    async getAuthUser () {
        const response = await instance.get<responseType<getAuthUserDataType>>(`auth/me`)
        return response.data
    },

    async login (email: string, password: string, rememberMe = false, captcha: null | string = null) {
        const response = await instance.post<responseType<loginDataType>>(`auth/login`, {email, password, rememberMe, captcha})
        return response
    },

    async logout () {
        const response = await instance.delete<responseType>(`auth/login`);
        return response;
    }
}