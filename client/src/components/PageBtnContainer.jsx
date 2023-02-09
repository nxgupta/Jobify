import { useAppContext } from "../context/appContext"
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi"
import Wrapper from "../assets/wrappers/PageBtnContainer"

const PageBtnContainer = () => {
  const {numOfPages, page, changePage} = useAppContext()
  const nextPage = () => {
    if(page<numOfPages) changePage(page+1)
  }
  const prevPage = () => {
    if(page>1) changePage(page-1)
  }
  const pages=Array.from({length:numOfPages},(_,i)=>i+1);
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {
          pages.map(pageNumber=><button type='button' className={pageNumber===page?"pageBtn active":"pageBtn"} key={pageNumber} onClick={()=>changePage(pageNumber)}>{pageNumber}</button>)
        }
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}
export default PageBtnContainer