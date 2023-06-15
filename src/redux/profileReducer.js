import { profileApi } from "../api/api";

const ADD_POST = 'ADD-POST' 
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-PROFILE-STATUS'

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
            }

        default:
            return state
    };
};

export const addPostActionCreator = (text) => ({ type: ADD_POST, postMessage: text })
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({ type: SET_STATUS, status })

export const getUser = (id) => {
    return (dispatch) => {
            profileApi.getUserInfo(id).then(data => {
                    dispatch(setUserProfile(data))
                });
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        profileApi.getStatus(userId).then(data => {
            dispatch(setStatus(data))
        })
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileApi.updateStatus(status).then(data => {
            if (data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
    }
}

export default profileReducer;