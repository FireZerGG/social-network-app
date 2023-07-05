import { instance, responseType } from "./api"

export const followApi = {
    async unFollow (id:number) {
        const response = await instance.delete<responseType>(`/follow/${id}`)
        return response.data.resultCode
    },
    
    async follow (id:number) {
        const response = await instance.post<responseType>(`/follow/${id}`)
        return response.data.resultCode
    }
}