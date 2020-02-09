import React from 'react';

export const ContextApp = React.createContext();

export const InitialState = {
    areas: [],
    region: null,
    city: [],
    searchingValue: '',
    isVacancyLoaded: false,
    vacancies: [],
    vacancyViewToggle: false,
    aboutVacancy: null,
    isFiltered: false,
    alert: {show: false, type: null, text: ''},
    pagesTotal: 0,
    currentPage: 1,

}

export const Reducer = (state, action) => {
    switch(action.type) {
        case 'SET__AREAS':
            return  {
                ...state,
                areas: [...action.payload]
            };

        case 'REGION__SELECT':
            return  {
                ...state,
                region: state.areas.filter(area => area.name === action.payload)[0],
            };

        case 'CITY__SELECT':
            return {
                ...state,
                city: state.region.areas.filter(city => city.name === action.payload)[0],
            };
        case 'SET__SEARCH__VALUE':
            return {
                ...state,
                searchingValue: action.payload
            };
        case 'HANDLE__SEARCH':
            return {
                ...state,
                vacancies: action.payload,
                pagesTotal: action.pages,
                currentPage: action.currentPage,
                isVacancyLoaded: true
            };
        case 'HANDLE__ABOUT__VACANCY':
            return {
                ...state,
                vacancyViewToggle: !state.vacancyViewToggle,
                aboutVacancy: action.payload
            }
        case 'HANDLE__FILTER':
            return {
                ...state,
                isFiltered: !state.isFiltered,
            };
        case 'HANDLE__SORT':
            return {
                ...state,
                vacancies: [...state.vacancies.sort(
                    (a, b) => {
                        let x = a.salary && a.salary.from ? a.salary.from : 0;
                        let  y = b.salary && b.salary.from ? b.salary.from : 0;
                        if (action.payload === 'down') {
                            return x - y
                        }
                        return y- x
                    }
                )]
            };

        case 'SET__ALERT':
            return {
                ...state,
                alert: action.payload
            };

        default:
            return state
    }
};
