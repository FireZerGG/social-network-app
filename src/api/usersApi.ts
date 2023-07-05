import { userType } from "../types/types"
import { instance } from "./api"

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