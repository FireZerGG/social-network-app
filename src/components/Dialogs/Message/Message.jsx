import c from './Message.module.css'

const Message = (props) => {
    return (
        <li className={c.message}>
           {props.text}
        </li>
    )
}

export default Message;