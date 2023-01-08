import { FormRow, Logo } from '../components'
import { useState, useEffect } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}
const Register = () => {
    const [values, setValues] = useState(initialState)
    //globalState & useNavigate

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
                <h3>Login</h3>

                {/* email */}
                <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />

                {/* password */}
                <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />
                <button className='btn btn-block'>
                    Submit
                </button>

            </form>
        </Wrapper>
    )
}
export default Register