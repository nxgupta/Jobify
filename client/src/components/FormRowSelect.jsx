const FormRowSelect = ({name, labelText, options, value, handleChange}) => {
  return (
    <div className="form-row">
            <label htmlFor={name} className='form-label'>
              {labelText || name}
            </label>
            <select name={name} value={value} className='form-select' onChange={handleChange}>
              {options.map((item, index) =>
                <option value={item} key={index}>{item}</option>)}
            </select>
          </div>
  )
}
export default FormRowSelect