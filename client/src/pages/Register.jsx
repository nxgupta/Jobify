import { FormRow, Logo, Alert } from '../components'
import { useState, useEffect } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
    showAlert:false
}
const Register = () => {
    const [values, setValues] = useState(initialState)
    //globalState & useNavigate


    //toggle member
    const toggleMember=()=>{
        setValues({...values,isMember:!values.isMember})
    }

    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value})
        console.log(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
    }
    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>

                {/* logo */}
                <Logo/>

                {/* header */}
                <h3>{values.isMember?'Login':'Register'}</h3>

                {/* alert */}
                {values.showAlert && <Alert/>}

                {values.isMember?null:<FormRow type='text' name='name' value={values.name} handleChange={handleChange} />}

                {/* email */}
                <FormRow type='text' name='email' value={values.name} handleChange={handleChange} />

                {/* password */}
                <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />
                <button className='btn btn-block'>
                    Submit
                </button>
                <p>
                    {values.isMember?'Not a member yet?':'Already a member?'}
                    <button type='submit' onClick={toggleMember} className='member-btn'>{values.isMember?'Register':'Login'}</button>
                </p>

            </form>
        </Wrapper>
    )
}
export default Register