import { inferActionsTypes } from "./reduxStore"

type dialogsType = {
    id: number
    name: string
    avatarPhoto: string
}

type messagesType = {
    id: number
    text: string
}

let initialState = {
    users: [
        { id: 1, name: 'Johnny', avatarPhoto: 'https://i.pinimg.com/736x/c9/68/dc/c968dc85d1c20a9743d1e30860192e4d.jpg',},
        { id: 2, name: 'Lucy', avatarPhoto: 'https://64.media.tumblr.com/44e7461e2d36a416c83aa98e40ddbd2e/c19a7d8fece565fb-a3/s1280x1920/c3f6940a40c8b8c5c05dc6df3e7411ddf9cbbbc3.jpg',},
        { id: 3, name: 'Diego', avatarPhoto: 'https://i.pinimg.com/736x/c9/68/dc/c968dc85d1c20a9743d1e30860192e4d.jpg',},
        { id: 4, name: 'Tim', avatarPhoto: 'https://static1.personality-database.com/profile_images/897b7100742e47a9950ad6915e4df3f6.png',},
        { id: 5, name: 'Sandman', avatarPhoto: 'https://i.pinimg.com/236x/1f/31/19/1f311914e00be0a4ebf794ddb02d4534.jpg',},
    ] as Array<dialogsType> , 

    messages: [
        { id: 1, text: 'pizza' },
        { id: 2, text: 'mozzarella' },
        { id: 3, text: 'rella rella rella' },
    ] as Array<messagesType>,
}

export type initializeStateType = typeof initialState

const dialogsReducer = (state = initialState, action: actionsType): initializeStateType => {
    let stateCopy: any;
    switch (action.type) {
        case 'SEND_MESSAGE':

            if (action.text === '') {
                return state;
            }

            let messageIdCounter = state.messages.length
            let newMessage = {
                id: messageIdCounter + 1,
                text: action.text
            }

            stateCopy = {
                ...state,
                messages: [...state.messages, newMessage],
            };
            return stateCopy;

        default:
            return state;
    };
};

type actionsType = inferActionsTypes<typeof actions>

export const actions = {
    sendMessage: (messageText: string) => ({type: 'SEND_MESSAGE', text: messageText} as const)
}

export default dialogsReducer;