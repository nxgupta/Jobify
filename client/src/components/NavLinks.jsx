import {NavLink} from "react-router-dom"
import links from "../utils/links"
import {useDashboardContext} from "../pages/DashboardLayout"

const NavLinks = ({isBigSidebar}) => {
  let {toggleSidebar} = useDashboardContext()
  return (
    <div className="nav-links">
      {links.map(({text, path, icon}) => (
        <NavLink to={path} key={text} className="nav-link" onClick={isBigSidebar ? null : toggleSidebar} end>
          <span className="icon">{icon}</span>
          {text}
        </NavLink>
      ))}
    </div>
  )
}
export default NavLinks
