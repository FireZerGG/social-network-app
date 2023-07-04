import { ThunkAction } from 'redux-thunk'
import { authApi, securityAPI } from '../api/api'
import { stopSubmit } from 'redux-form'
import { appStateType } from './reduxStore'

const SET_USER_DATA = 'SET-USER-DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET-CAPTCHA-URL-SUCCESS'

// export type initialStateType = {
//     userId: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean,
//     captchaUrl: string | null,
// }

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
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            };

        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };

        default:
            return state;
    }
}

type actionsType = setUserDataType | getCaptchaUrlSuccessType

type setUserDataType = {
    type: typeof SET_USER_DATA,
    payload: {
        userId: number | null
        email: string | null
        login: string | null
        isAuth: boolean 
    }
}
export const setUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setUserDataType => ({
    type: SET_USER_DATA, payload: { userId, email, login, isAuth }
})

type getCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    captchaUrl: string
}
export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessType => ({
    type: GET_CAPTCHA_URL_SUCCESS, captchaUrl 
}) 

type thunkType = ThunkAction<Promise<void>, appStateType, unknown, actionsType> 

export const authUser = ():thunkType => async (dispatch) => {
    const data = await authApi.getAuthUser()
    if (data.resultCode === 0) {
        let { id, login, email } = data.data
        dispatch(setUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
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
        dispatch(setUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = ():thunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url

    dispatch(getCaptchaUrlSuccess(captchaUrl))

}

export default authReducer