import { FormRow, Logo, Alert } from '../components'
import { useState, useEffect } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}
const Register = () => {
    const [values, setValues] = useState(initialState)
    const navigate = useNavigate()
    let { user, showAlert, isLoading, displayAlert, clearAlert, registerUser,loginUser } = useAppContext();

    //toggle member
    const toggleMember = () => {
        setValues({ ...initialState, isMember: !values.isMember })
        return clearAlert();

    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let { name, email,
            password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            return displayAlert()
        }

        const currentUser = { name, email, password }

        if (isMember) loginUser(currentUser)
        else registerUser(currentUser)

    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000);
        }
    }, [user, navigate])
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

                <button className='btn btn-block' disabled={isLoading}>
                    Submit
                </button>

                <button type='button' className='btn btn-block btn-hipster' disabled={isLoading} onClick={()=>loginUser({email:'testUser@gmail.com',password:'sample'})}>
                    {isLoading?"Loading...":"Demo App"}
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