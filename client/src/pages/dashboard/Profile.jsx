import { useState } from "react"
import { FormRow, Alert } from "../../components"
import { useAppContext } from "../../context/appContext"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext();
  console.log(user)
  let [name, setName] = useState(user?.name)
  let [email, setEmail] = useState(user?.email)
  let [lastName, setLastName] = useState(user?.lastName)
  let [location, setLocation] = useState(user?.location)

  const handleSubmit = (event) => {
    event.preventDefault()

    //disable while testing
    // if(!name || !email || !lastName || !location){
    //   displayAlert()
    //   return
    // }
    updateUser({name,email,lastName,location})
  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert/>}
        <div className="form-center">
          <FormRow type='text' name="name" value={name} handleChange={(event)=>setName(event.target.value)}/>
          <FormRow type='text' name="lastName" labelText="Last Name" value={lastName} handleChange={(event)=>setLastName(event.target.value)}/>
          <FormRow type='email' name="email" value={email} handleChange={(event)=>setEmail(event.target.value)}/>
          <FormRow type='text' name="location" value={location} handleChange={(event)=>setLocation(event.target.value)}/>
          <button className="btn btn-block" type='submit' disabled={isLoading}>{isLoading?'Please Wait...':'Save Changes'}</button>
        </div>
      </form>
    </Wrapper>
  )
}
export default Profile