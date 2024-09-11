import {Link} from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import {Logo} from "../components"
import FormRow from "../components/FormRow"
const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow labelText="Email" type="email" name="email" defaultValue="neeraj.gupta4715@gmail.com" required={true} />
        <FormRow labelText="Password" type="password" name="password" defaultValue="123456" required={true} />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <button type="button" className="btn btn-block">
          Explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  )
}

export default Login
