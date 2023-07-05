import { usersApi } from '../api/usersApi'
import { followApi } from '../api/followApi'
import { userType } from '../types/types';
import { ThunkAction } from 'redux-thunk';
import { appStateType, inferActionsTypes } from './reduxStore';


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
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: true }
                    }
                    return user;
                }),
            };

        case 'UN_FOLLOW':

            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: false }
                    }
                    return user;
                }),
            };

        case 'SET_USERS':

            return {
                ...state,
                users: [...action.users]
            };

        case 'RESET_DATA':

            return {
                ...state,
                users: [],
            };

        case 'SET_CURRENT_PAGE':

            return {
                ...state,
                currentPage: action.currentPage
            };

        case 'SET_TOTAL_USERS_COUNT':

            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            };

        case 'TOGGLE_IS_FETCHING':

            return {
                ...state,
                isFetching: action.isFetching
            };

        case 'TOGGLE_IS_FOLLOWING_PROCESS':

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

type actionsType = inferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unFollowSuccess: (userId: number) => ({ type: 'UN_FOLLOW', userId } as const),
    setUsers: (users: Array<userType>) => ({ type: 'SET_USERS', users } as const),
    resetData: () => ({ type: 'RESET_DATA' } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROCESS', isFetching, userId } as const)
}

type thunkType = ThunkAction<Promise<void>, appStateType, unknown, actionsType>

export const requestUsers = (currentPage: number, pageSize: number): thunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))

    const data = await usersApi.getUsers(currentPage, pageSize);
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
}

export const follow = (userId: number):thunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId))

    const resultCode = await followApi.follow(userId)
    if (resultCode === 0) {
        dispatch(actions.followSuccess(userId))
    }

    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const unFollow = (userId: number):thunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId))

    const resultCode = await followApi.unFollow(userId);
    if (resultCode === 0) {
        dispatch(actions.unFollowSuccess(userId));
    }

    dispatch(actions.toggleFollowingProgress(false, userId));
}


export default usersReducer;