import Wrapper from "../assets/wrappers/SearchContainer";
import { useAppContext } from "../context/appContext"
import { Alert, FormRow, FormRowSelect } from './index'
import { useState, useMemo } from "react";
const SearchContainer = () => {
  const {showAlert, searchStatus, searchType, jobTypeOptions, statusOptions, sort, sortOptions, handleChange, clearFilters } = useAppContext();
  const [localSearch,setLocalSearch]=useState('')
  
  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  }

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);

  const handleSubmit = (e) => {
    setLocalSearch('')
    e.preventDefault();
    clearFilters()
  }
  return (
    <Wrapper>
      {showAlert && <Alert/>}
      <form className="form" onSubmit={handleSubmit}>
        <h4>Search Form</h4>
        <div className="form-center">
          <FormRow className='form-input' name='search' value={localSearch} type='text' handleChange={optimizedDebounce} />
          <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} options={['All', ...statusOptions]} handleChange={handleSearch} />
          <FormRowSelect labelText='type' name='searchType' value={searchType} options={['All', ...jobTypeOptions]} handleChange={handleSearch} />
          <FormRowSelect name='sort' value={sort} options={sortOptions} handleChange={handleSearch} />
          <button className="btn btn-block btn-danger" type='submit'>Clear Filters</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
