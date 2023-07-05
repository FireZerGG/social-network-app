import { profileApi } from "../api/profileApi"
import { profileType, photosType } from "../types/types"
import { BaseThunkType, inferActionsTypes } from "./reduxStore"

let initialState = {
    profile: null as profileType | null,
    status: '',
}

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        case 'SET_USER_PROFILE':

            return {...state, profile: action.profile};

        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            };

        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as profileType
            };

        default:
            return state
    }
}

type actionsType = inferActionsTypes<typeof actions>

const actions = {
    setUserProfile: (profile: profileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatus: (status:string) => ({ type: 'SET_STATUS', status } as const),
    savePhotoSuccess: (photos:photosType) => ({ type: 'SAVE_PHOTO_SUCCESS', photos } as const)
}

type thunkType = BaseThunkType<actionsType>

export const getUser = (id: number | null): thunkType => async (dispatch) => {
    const data = await profileApi.getUserInfo(id)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId:number): thunkType => async (dispatch) => {
    const data = await profileApi.getStatus(userId)
    dispatch(actions.setStatus(data));
}

export const updateStatus = (status:string):thunkType => async (dispatch) => {
    const data = await profileApi.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file:File):thunkType => async (dispatch) => {
    const data = await profileApi.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile:profileType):thunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileApi.saveProfile(profile)

    if (data.resultCode === 0) {
        dispatch(getUser(userId))
    }
}

export default profileReducer