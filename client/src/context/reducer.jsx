import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,
LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR
 } from './actions';
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
                ...state, isLoading: false, token: action.payload.token,
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
                ...state, isLoading: false, token: action.payload.token,
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
                ...state, isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        }

        default:
            throw new Error(`no such action : ${action.type}`)
    }


}
export default reducer