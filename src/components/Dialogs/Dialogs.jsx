import React from 'react';
import c from './Dialogs.module.css';
import Item from './Item/Item';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form'

const AddMessageForm = (props) => {
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

const AddMessageReduxForm = reduxForm({
    form: 'dialogAddMessageForm'
}) (AddMessageForm)

const Dialogs = (props) => {

    let sendMessage = (formData) => {
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