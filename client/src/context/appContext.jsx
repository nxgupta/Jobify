import { useReducer, useContext, createContext} from 'react'
import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,
LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR
 } from './actions';
import reducer from './reducer';
import { endPoint } from '../App';
import axios from 'axios';

const token=localStorage.getItem('token')
const user=localStorage.getItem('user')
const userLocation=localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user):null,
    token: token ?? null,
    userLocation: userLocation ?? '',
    jobLocation: userLocation ?? ''
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 3000);
    }

    const addUserToLocalStorage=({user,token,location})=>{
        localStorage.setItem('user',JSON.stringify(user));
        localStorage.setItem('token',token);
        localStorage.setItem('location',location)
    }

    const removeUserToLocalStorage=()=>{
        localStorage.remove('user');
        localStorage.remove('token');
        localStorage.remove('location')
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const res = await axios.post(`${endPoint}/api/v1/auth/register`, currentUser)
            const { user, token, location } = res.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user, token, location
                }
            })
            addUserToLocalStorage({user,token,location})
        }
        catch (err) {
            dispatch({ type: REGISTER_USER_ERROR, payload: { msg: err.response.data } })
        }
        clearAlert()
    }

    const loginUser = async (currentUser)=>{
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const res = await axios.post(`${endPoint}/api/v1/auth/login`, currentUser)
            const { user, token, location } = res.data;
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    user, token, location
                }
            })
            addUserToLocalStorage({user,token,location})
        }
        catch (err) {
            dispatch({ type: LOGIN_USER_ERROR, payload: { msg: err.response.data } })
        }
        clearAlert()
    }

    return <AppContext.Provider value={{ ...state, displayAlert, clearAlert, registerUser,loginUser }}>
        {children}
    </AppContext.Provider>
}

//creating a use custom hook

const useAppContext = () => {
    return useContext(AppContext)
}
export { AppProvider, initialState, useAppContext }