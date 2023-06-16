import { stopSubmit } from "redux-form";
import { profileApi } from "../api/api";

const ADD_POST = 'ADD-POST' 
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-PROFILE-STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS'

let initialState = {
    posts: [
        { id: 4, message: "pizza", likes: "10" },
        { id: 3, message: "mozzarella", likes: "4" },
        { id: 2, message: "rella rella rella", likes: "3" },
        { id: 1, message: "rella rella rella", likes: "3" }
    ],
    profile: null,
    newPostText: '',
    status: '',
}

const profileReducer = (state = initialState, action) => {
    let stateCopy;
    switch (action.type) {
        case ADD_POST:

            let postsIdCounter = state.posts.length;
            let newPost = {
                id: postsIdCounter + 1,
                message: action.postMessage,
                likes: 1,
            };

            stateCopy = {
                ...state,
                posts: [newPost, ...state.posts],
            }
            return stateCopy;

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
                profile: {...state.profile, photos: action.photos}
            }

        default:
            return state
    };
};

export const addPostActionCreator = (text) => ({ type: ADD_POST, postMessage: text })
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const savePhotoSuccess= (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })

export const getUser = (id) => async (dispatch) => {
    const data = await profileApi.getUserInfo(id);
    dispatch(setUserProfile(data));
};

export const getStatus = (userId) => {
    return (dispatch) => {
        profileApi.getStatus(userId).then(data => {
            dispatch(setStatus(data));
        });
    };
};

export const updateStatus = (status) => async (dispatch) => {
    const data = await profileApi.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    };
};

export const savePhoto = (file) => async (dispatch) => {
    const data = await profileApi.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    };
};

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileApi.saveProfile(profile);

    if (data.resultCode === 0) {
        dispatch(getUser(userId))
    };
};

export default profileReducer;