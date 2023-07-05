import React from 'react';
import Header, { headerMapPropsType, headerDispatchPropsType } from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/authReducer';
import { appStateType } from '../../redux/reduxStore';

class HeaderContainer extends React.Component<headerMapPropsType & headerDispatchPropsType> {

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state:appStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
} as headerMapPropsType)

export default connect(mapStateToProps, {
    logout})(HeaderContainer);