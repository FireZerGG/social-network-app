import { authApi } from '../api/authApi'
import { securityAPI } from '../api/securityApi'
import { stopSubmit } from 'redux-form'
import { BaseThunkType, inferActionsTypes } from './reduxStore'

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
}

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: actionsType): initialStateType => {

    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            };

        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };

        default:
            return state;
    }
}

type actionsType = inferActionsTypes<typeof actions>

export const actions = {
    setUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA', payload: { userId, email, login, isAuth }
    }) as const,
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'GET_CAPTCHA_URL_SUCCESS', captchaUrl
    }) as const
}

type thunkType = BaseThunkType<actionsType | ReturnType<typeof stopSubmit>>

export const authUser = ():thunkType => async (dispatch) => {
    const data = await authApi.getAuthUser()
    if (data.resultCode === 0) {
        let { id, login, email } = data.data
        dispatch(actions.setUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any):thunkType => async (dispatch) => {
    const response = await authApi.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(authUser())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        dispatch(stopSubmit('login', { _error: response.data.messages }))
    } 
}

export const logout = ():thunkType => async (dispatch) => {
    const response = await authApi.logout()

    if (response.data.resultCode === 0) {
        dispatch(actions.setUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = ():thunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url

    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))

}

export default authReducer