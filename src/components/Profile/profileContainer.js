import React from 'react';
import Profile from './Profile';
import { connect } from "react-redux";
import { getUser, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profileReducer.ts';
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
// import { withAuthRedirectComponent } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    userId = this.props.router.params.userId
        ? this.props.router.params.userId
        : this.props.userAuthId

    componentDidUpdate(prevProps) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.userId = this.props.userAuthId
            this.props.getStatus(this.userId)
            this.props.getUser(this.userId)
        }
    }

    componentDidMount() {
        if (!this.userId) {
            return
        } else {
            this.props.getStatus(this.userId)
            this.props.getUser(this.userId)
        }
    }

    render() {
        if (!this.userId) {
            return (
                <Navigate to='/login' />
            );
        };
        return <Profile {...this.props}
            isOwner={!this.props.router.params.userId}
            status={this.props.status}
            savePhoto={this.props.savePhoto}
            saveProfile={this.props.saveProfile} />
    }
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    };

    return ComponentWithRouterProp;
}

let mapStateToProps = (state) => {
    return {
        userAuthId: state.auth.userId,
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status
    }
}

export default compose(
    connect(mapStateToProps, { getUser, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
)(ProfileContainer)