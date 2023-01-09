import { FormRow, Logo, Alert } from '../components'
import { useState, useEffect } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}
const Register = () => {
    const [values, setValues] = useState(initialState)
    //globalState & useNavigate
    let { showAlert, isLoading, displayAlert, clearAlert } = useAppContext();


    //toggle member
    const toggleMember = () => {
        setValues({ ...initialState, isMember: !values.isMember })
        clearAlert();
        console.log(values)
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        console.log(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let { name, email,
            password, isMember }=values;
        if(!email || !password || (!isMember && !name)){
            displayAlert()
        }
        else{
            console.log(values)
        }

    }
    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>

                {/* logo */}
                <Logo />

                {/* header */}
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>

                {/* alert */}
                {showAlert && <Alert />}

                {values.isMember ? null : <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />}

                {/* email */}
                <FormRow type='text' name='email' value={values.email} handleChange={handleChange} />

                {/* password */}
                <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />
                <button className='btn btn-block'>
                    Submit
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type='button' onClick={toggleMember} className='member-btn'>{values.isMember ? 'Register' : 'Login'}</button>
                </p>

            </form>
        </Wrapper>
    )
}
export default Register