import React from 'react';
import c from './Dialogs.module.css';
import Item from './Item/Item';
import Message from './Message/Message';
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { initializeStateType } from '../../redux/messagesReducer';

type messageFormValuesType = {
    newMessageBody: string
}
type propsType = {}

const AddMessageForm: React.FC<InjectedFormProps<messageFormValuesType, propsType> & propsType> = (props) => {
    return (
        <form className={c.chat__form} onSubmit={props.handleSubmit}>
            <Field component={'input'}
                placeholder={'message...'}
                name={'newMessageText'}
                className={c.chat__input} />
            <button
                name={'sendButton'}
                className={c.chat__btn}>
                send
            </button>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<messageFormValuesType>({
    form: 'dialogAddMessageForm'
}) (AddMessageForm)

type ownPropsType = {
    messagesPage: initializeStateType
    sendMessage: (messageText: string) => void
}

const Dialogs: React.FC<ownPropsType> = (props) => {

    let sendMessage = (formData:any) => {
        props.sendMessage(formData.newMessageText)
    };

    let userElements = props.messagesPage.users.map
        (user => <Item name={user.name} key={user.id} id={user.id} avatarPhoto={user.avatarPhoto} />);
    let messagesELements = props.messagesPage.messages.map
        (el => <Message text={el.text} key={el.id} />);

    return (
        <section className={c.dialogs}>
            <div className={c.dialogs__list}>
                <ul className={c.list__items}>
                    {userElements}
                </ul>
            </div>
            <div className={c.dialogs__chat}>
                <ul className={c.chat}>
                    {messagesELements}
                </ul>
                <AddMessageReduxForm onSubmit = {sendMessage}/>
            </div>
        </section>
    );
};

export default Dialogs;