import React, { useEffect, useState } from "react"
import c from './chatPage.module.css'

export const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

export type chatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const Chat: React.FC = () => {

    const [wsChanel, setWsChanel] = useState<WebSocket | null>(null)


    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => { 
            console.log('close ws')
            setTimeout(() => {setWsChanel(ws)}, 5000)
        }
        function createChanel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChanel(ws)
        }
        createChanel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    useEffect (() => {

    }, [wsChanel])

    return (
        <div>
            <Messages wsChanel = {wsChanel}/>
            <AddMessageForm wsChanel = {wsChanel}/>
        </div>
    )
}

const Messages: React.FC<{wsChanel: WebSocket | null}> = ({wsChanel}) => {

    const [messages, setMessages] = useState<chatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (event: MessageEvent) => {
            setMessages((prevMessages) => [...prevMessages, ...JSON.parse(event.data)])
        }

        wsChanel?.addEventListener('message', messageHandler)

        return () => {
            wsChanel?.removeEventListener('message', messageHandler)
        }
    }, [wsChanel])

    return (
        <div className={c.messagesContainer} >
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
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

const AddMessageForm: React.FC<{wsChanel: WebSocket | null}> = ({wsChanel}) => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect (() => {
        let openHandler = () => { 
            setReadyStatus('ready')
        }

        wsChanel?.addEventListener('open', openHandler)

        return () => {
            wsChanel?.removeEventListener('open', openHandler)
        }
    }, [wsChanel])
    
    const sendMessage = () => {
        if (!message) return
        
        wsChanel?.send(message)
        setMessage('')
    }

    return (
        <div className={c.form}>
            <div>
                <textarea  placeholder = 'Введите сообщение'className={c.formInput} value={message} onChange={(e) => setMessage(e.currentTarget.value)}/>
            </div>
            <div>
                <button className={c.sendBtn} disabled={ wsChanel === null || readyStatus !== 'ready'} onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}