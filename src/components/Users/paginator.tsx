import React from 'react';
import c from './Users.module.css';

type propsType = {
    currentPage: number 
    onPageChanged: (el: number) => void
    pageSize: number
    totalUsersCount: number
}

const Paginator: React.FC<propsType> = ({currentPage, onPageChanged, pageSize, totalUsersCount}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages: Array<number> = [];
    let pagesListIndicator: string

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
        <div className={c.select}>
            {pagesListIndicator === 'first'
                ? pages.map((el, index) => {
                    return (
                        <button key={el}
                            className={currentPage === el ? c.selected : c.nonSelected}
                            onClick={() => {onPageChanged(el) }} >
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
                            className={currentPage === el ? c.selected : c.nonSelected}
                            onClick={() => {onPageChanged(el) }} >
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
                            className={currentPage === el ? c.selected : c.nonSelected}
                            onClick={() => {onPageChanged(el) }} >
                            {
                                index === 0
                                    ? <span>{el}  ...</span>
                                    : el
                            }
                        </button>
                    })
            }
        </div>
    )
}

export default Paginator