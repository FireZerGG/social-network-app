import React from 'react';
import Profile from './Profile';
import { connect } from "react-redux";
import { getUser, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profileReducer';
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
// import { withAuthRedirectComponent } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import { appStateType } from '../../redux/reduxStore';
import { profileType } from '../../types/types';

type mapPropsType = ReturnType<typeof mapStateToProps>

type dispatchPropsType = {
    getUser: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => void
}

type routerType = {
    router: {params: {
        userId:number
    }}
}

type propsType = mapPropsType & dispatchPropsType & routerType

class ProfileContainer extends React.Component<propsType> {

    userId = this.props.router.params.userId
        ? this.props.router.params.userId
        : this.props.userAuthId 

    componentDidUpdate(prevProps:propsType) {
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
            profile = {this.props.profile}
            isOwner={!this.props.router.params.userId}
            status={this.props.status}
            savePhoto={this.props.savePhoto}
            saveProfile={this.props.saveProfile}
            updateStatus={this.props.updateStatus} />
    }
}

function withRouter(Component:any) {
    function ComponentWithRouterProp(props:any) {
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

let mapStateToProps = (state:appStateType) => {
    return {
        userAuthId: state.auth.userId,
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getUser, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
)(ProfileContainer)