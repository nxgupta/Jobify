import { useReducer, useContext, createContext } from 'react'
import {
    DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
    CREATE_JOB_BEGIN, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, GET_JOB_BEGIN, GET_JOB_SUCCESS, GET_JOB_ERROR, SET_EDIT_JOB,  TOGGLE_SIDEBAR, LOGOUT_USER, HANDLE_CHANGE, CLEAR_VALUES
} from './actions';
import reducer from './reducer';
import { endPoint } from '../App';
import axios from 'axios';


const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token ?? null,
    userLocation: userLocation ?? '',
    jobLocation: userLocation ?? '',
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    // this will send the Auth with each request, even where auth is not required
    // axios.defaults.headers['Authorization']=`Bearer ${state.token}`

    //Axios instance
    const authFetch = axios.create({
        baseURL: `${endPoint}`,
    })

    authFetch.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${state.token}`;
        return config
    }, (error) => { return Promise.reject(error) })

    authFetch.interceptors.response.use((response) => {
        return response
    },
        (error) => {
            if (error.response.status === 401) {
                logoutUser()
            }
            return Promise.reject(error);
        })

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 3000);
    }

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('location', location)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location')
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const res = await axios.post(`${endPoint}/auth/register`, currentUser)
            const { user, token, location } = res.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user, token, location
                }
            })
            addUserToLocalStorage({ user, token, location })
        }
        catch (err) {
            dispatch({ type: REGISTER_USER_ERROR, payload: { msg: err.response.data } })
        }
        clearAlert()
    }

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const res = await axios.post(`${endPoint}/auth/login`, currentUser)
            const { user, token, location } = res.data;
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    user, token, location
                }
            })
            addUserToLocalStorage({ user, token, location })
        }
        catch (err) {
            dispatch({ type: LOGIN_USER_ERROR, payload: { msg: err.response.data } })
        }
        clearAlert()
    }


    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {

            // Here the auth is manual,
            // let { data } = await axios.patch(`${endPoint}/auth/updateUser`, currentUser, {
            //     headers:{
            //         Authorization:`Bearer ${state.token}`
            //     }
            // })

            const { data } = await authFetch.patch('/auth/updateUser', currentUser)
            const { user, location, token } = data;
            dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, location, token } })
            addUserToLocalStorage({ user, location, token });

        }
        catch (error) {
            if (error.response.data.status !== 401)
                dispatch({ type: UPDATE_USER_ERROR, payload: { msg: error.response.data.msg } })
        }
        clearAlert()
    }

    const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN })
        try {
            const {
                position,
                company,
                jobLocation,
                jobType,
                status,
            } = state

            await authFetch.post('/jobs', {
                position,
                company,
                jobLocation,
                jobType,
                status,
            })
            dispatch({
                type: CREATE_JOB_SUCCESS,
            })
            dispatch({
                type: CLEAR_VALUES
            })
        }
        catch (error) {
            dispatch({
                type: CREATE_JOB_ERROR,
                payload: {
                    msg: error.response.data.msg
                }
            })
        }
        clearAlert();
    }
    const getJobs = async () => {
        dispatch({ type: GET_JOB_BEGIN })
        try {
            const { data } = await authFetch.get('/jobs')
            const { jobs, totalJobs, numOfPages } = data;
            dispatch({
                type: GET_JOB_SUCCESS,
                payload: {
                    jobs,
                    totalJobs,
                    numOfPages
                }
            })
        }
        catch (error) {
            console.log(error)
            //logoutUser()

            dispatch({
                type: GET_JOB_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        clearAlert()
    }
    const setEditJob=(id)=>{
        console.log(`edit job : ${id}`)
        dispatch({
            type:SET_EDIT_JOB,
            payload:{id}
        })
    }
    const editJob=()=>{
        console.log('edit job')
    }
    const handleChange = ({ name, value }) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: {
                name, value
            }
        })
    }
    const deleteJob=(id)=>{
        console.log(`delete job : ${id}`)
    }
    const clearValues = () => {
        dispatch({
            type: CLEAR_VALUES,
        })
    }
    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }
    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }
    return <AppContext.Provider value={{ ...state, displayAlert, clearAlert, registerUser, loginUser, toggleSidebar, logoutUser, handleChange, updateUser, clearValues, createJob, getJobs, setEditJob, editJob, deleteJob }}>
        {children}
    </AppContext.Provider>
}

//creating a use custom hook

const useAppContext = () => {
    return useContext(AppContext)
}
export { AppProvider, initialState, useAppContext }