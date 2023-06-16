import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "c87f64be-34bb-477c-9ba2-acbe0a47378b"
    },
});

export const usersApi = {
    async getUsers (currentPage, pageSize)  {
        const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    },
};

export const authApi = {
    async getAuthUser () {
        const response = await instance.get(`auth/me`);
        return response.data;
    },

    async login (email, password, rememberMe = false) {
        const response = await instance.post(`auth/login`, {email, password, rememberMe});
        return response;
    },

    async logout () {
        const response = await instance.delete(`auth/login`);
        return response;
    }
};

export const profileApi = {

    async getUserInfo (userId) {
        const response = await instance.get(`profile/${userId}`);
        return response.data;
    },

    async getStatus (userId) {
        const response = await instance.get(`profile/status/${userId}`)
        return response.data
    },

    async updateStatus (status) {
        const response = await instance.put('/profile/status', {status})
        return response.data
    },

    async savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile)
        const response = await instance.put('/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    },

    async saveProfile (profile) {
        const response = await instance.put('/profile', profile)
        return response.data
    },
};

export const followApi = {
    async unFollow (id) {
        const response = await instance.delete(`/follow/${id}`);
        return response.data.resultCode;
    },
    
    async follow (id) {
        const response = await instance.post(`/follow/${id}`);
        return response.data.resultCode;
    }
}