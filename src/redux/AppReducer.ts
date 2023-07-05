import { authUser } from "./authReducer";
import { inferActionsTypes } from "./reduxStore";

let initialState = {
    initialized: false,
};

export type initialStateType = typeof initialState

const AppReducer = (state = initialState, action: actionsType):initialStateType => {

    switch (action.type) {
        case "INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    };
};

type actionsType = inferActionsTypes<typeof actions>

export const actions = {
    initializedSuccess: () => ({ type: "INITIALIZED_SUCCESS" })
}

export const initializeApp =  () => {
    return (dispatch:any) => {
        setTimeout(() => {
            let promise = dispatch(authUser())
            promise.then(() => {
                dispatch(actions.initializedSuccess())
            })
        }, 1000)
    };
};

export default AppReducer;