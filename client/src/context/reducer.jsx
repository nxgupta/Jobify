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
import { initialState } from './appContext';
const reducer = (state, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state, showAlert: true,
                alertType: 'danger',
                alertText: 'Please input all values'
            }
        case CLEAR_ALERT:
            return {
                ...state, showAlert: false,
                alertType: '',
                alertText: ''
            }
        case REGISTER_USER_BEGIN: {
            return {
                ...state, isLoading: true
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: 'User Created! Redirecting...'
            }
        }
        case REGISTER_USER_ERROR: {
            return {
                ...state, isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        }

        case LOGIN_USER_BEGIN: {
            return {
                ...state, isLoading: true
            }
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: 'Login Successful! Redirecting...'
            }
        }
        case LOGIN_USER_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        }

        case TOGGLE_SIDEBAR: {
            return {
                ...state, showSidebar: !state.showSidebar
            }
        }
        case LOGOUT_USER: {
            return {
                ...initialState,
                user: null,
                token: null,
                jobLocation: '',
                userLocation: ''
            }
        }
        case UPDATE_USER_BEGIN: {
            return {
                ...state, isLoading: true
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: 'User Profile Updated...',
            }
        }
        case UPDATE_USER_ERROR: {
            return {
                ...state, isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        }
        case CREATE_JOB_BEGIN: {
            return {
                ...state,
                isLoading: true
            }
        }
        case CREATE_JOB_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'New Job Created',
            }
        }
        case CREATE_JOB_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        }
        case GET_JOB_BEGIN: {
            return {
                ...state, isLoading: true, showAlert: false
            }
        }
        case GET_JOB_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                jobs: action.payload.jobs,
                totalJobs: action.payload.totalJobs,
                numOfPages: action.payload.numOfPages
            }
        }
        case GET_JOB_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        }
        case SET_EDIT_JOB: {
            const job = state.jobs.find(job => job._id == action.payload.id)
            const { _id, position, company, jobLocation, status, jobType } = job;

            return {
                ...state,
                isEditing: true,
                editJobId: _id,
                position,
                company,
                jobLocation,
                status,
                jobType
            }
        }
        case EDIT_JOB_BEGIN: {
            return {
                ...state,
                isLoading: true
            }
        }
        case EDIT_JOB_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'Job Updated',
            }
        }
        case EDIT_JOB_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        }

        case DELETE_JOB_BEGIN: {
            return {
                ...state,
                isLoading: true
            }
        }

        case SHOW_STATS_BEGIN: {
            return {
                ...state,
                isLoading: true
            }
        }
        case SHOW_STATS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                stats: action.payload.defaultStats,
                monthlyApplications: action.payload.monthlyApplications
            }
        }
        case HANDLE_CHANGE: {
            return {
                ...state, [action.payload.name]: action.payload.value
            }
        }
        case CLEAR_FILTERS: {
            return {
                ...state,
                search: '',
                searchStatus: 'all',
                searchType: 'all',
                sort: 'latest',
            }
        }
        case CLEAR_VALUES: {
            const initialState = {
                isEditing: false,
                editJobId: '',
                position: '',
                company: '',
                jobLocation: state.userLocation,
                jobType: 'full-time',
                status: 'pending'
            }
            return {
                ...state, ...initialState
            }
        }


        default:
            throw new Error(`no such action : ${action.type}`)
    }
}
export default reducer