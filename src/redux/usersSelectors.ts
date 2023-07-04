import { createSelector } from "reselect";
import { appStateType } from "./reduxStore";

const getUsersSelector = (state:appStateType) => {
    return state.usersPage.users;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(e => true);
})

export const getPageSize = (state:appStateType) => {
    return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state:appStateType) => {
    return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state:appStateType) => {
    return state.usersPage.currentPage;
};

export const getIsFetching = (state:appStateType) => {
    return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state:appStateType) => {
    return state.usersPage.followingInProgress;
};