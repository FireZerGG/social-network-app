import { NavLink } from 'react-router-dom';
import c from './Item.module.css'

type propsType = {
    id: number
    avatarPhoto: string
    name: string
}

const Item:React.FC<propsType> = (props) => {
    return (
        <li className={c.item}>
            <NavLink className={c.item__link} to={"/dialogs/" + props.id}>
                <div className={c.item__avatar}>
                    <img alt='aaa' className={c.item__avatar_img} src={props.avatarPhoto}></img>
                </div>
                <p className={c.item__name}>{props.name}</p>
            </NavLink>
        </li>
    )
}

export default Item;