import { NavLink } from 'react-router-dom';
import c from './Menu.module.css';

const setActive = ({ isActive }: any) => isActive ? `${c.active}` : `${c.item}`;

const Menu: React.FC = () => {
    return (
        <section className={c.menu}>
            <ul className={c.menu__nav}>
                <li className={c.menu__nav_element}>
                    <NavLink to='/profile' className={setActive}>
                        <div className={c.item__text}>
                            Профиль
                        </div>
                    </NavLink>
                </li>
                <li className={c.menu__nav_element}>
                    <NavLink to='/chat' className={setActive}>
                        <div className={c.item__text}>
                            Чат
                        </div>
                    </NavLink>
                </li>
                <li className={c.menu__nav_element}>
                    <NavLink to='/users' className={setActive}>
                        <div className={c.item__text}>
                            Пользователи
                        </div>
                    </NavLink>
                </li>
            </ul>
        </section>
    )
}

export default Menu;

