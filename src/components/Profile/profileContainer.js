import React from 'react';
import Profile from './Profile';
import { connect } from "react-redux";
import { getUser, getStatus, updateStatus, savePhoto } from '../../redux/profileReducer';
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
// import { withAuthRedirectComponent } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    userId = this.props.router.params.userId 
    ? this.props.router.params.userId 
    : this.props.userAuthId

    componentDidMount() {

        setTimeout(() => {
            if (!this.userId) {
                return
            } else {
                this.props.getStatus(this.userId)
                this.props.getUser(this.userId)
            }
        }, 500)

    };

    render() {
        if (!this.userId) {
            return (
                <Navigate to = '/login' />
            );
        };
        return <Profile {...this.props} 
        isOwner = {!this.props.router.params.userId}
        status={this.props.status}
        savePhoto = {this.props.savePhoto} />
    };
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
    connect(mapStateToProps, { getUser, getStatus, updateStatus, savePhoto }),
    withRouter,
)(ProfileContainer)