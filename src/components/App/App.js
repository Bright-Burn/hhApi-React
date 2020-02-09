import React, {useState, useEffect, useReducer} from 'react';
import axios from 'axios'
import { Container, Card } from 'semantic-ui-react'

import { ContextApp, InitialState, Reducer} from "../../reducer/reducer";
import Header from "../Header/Header";
import VacanciesList from "../VacanciesList/VacanciesList";
import SortFilter from "../SortFilter/SortFilter";
import Pages from "../Page/Pages";
import Alert from "../Alert/Alert";

import './App.css';


function App() {
  //******************
  const [state, dispatch] = useReducer(Reducer, InitialState);
  const {searchingValue, city, region} = state;
  //******************
  useEffect(() => {
    axios.get('https://api.hh.ru/areas/113')
        .then(({data})=> { dispatch({
          type: 'SET__AREAS',
          payload: data.areas
        })})
        .catch((e)=>console.log(e))
  }, []);
  const handleSearch = (e, dispatch, page = 1) => {
    e.preventDefault()
    if (searchingValue && region) {
      const server = `https://api.hh.ru/vacancies?page=${page}&per_page=50&area=${(city && city.id) || region.id }&text=${searchingValue}`;
      axios.get(server)
        .then(({data})=>{
          console.log(data)
          dispatch(data.items, data.pages, data.page)
        })
        .then(() => usingAlert('success','Вакансии загружены'))
        .catch((e)=> {
          usingAlert( 'danger','Вакансии не загружены')
        })

    } else {
      usingAlert( 'danger','Заполните все критерии поиска' )
    }


  };
  const handleViewMore = (vacancyId, dispatch) => {
    axios.get(`https://api.hh.ru/vacancies/${vacancyId}`)
        .then(({data}) => {
          dispatch(data)
        })
        .catch((e)=>console.log(e))
  };
  const usingAlert = (type, text) => {
    dispatch({
      type: 'SET__ALERT',
      payload:{show: true, type: type, text: text}})
    setTimeout(()=>dispatch({
      type: 'SET__ALERT',
      payload:{show: false, type: null, text: ''}}), 2000)
  }

  return (

      <ContextApp.Provider value={{dispatch, state}}>
        <Container>
          <Header handleSearch={handleSearch}/>
          <SortFilter />
          <Pages handleSearch={handleSearch}/>
          <Alert/>
          <Card.Group itemsPerRow={4}>
             <VacanciesList handleViewMore={handleViewMore} />
          </Card.Group>

        </Container>
      </ContextApp.Provider>
  );
}

export default App;
