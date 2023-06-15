import { NavLink, Navigate } from 'react-router-dom';
import c from './Header.module.css';

const Header = (props) => {
    return (
        <section className={c.header}>
            <div className={c.header__logo}>
                <img alt='asd' className={c.header__logo_img} src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png' />
            </div>
            {props.isAuth

                ? <div className={c.login}>
                    {props.login}
                    <button className={c.logout__btn} 
                    onClick={props.logout} >
                    Logout
                    </button>
                </div>

                : <NavLink to='/login' className={c.login__button}>
                    <p className={c.login__link}>Login</p>
                </NavLink>
            }

        </section>
    )
}

export default Header;