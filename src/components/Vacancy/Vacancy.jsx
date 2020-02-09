import React, {useContext} from 'react';
import { Header, Modal } from 'semantic-ui-react'
import {ContextApp} from "../../reducer/reducer";

const Vacancy = () => {

    const {state, dispatch} = useContext(ContextApp);
    const {aboutVacancy} = state;

    return (
        <Modal open={true}
               onUnmount={() => dispatch({
                    type: 'HANDLE__ABOUT__VACANCY',
                    payload: null
                })}>
            <Modal.Header>{aboutVacancy.name}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header> {aboutVacancy.employer.name}</Header>
                    <p dangerouslySetInnerHTML={{__html: aboutVacancy.description}}/>

                    <p>
                        Опыт работы: {aboutVacancy.experience.name}
                    </p>
                    <p>
                        График работы: {aboutVacancy.schedule.name}
                    </p>
                    <p>
                        Город: {aboutVacancy.area.name}
                    </p>
                    <p>
                       Зарплата: от{aboutVacancy.salary && aboutVacancy.salary.from} до {aboutVacancy.salary && aboutVacancy.salary.to && aboutVacancy.salary.to}
                    </p>

                </Modal.Description>
            </Modal.Content>

        </Modal>
    );
};

export default Vacancy;
