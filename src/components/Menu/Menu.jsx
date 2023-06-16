import { NavLink } from 'react-router-dom';
import c from './Menu.module.css';

const setActive = ({isActive}) => isActive ? `${c.active}` : `${c.item}`;

const Menu = () => {
    return (
        <section className={c.menu}>
                <ul className={c.menu__nav}>
                <li className={c.menu__nav_element}>
                    <NavLink to='/profile' className={setActive}>Profile</NavLink>
                </li>
                <li className={c.menu__nav_element}>
                    <NavLink to='/dialogs' className={setActive}>Messages</NavLink>
                </li>
                <li className={c.menu__nav_element}>
                    <NavLink to='/users' className={setActive}>Users</NavLink>
                </li>
            </ul>
        </section>
    )
}

export default Menu;

