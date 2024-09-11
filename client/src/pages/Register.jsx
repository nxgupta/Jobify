import {Link} from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import {Logo} from "../components"
import FormRow from "../components/FormRow"

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow labelText="First Name" type="text" name="fname" defaultValue="neer" required={true} />
        <FormRow labelText="Last Name" type="text" name="lname" defaultValue="gupta" />
        <FormRow labelText="Location" type="text" name="location" defaultValue="earth" />
        <FormRow labelText="Email" type="email" name="email" defaultValue="neeraj.gupta4715@gmail.com" required={true} />
        <FormRow labelText="Password" type="password" name="password" defaultValue="123456" required={true} />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
