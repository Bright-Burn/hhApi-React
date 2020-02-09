import React, {useContext} from 'react';
import {ContextApp} from "../../reducer/reducer";

import './Pages.css'

const Pages = ({handleSearch}) => {

    const {state, dispatch} = useContext(ContextApp);
    const {pagesTotal, isVacancyLoaded, currentPage} = state;

    if (isVacancyLoaded) {
    let pages = [];
    for( let i = 1 ; i <= pagesTotal; i++)  {
        pages.push(i)
    }
    return (
        <div className='page'>
            <span className='page__title'>Страница:</span>
            <div>
            {pages.map(page => <button key={page}
                                       className={`page__button ${page === currentPage? 'page__button--active' : ''}`}
                                       onClick={
                currentPage !== page ?
                (e) => handleSearch(
                e,
                (payload, pages,currentPage) => dispatch({
                    type: 'HANDLE__SEARCH',
                    payload,
                    pages,
                    currentPage,
                }),
                page) : false}
            >{page}</button>)}
            </div>
        </div>
    );
    }
    return false
};

export default Pages;