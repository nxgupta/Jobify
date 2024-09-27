import {Form, Link, redirect, useNavigation} from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import {Logo} from "../components"
import FormRow from "../components/FormRow"
import customFetch from "../utils/customFetch"
import {toast} from "react-toastify"
export let action = async ({request}) => {
  let formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post("/auth/register", data)
    toast.success("Registration Successful")
    return redirect("/login")
  } catch (err) {
    toast.error(err?.response?.data?.msg)
    return err
  }
}

const Register = () => {
  const isSubmitting = useNavigation().state === "submitting"
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow labelText="First Name" type="text" name="name" defaultValue="neer" required={true} />
        <FormRow labelText="Last Name" type="text" name="lastName" defaultValue="gupta" />
        <FormRow labelText="Location" type="text" name="location" defaultValue="earth" />
        <FormRow labelText="Email" type="email" name="email" defaultValue="neeraj.gupta4715@gmail.com" required={true} />
        <FormRow labelText="Password" type="password" name="password" defaultValue="secret123" required={true} />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register
