import {usersApi, followApi} from '../api/api'

const FOLLOW = 'FOLLOW';
const UN_FOLLOW = 'UN-FOLLOW';
const SET_USERS = 'SET-USERS';
const RESET_DATA = 'RESET-DATA';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROCESS = 'TOGGLE-IS-FOLLOWING-PROCESS';

let initialState = {
    users: [],
    pageSize: 4,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: true }
                    }
                    return user;
                }),
            };

        case UN_FOLLOW:

            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: false }
                    }
                    return user;
                }),
            };

        case SET_USERS:

            return {
                ...state,
                users: [...action.users]
            };

        case RESET_DATA:

            return {
                ...state,
                users: [],
            };

        case SET_CURRENT_PAGE:

            return {
                ...state,
                currentPage: action.currentPage
            };

        case SET_TOTAL_USERS_COUNT:

            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            };

        case TOGGLE_IS_FETCHING:

            return {
                ...state,
                isFetching: action.isFetching
            };

        case TOGGLE_IS_FOLLOWING_PROCESS:

            return {
                ...state,
                followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id!== action.userId)
            };
            
        default:
            return state;
    };
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unFollowSuccess = (userId) => ({ type: UN_FOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const resetData = () => ({ type: RESET_DATA });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROCESS, isFetching, userId })

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));

    const data = await usersApi.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

export const follow = (userId) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))

    const resultCode = await followApi.follow(userId)

    if (resultCode === 0) {
        dispatch(followSuccess(userId))
    }

    dispatch(toggleFollowingProgress(false, userId))
}

export const unFollow = (userId) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))

    const resultCode = await followApi.unFollow(userId);
    if (resultCode === 0) {
        dispatch(unFollowSuccess(userId));
    }
    
    dispatch(toggleFollowingProgress(false, userId));
}


export default usersReducer;