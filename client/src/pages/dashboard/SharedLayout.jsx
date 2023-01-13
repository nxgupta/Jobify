import { Outlet,Link } from 'react-router-dom'
const SharedLayout = () => {
  return (
    <>
    <nav>
      <Link to='alljobs'>All Jobs</Link>
      <Link to='addjob'>Add Job</Link>
    </nav>
    <Outlet/>
    </>
  )
}
export default SharedLayout