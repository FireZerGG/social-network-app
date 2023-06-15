import { authUser } from './authReducer';

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

let initialState = {
    initialized: false,
};

const AppReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    };
};

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS});

export const initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(authUser())

        promise.then(() => {
            dispatch(initializedSuccess())
        })
    };
};

export default AppReducer;