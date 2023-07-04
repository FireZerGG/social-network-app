import { usersApi, followApi } from '../api/api'
import { userType } from '../types/types';
import { ThunkAction } from 'redux-thunk';
import { appStateType } from './reduxStore';

const FOLLOW = 'FOLLOW';
const UN_FOLLOW = 'UN-FOLLOW';
const SET_USERS = 'SET-USERS';
const RESET_DATA = 'RESET-DATA';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROCESS = 'TOGGLE-IS-FOLLOWING-PROCESS';

let initialState = {
    users: [] as Array<userType>,
    pageSize: 4,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
};

type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: actionsType): initialStateType => {

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
                    : state.followingInProgress.filter(id => id !== action.userId)
            };

        default:
            return state;
    };
};

type actionsType = followSuccessType | unFollowSuccessType | setUsersType
    | resetDataType | setCurrentPageType | setTotalUsersCountType
    | setTotalUsersCountType | toggleIsFetchingType | toggleFollowingProgressType

type followSuccessType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): followSuccessType => ({ type: FOLLOW, userId })

type unFollowSuccessType = {
    type: typeof UN_FOLLOW
    userId: number
}
export const unFollowSuccess = (userId: number): unFollowSuccessType => ({ type: UN_FOLLOW, userId })

type setUsersType = {
    type: typeof SET_USERS
    users: Array<userType>
}
export const setUsers = (users: Array<userType>): setUsersType => ({ type: SET_USERS, users })

type resetDataType = {
    type: typeof RESET_DATA
}
export const resetData = (): resetDataType => ({ type: RESET_DATA })

type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage })

type setTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount })

type toggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type toggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROCESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgressType => ({ type: TOGGLE_IS_FOLLOWING_PROCESS, isFetching, userId })


type thunkType = ThunkAction<Promise<void>, appStateType, unknown, actionsType>

export const requestUsers = (currentPage: number, pageSize: number): thunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true))

    const data = await usersApi.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

export const follow = (userId: number):thunkType => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))

    const resultCode = await followApi.follow(userId)
    if (resultCode === 0) {
        dispatch(followSuccess(userId))
    }

    dispatch(toggleFollowingProgress(false, userId))
}

export const unFollow = (userId: number):thunkType => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))

    const resultCode = await followApi.unFollow(userId);
    if (resultCode === 0) {
        dispatch(unFollowSuccess(userId));
    }

    dispatch(toggleFollowingProgress(false, userId));
}


export default usersReducer;