import React, {useContext, useState} from 'react';
import { Card, Icon, Button } from 'semantic-ui-react'

import Vacancy from "../Vacancy/Vacancy";
import {ContextApp} from "../../reducer/reducer";

const VacanciesList = ({handleViewMore}) => {

    const {state, dispatch} = useContext(ContextApp);
    const {vacancyViewToggle, vacancies, isVacancyLoaded, isFiltered} = state;

    const isVacanciesFiltred = isFiltered && vacancies ?
        vacancies.filter(vacancy => vacancy.salary && vacancy.salary.from)
        : vacancies;

    if (isVacancyLoaded) {
        return isVacanciesFiltred.map(vacancy => (
            <Card key={vacancy.id}>
                <Card.Content>
                    <Card.Header>
                        {vacancy.name}
                    </Card.Header>
                    <Card.Meta>
                    <span className='date'>
                        {vacancy.employer.name}
                    </span>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        {vacancy.salary && `От ${vacancy.salary.from} `}
                        {vacancy.salary && vacancy.salary.to && `до ${vacancy.salary.to}`}
                        <Icon name='rub'/>
                    </a>
                </Card.Content>
                <Button onClick={() => handleViewMore(vacancy.id,
                    (payload) => dispatch({
                        type: 'HANDLE__ABOUT__VACANCY',
                        payload: payload
                    })
                )}>
                    Подробнее
                    {vacancyViewToggle && <Vacancy/>}
                </Button>
            </Card>
        ))
    }
    return false
};

export default VacanciesList;