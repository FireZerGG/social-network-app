import { photosType, profileType } from "../types/types"
import { instance, responseType } from "./api"

type savePhotoDataType = {
    photos: photosType
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
        const response = await instance.put<responseType>('/profile/status', {status})
        return response.data
    },

    async savePhoto(photoFile:any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        const response = await instance.put<responseType<savePhotoDataType>>('/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    },

    async saveProfile (profile:profileType) {
        const response = await instance.put<responseType<profileType>>('/profile', profile)
        return response.data
    }
}