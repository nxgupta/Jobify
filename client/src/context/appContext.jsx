import {useReducer, useContext, createContext} from 'react'
import { CLEAR_ALERT, DISPLAY_ALERT } from './actions';
import reducer from './reducer';

const initialState={
     isLoading:false,
     showAlert: false,
     alertText: '',
     alertType: '',
}

const AppContext=createContext();

const AppProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,initialState)
    
    const displayAlert=()=>{
        dispatch({type:DISPLAY_ALERT})
        setTimeout(()=>{
            clearAlert()
        },3000)
    }

    const clearAlert=()=>{
            dispatch({type:CLEAR_ALERT})
    }

    return <AppContext.Provider value={{...state,displayAlert,clearAlert}}>
        {children}
    </AppContext.Provider> 
}

//creating a use custom hook

const useAppContext=()=>{
    return useContext(AppContext)
}
export {AppProvider, initialState, useAppContext}