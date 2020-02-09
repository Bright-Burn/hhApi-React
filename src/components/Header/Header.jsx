import React, {useContext} from 'react';

import './Header.css'
import {ContextApp} from "../../reducer/reducer";

const Header = ({ handleSearch }) => {

const {state, dispatch} = useContext(ContextApp);
const {areas, region, searchingValue} = state;

    return (
        <div className='header'>
            <form className='header__form'
                  onSubmit={(e) => handleSearch(e,
                      (payload, pages, currentPage) => dispatch({
                        type: "HANDLE__SEARCH",
                        payload,
                        pages,
                        currentPage
                    })
                  )}>
                <input className='header__input'
                       type="text"
                       placeholder='Название вакансии'
                       value={searchingValue}
                       onChange={(e) => dispatch({
                           type: 'SET__SEARCH__VALUE',
                           payload: e.target.value
                       })}/>
                <select className='header__select'
                        name="region"
                        onChange={(e) => dispatch({
                            type: 'REGION__SELECT',
                            payload : e.target.value})}>
                    <option defaultValue='selected'>Выберите регион</option>
                    {areas && areas.map(area => <option key={area.id} >{area.name}</option> )}
                </select>
                <select className='header__select'
                        name="city"
                        onChange={(e) => dispatch({
                            type: 'CITY__SELECT',
                            payload: e.target.value
                        })}>
                    <option defaultValue='selected'>Выберите город</option>
                    { region ?
                        region.areas.map(city =>
                        <option key={city.id} >{city.name}</option> ) : ''}
                </select>
                <button className='header__button' >Поиск</button>
            </form>

        </div>
    );
};

export default Header;