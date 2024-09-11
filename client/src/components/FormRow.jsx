const FormRow = ({labelText, type, name, defaultValue, required}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input type={type} id={name} name={name} className="form-input" defaultValue={defaultValue || ""} required={required || false} />
    </div>
  )
}

export default FormRow
