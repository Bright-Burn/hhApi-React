import React, {useContext} from 'react';
import {ContextApp} from "../../reducer/reducer";

const Page = ({handleSearch}) => {

    const {state, dispatch} = useContext(ContextApp);
    const {pagesTotal, isVacancyLoaded} = state;

    if (isVacancyLoaded) {
    let pages = [];
    for( let i = 1 ; i <= pagesTotal; i++)  {
        pages.push(i)
    }
    return (
        <div>
            {console.log(pages)}
            {pages.map(page => <button key={page} onClick={(e) => handleSearch(
                e,
                (payload, pages) => dispatch({
                    type: 'HANDLE__SEARCH',
                    payload,
                    pages
                }),
                page)}>{page}</button>)}
        </div>
    );
    }
    return false
};

export default Page;