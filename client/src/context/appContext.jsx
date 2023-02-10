import { useReducer, useContext, createContext } from 'react'
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOB_BEGIN,
    GET_JOB_SUCCESS,
    GET_JOB_ERROR,
    CHANGE_PAGE,
    SET_EDIT_JOB,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    DELETE_JOB_BEGIN,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CLEAR_FILTERS
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
    jobTypeOptions: ['Full-Time', 'Part-Time', 'Remote', 'Internship'],
    jobType: 'Full-Time',
    statusOptions: ['Interview', 'Declined', 'Pending'],
    status: 'Pending',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats:{},
    monthlyApplications:[],
    search:'',
    searchStatus:'All',
    searchType:'All',
    sort:'Latest',
    sortOptions: ['Latest','Oldest','A-Z','Z-A']
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
            dispatch({ type: LOGIN_USER_ERROR, payload: { msg: err.response.data.msg } })
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
        const {search,searchStatus,searchType,sort,page}=state;
        let url=`/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
        if(search) url=url+`&search=${search}`
        dispatch({ type: GET_JOB_BEGIN })
        try {
            const { data } = await authFetch.get(url)
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
            logoutUser()

            dispatch({
                type: GET_JOB_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        clearAlert()
    }
    const changePage=(page)=>{
        dispatch({
            type:CHANGE_PAGE,
            payload:{page}
        })
    }
    const setEditJob = (id) => {
        dispatch({
            type: SET_EDIT_JOB,
            payload: { id }
        })
    }
    const editJob = async () => {
        dispatch({
            type: EDIT_JOB_BEGIN
        })
        try {
            const {
                position,
                company,
                jobLocation,
                jobType,
                status,
                editJobId
            } = state
            await authFetch.patch(`/jobs/${editJobId}`, {
                position,
                company,
                jobLocation,
                jobType,
                status,
            })
            dispatch({
                type: EDIT_JOB_SUCCESS,
            })
            dispatch({
                type: CLEAR_VALUES,
            })
        }
        catch (error) {
            if (error.response.status === 401) {
                logoutUser()
            }
            dispatch({
                type: EDIT_JOB_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        clearAlert();
    }
    const deleteJob = async (jobId) => {
        dispatch({
            type: DELETE_JOB_BEGIN,
        })
        try {
            await authFetch.delete(`/jobs/${jobId}`)
            getJobs()
        }
        catch (error) {
            logoutUser()
        }
    }

    const showStats=async ()=>{
        dispatch({
            type:SHOW_STATS_BEGIN
        })
        try{
            let {data}=await authFetch('/jobs/stats')
            dispatch({
                type:SHOW_STATS_SUCCESS,
                payload:{
                    defaultStats:data.defaultStats,
                    monthlyApplications:data.monthlyApplications
                }
            })
        }
        catch(error){
            logoutUser()
        }
    }
    const clearFilters=()=>{
        dispatch({type:CLEAR_FILTERS})
    }
    const handleChange = ({ name, value }) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: {
                name, value
            }
        })
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
    return <AppContext.Provider value={{ ...state, displayAlert, clearAlert, registerUser, loginUser, toggleSidebar, logoutUser, handleChange, updateUser, clearValues, createJob, getJobs, setEditJob, editJob, deleteJob,showStats, clearFilters, changePage }}>
        {children}
    </AppContext.Provider>
}

//creating a use custom hook

const useAppContext = () => {
    return useContext(AppContext)
}
export { AppProvider, initialState, useAppContext }