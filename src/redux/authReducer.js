import { authApi } from '../api/api'
import { stopSubmit } from 'redux-form'

const SET_USER_DATA = 'SET-USER-DATA'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    };
};

export const setUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })

export const authUser = () => async (dispatch) => {
    const data = await authApi.getAuthUser();
    if (data.resultCode === 0) {
        let { id, login, email } = data.data;
        dispatch(setUserData(id, email, login, true));
    };
};

export const login = (email, password, rememberMe) => async (dispatch) => {
    const response = await authApi.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(authUser());
    } else {
        console.log(response);
        dispatch(stopSubmit(
            'login', { _error: response.data.messages }
        ));
    };
};

export const logout = () => async (dispatch) => {
    const response = await authApi.logout();

    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
    };
};

export default usersReducer;