import { useEffect } from "react"
import { ChartsContainer, StatsContainer,Loading } from "../../components"
import { useAppContext } from "../../context/appContext"

const Stats = () => {
  let { showStats,isLoading, monthlyApplications } = useAppContext()
  useEffect(() => {
    showStats()
  }, [])

  if(isLoading){
    return <Loading center/>
  }
  return (
    <>
      <h3>Stats</h3>
      <StatsContainer />
      {monthlyApplications.length>0 &&<ChartsContainer />}
    </>
  )
}
export default Stats