import { useEffect } from "react"
import { useAppContext } from "../context/appContext"
import Loading from './Loading'
import Job from "./Job"
import Wrapper from "../assets/wrappers/JobsContainer"
import PageBtnContainer from "./PageBtnContainer"


const JobsContainer = () => {
    const { getJobs,isLoading,jobs,totalJobs,numOfPages,search,searchStatus,searchType,sort } = useAppContext();

    useEffect(() => {
        getJobs()
    }, [search,searchStatus,searchType,sort])

    if(isLoading){
        return <Loading center/>
    }

    if(totalJobs===0){
        return <Wrapper>
            <h2>
                No jobs to display
            </h2>
        </Wrapper>
    }
    return (
        <Wrapper>
            <h5>{totalJobs} job{totalJobs>1 && 's'} found</h5>
            <div className="jobs">
                {jobs.map(job=>(
                    <Job key={job._id} {...job}/>
                ))}
            </div>
            {/* pagination buttons */}
            {numOfPages>0 && <PageBtnContainer />}
        </Wrapper>
    )
}
export default JobsContainer