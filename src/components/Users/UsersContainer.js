import React from "react";
import { connect } from "react-redux";
import {toggleFollowingProgress, 
        resetData, setCurrentPage, 
        requestUsers, follow, unFollow } from "../../redux/usersReducer";
import Users from './Users';
import preloader from '../../assets/images/preloader.svg'
import { getUsers, getPageSize, 
        getTotalUsersCount, getCurrentPage, 
        getIsFetching, getFollowingInProgress } from "../../redux/usersSelectors";

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    };

    componentWillUnmount() {
        this.props.resetData();
    };
    
    onPageChanged = (currentPage) => {
        this.props.setCurrentPage(currentPage);
        this.props.requestUsers(currentPage, this.props.pageSize);
    };

    toggleFollowingProgress = (value, id) => {
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
                        />}
                </div>
            </>
        );
    };
};

let mapStateToProps = (state) => {
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
    resetData, setCurrentPage, 
    toggleFollowingProgress,
    requestUsers, follow, unFollow 
})(UsersAPIComponent)