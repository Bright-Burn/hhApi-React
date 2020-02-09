import React, {useContext} from 'react';
import { Menu, Grid, Popup, Button } from 'semantic-ui-react'
import {ContextApp} from "../../reducer/reducer";

const SortFilter = () => {

    const {state, dispatch} = useContext(ContextApp);
    const {vacancies, isVacancyLoaded} = state;
    const withSalary =vacancies && vacancies.filter(vacancy => vacancy.salary && vacancy.salary.from);

    return (
        <Menu>
            <Menu.Item
                content='Сортировка по зарплате(больше)'
                onClick={()=>dispatch({
                    type: 'HANDLE__SORT',
                    payload: 'down'
                })}
            />

            <Menu.Item
                content='Сортировка по зарплате(меньше)'
                onClick={()=>dispatch({
                    type: 'HANDLE__SORT',
                })}
            />

            <Menu.Item
                content='С указанной зарплатой / Все'
                onClick={() => dispatch({
                    type: 'HANDLE__FILTER',
                })}
            />
            <Popup wide trigger={<Button content='Хотите узнать среднюю зарплату?' />} on='click'>
                <Grid divided columns='equal'>
                    <Grid.Column>
                        {isVacancyLoaded && (withSalary.reduce(
                            (sum, currSalary) => {return sum + currSalary.salary.from }, 0)/withSalary.length
                            ).toFixed(2)
                        }
                    </Grid.Column>
                </Grid>
            </Popup>

        </Menu>
    );
};

export default SortFilter;