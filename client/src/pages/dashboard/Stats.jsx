import { useEffect } from "react"
import { useAppContext } from "../../context/appContext"

const Stats = () => {
  let {fetchStats,stats,monthlyApplication}=useAppContext()
  useEffect(()=>{
    fetchStats()
  },[])
  return (
    <>
    <h3>Stats pages</h3>
    <h5>{stats.interview}</h5>
    </>
  )
}
export default Stats