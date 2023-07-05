import { actions } from '../../redux/messagesReducer';
import Dialogs from './Dialogs'
import { connect } from 'react-redux';
import { withAuthRedirectComponent } from '../../HOC/withAuthRedirect.js';
import { compose } from 'redux';
import { appStateType } from '../../redux/reduxStore';

const mapStateToProps = (state:appStateType) => {
    return {
        messagesPage: state.messagesPage,
    };
};

export default compose(
    connect(mapStateToProps, {
        sendMessage: actions.sendMessage
    }),
)(Dialogs)

// withAuthRedirectComponent(connect(mapStateToProps, mapDispatchToProps) (Dialogs));