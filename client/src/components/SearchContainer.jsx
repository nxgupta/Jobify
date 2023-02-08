import Wrapper from "../assets/wrappers/SearchContainer";
import { useAppContext } from "../context/appContext"
import { FormRow, FormRowSelect } from './index'
const SearchContainer = () => {
  const { search,searchStatus,searchType,jobTypeOptions,statusOptions,sort,sortOptions,handleChange,clearFilters } = useAppContext();
  const handleSearch=(e)=>{
    //if(isLoading) return;
    handleChange({name:e.target.name,value:e.target.value})
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    clearFilters()
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
      <h4>Search Form</h4>
      <div className="form-center">
      <FormRow className='form-input' name='search' value={search} type='text' handleChange={handleSearch}/>
      <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} options={['all',...statusOptions]} handleChange={handleSearch}/>
      <FormRowSelect labelText='type' name='searchType' value={searchType} options={['all',...jobTypeOptions]} handleChange={handleSearch}/>
      <FormRowSelect name='sort' value={sort} options={sortOptions} handleChange={handleSearch}/>
      <button className="btn btn-block btn-danger" type='submit'>Clear Filters</button>
      </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
