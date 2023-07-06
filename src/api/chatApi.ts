type messagesReceivedSubscribesType = (messages: chatMessageType[]) => void
type statusChangedSubscribesType = (status: statusType) => void

const subscribers = {
    'messages-received': [] as messagesReceivedSubscribesType[],
    'status-changed': [] as statusChangedSubscribesType[]
}

let ws: WebSocket | null = null

const closeHandler = () => { 
    subscribers['status-changed'].forEach(s => s('pending'))
    setTimeout(createChanel, 5000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessage))
}

const openHandler = () => {
    subscribers['status-changed'].forEach(s => s('ready'))
}

function createChanel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    subscribers['status-changed'].forEach(s => s('pending'))
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
}

type eventsNamesType = 'messages-received' | 'status-changed'

export const chatApi = {
    start() {
        createChanel()
    },

    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },


    subscribe(eventName: eventsNamesType, callback: messagesReceivedSubscribesType | statusChangedSubscribesType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
    },

    unSubscribe(eventName:eventsNamesType, callback: messagesReceivedSubscribesType | statusChangedSubscribesType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },

    sendMessage(message:string) {
        ws?.send(message)
    }
}

export type chatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
} 

export type statusType = 'pending' | 'ready'