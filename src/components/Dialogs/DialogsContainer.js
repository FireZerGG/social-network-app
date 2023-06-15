import { sendMessageActionCreator } from '../../redux/messagesReducer';
import Dialogs from './Dialogs'
import { connect } from 'react-redux';
import { withAuthRedirectComponent } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (text) => {
            dispatch(sendMessageActionCreator(text))
        }
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirectComponent,
)(Dialogs)

// withAuthRedirectComponent(connect(mapStateToProps, mapDispatchToProps) (Dialogs));