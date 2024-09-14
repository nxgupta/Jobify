import Wrapper from "../assets/wrappers/BigSidebar"
import {useDashboardContext} from "../pages/DashboardLayout"
import Logo from "./Logo"
import NavLinks from "./NavLinks"
let BigSideBar = () => {
  let {showSidebar} = useDashboardContext()
  return (
    <Wrapper>
      <div className={!showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar={true} />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSideBar
