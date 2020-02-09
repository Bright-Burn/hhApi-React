import React, {useContext} from 'react';

import './Alert.css'
import {ContextApp} from "../../reducer/reducer";

const Alert = () => {

    const {state, dispatch} = useContext(ContextApp);
    const {alert: {show, type, text}} = state;

    if(show){
    return (
        <div className={`alert alert-${type}`}>
            {text}
        </div>
    );
    }
    return false
};

export default Alert;