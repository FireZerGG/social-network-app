import { ThunkAction } from "redux-thunk";
import { authUser } from "./authReducer";
import { appStateType } from "./reduxStore";
import { Dispatch } from "redux";

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

export type initializeStateType = {
    initialized: boolean
}

let initialState: initializeStateType = {
    initialized: false,
};

const AppReducer = (state = initialState, action: actionsType): initializeStateType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    };
};

type actionsType = initializedSuccessType

type initializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): initializedSuccessType => ({ type: INITIALIZED_SUCCESS });

export const initializeApp =  () => {
    return (dispatch:any) => {
        setTimeout(() => {
            let promise = dispatch(authUser())
            promise.then(() => {
                dispatch(initializedSuccess())
            })
        }, 1000)
    };
};

export default AppReducer;