import { BaseThunkType, inferActionsTypes } from './reduxStore'
import { chatApi, chatMessageType, statusType } from '../api/chatApi'
import { Dispatch } from 'redux';

let initialState = {
    messages: [] as chatMessageType[],
    status: 'pending' as statusType
}

export type initialStateType = typeof initialState;

export const chatReducer = (state = initialState, action: actionsType): initialStateType => {

    switch (action.type) {
        case 'MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.messages]
            };

        case 'STATUS_CHANGED':
            return {
                ...state,
                status: action.status
            };

        default:
            return state;
    }
}

type actionsType = inferActionsTypes<typeof actions>

export const actions = {
    MessagesReceived: (messages: chatMessageType[]) => ({
        type: 'MESSAGES_RECEIVED', messages
    } as const),

    statusChanged: (status: statusType) => ({
        type: 'STATUS_CHANGED', status
    } as const)

}

let _newMessageHandler : ((messages: chatMessageType[]) => void) 
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler !== null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.MessagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler : ((status: statusType) => void) 
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler !== null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}


export type thunkType = BaseThunkType<actionsType>

export const startMessagesListening = ():thunkType => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = ():thunkType => async (dispatch) => {
    chatApi.unSubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.unSubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatApi.stop()
}

export const sendMessage = (message: string):thunkType => async (dispatch) => {
    chatApi.sendMessage(message)
}