import c from './Message.module.css'

type propsType = {
    text: string
}

const Message: React.FC<propsType> = (props) => {
    return (
        <li className={c.message}>
           {props.text}
        </li>
    )
}

export default Message;