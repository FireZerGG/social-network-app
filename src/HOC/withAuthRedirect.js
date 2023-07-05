import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

let mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirectComponent = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) {
                return <Navigate to= '/login'/> 
            } else {
                return <Component {...this.props} />
            }
        }
    }

    
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent)
    

    return ConnectedAuthRedirectComponent
} 