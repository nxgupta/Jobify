import { DISPLAY_ALERT, CLEAR_ALERT } from './actions';
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
        default:
            throw new Error(`no such action : ${action.type}`)
    }
    

}
export default reducer