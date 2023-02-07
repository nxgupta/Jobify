import Wrapper from "../../assets/wrappers/DashboardFormPage"
import { FormRow, Alert, FormRowSelect } from "../../components"
import { SET_EDIT_JOB } from "../../context/actions"
import { useAppContext } from "../../context/appContext"

const Addjob = () => {

  const {
    isLoading,
    showAlert,
    displayAlert,
    isEditing,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    jobLocation,
    company,
    position,
    handleChange,
    clearValues,
    createJob,
    editJob
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!position || !jobLocation || !company) {
      displayAlert()
      return
    }
    if(isEditing){
      editJob()
      return;
    }
    createJob()
  }

  const handleJobInput = (e) => {
    const name=e.target.name
    const value=e.target.value
    handleChange({name,value})
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        {showAlert && <Alert />}
        <div className="form-center">

          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput} />

          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput} />

          <FormRow
            type='text'
            labelText='job Location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput} />

          <FormRowSelect
            name='status'
            options={statusOptions}
            value={status}
            handleChange={handleJobInput} />

          <FormRowSelect
            labelText='job type'
            name='jobType'
            options={jobTypeOptions}
            value={jobType}
            handleChange={handleJobInput} />

          <div className="btn-container">
            <button type='submit' className="btn btn-block submit-btn" onClick={handleSubmit} disabled={isLoading}>submit</button>
            <button className="btn btn-block clear-btn" onClick={(e)=>{e.preventDefault(),clearValues()}}>clear</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
export default Addjob