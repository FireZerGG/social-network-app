import React from "react";
import { connect } from "react-redux";
import { actions, requestUsers, follow, unFollow } from "../../redux/usersReducer";
import Users from './Users';
import preloader from '../../assets/images/preloader.svg'
import { getUsers, getPageSize, 
        getTotalUsersCount, getCurrentPage, 
        getIsFetching, getFollowingInProgress } from "../../redux/usersSelectors";
import { userType } from "../../types/types";
import { appStateType } from "../../redux/reduxStore";


    type propsType = {
        currentPage: number
        pageSize: number
        isFetching: boolean
        users: Array<userType>
        totalUsersCount: number
        followingInProgress: Array<number>

        unFollow: (id: number) => void
        follow: (id: number) => void
        requestUsers: (currentPage: number, pageSize: number) => void
        resetData: () => void
        setCurrentPage: (currentPage: number) => void
        toggleFollowingProgress: (value: boolean, id: number) => void
    }

class UsersAPIComponent extends React.Component<propsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    };

    componentWillUnmount() {
        this.props.resetData();
    };
    
    onPageChanged = (currentPage:number) => {
        this.props.setCurrentPage(currentPage);
        this.props.requestUsers(currentPage, this.props.pageSize);
    };

    toggleFollowingProgress = (value:boolean, id:number) => {
        this.props.toggleFollowingProgress(value, id);
    };

    render() {
        return (
            <>
                <div>
                    {this.props.isFetching ?
                        <div style={{
                            marginTop: '100px',
                            marginLeft: '250px',
                        }}>
                            <img alt="placeholder" src={preloader} />
                        </div> :
                        <Users
                            totalUsersCount={this.props.totalUsersCount}
                            pageSize={this.props.pageSize}
                            currentPage={this.props.currentPage}
                            users={this.props.users}
                            unFollow={this.props.unFollow}
                            follow={this.props.follow}
                            onPageChanged={this.onPageChanged}
                            followingInProgress={this.props.followingInProgress}
                        />
                    }
                </div>
            </>
        );
    };
};

let mapStateToProps = (state: appStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
        
    };
};

export default connect(mapStateToProps, {
    resetData: actions.resetData, 
    setCurrentPage: actions.setCurrentPage, 
    toggleFollowingProgress: actions.toggleFollowingProgress,
    requestUsers, follow, unFollow 
})(UsersAPIComponent)