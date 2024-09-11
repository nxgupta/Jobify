import {Outlet} from "react-router-dom"
const HomeLayout = () => {
  return <div>{<Outlet /> /*all the children will be displayed here based on the path */}</div>
}

export default HomeLayout
