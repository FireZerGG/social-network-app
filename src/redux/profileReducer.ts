import { stopSubmit } from "redux-form";
import { profileApi } from "../api/api";
import { profileType, photosType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { appStateType } from "./reduxStore";


const ADD_POST = 'ADD-POST' 
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-PROFILE-STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS'

let initialState = {
    // posts: [
    //     { id: 4, message: "pizza", likes: "10" },
    //     { id: 3, message: "mozzarella", likes: "4" },
    //     { id: 2, message: "rella rella rella", likes: "3" },
    //     { id: 1, message: "rella rella rella", likes: "3" }
    // ],
    // newPostText: '',
    profile: null as profileType | null,
    status: '',
}

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {
        // case ADD_POST:

        //     let postsIdCounter = state.posts.length;
        //     let newPost = {
        //         id: postsIdCounter + 1,
        //         message: action.postMessage,
        //         likes: 1,
        //     };

        //     stateCopy = {
        //         ...state,
        //         posts: [newPost, ...state.posts],
        //     }
        //     return stateCopy;

        case SET_USER_PROFILE:

            return {...state, profile: action.profile};

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };

        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as profileType
            }

        default:
            return state
    };
};

type actionsType = addPostActionCreatorType | setUserProfileType | setStatusType | savePhotoSuccessType

type addPostActionCreatorType = {
    type: typeof ADD_POST
    postMessage: string
}
export const addPostActionCreator = (text:string):addPostActionCreatorType => ({ type: ADD_POST, postMessage: text })

type setUserProfileType = {
    type: typeof SET_USER_PROFILE 
    profile: profileType
}
export const setUserProfile = (profile: profileType):setUserProfileType => ({type: SET_USER_PROFILE, profile})

type setStatusType = {
    type: typeof SET_STATUS 
    status: string
}
export const setStatus = (status:string):setStatusType => ({ type: SET_STATUS, status })

type savePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS 
    photos: photosType
}
export const savePhotoSuccess= (photos:photosType):savePhotoSuccessType => ({ type: SAVE_PHOTO_SUCCESS, photos })

type thunkType = ThunkAction<Promise<void>, appStateType, unknown, actionsType>

export const getUser = (id: number | null): thunkType => async (dispatch) => {
    const data = await profileApi.getUserInfo(id);
    dispatch(setUserProfile(data));
}

export const getStatus = (userId:number) => async (dispatch:any) => {
    const data = await profileApi.getStatus(userId)
    dispatch(setStatus(data));
}

export const updateStatus = (status:string):thunkType => async (dispatch) => {
    const data = await profileApi.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    };
}

export const savePhoto = (file:any):thunkType => async (dispatch) => {
    const data = await profileApi.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    };
}

export const saveProfile = (profile:profileType):thunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileApi.saveProfile(profile);

    if (data.resultCode === 0) {
        dispatch(getUser(userId))
    };
}

export default profileReducer;