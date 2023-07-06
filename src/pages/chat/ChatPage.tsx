import React, { useEffect, useRef, useState } from "react"
import c from './chatPage.module.css'
import { chatMessageType } from "../../api/chatApi"
import { useDispatch, useSelector } from "react-redux"
import { startMessagesListening, stopMessagesListening, sendMessage } from "../../redux/chatReducer"
import { appStateType } from "../../redux/reduxStore"

function useChatScroll<T>(dep: T): React.MutableRefObject<HTMLDivElement> {
  const ref = React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}


export const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {

    const dispatch: any = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Messages: React.FC<{}> = () => {

    const messages = useSelector((state: appStateType) => state.chat.messages)

    const ref = useChatScroll(messages)

    return (
        <>
            <div className={c.messagesContainer} ref={ref}>
                {messages.map((m, index) => <Message key={index} message={m} />)}
            </div>
        </>
    )

}

const Message: React.FC<{ message: chatMessageType }> = ({ message }) => {
    return (
        <div className={c.message}>
            <div className={c.user}>
                <img  className={c.userAvatar}  src={message.photo} />
                <p className={c.userName}>{message.userName}</p>
            </div>
            <p className={c.messageText}>{message.message}</p>
        </div>
    )
}

const AddMessageForm: React.FC<{}> = () => {

    const [message, setMessage] = useState('')
    const status = useSelector((state: appStateType) => state.chat.status)
    const dispatch: any = useDispatch()
    
    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div className={c.form}>
            <div>
                <textarea  placeholder = 'Введите сообщение' className={c.formInput} value={message} onChange={(e) => setMessage(e.currentTarget.value)}/>
            </div>
            <div>
                <button className={c.sendBtn} disabled={status !== 'ready'} onClick={sendMessageHandler}>send</button>
            </div>
        </div>
    )
}