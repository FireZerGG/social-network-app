import React from 'react';
import c from './Users.module.css';
import UserDefaultAvatar from '../../assets/images/userDefaultAvatar.jpg'
import { NavLink } from 'react-router-dom';
import placeholder2 from '../../assets/images/preloader2.svg'
import Paginator from './paginator';
import { userType } from '../../types/types';

type propsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<userType>
    unFollow: (id: number) => void
    follow: (id: number) => void
    onPageChanged: (el: number) => void
    followingInProgress: Array<number>
}

const Users: React.FC<propsType> = (props) => {

    return (
        <div>
            {
                props.users.map(u => <div className={c.user} key={u.id} >
                    <div className={c.user__avatar}>
                        <NavLink to={`/profile/` + u.id}>
                            <img alt='avatar'

                                src={u.photos.small ?
                                    u.photos.small :
                                    UserDefaultAvatar}

                                className={c.user__avatar_img} />
                        </NavLink>
                    </div>
                    <div className={c.user__information}>
                        <div className={c.user__information_name} >{u.name}</div>
                        <div className={c.user__information_status}>{u.status}</div>
                    </div>
                    <div className={c.user__follow_buttons}>
                        {
                            u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    className={c.buttons__btn}
                                    onClick={() => { props.unFollow(u.id) }} >

                                    {props.followingInProgress.some(id => id === u.id)
                                        ? <img className={c.button_preloader} alt='placeholder' src={placeholder2} />
                                        : <p>UnFollow</p>
                                    }

                                </button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    className={c.buttons__btn}
                                    onClick={() => { props.follow(u.id) }} >

                                    {props.followingInProgress.some(id => id === u.id)
                                        ? <img className={c.button_preloader} alt='placeholder' src={placeholder2} />
                                        : <p>Follow</p>
                                    }

                                </button>
                        }
                    </div>
                </div>)
            }

                <Paginator currentPage = {props.currentPage}
                    onPageChanged = {props.onPageChanged}
                    pageSize = {props.pageSize}
                    totalUsersCount = {props.totalUsersCount}
                />
        </div>
    )
}

export default Users; 