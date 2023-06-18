import { authApi, securityAPI } from '../api/api'
import { stopSubmit } from 'redux-form'

const SET_USER_DATA = 'SET-USER-DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET-CAPTCHA-URL-SUCCESS'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};

const usersReducer = (state = initialState, action) => {

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
    };
};

export const setUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA, payload: { userId, email, login, isAuth }
})

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS, captchaUrl 
})


export const authUser = () => async (dispatch) => {
    const data = await authApi.getAuthUser();
    if (data.resultCode === 0) {
        let { id, login, email } = data.data;
        dispatch(setUserData(id, email, login, true));
    };
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authApi.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        debugger
        dispatch(authUser());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }

        dispatch(stopSubmit('login', { _error: response.data.messages }));
    };
};

export const logout = () => async (dispatch) => {
    const response = await authApi.logout();

    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
    };
};

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url

    dispatch(getCaptchaUrlSuccess(captchaUrl))

};

export default usersReducer;