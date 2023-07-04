import axios from 'axios'
import { profileType, userType } from '../types/types'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c87f64be-34bb-477c-9ba2-acbe0a47378b"
    },
})

type defaultResponseType = {
    data: {
    }
    resultCode: number
    messages: Array<string>
}

type getUsersType = {
    items: Array<userType>
    totalCount: number
    error: string
}

export const usersApi = {
    async getUsers (currentPage: number, pageSize: number)  {
        const response = await instance.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}`)
        return response.data
    },
}

type getAuthUserResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}
type loginType = {
    data: {
        userId: number
    }
    resultCode: number
    messages: Array<string>
}

export const authApi = {
    async getAuthUser () {
        const response = await instance.get<getAuthUserResponseType>(`auth/me`)
        return response.data
    },

    async login (email: string, password: string, rememberMe = false, captcha: null | string = null) {
        const response = await instance.post<loginType>(`auth/login`, {email, password, rememberMe, captcha})
        return response
    },

    async logout () {
        const response = await instance.delete<defaultResponseType>(`auth/login`);
        return response;
    }
}

type savePhotoType = {
    data: {
        small: null | string
        large: null | string
    }
    resultCode: number
    messages: Array<string>
}

export const profileApi = {

    async getUserInfo (userId: number | null) {
        const response = await instance.get<profileType>(`profile/${userId}`)
        return response.data
    },

    async getStatus (userId: number) {
        const response = await instance.get<string>(`profile/status/${userId}`)
        return response.data
    },

    async updateStatus (status: string) {
        const response = await instance.put<defaultResponseType>('/profile/status', {status})
        return response.data
    },

    async savePhoto(photoFile:any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        const response = await instance.put('/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(response)
        return response.data
    },

    async saveProfile (profile:profileType) {
        const response = await instance.put('/profile', profile)
        return response.data
    }
}

export const followApi = {
    async unFollow (id:number) {
        const response = await instance.delete(`/follow/${id}`)
        return response.data.resultCode
    },
    
    async follow (id:number) {
        const response = await instance.post(`/follow/${id}`)
        return response.data.resultCode
    }
}

export const securityAPI = {
    async getCaptchaUrl () {
        const response = await instance.get(`/security/get-captcha-url`)
        return response
    }
}