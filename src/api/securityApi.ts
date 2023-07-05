import { instance } from "./api"

type getCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    async getCaptchaUrl () {
        const response = await instance.get<getCaptchaUrlResponseType>(`/security/get-captcha-url`)
        return response
    }
}