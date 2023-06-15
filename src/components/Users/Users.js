import React from 'react';
import c from './Users.module.css';
import UserDefaultAvatar from '../../assets/images/userDefaultAvatar.jpg'
import { NavLink } from 'react-router-dom';
import placeholder2 from '../../assets/images/preloader2.svg'

const Users = (props) => {
    let currentPage = props.currentPage
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = [];
    let pagesListIndicator;

    if (currentPage < 6) {
        pagesListIndicator = 'first'
        pages = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        pages.push(pagesCount)
    } else if (currentPage > pagesCount - 4) {
        pagesListIndicator = 'last'
        pages = [1]
        for (let i = pagesCount - 8; i <= pagesCount; i++) {
            pages.push(i)
        }
    } else {
        pagesListIndicator = 'middle'
        pages = [1]
        for (let i = currentPage - 4; i <= currentPage + 4; i++) {
            pages.push(i)
        }
        pages.push(pagesCount)
    }

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
            <div className={c.select}>
                {pagesListIndicator === 'first'
                    ? pages.map((el, index) => {
                        return (
                            <button key={el}
                                className={props.currentPage === el ? c.selected : c.nonSelected}
                                onClick={() => { props.onPageChanged(el) }} >
                                {
                                    index === 9
                                        ? <span>  ...{el}</span>
                                        : el
                                }
                            </button>
                        )
                    })

                    : pagesListIndicator === 'middle'
                        ? pages.map((el, index) => {
                            return <button key={el}
                                className={props.currentPage === el ? c.selected : c.nonSelected}
                                onClick={() => { props.onPageChanged(el) }} >
                                {
                                    index === 0
                                        ? <span>{el}  ...</span>
                                        : index === 10
                                            ? <span>... {el}</span>
                                            : el
                                }
                            </button>
                        })
                        : pages.map((el, index) => {
                            return <button key={el}
                                className={props.currentPage === el ? c.selected : c.nonSelected}
                                onClick={() => { props.onPageChanged(el) }} >
                                {
                                    index === 0
                                        ? <span>{el}  ...</span>
                                        : el
                                }
                            </button>
                        })
                }
            </div>
        </div>
    )
}

export default Users; 